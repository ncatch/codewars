// https://www.codewars.com/kata/57ff9d3b8f7dda23130015fa/train/javascript

class MineHelper {
	constructor(map, n) {
		this.map = map.split('\n').map(ele => ele.split(' '));
		this.mineNum = n;
	}

	solve(row, column, other = false) {
		let result = 0;

		// 周围总雷数
		const currMineCount = this.map[row][column];

		// 周围没有打开的
		const arr = this.getAroundByWhere(row, column, ele => this.map[ele[0]][ele[1]] == '?');
		// 周围标记的雷
		const mineArr = this.getAroundByWhere(row, column, ele => this.map[ele[0]][ele[1]] == 'x');

		// 周围未标记的雷
		const surplusMine = currMineCount - mineArr.length;

		if (arr.length && currMineCount - mineArr.length == arr.length) {
			// 为雷
			arr.forEach(ele => {
				if (this.map[ele[0]][ele[1]] != 'x') {
					this.map[ele[0]][ele[1]] = 'x';
					this.mineNum--;
				}
			})

			result += arr.length;
		} else if (mineArr.length == currMineCount) {
			// 雷全部已标记  打开周围未打开的格子
			arr.forEach(ele => this.openHandler(ele[0], ele[1]));

			result += arr.length
		} else if (other && currMineCount - mineArr.length) {
			// 处理相邻格子数字相同的  如果相邻格子剩下的 当前格子都包含 则没有交集的不是雷
			[1, 2].forEach(diff => {
				const roundOut = this.getAroundByWhere(row, column, e => !isNaN(this.map[e[0]][e[1]]), diff);

				roundOut.forEach(ele => {
					// 获取旁边的雷
					const tmpCount = this.getAroundByWhere(ele[0], ele[1], e => this.map[e[0]][e[1]] == 'x');

					if (this.map[ele[0]][ele[1]] - tmpCount.length == surplusMine) {
						// 没有打开的
						const tmpArr = this.getAroundByWhere(ele[0], ele[1], e => this.map[e[0]][e[1]] == '?');

						// 差值
						const res = arr.filter(arrEle => !tmpArr.find(tmpEle => arrEle[0] == tmpEle[0] && arrEle[1] == tmpEle[1]));

						// 相交的点
						const intersect = tmpArr.filter(tmpEle => arr.find(arrEle => tmpEle[0] == arrEle[0] && tmpEle[1] == tmpEle[1]));

						if (tmpArr.length && arr.length - tmpArr.length == res.length) {
							res.forEach(resEle => this.openHandler(resEle[0], resEle[1]))

							result += res.length
						} else if (intersect.length == surplusMine && surplusMine == this.map[ele[0]][ele[1]] && intersect == tmpArr.length) {
							// 相交的点等于剩余雷数
							arr.concat(tmpArr).filter(tmpEle => !intersect.find(inEle => tmpEle[0] == inEle[0] && tmpEle[1] == inEle[1])).forEach(tmpEle => {
								this.openHandler(tmpEle[0], tmpEle[1])
							})
						}
					}
				});
			});
		}

		return result;
	}

	openHandler(row, column) {
		try {
			
			if (!this.isCorrectPoint(row, column) || this.map[row][column] != '?') return 0;

			const result = open(row, column);

			this.map[row][column] = result + '';

			return result;
		} catch (error) {
			return 0;
		}
	}

	getAroundByWhere(row, column, where, diff = 1) {
		const arr = {
			1: [
				[row - diff, column - diff],
				[row - diff, column],
				[row - diff, column + diff],
				[row, column - diff],
				[row, column + diff],
				[row + diff, column - diff],
				[row + diff, column],
				[row + diff, column + diff],
			],
			2: [
				[row - 2, column - 2],
				[row - 2, column - 1],
				[row - 2, column],
				[row - 2, column + 1],
				[row - 2, column + 2],

				[row + 2, column - 2],
				[row + 2, column - 1],
				[row + 2, column],
				[row + 2, column + 1],
				[row + 2, column + 2],

				[row - 1, column - 2],
				[row, column - 2],
				[row + 1, column - 2],

				[row - 1, column + 2],
				[row, column + 2],
				[row + 1, column + 2],
			]
		} [diff]

		return arr.filter(ele => this.isCorrectPoint(ele[0], ele[1])).filter(where)
	}

	getMinesMap() {
		return this.map.map((row, y) => row.map((col, x) => {
			if (col == '?' || col == 'x') return col;


			const mineCount = this.getAroundByWhere(y, x, ele => this.map[ele[0]][ele[1]] == 'x').length;

			return col - mineCount;
		}))
	}

	/**
	 * 是否正确的点
	 * @param {Number} row 
	 * @param {Number} column 
	 * @param {Array} map 
	 * @returns Boolean
	 */
	isCorrectPoint(row, column) {
		return row >= 0 && column >= 0 && row < this.map.length && column < this.map[0].length;
	}

