// https://www.codewars.com/kata/54cf7f926b85dcc4e2000d9d/train/javascript
// 已解决

// takes: String; returns: [ [String,Int] ] (Strings in return value are single characters)
function frequencies(s) {
	const result = s.split('');
	const tmp = {};

	result.forEach(ele => {
		if (!tmp[ele]) {
			tmp[ele] = 1;
		} else {
			tmp[ele]++;
		}
	});

	return Object.entries(tmp);
}

// takes: [ [String,Int] ], String; returns: String (with "0" and "1")
function encode(freqs, s) {
	if (freqs.length <= 1) return null;
	if (s.length < 1) return "";
 
	const strMap = parseTree(freqs);

	return s.split('').map(ele => strMap[ele]).join('');
}

// takes [ [String, Int] ], String (with "0" and "1"); returns: String
function decode(freqs, bits) {
	if (freqs.length <= 1) return null;
	if (bits.length < 1) return "";

	const strMap = parseTree(freqs);

	let result = bits;
	let next = true;

	freqs.sort((a, b) => {
		return parseInt(strMap[a[0]]) > parseInt(strMap[b[0]].length) ? -1 : 1;
	})

	while (next) {
		next = false;
		freqs.forEach((ele, index) => {
			if (ele) {
				let val = ele[0];

				const reg = new RegExp(strMap[val], 'g');
				const count = result.match(reg);

				if (count && count.length === ele[1]) {
					if (val == '0') val = '.';
					if (val == '1') val = ',';

					result = result.replace(reg, val);
					next = true;

					freqs[index] = null;
				}
			}
		})

		freqs = freqs.filter(ele => ele);
	}

	if (freqs.length) {
		freqs.forEach(ele => {
			for (let index = 0; index < ele[1]; index++) {
				result = result.replace(strMap[ele[0]], ele[0]);
			}
		})
	}

	result = result.replace(/\./g, '0').replace(/,/g, '1');

	return result;
}

function parseTree(val) {
	let level = '';
	const tmp = {};

	val.sort((a, b) => {
		return b[1] - a[1];
	}).forEach((ele, index) => {
		const add = index === val.length - 1 ? '' : 0;

		tmp[ele[0]] = level + add;

		level += '1';
	})

	return tmp;
}


const s = "fss49a7upo118jl4qskrugnv8no2s3r5kpfxhhtf0jsny6nbrpljgw8dnlvhq";
const fs = frequencies(s); // [ ["a",4], ["b",1], ["c",2] ]
const bit = encode(fs, s);
console.log(bit);
console.log(decode(fs, bit))