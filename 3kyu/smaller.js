
// https://www.codewars.com/kata/56a1c63f3bc6827e13000006/train/javascript


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
// function smaller (arr) {
// 	const result = [];
// 	const tmp = {};
// 	for (let index = 0; index < arr.length; index++) {
// 		let num = 0;
// 		tmp[index] = arr[index];
		
// 		for (let n = index + 1; n < arr.length; n++) {
// 			(tmp[index] > (tmp[n] || arr[n])) && num++;
// 		}
		
// 		result.push(num);
// 	}

// 	return result
// }



console.log(smaller([5, 2, 1, 4, 3]));