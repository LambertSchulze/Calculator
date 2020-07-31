class Calculation {
	constructor(formula, displayText) {
		const display = document.querySelector('#display');
		this.formula = formula;
		this.displayText = displayText;
	}

	addDigit(digit) {
		this.displayText += digit;
		this.formula += digit;
		display.innerHTML = this.displayText;
	}

	addOperation(operation) {
		//check if last input already was an operation
		if ('+-*/.'.includes(this.formula.charAt(this.formula.length - 1))) {
			return;
		}
		else {
			if (operation == '.') {
				//check if number already has a decimal point
				if (this.displayText.split(" ").pop().includes(".")) {
					return;
				}

				this.displayText += operation;
			}
			else {
				this.displayText += ' ' + operation + ' ';
			}
			this.formula += operation;
			display.innerHTML = this.displayText;
		}
	}

	solve() {
		while (this.formula.charAt(0) === '0') {
			this.formula = this.formula.substr(1);
		}
		var solution = Function('"use strict"; return ' + this.formula)();
		this.displayText += ' = ' + solution + '<br>' + solution;
		this.formula = solution.toString();
		display.innerHTML = this.displayText;
	}

	delete() {
		if (this.displayText.slice(-4) != '<br>') {
			this.displayText = this.displayText.slice(0, -1);
			this.formula = this.formula.slice(0, -1);
			display.innerHTML = this.displayText;
		}
	}

	clear() {
		this.formula = '';
		this.displayText = '';
		display.innerHTML = this.displayText;
	}
}
var calculation = new Calculation('', '');


const digitButtons = document.querySelectorAll('#button_1, #button_2, #button_3, #button_4, #button_5, #button_6, #button_7, #button_8, #button_9, #button_0');
digitButtons.forEach((button) => {
	button.addEventListener('click', () => {
		calculation.addDigit(button.innerText);
	});
});

const operatorButtons = document.querySelectorAll('#add, #subtract, #multiply, #divide, #decimal');
operatorButtons.forEach((button) => {
	button.addEventListener('click', () => {
		calculation.addOperation(button.innerText);
	});
});

const solveButton = document.querySelector('#solve');
solveButton.addEventListener('click', () => {
	calculation.solve();
});

const deleteButton = document.querySelector('#delete');
deleteButton.addEventListener('click', () => {
	calculation.delete();
});

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', () => {
	calculation.clear();
});

function keyPress(event) {
	if ('1234567890'.includes(event.key)) {
		calculation.addDigit(event.key);
	}
	else if ('+-*/.'.includes(event.key)) {
		calculation.addOperation(event.key);
	}
	else if (event.key == '=') {
		calculation.solve();
	}
	else if (event.key == 'Backspace') {
		calculation.delete();
	}
	else if (event.key == 'Escape') {
		calculation.clear();
	}
	console.log(event);
}
window.addEventListener('keydown', keyPress, false);