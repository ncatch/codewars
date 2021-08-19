// 已解决
// https://www.codewars.com/kata/585894545a8a07255e0002f1/train/javascript

/**
 * [A, B, C]
 * [D, E, F]
 * [G, H, I]
 * 
 * [5, 7, 5]
 * [7, 8, 7]
 * [5, 7, 5]
 */

const dic = {
	A: {
		B: false,
		C: 'B',
		D: false,
		E: false,
		F: false,
		G: 'D',
		H: false,
		I: 'E',
	},
	B: {
		A: false,
		C: false,
		D: false,
		E: false,
		F: false,
		G: false,
		H: 'E',
		I: false,
	},
	C: {
		A: 'B',
		B: false,
		D: false,
		E: false,
		F: false,
		G: 'E',
		H: false,
		I: 'F',
	},
	D: {
		A: false,
		B: false,
		C: false,
		E: false,
		F: 'E',
		G: false,
		H: false,
		I: false,
	},
	E: {
		A: false,
		B: false,
		C: false,
		D: false,
		F: false,
		G: false,
		H: false,
		I: false,
	},
	F: {
		A: false,
		B: false,
		C: false,
		D: 'E',
		E: false,
		G: false,
		H: false,
		I: false,
	},
	G: {
		A: 'D',
		B: false,
		C: 'E',
		D: false,
		E: false,
		F: false,
		H: false,
		I: 'H',
	},
	H: {
		A: false,
		B: 'E',
		C: false,
		D: false,
		E: false,
		F: false,
		G: false,
		I: false,
	},
	I: {
		A: 'E',
		B: false,
		C: 'F',
		D: false,
		E: false,
		F: false,
		G: 'H',
		H: false,
	},
}


function countPatternsFrom(firstPoint, length) {
	if (length > 9 || length == 0) return 0;

	const pass = [firstPoint];

	return next(pass, length);
}

function next(pass, length) {
	if (pass.length > length) {
		return 0;
	}
	if (pass.length == length) {
		console.log(pass);
		return 1;
	};

	let num = 0;
	const nexts = dic[pass[pass.length - 1]];

	for (const key in nexts) {
		const inc = pass.includes(key);

		if (!inc) {
			if (!nexts[key] || pass.includes(nexts[key])) {
				num += next([...pass, key], length);
			}
		}
	}
	return num;
}

console.log(countPatternsFrom('A', 10), 0);
console.log(countPatternsFrom('B', 1), 1);
console.log(countPatternsFrom('C', 2), 5);
console.log(countPatternsFrom('D', 3), 37);
console.log(countPatternsFrom('E', 4), 256);
console.log(countPatternsFrom('E', 8), 23280);