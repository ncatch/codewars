// 未解决
// https://www.codewars.com/kata/5a5032f4fd56cb958e00007a/train/javascript

var tvRemote = function (word) {
	// Your code here
	const dic = 'abcde123fghij456klmno789pqrst.@0uvwxyz_/';

	const getPoint = (char) => {
		const tmp = dic.indexOf(char) + 1;

		const col = parseInt(tmp / 8);
		let row = tmp % 8;

		return [col, row - 1]
	}

	let result = 0;
	let oldPoint = [0, 0];
	for (const char of word) {
		const tmpPoint = getPoint(char);

		result += Math.abs(tmpPoint[0] - oldPoint[0]) + Math.abs(tmpPoint[1] - oldPoint[1]) + 1

		oldPoint = tmpPoint;
	}

	return result;
}


console.log(tvRemote("a/a/a/a/"), 16);

// console.log(tvRemote("does"), 16);
// console.log(tvRemote("your"), 23);
// console.log(tvRemote("solution"), 33);
// console.log(tvRemote("work"), 20);
// console.log(tvRemote("for"), 12);
// console.log(tvRemote("these"), 27);
// console.log(tvRemote("words"), 25);