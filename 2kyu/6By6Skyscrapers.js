// https://www.codewars.com/kata/5679d5a3f2272011d700000d/train/javascript

var clues = [
	3, 2, 2, 3, 2, 1,
	1, 2, 3, 3, 2, 2,
	5, 1, 2, 2, 4, 3,
	3, 2, 1, 2, 2, 4
];


/**
 *     3  2  2  3  2  1
 *  4              5  6  1
 *  2                    2
 *  2                    3
 *  1  6                 3
 *  2                    2
 *  3              6     2
 *     3  4  2  2  1  5 
 */

// 获取列数组
function getColumnArr(arr, col) {
	return arr.map(ele => ele[col]);
}

// 获取6x6空数组
function getEmptyArr() {
	return new Array(6).fill(0).map(() => new Array(6));
}

// 获取一个格子可以填入的数字
function getCanSetNumbers(arr, row, col) {
	const useArr = arr[row].concat(...getColumnArr(arr, col));

	return [1, 2, 3, 4, 5, 6].filter(ele => !useArr.includes(ele));
}

// 获取可以看见的楼数
function getMaxNumber(arr) {
	let number = 0,
		result = 0;
	const resultArr = [];

	arr.forEach(ele => {
		if (ele > number) {
			number = ele;
			result++;
		}
	})

	resultArr[0] = result;
	number = 0, result = 0;

	arr.reverse().forEach(ele => {
		if (ele > number) {
			number = ele;
			result++;
		}
	})

	arr.reverse()

	return resultArr;
}

function solvePuzzle(clues) {
	const result = getEmptyArr();

	// 行能看到的建筑数
	const rowNumber = [
		clues.slice(0, 6), // 上
		clues.slice(12, 18).reverse() // 下
	];

	// 列能看到的建筑数
	const colNumber = [
		clues.slice(18, 24).reverse(), // 左
		clues.slice(6, 12) // 右
	];

	// 初始化数据 为1的必定是6, 1对面是2则必定是5
	for (let i = 0; i < 6; i++) {
		if (rowNumber[0][i] == 1) {
			result[0][i] = 6;

			if (rowNumber[1][i] == 2) {
				result[1][i] = 5;
			}
		}
		if (rowNumber[1][i] == 1) {
			result[5][i] = 6;

			if (rowNumber[0][i] == 2) {
				result[0][i] = 5;
			}
		}
		if (colNumber[0][i] == 1) {
			result[i][0] = 6;

			if (colNumber[1][i] == 2) {
				result[i][5] = 5;
			}
		}
		if (colNumber[1][i] == 1) {
			result[i][5] = 6;

			if (colNumber[0][i] == 2) {
				result[i][0] = 5;
			}
		}
	}

	let x = 0,
		y = 0;
	
	const discardArr = getEmptyArr();

	do {
		const row = result[x];
		const col = row[y];

		if (!col) {
			// 获取可以设置的数字
			const numbers = getCanSetNumbers(result, x, y).filter(ele => !discardArr[x][y] || !discardArr[x][y].includes(ele));

			numbers.forEach(ele => {
				result[x][y] = ele;

				const tmpNumX = getMaxNumber(result[x]);
				const tmpNumY = getMaxNumber(getColumnArr(result, y));

				// 如果超过数字 则回溯
				if (colNumber[0][x] > tmpNumX[0] || colNumber[1][x] > tmpNumX[1] ||
					rowNumber[0][x] > tmpNumY[0] || rowNumber[1][x] > tmpNumY[1]
				) {
					discardArr[x][y] = ele;
					result[x][y] = 0;
				}
			})
		}

		y++;

		if (y >= row.length) {
			x++;
			y = 0;
		}
	} while (x < result.length);

	console.log(result);
}


solvePuzzle(clues);