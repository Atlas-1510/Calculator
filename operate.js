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

let choice = "add";

let fn = window[choice];

let params = [2, 3];

let result = fn.apply(null, params);

console.log(result);




// let result = operate(choice, 2, 3);

// console.log(result);