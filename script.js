class Calculation {
	constructor() {
		const display = document.querySelector('#display');
		this.formula = '';
	}

	addDigit(digit) {
		display.innerText += digit;
		this.formula += digit;
		console.log(this.formula);
	}

	addOperation(operation) {
		display.innerText = "";

		//check if last input already was an operation
		if ('+-*/'.includes(this.formula.charAt(this.formula.length - 1))) {
			this.formula = this.formula.replace(/.$/,operation);
		}
		else {
			this.formula += operation;
		}
		console.log(this.formula);
	}

	solve() {
		var solution = Function('"use strict"; return ' + this.formula)();
		display.innerText = solution;
		this.formula = solution.toString();
		
		console.log(this.formula);
	}
	clear() {
		display.innerText = '';
		this.formula = '';
		console.log(this.formula);
	}
}
var calculation = new Calculation();


const digitButtons = document.querySelectorAll('#button_1, #button_2, #button_3, #button_4, #button_5, #button_6, #button_7, #button_8, #button_9, #button_0');
digitButtons.forEach((button) => {
	button.addEventListener('click', () => {
		calculation.addDigit(button.innerText);
	});
});

const operatorButtons = document.querySelectorAll('#add, #subtract, #multiply, #divide');
operatorButtons.forEach((button) => {
	button.addEventListener('click', () => {
		calculation.addOperation(button.innerText);
	});
});

const solveButton = document.querySelector('#solve');
solveButton.addEventListener('click', () => {
	calculation.solve();
});

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', () => {
	calculation.clear();
});
