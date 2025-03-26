const displayText = document.getElementById('displayText');
const inputBox = document.getElementById('inputBox');
const timerEl = document.getElementById('timer');
const wpmEl = document.getElementById('wpm');
const accuracyEl = document.getElementById('accuracy');
const startBtn = document.getElementById('startBtn');

let timer;
let timeLeft = 60;
let startTime;
let totalTyped = 0;
let correctChars = 0;
let currentText = "";

function generateText() {
    const words = ["the", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog", "javascript", "is", "a", "versatile", "programming", "language", "coding", "challenges", "improve", "your", "problem", "solving", "skills", "typing", "fast", "requires", "practice", "and", "patience", "developing", "projects", "can", "boost", "your", "confidence", "and", "knowledge"];
    const wordCount = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
    let text = [];
    for (let i = 0; i < wordCount; i++) {
        text.push(words[Math.floor(Math.random() * words.length)]);
    }
    return text.join(' ');
}

function startTest() {
    reset();
    currentText = generateText();
    displayText.innerText = currentText;
    inputBox.disabled = false;
    inputBox.focus();
    startTime = new Date().getTime();
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timerEl.innerText = timeLeft;
    } else {
        endTest();
    }
}

function reset() {
    timeLeft = 60;
    totalTyped = 0;
    correctChars = 0;
    inputBox.value = "";
    timerEl.innerText = timeLeft;
    wpmEl.innerText = 0;
    accuracyEl.innerText = 100;
    clearInterval(timer);
}

function endTest() {
    inputBox.disabled = true;
    clearInterval(timer);
    const timeTaken = (new Date().getTime() - startTime) / 1000 / 60;
    const wpm = Math.round((correctChars / 5) / timeTaken);
    wpmEl.innerText = wpm;
}

inputBox.addEventListener('input', () => {
    const enteredText = inputBox.value;
    totalTyped = enteredText.length;
    correctChars = 0;

    for (let i = 0; i < enteredText.length; i++) {
        if (enteredText[i] === currentText[i]) {
            correctChars++;
        }
    }

    const accuracy = Math.round((correctChars / totalTyped) * 100) || 0;
    accuracyEl.innerText = accuracy;

    if (enteredText === currentText) {
        endTest();
    }
});

inputBox.addEventListener('paste', (e) => {
    e.preventDefault();
});

startBtn.addEventListener('click', startTest);