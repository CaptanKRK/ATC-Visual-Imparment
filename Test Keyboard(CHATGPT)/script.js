const inputField = document.getElementById('inputField');
const keys = document.querySelectorAll('.key');
const backspaceKey = document.getElementById('backspace');
const spaceKey = document.getElementById('space');
const wordDisplay = document.getElementById('Word');
const shiftKey = document.getElementById('shift'); // Define Shift key
const capsLockKey = document.getElementById('capslock'); // Define Caps Lock key

let wordsList = []; // Word list for dictionary
let shiftActive = false; // Keeps track of shift key state
let capsLockActive = false; // Keeps track of caps lock state

async function loadDictionary() {

    try {
        const response = await fetch('./dictionary.txt');
        const text = await response.text();
        wordsList = text.split('\n').map(word => word.trim());

        if (wordsList.length > 0) {
            setRandomWord();
        } else {
            console.error('Dictionary is empty.');
        }
    } catch (error) {
        console.error('Error loading dictionary:', error);
    }
}

function setRandomWord() {
    if (wordsList.length > 0) {
        const randomIndex = Math.floor(Math.random() * wordsList.length);
        wordDisplay.textContent = wordsList[randomIndex];
    } else {
        wordDisplay.textContent = 'No words available';
    }
}

shiftKey.addEventListener('click', () => {
    shiftActive = true; 
});

capsLockKey.addEventListener('click', () => {
    capsLockActive = !capsLockActive; 
});

keys.forEach(key => {
    key.addEventListener('click', () => {
        let keyval = key.textContent.trim();

        if (key === shiftKey || key === capsLockKey) return;

        if (shiftActive || capsLockActive) {
            keyval = keyval.toUpperCase();
        } else {
            keyval = keyval.toLowerCase();
        }

        inputField.value += keyval; 

        if (shiftActive) {
            shiftActive = false;
        }

        if (inputField.value.trim().toLowerCase() === wordDisplay.textContent.trim().toLowerCase()) {
            setRandomWord(); 
            inputField.value = ''; 
        }
    });
});

backspaceKey.addEventListener('click', () => {
    inputField.value = inputField.value.slice(0, -1);
});

spaceKey.addEventListener('click', () => {
    inputField.value += ' ';
});

loadDictionary();
