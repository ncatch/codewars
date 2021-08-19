// https://www.codewars.com/kata/59f6e1af3640ce12510000ad/train/javascript
// NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO!
/**
 * 个位数
 * 1 2 3 4 .... 9
 * 2位数
 * 10 11 12 13 .... 99
 * 33位数
 * 100 101 102 .... 999
 * 
 * 第 100 位
 * 100 - 9 = 91
 * 91 / 2 = 45.5 第45个数字的第一个数
 * 54
 * 
 * 9 * 1 + 99 * 2 + x = 200
 * 
 * (1 * 1)(2 * 2)(3 * 3)....(9 * 9)
 */

 function findDigit(n){
	//coding and coding..

	let length = 0;
	let num = getNumber(length);
	const tmp = [];

	while (n > num) {
		n = n - num;
		tmp.push(num);
		length++;
		num = getNumber(length);
	}

	return tmp[length - 1] + 1 + n / length
}

function getNumber(length) {
	return Math.pow(10, length) - 1;
}

const identity = (n) => n;
const root = Math.sqrt;
const nDigit = (n) => (n === 0 ? 0 : String(n).length);
const smallest = (d, p) => (d === 1 ? 1 : Math.ceil((10 ** (d - 1)) ** (1 / p)));
const amount = (d, p) => smallest(d + 1, p) - smallest(d, p);
const getNumberByIndex = (i, p) => {
    let remain = i + 1, k;
    for (k = 1;; k++) {
        let sd = amount(k, p) * k;
        if (remain - sd <= 0) break;
        remain -= sd;
    }
    let n = smallest(k, p) + Math.floor((remain - 1) / k);
    remain -= (n - smallest(k, p)) * k;
    if (('' + n ** p).length === remain && n ** p > (1<<30)) return ((n % 10) ** 2) % 10;
    return +('' + n ** p)[remain - 1];
};

let str = '';
let str2 = '';
for (let index = 1; index < 100; index++) {
	str += index + '';
	str2 += index * index + '';
}

console.log(str.substr(102, 3))

console.log(getNumberByIndex(102, 1));
console.log(findDigit(102));
