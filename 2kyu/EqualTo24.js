// https://www.codewars.com/kata/574e890e296e412a0400149c/train/javascript

/**
 * 数字 4
 * 运算符 3
 * 括号 4
 */

const operator = ['+', '-', '*', '/'];
const bracketsDic = [
	'(a {0} b) {1} c {2} d',
	'(a {0} b {1} c) {2} d',
	'a {0} (b {1} c) {2} d',
	'a {0} (b {1} c {2} d)',
	'a {0} (b {1} (c {2} d))',
	'a {0} b {1} (c {2} d)',
	'(a {0} b) {1} (c {2} d)',
]

function equalTo24(a, b, c, d) {
	const base = [a + '!', b + '@', c + '#', d + '$'];

	let result = [
		base
	];

	for (let i = 1; i < base.length; i++) {
		result[i] = [];

		for (let n = 0; n < operator.length; n++) {
			const pre = result[i - 1];

			pre.forEach(ele => {
				const used = ele.split(' ');
				const usable = base.filter(b => !used.find(use => use == b));

				usable.forEach(u => {
					result[i].push(ele + ' ' + operator[n] + ' ' + u);
				})
			});
		}
	}

	let resultStr = '';

	result = result[result.length - 1].find((ele, index) => {
		ele = ele.replace('!', '').replace('@', '').replace('#', '').replace('$', '');

		if (eval(ele) == 24) {
			resultStr = ele.replace(/ /g, '');
			return true;
		}
		return bracketsDic.find(e => {
			const tmp = ele.split(' ');
			const str = e.replace('a', tmp[0])
				.replace('b', tmp[2])
				.replace('c', tmp[4])
				.replace('d', tmp[6])
				.replace('{0}', tmp[1])
				.replace('{1}', tmp[3])
				.replace('{2}', tmp[5])

			console.log(str);

			if (eval(str) == 24) {
				resultStr = str.replace(/ /g, '');
				return true;
			}
		})
	})

	return resultStr || "It's not possible!";
}

function calculate(str) {
	resultStr = '';

	ele = ele.replace('!', '').replace('@', '').replace('#', '').replace('$', '');

	if (eval(ele) == 24) {
		return resultStr = ele.replace(/ /g, '');
	}
	bracketsDic.forEach(e => {
		const tmp = ele.split(' ');
		const str = e.replace('a', tmp[0])
			.replace('b', tmp[2])
			.replace('c', tmp[4])
			.replace('d', tmp[6])
			.replace('{0}', tmp[1])
			.replace('{1}', tmp[3])
			.replace('{2}', tmp[5])

		if (eval(str) == 24) {
			return resultStr = str.replace(/ /g, '');
		}
	})

	return resultStr;
}

// 2*(13-(7/7))
console.log(equalTo24(2,3,4,5))