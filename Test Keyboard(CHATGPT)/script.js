const inputField = document.getElementById('inputField');
const keys = document.querySelectorAll('.key');
const backspaceKey = document.getElementById('backspace');
const spaceKey = document.getElementById('space');
const Word = document.getElementById('Word');

let wordsList = []; // Initialize an empty array for words

// Function to load the dictionary
async function loadDictionary() {
    try {
        const response = await fetch('./dictionary.txt');
        const text = await response.text(); // Read the file as text
        wordsList = text.split('\n').map(word => word.trim()); // Split lines and trim spaces

        // Set the first random word after loading
        if (wordsList.length > 0) {
            setRandomWord();
        } else {
            console.error('Dictionary is empty.');
        }
    } catch (error) {
        console.error('Error loading dictionary:', error);
    }
}

// Function to set a random word in the Word element
function setRandomWord() {
    if (wordsList.length > 0) {
        const randomIndex = Math.floor(Math.random() * wordsList.length);
        Word.textContent = wordsList[randomIndex]; // Update Word's content
    } else {
        Word.textContent = 'No words available'; // Handle empty dictionary
    }
}

// Add event listeners for each key
keys.forEach(key => {
    key.addEventListener('click', () => {
        inputField.value += key.textContent; // Append key to the input field

        // Check if input matches the Word (trim and case-insensitive comparison)
        if (inputField.value.trim().toLowerCase() === Word.textContent.trim().toLowerCase()) {
            setRandomWord(); // Set a new random word
            inputField.value = ''; // Clear the input field
        }
    });
});

// Backspace key functionality
backspaceKey.addEventListener('click', () => {
    inputField.value = inputField.value.slice(0, -1); // Remove the last character
});

// Spacebar functionality
spaceKey.addEventListener('click', () => {
    inputField.value += ' '; // Add a space to the input field
});

// Load the dictionary when the script runs
loadDictionary();
