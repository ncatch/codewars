// https://www.codewars.com/kata/5296bc77afba8baa690002d7/train/javascript

// 已解决

const getColumns = (arr, column) => arr.map(ele => ele[column]);

function getGridUsed(arr, x, y) {
	const sy = parseInt(y / 3) * 3;
	const sx = parseInt(x / 3) * 3;

	const result = [];

	for (let y = 0; y < 3; y++) {
		const row = arr[y + sy];

		for (let x = 0; x < 3; x++) {
			result.push(row[x + sx])
		}
	}

	return result;
}

function sudoku(puzzle) {
	if (puzzle.toString().indexOf('0') < 0) return puzzle;
	//return the solved puzzle as a 2d array of 9 x 9

	const base = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	const usedArr = [];

	for (let y = 0; y < puzzle.length; y++) {
		// 行
		const rowArr = puzzle[y];

		for (let x = 0; x < rowArr.length; x++) {
			const item = rowArr[x];

			if (item == 0) {
				// 列
				const columnArr = getColumns(puzzle, x);

				// 小格子已经被引用的
				const gridUsed = getGridUsed(puzzle, x, y);

				// 没有使用的
				const unUsedY = base.filter(ele => !rowArr.find(use => use == ele));
				const unUsedX = base.filter(ele => !columnArr.find(use => use == ele));
				const unUsedGrid = base.filter(ele => !gridUsed.find(use => use == ele));

				// 都可使用的
				const unUsedAll = unUsedY.filter(yItem => unUsedX.find(xItem => yItem == xItem) && unUsedGrid.find(gItem => gItem == yItem));

				if (!usedArr[y]) usedArr[y] = [];
				usedArr[y][x] = new Set(unUsedAll);

				// 只有一个可用的 填入
				if (unUsedAll.length == 1) {
					console.log(y, x, unUsedAll[0])
					puzzle[y][x] = unUsedAll[0];
				}
			}
		}
	}

	return sudoku(puzzle)
}



console.log(sudoku([
	[5, 3, 0, 0, 7, 0, 0, 0, 0], // 1 2 4 6 8 9 
	[6, 0, 0, 1, 9, 5, 0, 0, 0], // 2 3 4 7 8
	[0, 9, 8, 0, 0, 0, 0, 6, 0], // 1 2 3 4 5 7
	[8, 0, 0, 0, 6, 0, 0, 0, 3], // 1 2 4 5 7 9
	[4, 0, 0, 8, 5, 3, 0, 0, 1], // 2 5 6 7 9
	[7, 0, 0, 0, 2, 0, 0, 0, 6], // 1 3 4 5 8 9
	[0, 6, 0, 0, 0, 0, 2, 8, 0], // 1 3 4 5 7 9
	[0, 0, 0, 4, 1, 9, 0, 0, 5], // 2 3 6 7 8
	[0, 0, 0, 0, 8, 0, 0, 7, 9] // 1 2 3 4 5 6
]))
// 1 2 3 9


/**
 * [5, 3, 0, 0, 7, 0, 0, 0, 0]
 * [6, 0, 0, 1, 9, 5, 0, 0, 0]
 * [0, 9, 8, 0, 0, 0, 0, 6, 0]
 * [8, 0, 0, 0, 6, 0, 0, 0, 3]
 * [4, 0, 0, 8, 5, 3, 0, 0, 1]
 * [7, 0, 0, 0, 2, 0, 0, 0, 6]
 * [0, 6, 0, 0, 0, 0, 2, 8, 0]
 * [0, 0, 0, 4, 1, 9, 0, 0, 5]
 * [0, 0, 0, 0, 8, 0, 0, 7, 9]
 */