/*
 * @Description: https://www.codewars.com/kata/insane-coloured-triangles
 * @Author: Walker
 * @Date: 2021-06-03 15:11:30
 * @LastEditTime: 2021-06-11 17:17:02
 * @LastEditors: Walker
 */
// 未搞懂

// convert a number to base 3
// and returns the number of digits
function conv_base_3(n, max, out = []) {
	var i = 0;
	while (i < max && n > 0) {
		out[i] = n % 3;
		n = parseInt(n / 3);
		i++;
	}
	return i;
}
// calculate the binomial coefficient for n < 3
function binom_max_2(n, k) {
	if (n < k)
		return 0;
	switch (n) {
		case 0:
		case 1:
			return 1;
		case 2:
			return 1 + (k == 1);

			// shouldn't happen
		default:
			return 0;
	}
}

// Lucas's theorem for p = 3
function lucas_3(len_n, dig_n, len_k, dig_k) {
	// use modulo product rule:
	// prod[i] % 3 = ((prod[i - 1] % 3) * value[i])
	var prod = 1;
	for (var i = 0; i < len_n; i++) {
		var n_i = dig_n[i];
		var k_i = (i < len_k) ? dig_k[i] : 0;
		prod = (prod * binom_max_2(n_i, k_i)) % 3;
	}
	return prod % 3;
}

// convert from 012 to RGB
function int_2_char(i) {
	switch (i) {
		case 0:
			return 'R';
		case 1:
			return 'G';
		case 2:
			return 'B';

			// shouldn't happen
		default:
			return '\0';
	}
}

// convert from RGB to 012
function char_2_int(c) {
	switch (c) {
		case 'R':
			return 0;
		case 'G':
			return 1;
		case 'B':
			return 2;

			// shouldn't happen
		default:
			return 3;
	}
}
var MAX_N_LOG_3 = 11;

function triangle(input) {
	var sum = 0;
	const strLen = input.length;

	// calculate digits of n - 1
	var dig_n = new Array(MAX_N_LOG_3);
	var len_n = conv_base_3(strLen - 1, MAX_N_LOG_3, dig_n);

	for (var i = 0; i < strLen; i++) {
		// calculate digits of k - 1
		var dig_k = new Array(MAX_N_LOG_3);
		var len_k = conv_base_3(i, MAX_N_LOG_3, dig_k);

		// calculate C(n - 1, k - 1) mod 3
		var Cnk_mod3 = lucas_3(len_n, dig_n, len_k, dig_k);

		// add using the modulo rule
		sum = (sum + Cnk_mod3 * char_2_int(input[i])) % 3;
	}

	// value of (-1) ** (n - 1)
	// (no need for pow; just need to know if n is odd or even)
	var sign = (strLen % 2) * 2 - 1;

	// for negative numbers, must resolve the difference
	// between C's % operator and mathematical mod
	var sum_mod3 = (3 + (sign * parseInt(sum % 3))) % 3;
	return int_2_char(sum_mod3);
}

console.log(triangle('RBRGBRBBRBRGBRBRGRBRGBRBBRBRGBRBG'));

// a1 a2 a3 a4 a5

// 3-a1-a2 3-a2-a3 3-a3-a4 3-a4-a5

// 3-3*2+a1+2a2+a3 3-3*2+a2+2a3+a4 3-3*2+a3+2a4+a5

// 3-3+3*2-a1-2a2-a3-3+3*2-a2-2a3-a4

// // n 个数  k 行

// -1^(n-1) * (n-1)(a2+...+an-1)+a1+an

// R G B
// 0 1 2
//  B R
//   G

// 3-0-1 3-1-2

// 3-3+1-3+1+2

function triangle2(input) {
	var sum = 0;

	for (let index = 1; index < input.length - 1; index++) {
		sum += char_2_int(input[index]);
	}

	// 得到正负
	var sign = (input.length % 2) * 2 - 1;

	var result = (input.length - 1) * sum + char_2_int(input[0]) + char_2_int(input[input.length - 1]);

	result = 3 - (input.length - 1) * 3 + result;

	// return int_2_char((3 + (sign * parseInt(result % 3))) % 3);
	return int_2_char(result);
}

console.log(triangle2('RBRGBRBBRBRGBRBRGRBRGBRBBRBRGBRBG'));