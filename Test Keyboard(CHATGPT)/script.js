// Select input field and keyboard buttons
const inputField = document.getElementById('inputField');
const keys = document.querySelectorAll('.key');
const backspaceKey = document.getElementById('backspace');
const spaceKey = document.getElementById('space');

// Add event listeners for each key
keys.forEach(key => {
    key.addEventListener('click', () => {
        inputField.value += key.textContent;  // Append key to the input field
    });
});

// Backspace key functionality
backspaceKey.addEventListener('click', () => {
    inputField.value = inputField.value.slice(0, -1);  // Remove last character
});

// Spacebar functionality
spaceKey.addEventListener('click', () => {
    inputField.value += ' ';  // Add space to the input field
});
