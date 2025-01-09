function calculatorApp() {
    let result = 0;
    let currentInput = "";
    let operation = '';

    let display = document.querySelector(".display-area");
    display.innerHTML = 0;

    let expressionArea = document.querySelector(".expression-area");
    let actions = document.querySelectorAll("button");

    const actionsMap = {
        ',': handleDecimal,
        'DEL': handleDelete,
        'AC': resetCalculator,
        '%': handlePercentage,
        '=': handleEquals,
    };

    actions.forEach(action => {
        action.onclick = function() {
            const actionType = action.innerHTML;

            if (actionType !== "DEL" && !((isOperation(actionType) || actionType === '%')
                && isUndefined(result)) && actionType !== '=') {
                expressionArea.innerHTML = "";
            }

            if (isDigit(actionType)) handleDigit(actionType);
            else if (isOperation(actionType)) handleOperation(actionType);
            else if (actionsMap[actionType]) actionsMap[actionType]();
            
            updateDisplay();
        };
    });

    function isDigit(val) {
        return !isNaN(parseInt(val));
    }

    function isUndefined(val) {
        return val === "Undefined";
    }

    function isOperation(op) {
        return ['÷', '×', '-', '+'].includes(op);
    }

    function applyOperation(op, val1, val2) {
        const operations = {
            '÷': (a, b) => (b !== 0) ? a / b : "Undefined",
            '×': (a, b) => a * b,
            '-': (a, b) => a - b,
            '+': (a, b) => a + b,
        }
        return operations[op](val1, val2);
    }

    function handleDigit(digit) {
        currentInput = (currentInput !== "0") ? currentInput + digit : digit;
    }

    function handleDecimal() {
        if (currentInput.includes('.')) return;
        currentInput = (currentInput || '0') + '.';
    }

    function handleDelete() {
        if (!currentInput || expressionArea.innerHTML) return;
        currentInput = (currentInput.length > 1) ? currentInput.slice(0, currentInput.length - 1) : "0";
    }

    function resetCalculator() {
        result = 0;
        currentInput = "";
        operation = '';
    }

    function handlePercentage() {
        if (isUndefined(result) && !currentInput) return;
        result = (currentInput ? parseFloat(currentInput) : result) / 100;
        currentInput = "";
    }

    function handleOperation(op) {
        if (isUndefined(result) && !currentInput) return;
        const value = parseFloat(currentInput);
        
        result = currentInput ? operation ? applyOperation(operation, result, value) : value : result;
        currentInput = "";
        operation = op;
    }

    function handleEquals() {
        if (!currentInput || !operation) return;
        const value = parseFloat(currentInput);

        expressionArea.innerHTML = "" + result + operation + value;

        result = applyOperation(operation, result, value)
        currentInput = "";
        operation = '';
    }

    function updateDisplay() {
        display.innerHTML = currentInput || result;
    }
}

document.addEventListener('DOMContentLoaded', calculatorApp);
