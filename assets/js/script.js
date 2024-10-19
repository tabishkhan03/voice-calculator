// Selecting elements
const startButton = document.getElementById('start-button');
const recognizedTextDisplay = document.getElementById('recognized-text');
const calculationResultDisplay = document.getElementById('calculation-result');

// Initialize SpeechRecognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.interimResults = false;
recognition.lang = 'en-US';

// Event Listener for recognition result
recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;

    // Display recognized speech text
    recognizedTextDisplay.textContent = `You said: "${transcript}"`;

    // Perform calculation and show result
    calculate(transcript);
};

// Handle recognition errors
recognition.onerror = (event) => {
    recognizedTextDisplay.textContent = `Error: ${event.error}`;
};

// Start listening on button click
startButton.onclick = () => {
    recognizedTextDisplay.textContent = 'Listening...';
    calculationResultDisplay.style.opacity = 0; // Hide the previous result
    recognition.start();
};

// Safe evaluation of the input math expression
function calculate(input) {
    try {
        // Replace spoken words with operators for better recognition
        input = input.replace(/plus/gi, '+')
                     .replace(/minus/gi, '-')
                     .replace(/times|multiplied by/gi, '*')
                     .replace(/divided by/gi, '/');

        // Evaluate the math expression safely
        const result = eval(input);

        if (isNaN(result) || !isFinite(result)) {
            calculationResultDisplay.textContent = 'Invalid calculation';
        } else {
            calculationResultDisplay.textContent = `Result: ${result}`;
        }

        // Show the result with a smooth transition
        calculationResultDisplay.style.opacity = 1;
    } catch (error) {
        calculationResultDisplay.textContent = 'Invalid calculation';
        calculationResultDisplay.style.opacity = 1;
    }
}
