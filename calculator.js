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
// Two versions, strings extracted from html, numbers used in calcs. 
let alphaNumber;
let betaNumber;
let operator = "";

let alphaString = "";
let betaString = "";

// These toggles determine which slot is being updated by the user,
// when true, that is the number that can be updated through user input
let alphaToggle = true;
let betaToggle = false;

// This variable keeps track of what the prior button press was
// Default is number, because that is the first thing you enter in a calculator
let priorButton = "number";

const displayValue = document.getElementById("displayContent");
buttons.forEach((button) => {
    button.addEventListener('click', (buttonPress) => {
        let userInput = getInput(buttonPress);
        setMode(userInput);
        updateDisplay();
    })
});


// Takes user input array from getInput, determines which function to run based on button types
// i.e if an operator following a number, run numberOperator() 
function setMode(input) {
    let newButton = input[0];
    let value = input[1];
    // If prior button is a number
    if (priorButton == "number") {
        if (newButton == "number") {
            console.log("number following number");
            priorButton = "number";
            numberNumber(value);
        } else if (newButton == "operator") {
            console.log("operator following number");
            priorButton = "operator";
            numberOperator(value);
        } else if (newButton == "equality") {
            console.log("equality following number");
            numberEquality(value);
        }
    }
    // If prior button is an operator
    if (priorButton == "operator") {
        if (newButton == "number") {
            console.log("number following operator");
            priorButton = "number";
            operatorNumber(value);
        } else if (newButton == "operator") {
            console.log("operator following operator");
            priorButton = "operator";
            operatorOperator(value);
        } else if (newButton == "equality") {
            console.log("equality following operator");
            operatorEquality(value);
        }
    }
    // If prior button is an equality
    if (priorButton == "equality") {
        if (newButton == "number") {
            console.log("number following equality");
            priorButton = "number";
            equalityNumber(value);
        } else if (newButton == "operator") {
            console.log("operator following equality");
            priorButton = "operator";
            equalityOperator(value);
        } else if (newButton == "equality") {
            console.log("equality following equality");
            equalityEquality(value);
        }
    }
}

// ****** PRIOR = NUMBER ******

// Number following number
function numberNumber(input) {
    if (alphaToggle) {
        console.log("Updating alpha slot");
        alphaString += input;

    }
    else if (betaToggle) {
        console.log("Updating beta slot");
        betaString += input;
    }
}

// Takes input from setMode, updates display div for user
// NEED TO INCORPORATE RESULTS HERE AS WELL
function updateDisplay() {
    if (alphaToggle) displayValue.textContent = alphaString;
    else if (betaToggle) displayValue.textContent = betaString;
}


// Operator following number
function numberOperator(input) {

}

// Equality following number
function numberEquality(input) {

}

// ****** PRIOR = OPERATOR ******

// Number following operator
function operatorNumber(input) {

}

// Operator following operator
function operatorOperator(input) {

}

// Equality following operator
function operatorEquality(input) {

}

// ****** PRIOR = EQUALITY ******

// Number following equality
function equalityNumber(input) {

}

// Operator following equality
function equalityOperator(input) {

}

// Equality following equality
function equalityEquality(input) {

}







// getInput takes a mouse click, and returns an array with [buttonType, buttonValue]
function getInput(event) {
    let type = "";
    let value = "";
    let buttonClass = event.target.classList;
    if (buttonClass.contains("number")) {
        let buttonValueString = event.path[0].textContent;
        type = "number";
        value = buttonValueString;
    } else if (buttonClass.contains("operator")) {
        type = "operator";
        value = event.target.id;
    } else if (buttonClass.contains("equality")) {
        type = "equality";
        value = event.target.id;
    } else if (buttonClass.contains("inputControl")) {
        type = "inputControl";
        value = event.target.id;
    }
    let returnArray = [type, value];
    return returnArray;
}





//     button.addEventListener('click', (event) => {
//         // console.log(event);
//         let buttonClass = event.target.classList;
//         // If the button clicked was a number
//         if (buttonClass.contains("number")) {
//             let buttonValueString = event.path[0].textContent;
//             // If alpha is active
//             if (alphaToggle) {
//                 console.log("alpha is active");
//                 alphaString += buttonValueString;
//                 displayValue.textContent = alphaString;
//             }
//             // If beta is active
//             if (betaToggle) {
//                 betaString += buttonValueString;
//                 console.log(buttonValueString);
//                 displayValue.textContent = betaString;
//             }
//         }
//         // If the button clicked was an operator
//         if (buttonClass.contains("operator")) {
//             operator = event.target.id;
//             alphaNumber = Number(alphaString);
//             betaNumber = Number(betaString);
//             // If only alpha available, unlock beta and enable user input
//             if (alphaNumber && !betaNumber) {
//                 alphaToggle = !alphaToggle;
//                 betaToggle = !betaToggle;
//             }
//         }
//         // If the button clicked was "="
//         if (buttonClass.contains("equality")) {
//             alphaNumber = Number(alphaString);
//             betaNumber = Number(betaString);
//             // If everything required for calculation is provided, run calc
//             if (alphaNumber && betaNumber && operator) {
//                 let numberInputs = [alphaNumber, betaNumber];
//                 result = window[operator].apply(null, numberInputs);
//                 console.log(result);
//                 displayValue.textContent = result;
//                 alphaString = result.toString();
//                 betaString = "";
//                 alphaToggle = false;
//                 betaToggle = true;
//             }
//         }
//     })
// })
