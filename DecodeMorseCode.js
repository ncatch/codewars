// https://www.codewars.com/kata/54acd76f7207c6a2880012bb/train/javascript

/**
 * 1
 * 1: .
 * 3: -
 * 
 * 0
 * 1: ' '  点和破折号
 * 3: '  ' 字符间
 * 7: '   '单词间
 * 
 */

const MORSE_CODE = {
	'.-': 'A',
	'-...': 'B',
	'-.-.': 'C',
	'-..': 'D',
	'.': 'E',
	'..-.': 'F',
	'--.': 'G',
	'....': 'H',
	'..': 'I',
	'.---': 'J',
	'-.-': 'K',
	'.-..': 'L',
	'--': 'M',
	'-.': 'N',
	'---': 'O',
	'.--.': 'P',
	'--.-': 'Q',
	'.-.': 'R',
	'...': 'S',
	'-': 'T',
	'..-': 'U',
	'...-': 'V',
	'.--': 'W',
	'-..-': 'X',
	'-.--': 'Y',
	'--..': 'Z',
	'-----': '0',
	'.----': '1',
	'..---': '2',
	'...--': '3',
	'....-': '4',
	'.....': '5',
	'-....': '6',
	'--...': '7',
	'---..': '8',
	'----.': '9',
	'.-.-.-': '.',
	'--..--': ',',
	'..--..': '?',
	'.----.': '\'',
	'-.-.--': '!',
	'-..-.': '/',
	'-.--.': '(',
	'-.--.-': ')',
	'.-...': '&',
	'---...': ':',
	'-.-.-.': ';',
	'-...-': '=',
	'.-.-.': '+',
	'-....-': '-',
	'..--.-': '_',
	'.-..-.': '"',
	'...-..-': '$',
	'.--.-.': '@',
	'...---...': 'SOS'
}

var decodeBitsAdvanced = function (bits) {
	console.log(bits)
	
	bits = bits.substring(bits.indexOf(1), bits.lastIndexOf(1) + 1)
	let one = bits.split('0').filter(ele => ele)
	let zero = bits.split('1').filter(ele => ele)

	if (one.length === 0 && zero.length === 0) {
		return ''
	} else if (one.length === 0 || zero.length === 0) {
		return '.'
	}

	let arr = []

	for (let i = 0; i < zero.length; i++) {
		arr.push(one[i])
		arr.push(zero[i])
	}

	arr.push(one[one.length - 1])

	const arrOne = arr.map(ele => ele.length).filter(ele => ele < 3)
	const arrZero = arr.map(ele => ele.length / 3).filter(ele => ele >= 1)

	const speed = arrZero ? arrZero.reduce((a, b) => a + b) / arrZero.length : 1;

	arr = arr.map(ele => {
		const num = ele.length / speed
		const a = Math.abs(num - 1)
		const b = Math.abs(num - 3)

		if (a == b) {
			return '.'
		} else if (b < a) {
			// 3
			if (ele > 0) {
				// 1
				return '-'
			} else {
				if (Math.abs(num - 6) < Math.abs(num - 3)) {
					return '  '
				}
				// 0
				return ' '
			}
		} else {
			// 1
			if (ele > 0) {
				// 1
				return '.'
			} else {
				// 0
				return ''
			}
		}
	}).join('')

	return arr
}


var decodeMorse = function (morseCode) {
	console.log(morseCode)
	// ToDo: Accept dots, dashes and spaces, return human-readable message
	return morseCode.split('  ').map(ele => ele.split(' ').map(ele => MORSE_CODE[ele]).join('')).join(' ')
}

const code = `00000000000111111100000011010001110111000000001110000000000000000001111111011111100001101111100000111100111100011111100000001011100000011111110010001111100110000011111100101111100000000000000111111100001111010110000011000111110010000011111110001111110011111110000010001111110001111111100000001111111101110000000000000010110000111111110111100000111110111110011111110000000011111001011011111000000000000111011111011111011111000000010001001111100000111110111111110000001110011111100011111010000001100001001000000000000000000111111110011111011111100000010001001000011111000000100000000101111101000000000000011111100000011110100001001100000000001110000000000000001101111101111000100000100001111111110000000001111110011111100011101100000111111000011011111000111111000000000000000001111110000100110000011111101111111011111111100000001111110001111100001000000000000000000000000000000000000000000000000000000000000`


console.log(decodeMorse(decodeBitsAdvanced(code)), 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG')