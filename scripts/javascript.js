let DIGITS = "0123456789";
let OPERATORS = "+-*/";

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
	console.log(string);
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

let input = document.querySelector("#inputField");
const keys = document.querySelectorAll(".key");
const operators = document.querySelectorAll(".operator");
for (let key of keys) {
	key.addEventListener("click", (event) => {
		if (event.target.id === "clear") {
			input.textContent = "";
		} else if (DIGITS.includes(event.target.textContent)) {
			input.textContent += event.target.textContent;
		}
	});
}

document.addEventListener("keydown", (event) => {
	if (DIGITS.includes(event.key)) {
		input.textContent += event.key;
	} else if (event.key === "Escape") {
		input.textContent = "";
	}
});

for (let operator of operators) {
	operator.addEventListener("click", (event) => {
		if (calculator.a) {
			if (!calculator.b) {
				calculator.b = input.textContent;
				input.textContent = operate(
					`${calculator.a} ${calculator.operator} ${calculator.b}`
				);
				calculator.a = 0;
				calculator.b = 0;
			}
		} else {
			calculator.a = input.textContent;
			input.textContent = "";
		}
		if (event.target.id !== "enter")
			calculator.operator = event.target.textContent;
	});
}
