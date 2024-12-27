let res = 0;
let str = "";
let operation = '';

let display = document.querySelector(".display-area");
display.innerHTML = 0;

let expressionArea = document.querySelector(".expression-area");
let actions = document.querySelectorAll("button");

actions.forEach(action => {
    action.onclick = function() {
        expressionArea.innerHTML = "";

        let digit = parseInt(action.innerHTML);

        if (!isNaN(digit) && !(str === "" && digit === 0 && res === 0) && str !== "0") {
            str += digit;
            
        } else if (action.innerHTML === ',' && !str.includes('.')) {
            if (str !== "") {
                str += '.';
            } else {
                str = "0.";
            }

        } else if (action.innerHTML === "DEL" && str !== "") {
            str = str.slice(0, str.length - 1);

        } else if (action.innerHTML === "AC") {
            res = 0;
            str = "";
            operation = '';

        } else if (isOp(action.innerHTML) && parseFloat(str) !== 0) {
            res = (str !== "") ? parseFloat(str) : res;
            str = "";
            operation = action.innerHTML;

        } else if (action.innerHTML === '%') {
            res = ((str !== "") ? parseFloat(str) : res) / 100;
            str = "";

        } else if (action.innerHTML === '=' && str !== '' && operation !== '') {
            let val = parseFloat(str);

            expressionArea.innerHTML = "" + res + operation + val;

            switch (operation) {
                case '÷':
                    res /= val;
                    break;
                case '×': 
                    res *= val;
                    break;
                case '-': 
                    res -= val;
                    break;
                case '+': 
                    res += val;
                    break;
            }

            str = "";
            operation = '';
        }
        
        display.innerHTML = (str !== "") ? str : res;
    };
});

function isOp(op) {
    return ['÷', '×', '-', '+'].includes(op);
}
