let DIGITS = "00123456789.π";
let OPERATORS = "+-*/xy";
let SOLO_OPERATORS = ["%", "√", "+/-", "x2"];

let calculator = {
	PI: 3.1415,
	LAST_DIGITS: 14,
	firstNumber: 0,
	operator: "",
	secondNumber: 0,
	power: true,
	round(number) {
		return (
			Math.round((number + Number.EPSILON) * 10 ** this.LAST_DIGITS) /
			10 ** this.LAST_DIGITS
		);
	},
	clear(element, empty = false) {
		element.textContent = empty ? "" : "0";
	},
	clean() {
		this.firstNumber = 0;
		this.secondNumber = 0;
	},
	operate(operator) {
		switch (operator) {
			case "+":
				return this.add();
			case "-":
				return this.subtract();
			case "/":
				return this.secondNumber === "0" ? 0 : this.divide();
			case "*":
				return this.multiply();
			case "xy":
				return this.power();
			case "√":
				return Math.sqrt(+this.firstNumber);
			case "%":
				return +this.firstNumber / 100;
			case "+/-":
				return -this.firstNumber;
			case "x2":
				return +this.firstNumber * +this.firstNumber;
			case "":
				return this.firstNumber;
		}
	},
	calculate(operator, display, element, solo = false) {
		if (calculator.isNumber(display.textContent)) {
			element.textContent = operator === "=" ? this.operator : operator;
			if (this.firstNumber) {
				if (!this.secondNumber && this.secondNumber !== "") {
					this.secondNumber = display.textContent;
					this.clear(display);
					display.textContent = this.round(
						this.operate(this.operator)
					);
					this.clean();
				}
			} else {
				if (solo) {
					this.firstNumber = display.textContent;
					this.clear(display);
					this.operator = operator;
					display.textContent = this.round(
						this.operate(this.operator)
					);
					this.clean();
				} else {
					this.firstNumber = display.textContent;
					this.clear(display);
				}
			}
			this.operator = operator === "=" ? this.operator : operator;
		} else {
			display.textContent === "Infinity"
				? alert("Out of scope: the number is too big")
				: alert("Invalid input: input value is string");
			this.clean();
			this.clear(display);
		}
	},
	add() {
		return +this.firstNumber + +this.secondNumber;
	},
	subtract() {
		return +this.firstNumber - +this.secondNumber;
	},
	multiply() {
		return +this.firstNumber * +this.secondNumber;
	},
	divide() {
		return +this.firstNumber / +this.secondNumber;
	},
	power() {
		return (+this.firstNumber) ** +this.secondNumber;
	},
	powerOff() {
		calculator.power = false;
		reminder.style.display = "none";
		display.style.display = "none";
		input.style.backgroundColor = "rgb(40, 40, 40)";
	},
	powerOn() {
		calculator.power = true;
		calculator.clear(display);
		reminder.style.display = "block";
		display.style.display = "inline";
		input.style.backgroundColor = "rgb(55, 58, 64)";
	},
	isNumber(element) {
		return typeof +element === "number" && isFinite(+element);
	},
};

let input = document.querySelector(".input");
let display = document.querySelector(".content");
let reminder = document.querySelector(".reminder");
const digits = document.querySelectorAll(".key");
const operators = document.querySelectorAll(".operator");

for (let digit of digits) {
	digit.addEventListener("click", (event) => {
		let element = event.target;
		if (DIGITS.includes(element.textContent)) {
			if (!(display.textContent.length === 18)) {
				// Prevent two zeros from being displayed
				if (
					display.textContent === "0" &&
					!["0"].includes(element.textContent)
				) {
					calculator.clear(display, (empty = true));
					display.textContent += element.textContent;
				} else if (display.textContent !== "0") {
					// Prevent two dots from being displayed
					if (
						!(
							(display.textContent.match(/\./g) || []).length ===
							1
						) ||
						element.textContent !== "."
					)
						display.textContent += element.textContent;
				}
			}
		}
		event.target.blur(); // Fix the always active bug on buttons
	});
}

for (let operator of operators) {
	operator.addEventListener("click", (event) => {
		let element = event.target;
		if (OPERATORS.includes(element.textContent)) {
			calculator.calculate(element.textContent, display, reminder);
		} else if (element.textContent === "Enter") {
			calculator.calculate("=", display, reminder);
		} else if (element.textContent === "←") {
			if (display.textContent.length === 1) {
				calculator.clear(display);
			} else {
				display.textContent = display.textContent.slice(
					0,
					display.textContent.length - 1
				);
			}
		} else if (element.textContent === "C") {
			calculator.clear(display);
		} else if (element.textContent === "AC") {
			calculator.power ? calculator.powerOff() : calculator.powerOn();
		} else if (SOLO_OPERATORS.includes(element.textContent)) {
			calculator.calculate(
				element.textContent,
				display,
				reminder,
				(solo = true)
			);
		}
		event.target.blur();
	});
}

document.addEventListener("keydown", (event) => {
	let keyValue = event.key;
	if (OPERATORS.includes(keyValue)) {
		calculator.calculate(keyValue, display, reminder);
	} else if (DIGITS.includes(keyValue)) {
		if (!(display.textContent.length === 18)) {
			if (display.textContent === "0" && !["0"].includes(keyValue)) {
				calculator.clear(display, (empty = true));
				display.textContent += keyValue;
			} else if (display.textContent !== "0") {
				if (
					!((display.textContent.match(/\./g) || []).length === 1) ||
					keyValue !== "."
				)
					display.textContent += keyValue;
			}
		}
	} else if (keyValue === "Enter" || keyValue === "=") {
		calculator.calculate("=", display, reminder);
	} else if (keyValue === "Backspace") {
		if (display.textContent.length === 1) {
			calculator.clear(display);
		} else {
			display.textContent = display.textContent.slice(
				0,
				display.textContent.length - 1
			);
		}
	} else if (keyValue === "Escape") {
		calculator.clear(display);
	} else if (SOLO_OPERATORS.includes(keyValue)) {
		calculator.calculate(keyValue, display, reminder, (solo = true));
	} else if (keyValue === "^") {
		calculator.calculate("xy", display, reminder);
	} else if (keyValue === "Meta") {
		calculator.calculate("+/-", display, reminder, (solo = true));
	}
});
