/*
 * @Description: https://www.codewars.com/kata/582c1092306063791c000c00/train/javascript
 * @Author: Walker
 * @Date: 2021-06-11 17:22:09
 * @LastEditTime: 2021-06-11 17:24:35
 * @LastEditors: Walker
 */

// 未解决

// 是否连续数字
function isContinuous(numArr, length) {
	return !!numArr.reduce((a, b) => {
		if (a.length === 0) {
			return ''
		}
		if ((a.length == b.length && b - a === 1) || (b - 1 + '').endsWith(a) || (parseInt(a) + 1 + '').startsWith(b)) {
			return b;
		}

		return ''
	})
}

// 按长度切割字符串
function splitNumByLength(numStr, start, len) {
	const result = start ? [numStr.substr(0, start)] : [];

	let tmp = '';

	do {
		tmp = numStr.substr(start, len);

		tmp && result.push(tmp);

		start += len;

	} while (tmp);

	return result
}

function findPosition(num) {
	// 是否连续值 从一位数开始

	const numStr = num;
	const maxLen = numStr.length;

	let result = null;
	let level = 0;
	let start = 0;

	for (let i = 0; i < maxLen; i++) {

		for (let n = 0; n < i; n++) {
			const tmp = splitNumByLength(numStr, n, i);

			if (isContinuous(tmp, n)) {
				if (tmp[0].length < tmp[1].length) {
					result = tmp[1] - 1 + '';
				} else {
					result = tmp[0];
				}
				level = i;
				start = level - tmp[0].length;

				// 跳出循环
				n = i = maxLen;
			}
		}
	}

	if (!result) {
		result = num
	}

	if (result.startsWith('0')) {
		result = '1' + result;
	}

	let count = 0;
	let sum = 0;

	for (let i = 1; i < result.length - 1; i++) {
		count += 9 * Math.pow(10, i);
		sum += 9 * Math.pow(10, i) * (i || 1);
	}

	return sum + (result - count - 1) * result.length + start - level;
}


// console.log(findPosition("456") , 3,"...3456...")
console.log(findPosition("454") , 79,"...444546...")
console.log(findPosition("455"), 98, "...545556...")
console.log(findPosition("910"), 8, "...7891011...")
console.log(findPosition("9100"), 188, "...9899100...")
console.log(findPosition("99100"), 187, "...9899100...")
console.log(findPosition("00101"), 190, "...99100101...")
console.log(findPosition("001"), 190, "...9899100...")
console.log(findPosition("00"), 190, "...9899100...")
console.log(findPosition("123456789"), 0)
console.log(findPosition("1234567891"), 0)
console.log(findPosition("123456798"), 1000000071)
console.log(findPosition("10"), 9)

console.log(findPosition("53635"), 13034)
console.log(findPosition("040"), 1091)

console.log(findPosition("11"), 11)
console.log(findPosition("99"), 168)
console.log(findPosition("667"), 122)
console.log(findPosition("0404"), 15050)
console.log(findPosition("949225100"), 382689688)
console.log(findPosition("58257860625"), 24674951477)
console.log(findPosition("3999589058124"), 6957586376885)
console.log(findPosition("555899959741198"), 1686722738828503)

console.log(findPosition("01"), 10)
console.log(findPosition("091"), 170)
console.log(findPosition("0910"), 2927)
console.log(findPosition("0991"), 2617)
console.log(findPosition("09910"), 2617)
console.log(findPosition("09991"), 35286)