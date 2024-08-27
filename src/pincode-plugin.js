/**
 * Pin Code Plugin
 * Author: Vladimir Degtev
 * Created: December 26, 2023
 * GitHub: https://github.com/degtev/pin-code-js-plugin
 * Version: 1.0.1
 */

const PinCodePlugin = {
    pinContainer: null,
    pinInputs: [],
    pinInputsLen: 0,

    // Plugin initialization
    init: function(selector) {
        this.pinContainer = document.querySelector(selector);
        this.pinInputs = Array.from(this.pinContainer.getElementsByTagName("input"));
        this.pinInputsLen = this.pinInputs.length;

        this.bindEvents(); // Binds event handlers
    },

    // Binds event handlers
    bindEvents: function() {
        this.pinContainer.addEventListener('input', this.handleInput.bind(this), false);
        this.pinContainer.addEventListener('paste', this.handlePaste.bind(this), false);
        this.pinContainer.addEventListener('keydown', this.handleKeyDown.bind(this), false);
    },

    // Focuses on the next input field
    focusNextInput: function(currentInput) {
        const nextInput = currentInput.nextElementSibling;
        if (nextInput && nextInput.tagName.toLowerCase() === "input") {
            nextInput.focus();
        }
    },

    // Handles the input event
    handleInput: function(event) {
        const target = event.target;
        const maxLength = parseInt(target.getAttribute("maxlength"), 10);
        const myLength = target.value.length;

        if (myLength === this.pinInputsLen) {
            const pastedData = target.value;
            const numericPattern = /\d/g;
            const pinCode = pastedData.match(numericPattern).join('');

            this.pinInputs.forEach((input) => {
                input.value = "";
            });

            for (let i = 0; i < pinCode.length && i < this.pinInputsLen; i++) {
                const index = i % this.pinInputs.length;
                this.pinInputs[index].value = pinCode[i];
            }
        }

        this.focusNextInput(target);
    },

    // Handles the paste event
    handlePaste: function(event) {
        event.preventDefault();
        const pastedData = event.clipboardData.getData('text/plain');
        const numericPattern = /\d/g;
        const pinCode = pastedData.match(numericPattern).join('');

        for (let i = 0; i < pinCode.length && i < this.pinInputsLen; i++) {
            const index = i % this.pinInputs.length;
            this.pinInputs[index].value = pinCode[i];
        }

        this.focusNextInput(this.pinInputs[this.pinInputsLen - 1]);
    },

    // Handles the keydown event
    handleKeyDown: function(event) {
        const target = event.target;
        const isBackspace = event.key === 'Backspace';

        if (isBackspace && target.value === "" && target.previousElementSibling) {
            const previousInput = target.previousElementSibling;
            previousInput.focus();
            previousInput.value = "";
        }
    }
};