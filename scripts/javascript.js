let calculator = {
	PI: 3.1415,
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

let input = document.querySelector("#inputField");
const keys = document.querySelectorAll(".key");
const operators = document.querySelectorAll(".operator");
for (let key of keys) {
	key.addEventListener("click", (event) => {
		if (event.target.id === "clear") {
			input.textContent = "";
		} else if (event.target.id === "enter") {
			console.log(operate(input.textContent));
		} else {
			input.textContent += event.target.textContent;
		}
	});
}

for (let operator of operators) {
	operator.addEventListener("click", (event) => {
		input.textContent += ` ${event.target.textContent} `;
	});
}
