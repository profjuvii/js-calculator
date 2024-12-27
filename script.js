let res = 0;
let str = "";
let operation = '';

let display = document.querySelector(".display-area");
display.innerHTML = 0;

let expressionArea = document.querySelector(".expression-area");
let actions = document.querySelectorAll("button");

actions.forEach(action => {
    action.onclick = function() {
        if (action.innerHTML !== "DEL" && !(isOperation(action.innerHTML) && isUndefined(res)
            || action.innerHTML === '%' && isUndefined(res)) && action.innerHTML !== '=') {
            expressionArea.innerHTML = "";
        }

        let digit = parseInt(action.innerHTML);

        if (!isNaN(digit)) {
            str = (str !== "0") ? str + digit : "" + digit;
            
        } else if (action.innerHTML === ',' && !str.includes('.')) {
            str = (str !== "") ? str + '.' : "0.";

        } else if (action.innerHTML === "DEL" && str !== "" && expressionArea.innerHTML === "") {
            str = (str.length > 1) ? str.slice(0, str.length - 1) : "0";

        } else if (action.innerHTML === "AC") {
            res = 0;
            str = "";
            operation = '';

        } else if (isOperation(action.innerHTML) && !(isUndefined(res) && str === "")) {
            res = (str !== "") ? parseFloat(str) : res;
            str = "";
            operation = action.innerHTML;

        } else if (action.innerHTML === '%' && !(isUndefined(res) && str === "")) {
            res = ((str !== "") ? parseFloat(str) : res) / 100;
            str = "";

        } else if (action.innerHTML === '=' && str !== '' && operation !== '') {
            let val = parseFloat(str);

            expressionArea.innerHTML = "" + res + operation + val;

            const operations = {
                '÷': (a, b) => (b !== 0) ? a / b : "Undefined",
                '×': (a, b) => a * b,
                '-': (a, b) => a - b,
                '+': (a, b) => a + b,
            }

            res = operations[operation](res, val);

            str = "";
            operation = '';
        }
        
        display.innerHTML = (str !== "") ? str : res;
    };
});

function isUndefined(val) {
    return val === "Undefined";
}

function isOperation(op) {
    return ['÷', '×', '-', '+'].includes(op);
}
