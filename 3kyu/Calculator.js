// 已解决
// https://www.codewars.com/kata/5235c913397cbf2508000048/train/javascript

const Calculator = function () {
	this.evaluate = string => {
		return this.calculate(this.brackets(string));
	}

	this.calculate = string => {
		let all = string.split(' ');

		let condition = true;

		do {
			let index = all.findIndex(e => e == '/' || e == '*');
			if (index < 0) {
				index = all.findIndex(e => e == '+' || e == '-');
			}

			if (index > 0) {
				all = this.handler(all, index);
			} else {
				condition = false;
			}
		} while (condition);

		return all[0];
	}

	this.handler = (arr, index) => {
		const a = arr[index - 1];
		const b = arr[index + 1];
		const handler = arr[index];

		let result;

		switch (handler) {
			case '+':
				result = this.add(a, b);
				break;
			case '-':
				result = this.sub(a, b);
				break;
			case '*':
				result = this.multiply(a, b);
				break;
			case '/':
				result = this.division(a, b);
				break;
		}

		arr[index + 1] = result;
		arr.splice(index - 1, 2);

		return arr;
	}

	this.brackets = string => {
		const reg = new RegExp(/\([0-9, ,+,\-,*,/]*\)/g);

		let condition = true;

		do {
			const tmp = string.match(reg);

			if (tmp) {
				tmp.forEach(ele => {
					string = string.replace(ele, this.calculate(ele.substr(1, ele.length - 2)));
				});
			} else {
				condition = false;
			}
		} while (condition);

		return string;
	}

	this.add = (a, b) => parseFloat(a) + parseFloat(b);
	this.sub = (a, b) => a - b;
	this.multiply = (a, b) => a * b;
	this.division = (a, b) => a / b;
};


const calculate = new Calculator();

// console.log(calculate.evaluate('127'), 127);
// console.log(calculate.evaluate('2 + 3'), 5);
// console.log(calculate.evaluate('2 - 3 - 4'), -5);
// console.log(calculate.evaluate('10 * 5 / 2'), 25);
console.log(calculate.evaluate('10 * ( 5 / ( 2 + 3 ) )'), 10);
// console.log(calculate.evaluate('2 / 2 + 3 * 4 - 6'), 7);
// console.log(calculate.evaluate('13 / 31 + 77 / 54 - 81 / 2 * 59'), -2388.5);
// console.log(calculate.evaluate('26 * 18 / 67 * 6 / 64 - 11 + 45 / 61 - 34'), -43.60744433569856);