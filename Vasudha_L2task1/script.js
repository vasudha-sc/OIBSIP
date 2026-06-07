const prevDisplay = document.getElementById('prevDisplay');
const currDisplay = document.getElementById('currDisplay');

let currentOperand = '0';
let previousOperand = '';
let operation = undefined;

function updateDisplay() {
    currDisplay.textContent = currentOperand;
    if (operation != null) {
        let displayOp = operation;
        if (operation === '*') displayOp = '×';
        if (operation === '/') displayOp = '÷';
        prevDisplay.textContent = `${previousOperand} ${displayOp}`;
    } else {
        prevDisplay.textContent = '';
    }
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number.toString();
    } else {
        currentOperand = currentOperand.toString() + number.toString();
    }
    updateDisplay();
}

function clearScreen() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function deleteNumber() {
    if (currentOperand === '0') return;
    currentOperand = currentOperand.toString().slice(0, -1);
    if (currentOperand === '') currentOperand = '0';
    updateDisplay();
}
function appendOperator(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        computeValues();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '0';
    updateDisplay();
}

function computeValues() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            if (current === 0) {
                computation = "Error";
            } else {
                computation = prev / current;
            }
            break;
        case '%':
            computation = prev % current;
            break;
        default:
            return;
    }

    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
}

function calculate() {
    computeValues();
    updateDisplay();
}