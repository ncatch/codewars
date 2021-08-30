// https://www.codewars.com/kata/5aaa1aa8fd577723a3000049/train/javascript

// TODO 调整路径 去除重复点

function fourPass(stations) {
	const stationPoints = stations.map(ele => convertPoint(ele));

	let result = [];

	for (let i = 1; i < stationPoints.length; i++) {
		const tmp = [stationPoints[i - 1]];

		next(stationPoints[i - 1], stationPoints[i], tmp, stationPoints);

		result.push(tmp);
	}

	return result.reduce((a,b) => a.concat(b.slice(1))).map(ele => ele[1] * 10 + ele[0]);
}

/**
 * 根据数字返回坐标
 * @param {Number} number 数字
 * @returns [x, y]
 */
function convertPoint(number) {
	return [
		number % 10,
		parseInt(number / 10),
	];
}

// 获取两点的距离
function getDistance(pointA, pointB) {
	return Math.abs(pointA[0] - pointB[0]) + Math.abs(pointA[1] - pointB[1]);
}

// 是否同一个点
function isSamePoint(pointA, pointB) {
	return pointA[0] == pointB[0] && pointA[1] == pointB[1];
}

/**
 * 计算开始到结束的路径
 * @param {Array} start 开始坐标
 * @param {Array} end 结束坐标
 * @param {Array} passing 之前已经经过的坐标集合
 * @returns [number1, number2, number3, ...]
 */
function next(start, end, passing, allPoint) {
	if (isSamePoint(start, end)) return;

	const points = [
		[start[0] - 1, start[1]],
		[start[0] + 1, start[1]],
		[start[0], start[1] - 1],
		[start[0], start[1] + 1],
	].filter(ele => ele[0] >= 0 && ele[0] <= 9 && ele[1] >= 0 && ele[1] <= 9)

	let currPoint = null;
	let currDistance = getDistance(start, end);

	points.forEach(ele => {
		// 已经走过
		if (!passing.find(p => isSamePoint(p, ele)) && !allPoint.find(a => !isSamePoint(a, end) && isSamePoint(a, ele))) {

			let tmpDistance = getDistance(ele, end);
			if (tmpDistance < currDistance || !currPoint) {
				currDistance = tmpDistance;
				currPoint = ele;
			}
		}
	})

	if (isSamePoint(start, currPoint)) {
		throw Error('找不到下一步坐标');
	}

	passing.push(currPoint);

	next(currPoint, end, passing, allPoint);
}

const exampleTests = [
	[1, 69, 95, 70],
	[0, 49, 40, 99],
	[37, 61, 92, 36],
	[51, 24, 75, 57],
	[92, 59, 88, 11]
];
const example_solutions = [
	[1, 2, 3, 4, 5, 6, 7, 8, 9, 19, 29, 39, 49, 59, 69, 79, 78, 77, 76, 75, 85, 95, 94, 93, 92, 91, 81, 71, 70],
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 19, 29, 39, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 69, 79, 89, 99],
	[37, 27, 26, 25, 24, 23, 22, 21, 31, 41, 51, 61, 71, 81, 91, 92, 93, 94, 95, 96, 86, 76, 66, 56, 46, 36],
	[51, 41, 42, 43, 44, 34, 24, 25, 35, 45, 55, 65, 75, 76, 77, 67, 57],
	[92, 93, 94, 95, 96, 97, 98, 99, 89, 79, 69, 59, 58, 68, 78, 88, 87, 77, 67, 57, 47, 37, 27, 17, 16, 15, 14, 13, 12, 11]
];
exampleTests.forEach((e, i) => console.log(fourPass(e.slice())));


// [
// 	[0,  1,  2,  3,  4,  5,  6,  7,  8,  9],
// 	[10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
// 	[20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
// 	[30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
// 	[40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
// 	[50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
// 	[60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
// 	[70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
// 	[80, 81, 82, 83, 84, 85, 86, 87, 88, 89],
// 	[90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
// ]