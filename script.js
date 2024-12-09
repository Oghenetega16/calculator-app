numbers = document.querySelectorAll('.number');
display = document.querySelector('#display_screen > h1');
operators = document.querySelectorAll('.operator');
resetBtn = document.querySelector('.reset');
deleteBtn = document.querySelector('.delete');
dotBtn = document.querySelector('.dot');
equalsBtn = document.querySelector('.equals');
const maxDisplayLength = 12;

let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;


// Add event listener to the reset button
resetBtn.addEventListener('click', function() {
    display.innerHTML = 0;
});

// Add event listener to the delete button
deleteBtn.addEventListener('click', function() {
    if (display.innerText.length > 1) {
        display.innerText = display.innerText.slice(0, -1);
        display.innerText = formatNumberWithCommas(display.innerText.replace(/,/g, ''));
    }
    else {
        display.innerHTML = 0;
    }
});

// Add event listener to the dot button
dotBtn.addEventListener('click', function() {
    const currentText = display.innerText;
    if (!currentText.includes('.')) {
        display.innerText += '.';
    }
});

// Add event listener for equals button
equalsBtn.addEventListener('click', calculate);

// Add event listener to the numbers
numbers.forEach(function(number){
    number.addEventListener('click', function (){
        const digit = this.innerHTML;
        appendDigit(digit);
    });
});

// Add event listener for operators' button
operators.forEach(function(operator) {
    operator.addEventListener('click', function (){
        const op = this.innerHTML;
        handleOperator(op);
    });
});

// Function to append digit to the display
function appendDigit(digit) {
    if (waitingForSecondNumber) {
        display.innerText = digit;
        waitingForSecondNumber = false;
    }
    else {
        if (display.innerText === '0') {
            display.innerText = digit;
        }
        else if (display.innerText.length < maxDisplayLength) {
            display.innerText += digit;
            display.innerText = formatNumberWithCommas(display.innerText.replace(/,/g, ''));
        }
    }
}

function formatNumberWithCommas(number) {
    const parts = number.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

// Function to handle operators
function handleOperator(op) {
    if (firstNumber !== null && operator && !waitingForSecondNumber) {
        calculate();
    }

    const firstInput = display.innerText.replace(/,/g, '');
    firstNumber = parseFloat(firstInput);
    operator = op;
    waitingForSecondNumber = true;
}

// Function to calculate the result
function calculate() {
    if (firstNumber === null || !operator) {
        return;
    }

    const secondInput = display.innerText.replace(/,/g, '');
    const secondNumber = parseFloat(secondInput);

    switch (operator) {
        case '+':
            result = firstNumber + secondNumber;
            break;
        case '-':
            result = firstNumber - secondNumber;
            break;
        case 'x':
            result = firstNumber * secondNumber
            break;
        case '/':
            result = firstNumber / secondNumber;
            break;
        default:
            return;
    }

    let resultStr = result.toString()
    if (resultStr.length > maxDisplayLength) {
        resultStr = result.toExponential(6);
        result = resultStr;
    }
    else {
        resultStr = result;
    }

    display.innerText = formatNumberWithCommas(result);
    firstNumber = result;
    operator =  null;
    waitingForSecondNumber = true;
}

const themeToggle = document.querySelectorAll('header ul li');

document.body.classList.add('blue-theme');

themeToggle.forEach(function (theme) {
    theme.addEventListener('click', function(){
        const themeSelected = this.innerText;
        if (themeSelected === '1') {
            if (document.body.classList.contains('gray-theme') || document.body.classList.contains('violet-theme')) {
                document.body.classList.replace('gray-theme', 'blue-theme');
                document.body.classList.replace('violet-theme', 'blue-theme');
                localStorage.setItem('theme', 'blue-theme');
            }
        }

        if (themeSelected === '2') {
            if (document.body.classList.contains('blue-theme') || document.body.classList.contains('violet-theme')) {
                document.body.classList.replace('blue-theme', 'gray-theme');
                document.body.classList.replace('violet-theme', 'gray-theme');
                localStorage.setItem('theme', 'gray-theme');
            }
        }

        if (themeSelected === '3') {
            if (document.body.classList.contains('blue-theme') || document.body.classList.contains('gray-theme')) {
                document.body.classList.replace('blue-theme', 'violet-theme');
                document.body.classList.replace('gray-theme', 'violet-theme');
                localStorage.setItem('theme', 'violet-theme');
            }
        }
    });
});








