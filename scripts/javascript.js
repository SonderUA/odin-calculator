let DIGITS = "0123456789";
let OPERATORS = "+-*/=Enter";
let LAST_DIGITS = 5;

let calculator = {
	PI: 3.1415,
	a: 0,
	operator: "",
	b: 0,
	add(a, b) {
		return +a + +b;
	},
	subtract(a, b) {
		return +a - +b;
	},
	multiply(a, b) {
		return +a * +b;
	},
	divide(a, b) {
		return +a / +b;
	},
};

function operate(string) {
	if (!string) {
		alert("No input provided");
		throw new Error("No input provided");
	}
	let [firstNum, operator, secondNum] = string.split(" ");
	switch (operator) {
		case "+":
			return calculator.add(firstNum, secondNum);
		case "-":
			return calculator.subtract(firstNum, secondNum);
		case "/":
			return calculator.divide(firstNum, secondNum);
		case "*":
			return calculator.multiply(firstNum, secondNum);
	}
}

function runOperator(event, keyboardInput = false) {
	if (calculator.a) {
		if (!calculator.b) {
			calculator.b = input.textContent;
			input.textContent =
				Math.round(
					(operate(
						`${calculator.a} ${calculator.operator} ${calculator.b}`
					) +
						Number.EPSILON) *
						10 ** LAST_DIGITS
				) /
				10 ** LAST_DIGITS;
			calculator.a = 0;
			calculator.b = 0;
		}
	} else {
		calculator.a = input.textContent;
		input.textContent = "";
	}
	if (keyboardInput ? event.key.toLowerCase() : event.target.id !== "enter")
		calculator.operator = keyboardInput
			? event.key === "Enter"
				? "="
				: event.key
			: event.target.textContent;
}

let input = document.querySelector("#inputField");
const keys = document.querySelectorAll(".key");
const operators = document.querySelectorAll(".operator");
for (let key of keys) {
	key.addEventListener("click", (event) => {
		if (event.target.id === "clear") {
			calculator.a = 0;
			calculator.b = 0;
			input.textContent = "";
		} else if (DIGITS.includes(event.target.textContent)) {
			input.textContent += event.target.textContent;
		}
		event.target.blur();
	});
}

document.addEventListener("keydown", (event) => {
	if (!event.repeat && DIGITS.includes(event.key)) {
		input.textContent += event.key;
	} else if (event.key === "Escape") {
		calculator.a = 0;
		calculator.b = 0;
		input.textContent = "";
	} else if (OPERATORS.includes(event.key)) {
		runOperator(event, (keyboardInput = true));
	}
});

for (let operator of operators) {
	operator.addEventListener("click", (event) => {
		runOperator(event);
	});
}
