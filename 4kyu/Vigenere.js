/*
 * @Description: https://www.codewars.com/kata/52d1bd3694d26f8d6e0000d3/train/javascript
 * @Author: Walker
 * @Date: 2021-05-24 14:19:15
 * @LastEditTime: 2021-05-24 14:22:42
 * @LastEditors: Walker
 */
// 已解决

function VigenèreCipher(key, abc) {
	this.encode = function (str) {
		const tmp = str.split('')
		const keys = key.split('')
		const result = []
		let index = 0

		tmp.forEach((e, i) => {
			if (index % keys.length === 0) {
				index = 0
			}

			if (abc.indexOf(e.toLocaleLowerCase()) < 0) {
				result.push(e)
			} else {
				const tmpIndex = abc.indexOf(e.toLocaleLowerCase()) + abc.indexOf(keys[index])
				result.push(abc.substr(tmpIndex >= abc.length ? tmpIndex - abc.length : tmpIndex, 1) || e)
			}
			index++
		})
		return result.join('')
	};
	this.decode = function (str) {
		const tmp = str.split('')
		const keys = key.split('')
		const result = []
		let index = 0

		tmp.forEach((e, i) => {
			if (index % keys.length === 0) {
				index = 0
			}

			if (abc.indexOf(e.toLocaleLowerCase()) < 0) {
				result.push(e)
			} else {
				const tmpIndex = abc.indexOf(e.toLocaleLowerCase()) - abc.indexOf(keys[index])
				result.push(abc.substr(tmpIndex < 0 ? tmpIndex + abc.length : tmpIndex, 1) || e)
			}
			index++
		})
		return result.join('')
	};
}

var alphabet = 'abcdefghijklmnopqrstuvwxyz';
var key = 'password';

// creates a cipher helper with each letter substituted
// by the corresponding character in the key
var c = new VigenèreCipher(key, alphabet);

c.encode('codewars'); // returns 'rovwsoiv'
c.decode('laxxhsj');  // returns 'waffles'