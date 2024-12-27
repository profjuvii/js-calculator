let str = "";
let res = 0;
let operation = '';

let display = document.querySelector(".display-area");
display.innerHTML = 0;

actions = document.querySelectorAll("button");

actions.forEach(action => {
    action.onclick = function() {
        let digit = parseInt(action.innerHTML);

        if (!isNaN(digit)) {
            str += digit;
            
        } else if (action.innerHTML === ',' && !str.includes(',') && str !== "") {
            str += '.';

        } else if (action.innerHTML === "DEL" && str.length > 0) {
            str = str.slice(0, str.length - 1);

        } else if (action.innerHTML === "AC") {
            res = 0;
            str = "";
            operation = '';

        } else if (isOp(action.innerHTML)) {
            res = (str !== "") ? parseFloat(str) : res;
            str = "";
            operation = action.innerHTML;

        } else if (action.innerHTML === '%') {
            res = ((str !== "") ? parseFloat(str) : res) / 100;
            str = "";

        } else if (action.innerHTML === '=' && str !== '' && operation !== '') {
            let val = parseFloat(str);

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
