const inputField = document.getElementById('inputField');
const keys = document.querySelectorAll('.key');
const backspaceKey = document.getElementById('backspace');
const spaceKey = document.getElementById('space');
const wordDisplay = document.getElementById('Word');
const shiftKey = document.getElementById('shift'); // Define Shift key
const capsLockKey = document.getElementById('capslock'); // Define Caps Lock key
const tabkey = document.getElementById('tab');
const enterkey = document.getElementById('enter');
const errmes = document.getElementById('errmes');
const onek = document.getElementById('1');
const twok = document.getElementById('2');
const thrk = document.getElementById('3');
const fouk = document.getElementById('4');
const fivk = document.getElementById('5');
const sixk = document.getElementById('6');
const sevk = document.getElementById('7');      
const eigk = document.getElementById('8');
const nink = document.getElementById('9');
const zerk = document.getElementById('0');

// Add these new variables
const levelDisplay = document.getElementById('level');
const levelUpBtn = document.getElementById('levelUp');
const levelDownBtn = document.getElementById('levelDown');

let wordsList = []; // Word list for dictionary
let shiftActive = false; // Keeps track of shift key state
let capsLockActive = false; // Keeps track of caps lock state
let currentLevel = 1;
let wordsListByLevel = {
    1: [], // Easy words
    2: [], // Medium words
    3: []  // Hard words
};

async function loadDictionaries() {
    try {
        wordsListByLevel = {
            1: ["cat", "dog", "rat", "hat", "bat"],
            2: ["table", "chair", "house", "phone", "write"],
            3: ["computer", "keyboard", "elephant", "building", "practice"]
        };
        setRandomWord();
    } catch (error) {
        console.error('Error:', error);
        wordDisplay.textContent = 'Error loading words';
    }
}

// Simplified setRandomWord function
function setRandomWord() {
    const words = wordsListByLevel[currentLevel] || [];
    const word = words[Math.floor(Math.random() * words.length)];
    wordDisplay.textContent = word || 'No words available';
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

        if (key === shiftKey || key === capsLockKey || key === tabkey) return;

        if (shiftActive || capsLockActive) {
            keyval = keyval.toUpperCase();
        } else {
            keyval = keyval.toLowerCase();
        }

        if(shiftActive){
            if(key === onek){
                keyval = "!";
            }
        }
        if(shiftActive){
            if(key === twok){
                keyval = "@";
            }
        }
        if(shiftActive){
            if(key === thrk){
                keyval = "#";
            }
        }
        if(shiftActive){
            if(key === fouk){
                keyval = "$";
            }
        }
        if(shiftActive){
            if(key === fivk){
                keyval = "%";
            }
        }
        if(shiftActive){
            if(key === sixk){
                keyval = "^";
            }
        }
        if(shiftActive){
            if(key === sevk){
                keyval = "&";
            }
        }
        if(shiftActive){
            if(key === eigk){
                keyval = "*";
            }
        }
        if(shiftActive){
            if(key === nink){
                keyval = "(";
            }
        }
        if(shiftActive){
            if(key === zerk){
                keyval = ")";
            }
        }
        inputField.value += keyval; 

        if (shiftActive) {
            shiftActive = false;
        }
    });
});

enterkey.addEventListener('click', () => {
    if (inputField.value.trim().toLowerCase() === wordDisplay.textContent.trim().toLowerCase()) {
        setRandomWord();
        inputField.value = '';
    }
});

backspaceKey.addEventListener('click', () => {
    inputField.value = inputField.value.slice(0, -1);
});

spaceKey.addEventListener('click', () => {
    inputField.value += ' ';
});

// Add level control functions
levelUpBtn.addEventListener('click', () => {
    if (currentLevel < 3) {
        currentLevel++;
        updateLevel();
    }
});

levelDownBtn.addEventListener('click', () => {
    if (currentLevel > 1) {
        currentLevel--;
        updateLevel();
    }
});

// Simplified updateLevel function
function updateLevel() {
    currentLevel = Math.max(1, Math.min(3, currentLevel));
    levelDisplay.textContent = currentLevel;
    setRandomWord();
    inputField.value = '';
    errmes.textContent = `Level ${currentLevel}`;
}

// Clean up styles
const styles = `
.level-controls {
    margin: 10px 0;
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: center;
}

.level-controls button {
    padding: 3px 6px;
    font-size: 12px;
    cursor: pointer;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 3px;
}

.level-controls button:hover {
    background: #45a049;
}

.word-display {
    font-size: 24px;
    margin: 100px 0;
    text-align: center;
    font-weight: bold;
    color: #333;
}

#inputField {
    width: 200px;
    height: 30px;
    padding: 5px;
    margin-top: 80px;
}

.top-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin: 60px 0;
}
`;

// Add the styles to the document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

loadDictionaries();
