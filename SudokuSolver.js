// https://www.codewars.com/kata/5296bc77afba8baa690002d7/train/javascript

function sudoku(puzzle) {
	//return the solved puzzle as a 2d array of 9 x 9
	const size = puzzle.length;
	const newArr = new Array(size);
	const columns = new Array(size).fill('').map((ele, index) => getColumns(puzzle, index));
	const baseArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	for (let index = 0; index < size; index++) {
		const row = puzzle[index];

		const arr = baseArr.filter(ele => !row.find(num => num === ele));

		newArr[index] = row.map((ele, i) => ele ? [ele] : arr.filter(num => !columns[i].find(numC => numC === num)))

	}

	sudoku(newArr.map(ele => {
		return ele.map(num => num.length === 1 ? num[0] : 0)
	}))
}

function getColumns(arr, column) {
	return arr.map(ele => ele[column]);
}

sudoku([
	[5,3,0,0,7,0,0,0,0], // 1 2 4 6 8 9 
	[6,0,0,1,9,5,0,0,0], // 2 3 4 7 8
	[0,9,8,0,0,0,0,6,0], // 1 2 3 4 5 7
	[8,0,0,0,6,0,0,0,3], // 1 2 4 5 7 9
	[4,0,0,8,0,3,0,0,1], // 2 5 6 7 9
	[7,0,0,0,2,0,0,0,6], // 1 3 4 5 8 9
	[0,6,0,0,0,0,2,8,0], // 1 3 4 5 7 9
	[0,0,0,4,1,9,0,0,5], // 2 3 6 7 8
	[0,0,0,0,8,0,0,7,9]  // 1 2 3 4 5 6
])
	// 1 2 3 9

