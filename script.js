window.onload = function() {
    var input = document.getElementById("inputBox");
    var container = document.getElementById("container");

    // Event listener for button clicks
    container.addEventListener("click", function(e) {
        if (e.target.tagName === "INPUT") {
            buttonClick(e.target.id);
        }
    });

    var calc = document.getElementById("Button=");
    calc.addEventListener("click", calculate);

    var C = document.getElementById("ButtonC");
    C.addEventListener("click", erase);

    var backspace = document.getElementById("Button%");
    backspace.addEventListener("click", applyPercentage);

    function buttonClick(buttonId) {
        if (buttonId !== "ButtonC" && buttonId !== "Button=" && buttonId !== "Button%") {
            var s = buttonId.replace("Button", "");

            // Convert 'x' to '*' for multiplication
            if (s === "x") s = "*";

            // Prevent multiple consecutive operators
            if (isOperator(s) && isOperator(input.value.slice(-1))) return;

            // Prevent invalid starting characters
            if (input.value.length === 0 && ["*", "/", "+", "%"].includes(s)) return;

            // Prevent multiple decimals in a single number
            if (s === "." && lastNumberHasDecimal(input.value)) return;

            entries(s);
        }
    }

    function entries(s) {
        input.value += s;
    }

    function calculate() {
        try {
            if (input.value === "." || input.value.length === 0) {
                alert("Please enter a valid mathematical expression.");
                return;
            }

            let expression = input.value;

            // Securely evaluate the expression
            let result = new Function("return " + expression)();
            input.value = result !== undefined ? result : "";
        } catch {
            alert("Invalid Expression");
            erase();
        }
    }

    function erase() {
        input.value = "";
    }

    function applyPercentage() {
        let expression = input.value;

        if (expression.length === 0 || isOperator(expression.slice(-1))) {
            alert("Invalid percentage usage");
            return;
        }

        let lastNumberMatch = expression.match(/(\d+(\.\d+)?)$/);
        if (lastNumberMatch) {
            let lastNumber = parseFloat(lastNumberMatch[0]);
            let percentageValue = lastNumber / 100;
            input.value = expression.replace(/(\d+(\.\d+)?)$/, percentageValue);
        }
    }

    function isOperator(char) {
        return ["+", "-", "*", "/", "%"].includes(char);
    }

    function lastNumberHasDecimal(expression) {
        var parts = expression.split(/[\+\-\*\/\%]/);
        return parts[parts.length - 1].includes(".");
    }
};  