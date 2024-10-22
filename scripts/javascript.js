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
