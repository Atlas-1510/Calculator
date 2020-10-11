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
    } else if (button.path[0].classList.contains("operator")) {
        button.path[0].classList.toggle("operatorHighlight");
    }
}));
buttons.forEach(button => button.addEventListener('mouseup', (button) => {
    if (button.path[0].classList.contains("number")) {
        button.path[0].classList.toggle("numberHighlight");
    } else if (button.path[0].classList.contains("inputControl")) {
        button.path[0].classList.toggle("inputHighlight");
    } else if (button.path[0].classList.contains("operator")) {
        button.path[0].classList.toggle("operatorHighlight");
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

function operate(operation, first, second) {
    return operation(first, second);
}

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
            // If an alpha number has been entered, and now moving to beta number...
            if (alphaToggle && alphaString) {
                alphaNumber = Number(alphaString);
                console.log(`AlphaNumber: ${alphaNumber}`);
                operator = event.target.id;
                alphaToggle = !alphaToggle;
                betaToggle = !betaToggle;
            }
            // If a beta number has been entered
            // If the operator input was "=", and all requirements for a result are provided
            if (buttonClass.contains("equality") && alphaNumber && betaNumber && operator) {

            }


            // If an alpha number and beta number have been entered
            if (betaToggle && betaString) {
                betaNumber = Number(betaString);
                console.log(`BetaNumber: ${betaNumber}`);

            }
        }
    })
});