	/**
	 * 获取一个没有被排除的点
	 * @param {Array} passed 
	 * @returns 
	 */
	getNotOut(passed = []) {
		for (let y = 0; y < this.map.length; y++) {
			const row = this.map[y];

			for (let x = 0; x < row.length; x++) {
				const ele = row[x];

				if (ele == '?' && !passed.find(ele => ele[0] == y && ele[1] == x)) {
					return [y, x]
				}
			}
		}

		return null;
	}

	handlerAll(intersection = false) {
		let solveCount = 0;

		this.map.forEach((row, rowIndex) => {
			row.forEach((column, colIndex) => {
				if (column != '?' && column != 'x') {
					const tmp = this.solve(rowIndex, colIndex, intersection);

					solveCount += tmp;
				}
			});
		});

		return solveCount;
	}

	toString() {
		if (this.mineNum == 0) {
			let tmp = this.getNotOut();

			while (tmp) {
				this.map[tmp[0]][tmp[1]] = this.getAroundByWhere(tmp[0], tmp[1], ele => this.map[ele[0]][ele[1]] == 'x').length;

				tmp = this.getNotOut();
			}
		}

		return this.map.map(ele => ele.join(' ')).join('\n');;
	}
}

function solveMine(map, n) {
	//conding and coding..

	const mineHelper = new MineHelper(map, n);

	let condition = true;

	// 排除可计算的
	do {
		let solveCount = 0;

		let tmpMap = mineHelper.getMinesMap();

		mineHelper.map.forEach((row, rowIndex) => {
			row.forEach((column, colIndex) => {
				if (column != '?' && column != 'x') {
					const tmp = mineHelper.solve(rowIndex, colIndex);
					solveCount += tmp;
				}

				try {
					// 1-2-2-1
					if (
						tmpMap[rowIndex][colIndex] == 1 &&
						tmpMap[rowIndex][colIndex + 1] == 2 &&
						tmpMap[rowIndex][colIndex + 2] == 2 &&
						tmpMap[rowIndex][colIndex + 3] == 1
					) {
						mineHelper.openHandler(rowIndex + 1, colIndex - 1);
						mineHelper.openHandler(rowIndex + 1, colIndex);
						mineHelper.openHandler(rowIndex + 1, colIndex + 3);
						mineHelper.openHandler(rowIndex + 1, colIndex + 4);
						solveCount += 4;
					}
				} catch (error) {
					
				}
				try {
					// 1-2-2-1
					if (
						tmpMap[rowIndex][colIndex] == 1 &&
						tmpMap[rowIndex + 1][colIndex] == 2 &&
						tmpMap[rowIndex + 2][colIndex] == 2 &&
						tmpMap[rowIndex + 3][colIndex] == 1
					) {
						mineHelper.openHandler(rowIndex - 1, colIndex);
						mineHelper.openHandler(rowIndex, colIndex);
						mineHelper.openHandler(rowIndex + 3, colIndex);
						mineHelper.openHandler(rowIndex + 4, colIndex);
						solveCount += 4;
					}
				} catch (error) {
					
				}
			});
		});

		solveCount += mineHelper.handlerAll();

		if (!solveCount) {
			let tmpMap = mineHelper.getMinesMap();
			const passed = [];

			let isNext = true;

			do {
				const tmp = mineHelper.getNotOut(passed);

				if (!tmp) {
					// condition = false;
					isNext = false;
					break;
				}

				passed.push(tmp);

				let tmpVal;

				// 排除 1-1   1-2
				// 横向
				if (mineHelper.isCorrectPoint(tmp[0] + 1, tmp[1] - 2) && tmpMap[tmp[0] + 1][tmp[1]] != '?') {
					// 左边3个没有 ?
					const next = ![
						[tmp[0], tmp[1] - 3],
						[tmp[0] + 1, tmp[1] - 3],
						[tmp[0] + 2, tmp[1] - 3]
					].find(ele => mineHelper.isCorrectPoint(ele[0], ele[1]) && tmpMap[ele[0]][ele[1]] == '?')

					if (next) {
						if (tmpMap[tmp[0] + 1][tmp[1] - 2] == 1) {
							tmpVal = tmpMap[tmp[0] + 1][tmp[1] - 1];
						}
					}
				}

				// 纵向
				if (mineHelper.isCorrectPoint(tmp[0] - 2, tmp[1] + 1) && tmpMap[tmp[0]][tmp[1] + 1] != '?') {
					// 上面3个 没有 ?
					const next = ![
						[tmp[0] - 3, tmp[1]],
						[tmp[0] - 3, tmp[1] + 1],
						[tmp[0] - 3, tmp[1] + 2]
					].find(ele => mineHelper.isCorrectPoint(ele[0], ele[1]) && tmpMap[ele[0]][ele[1]] == '?')

					if (next) {
						if (tmpMap[tmp[0] - 2][tmp[1] + 1] == 1) {
							tmpVal = tmpMap[tmp[0] - 1][tmp[1] + 1];
						}
					}
				}

				if (tmpVal == 1) {
					mineHelper.openHandler(tmp[0], tmp[1]);
					solveCount++;
				} else if (tmpVal == 2) {
					mineHelper.map[tmp[0]][tmp[1]] = 'x';
					solveCount++;
				}

				/**
				 * 左上角一定不是雷
				 * ? ? ?
				 * ? 2 1
				 * ? 1 0
				 * 
				 * [1, 1], [1, 0], [0, 1]
				 * [1, -1], [1, 0], [0, -1]
				 * [-1, 1], [0, 1], [-1, 0]
				 * [-1, -1], [0, -1], [-1, 0]
				 */

				[
					[[1, 1], [2, 1], [1, 2]],
					[[1, -1], [2, 1], [1, -2]],
					[[-1, 1], [1, 2], [-2, 1]],
					[[-1, -1], [1, -2], [-2, 1]]
				].forEach(ele => {
					if (
						mineHelper.isCorrectPoint(tmp[0] + ele[0][0], tmp[1] + ele[0][1]) && tmpMap[tmp[0] + ele[0][0]][tmp[1] + ele[0][1]] == 2 &&
						mineHelper.isCorrectPoint(tmp[0] + ele[1][0], tmp[1] + ele[1][1]) && tmpMap[tmp[0] + ele[1][0]][tmp[1] + ele[1][1]] == 1 &&
						mineHelper.isCorrectPoint(tmp[0] + ele[2][0], tmp[1] + ele[2][1]) && tmpMap[tmp[0] + ele[2][0]][tmp[1] + ele[2][1]] == 1
					) {
						mineHelper.openHandler(tmp[0], tmp[1]);
						solveCount++;
					}
				})

				// TODO  排除  1-2-1  1-2-2-1

			} while (isNext);
		}

		if (!solveCount) {
			solveCount += mineHelper.handlerAll(true);
		}

		condition = solveCount != 0;
	} while (condition);

	const result = mineHelper.toString();
	if (result.indexOf('?') >= 0) {
		return '?';
	}

	return result;
}

