// https://www.codewars.com/kata/574e890e296e412a0400149c/train/javascript

/**
 * 数字 4
 * 运算符 3
 * 括号 4
 */

const operator = ['+', '-', '*', '/'];
const bracketsDic = [
	'(a{0}b){1}c{2}d',
	'(a{0}b{1}c){2}d',
	'a{0}(b{1}c){2}d',
	'a{0}(b{1}c{2}d)',
	'a{0}(b{1}(c{2}d))',
	'a{0}b{1}(c{2}d)',
	'(a{0}b){1}(c{2}d)',
]

function equalTo24(a, b, c, d) {
	const base = ['a', 'b', 'c', 'd'];

	let result = [
		base
	];

	for (let i = 1; i < base.length; i++) {
		result[i] = [];

		for (let n = 0; n < operator.length; n++) {
			const pre = result[i - 1];

			pre.forEach(ele => {
				const used = ele.split('');
				const usable = base.filter(b => !used.find(use => use == b));

				usable.forEach(u => {
					result[i].push(ele + operator[n] + u);
				})
			});
		}
	}

	let tmpArr = [];

	result[result.length - 1].forEach((ele, index) => {
		return bracketsDic.find(e => {
			const tmp = ele.split('');
			const str = e.replace('{0}', tmp[1])
				.replace('{1}', tmp[3])
				.replace('{2}', tmp[5]);

			tmpArr.push(str)
		})
	})


	const fs = require('fs');

	function handlerStr(str) {
		return str
		.replace('a', a)
		.replace('b', b)
		.replace('c', c)
		.replace('d', d)
	}
	
	fs.writeFile('d:/tmp.txt', JSON.stringify(result[3].concat(tmpArr).map(ele => 'if (eval(\'' + ele + '\') == 24) return handlerStr(\'' + ele + '\');').join('')), function (error) {
		if (error) {
		  console.log('写入失败')
		} else {
		  console.log('写入成功了')
		}
	})
}

// 2*(13-(7/7))
console.log(equalTo24(2, 3, 4, 5))

