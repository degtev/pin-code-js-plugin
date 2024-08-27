# Pin Code Plugin

A JavaScript plugin for managing pin code input fields. 😊🔐

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Methods](#methods)
- [Events](#events)
- [Demo](#demo)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Pin Code Plugin is a lightweight JavaScript library that provides an easy and intuitive way to manage pin code input fields. It allows users to enter a pin code across multiple input fields and handles input restrictions, navigation, and event callbacks. 💡💻

This plugin can be used to enhance the pin code input experience in various applications, such as login forms, authentication systems, and secure transactions. 🌟🔒

## Features

- Accepts pin code input across multiple input fields ✔️
- Restricts input to numeric characters only 🔢
- Handles navigation between input fields automatically ⬅️➡️
- Supports pasting of a complete pin code 📋
- Customizable event callbacks for input handling 🎉

## Installation

To use the Pin Code Plugin, follow these steps:

1. Include the Pin Code Plugin script in your HTML file by adding the following line in the `<head>` section:

   ```html
      <script src="/src/pincode-plugin.js"></script>
   ```

   Alternatively, you can download the `pincode-plugin.js` file from the [GitHub repository](https://github.com/degtev/pin-code-js-plugin) and include it manually in your project.

2. Add the required HTML structure for the pin code input fields:

    ```html
   <div id="pinCodeContainer">
     <input type="text" maxlength="1" />
     <input type="text" maxlength="1" />
     <input type="text" maxlength="1" />
     <input type="text" maxlength="1" />
   </div>
   <button id="buttonClick">Click!</button>
   ```

   Make sure to set the `maxlength` attribute to `1` for each input field.

3. Initialize the plugin with the container element:

```html
<script>
    function onSuccess(pinCode) {
       alert("Your pin code: " + pinCode);
    }
    function onError(pinCode) {
       alert("Please enter the full pin code.");
    }
    PinCodePlugin.init('.pin-code', onSuccess, onError, 'buttonClick');
</script>
```
## Usage

To use the Pin Code Plugin, follow these steps:

1. Create a container element that will hold the pin code input fields.
2. Inside the container, add individual input fields to represent each digit of the pin code. Set the `maxlength` attribute on each input field to `1`.
3. Initialize the plugin by calling the `init()` method and passing the selector for the container element as an argument.
4. Customize the plugin behavior and appearance by modifying the provided methods and CSS styles.

## Methods

The Pin Code Plugin provides the following methods:

- `init(selector, onSuccess, onError, buttonId)`: Initializes the plugin by finding the pin code container element, registering event handlers, and optionally linking to a button for manual submission.

## Events

The Pin Code Plugin triggers the following events:

- `input`: Fired when an input field value changes.
- `paste`: Fired when text is pasted into the container element.
- `keydown`: Fired when a key is pressed down inside an input field.
- `keyup`: Fired when a key is released inside an input field.

## Demo

Check out the live demo of the Pin Code Plugin [here](https://degtev.github.io/pin-code-js-plugin/). 🌐🚀

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please submit a pull request or open an issue in the [GitHub repository](https://github.com/degtev/pin-code-js-plugin). 👍🎁

## License

The Pin Code Plugin is licensed under the [MIT License](LICENSE). 📜💼
