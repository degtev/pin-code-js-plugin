/**
 * Pin Code Plugin
 * Author: Vladimir Degtev
 * Created: December 26, 2023
 * GitHub: https://github.com/degtev/pin-code-js-plugin
 * Version: 1.5.0
 */

const PinCodePlugin = {
    pinContainer: null,
    pinInputs: [],
    pinInputsLen: 0,
    onSuccess: null, // Function that will be called after entering a correct pin code
    onError: null,   // Function that will be called if the pin code is not fully entered
    button: null,    // Button to perform the function on click

    // Plugin initialization
    init: function(selector, onSuccess = null, onError = null, buttonId = null) {
        this.pinContainer = document.querySelector(selector);
        this.pinInputs = Array.from(this.pinContainer.getElementsByTagName("input"));
        this.pinInputsLen = this.pinInputs.length;
        this.onSuccess = onSuccess;
        this.onError = onError;

        // If buttonId is provided, find the button by ID
        if (buttonId) {
            this.button = document.getElementById(buttonId);
            if (this.button) {
                this.button.addEventListener('click', this.handleButtonClick.bind(this));
            }
        }

        this.bindEvents(); // Bind event handlers
    },

    // Bind event handlers
    bindEvents: function() {
        this.pinContainer.addEventListener('input', this.handleInput.bind(this), false);
        this.pinContainer.addEventListener('paste', this.handlePaste.bind(this), false);
        this.pinContainer.addEventListener('keydown', this.handleKeyDown.bind(this), false);
        this.pinContainer.addEventListener('keyup', this.handleKeyUp.bind(this), false);
    },

    // Focus on the next input field
    focusNextInput: function(currentInput) {
        const nextInput = currentInput.nextElementSibling;
        if (nextInput && nextInput.tagName.toLowerCase() === "input") {
            nextInput.focus();
        }
    },

    // Focus on the previous input field
    focusPreviousInput: function(currentInput) {
        const previousInput = currentInput.previousElementSibling;
        if (previousInput && previousInput.tagName.toLowerCase() === "input") {
            previousInput.focus();
        }
    },

    // Handle input event
    handleInput: function(event) {
        const target = event.target;
        const value = target.value;

        // Allow only one digit per input field
        if (value.length > 1) {
            target.value = value.charAt(0);
        }

        // Check if the entered value is a digit
        if (!/^\d$/.test(target.value)) {
            target.value = ""; // Clear the field if a non-digit is entered
            return;
        }

        const currentIndex = this.pinInputs.indexOf(target);

        if (currentIndex === this.pinInputsLen - 1) {
            // If all fields are filled, call the onSuccess function on key release
            this.checkPinCodeCompletion();
        } else {
            this.focusNextInput(target);
        }
    },

    // Handle paste event
    handlePaste: function(event) {
        event.preventDefault();
        const pastedData = event.clipboardData.getData('text/plain');
        const numericPattern = /\d/g;
        const pinCode = pastedData.match(numericPattern).join('');

        for (let i = 0; i < pinCode.length && i < this.pinInputsLen; i++) {
            const index = i % this.pinInputs.length;
            this.pinInputs[index].value = pinCode[i];
        }

        if (pinCode.length >= this.pinInputsLen) {
            this.focusNextInput(this.pinInputs[this.pinInputsLen - 1]);
        }
    },

    // Handle key down event
    handleKeyDown: function(event) {
        const target = event.target;
        const isBackspace = event.key === 'Backspace';

        if (isBackspace && target.value === "" && target.previousElementSibling) {
            const previousInput = target.previousElementSibling;
            previousInput.focus();
            previousInput.value = "";
        }
    },

    // Handle key up event
    handleKeyUp: function(event) {
        this.checkPinCodeCompletion();
    },

    // Check if the pin code input is complete
    checkPinCodeCompletion: function() {
        const pinCode = this.getPinCode();
        if (pinCode.length === this.pinInputsLen && this.onSuccess) {
            this.onSuccess(pinCode);
        }
    },

    // Get the current entered PIN code
    getPinCode: function() {
        return this.pinInputs.map(input => input.value).join('');
    },

    // Handle button click
    handleButtonClick: function() {
        const pinCode = this.getPinCode();
        if (pinCode.length === this.pinInputsLen) {
            if (this.onSuccess) {
                this.onSuccess(pinCode);
            }
        } else {
            if (this.onError) {
                this.onError(pinCode);
            }
        }
    }
};
// Example usage:
// Define functions
//function onSuccess(pinCode) {
//    alert("Your pin code: " + pinCode);
//}
//function onError(pinCode) {
//    alert("Please enter the full pin code.");
//}
// Initialize PinCodePlugin with onSuccess and onError functions
//PinCodePlugin.init('.pin-code', onSuccess, onError, 'buttonClick');
