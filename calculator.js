// ***** STYLING *****
// Set up overall calculator layout 
const calculator = document.getElementById("calculator");
const calculatorSize = 480;
calculator.style.setProperty("width", calculatorSize + "px");
calculator.style.setProperty("height", calculatorSize + "px");

// Button highlight effect when clicked
const buttons = Array.from(document.querySelectorAll('.button'));
buttons.forEach(button => button.addEventListener('mousedown', (button) => {
    if (button.path[0].classList.contains("number")) {
        button.path[0].classList.toggle("numberHighlight");
    } else if (button.path[0].classList.contains("inputControl")) {
        button.path[0].classList.toggle("inputHighlight");
    } else if (button.path[0].classList.contains("orangeSquare")) {
        button.path[0].classList.toggle("orangeSquareHighlight");
    }
}));
buttons.forEach(button => button.addEventListener('mouseup', (button) => {
    if (button.path[0].classList.contains("number")) {
        button.path[0].classList.toggle("numberHighlight");
    } else if (button.path[0].classList.contains("inputControl")) {
        button.path[0].classList.toggle("inputHighlight");
    } else if (button.path[0].classList.contains("orangeSquare")) {
        button.path[0].classList.toggle("orangeSquareHighlight");
    }
}));

// ***** MATH FUNCTIONS *****

function add(first, second) {
    return first + second;
}

function subtract(first, second) {
    return first - second;
}

function multiply(first, second) {
    return first * second;
}

function divide(first, second) {
    return first / second;
}

// function operate(operation, first, second) {
//     return operation(first, second);
// }

// ***** FUNCTIONALITY *****

// alpha and beta are the two slots to hold number input from user,
// operator holds the (*,/,+,-) chosen by user
// Two versions, number for 
let alphaNumber;
let betaNumber;
let operator = "";

let alphaString = "";
let betaString = "";

// These toggles determine which slot is being updated by the user,
// when true, that is the number that can be updated through user input
let alphaToggle = true;
let betaToggle = false;


const displayValue = document.getElementById("displayContent");
buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
        // console.log(event);
        let buttonClass = event.target.classList;
        // If the button clicked was a number
        if (buttonClass.contains("number")) {
            let buttonValueString = event.path[0].textContent;
            // If alpha is active
            if (alphaToggle) {
                alphaString += buttonValueString;
                displayValue.textContent = alphaString;
            }
            // If beta is active
            else if (betaToggle) {
                betaString += buttonValueString;
                displayValue.textContent = betaString;
            }
        }
        // If the button clicked was an operator
        if (buttonClass.contains("operator")) {
            operator = event.target.id;
            alphaNumber = Number(alphaString);
            betaNumber = Number(betaString);
            // If everything required for calculation is provided, run calc
            if (alphaNumber && betaNumber && operator) {
                // ADD RESULT
                displayValue.textContent = result;
                alphaNumber = betaNumber;
                betaNumber = undefined;
            }
            // If only alpha available, unlock beta and enable user input
            if (alphaNumber && !betaNumber) {
                alphaToggle = !alphaToggle;
                betaToggle = !betaToggle;
            }
        }
        // If the button clicked was "="
        if (buttonClass.contains("equality")) {
            alphaNumber = Number(alphaString);
            betaNumber = Number(betaString);
            // If everything required for calculation is provided, run calc
            if (alphaNumber && betaNumber && operator) {
                let numberInputs = [alphaNumber, betaNumber];
                let result = window[operator].apply(null, numberInputs);
                displayValue.textContent = result;
                alphaNumber = result;
                alphaToggle = !alphaToggle;
                betaToggle = !betaToggle;
            }
        }
    })
});
