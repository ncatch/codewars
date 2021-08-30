
// https://www.codewars.com/kata/56a1c63f3bc6827e13000006/train/javascript


function smallerA(arr) {
	const result = [];
	const tmp = {};
	for (let index = 0; index < arr.length; index++) {
		let num = 0;
		tmp[index] = arr[index];
		
		for (let n = index + 1; n < arr.length; n++) {
			(tmp[index] > (tmp[n] || arr[n])) && num++;
		}
		
		result.push(num);
	}

	return result
}

/**
 * 生成测试数据
 * @param {Number} len 
 */
function getTestArr(len = 100) {
	const result = [];
	for (let index = 0; index < len; index++) {
		result.push(parseInt(Math.random() * 1000));
	}
	return result;
}

const testArr = [];
for (let index = 0; index < 100; index++) {
	testArr.push(getTestArr());
}


// 右边有多少个数比他小
function smaller (arr) {
	var cache = {};

	return arr.reverse().map((ele, index) => {
		let result = 0;
		let cacheTmp = 0;

		var tmp = Object.keys(cache).reverse();
		for (let index = 0; index < tmp.length; index++) {
			const element = tmp[index];

			if (element == ele) {
				cacheTmp = cache[element] + 1;
				result = cache[element];
				break;
			} else if (ele > element) {
				cacheTmp = cache[element] + 1;
				result = cache[element] + 1;
				break;
			}
		}

		cache[ele] = cacheTmp;
		return result;
	}).reverse();
}

console.log(smaller([1, 1, -1, 0, 0]));