var map = 
`0 0 0 0 0 0 0 ? ? ?
? ? ? ? ? ? 0 ? ? ?
? ? ? ? ? ? 0 ? ? ?
? ? ? ? ? ? 0 ? ? ?
0 0 ? ? ? ? ? ? 0 0
0 0 ? ? ? ? ? ? ? ?
0 0 ? ? ? ? ? ? ? ?
0 0 0 0 ? ? ? ? ? ?
0 0 0 0 ? ? ? ? ? ?
0 0 0 ? ? ? ? 0 0 0
0 0 0 ? ? ? ? 0 0 0
0 0 0 ? ? ? ? 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
? ? 0 ? ? ? 0 0 0 0
? ? 0 ? ? ? 0 0 0 0
? ? ? ? ? ? ? ? ? 0
? ? ? ? ? ? ? ? ? ?
? ? ? ? ? ? ? ? ? ?
0 0 ? ? ? 0 0 ? ? ?
0 0 ? ? ? ? ? ? ? ?
0 0 ? ? ? ? ? ? ? ?
0 0 0 0 0 ? ? ? ? ?`

var result =
`0 0 0 0 0 0 0 1 1 1
1 1 1 1 1 1 0 2 x 2
1 x 2 2 x 1 0 2 x 2
1 1 2 x 2 1 0 1 1 1
0 0 2 2 2 1 1 1 0 0
0 0 1 x 1 1 x 2 1 1
0 0 1 1 2 2 2 3 x 2
0 0 0 0 1 x 1 2 x 2
0 0 0 0 1 1 1 1 1 1
0 0 0 1 2 2 1 0 0 0
0 0 0 1 x x 1 0 0 0
0 0 0 1 2 2 1 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
1 1 0 1 1 1 0 0 0 0
x 1 0 1 x 1 0 0 0 0
2 3 1 3 2 2 1 1 1 0
x 2 x 2 x 1 1 x 2 1
1 2 1 2 1 1 1 2 x 1
0 0 1 1 1 0 0 1 1 1
0 0 1 x 1 1 1 2 2 2
0 0 1 1 1 1 x 2 x x
0 0 0 0 0 1 1 2 2 2`


result = result.split('\n').map(ele => ele.split(' '));

function open(row, column) {
	const res = result[row][column];

	if (res == 'x') {
		throw Error(`${row}x${column} BOOM!`)
	}
	return parseInt(res);
}

solveMine(map, 87);