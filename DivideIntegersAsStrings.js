/*
 * @Description: 
 * @Author: Walker
 * @Date: 2021-06-15 19:19:09
 * @LastEditTime: 2021-06-15 19:37:10
 * @LastEditors: Walker
 */

// https://www.codewars.com/kata/58dea43ff98a7e2124000169/train/javascript

function divideStrings(a,b) {
	const numA = a.split('');
	const numB = b.split('');

	return [Math.floor(+a / +b).toString(), (+a % +b).toString()];  // This doesn't work on big numbers!
}

// 比较两个数大小
function compare(a, b) {

}

// 数值相减
function subtract() {

}
