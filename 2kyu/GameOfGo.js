// https://www.codewars.com/kata/59de9f8ff703c4891900005c/train/javascript
// 已解决

//   A B C D E F G H J
// 9 . . . . . . . . .
// 8 . . . . . . . . .
// 7 x . . . . . . . .
// 6 . . . . . . . . .
// 5 . . . . . . . . .
// 4 . . . . . . . . .
// 3 . . . . . . . . .
// 2 . . . . . . . . .
// 1 o . . . . . . . .

const Piece = {
	empty: '.',
	white: 'o',
	black: 'x',
}

const PieceName = {
	'o': 'white',
	'x': 'black',
}

const letter = {
	A: 0,
	B: 1,
	C: 2,
	D: 3,
	E: 4,
	F: 5,
	G: 6,
	H: 7,
	// I: 8,
	J: 8,
	K: 9,
	L: 10,
	M: 11,
	N: 12,
	O: 13,
	P: 14,
	Q: 15,
	R: 16,
	S: 17,
	T: 18,
	U: 19,
	V: 20,
	W: 21,
	X: 22,
	Y: 23,
	Z: 24,
}

const operateType = {
	move: 1,
	rollback: 2,
	pass: 3,
}

class Size {
	constructor(width, height) {
		this.width = width || height;
		this.height = height;
	}
}

class Go {
	constructor(height, width) {
		if (width > 25 || height > 25) {
			this.error('不能创建大于25的棋盘')
		}

		this.size = new Size(width, height)

		this.reset();
	}

	reset() {
		// console.log(`game.reset()`)

		this.board = new Array(this.size.height)
			.fill(0)
			.map(() => new Array(this.size.width).fill(Piece.empty)); // 初始化棋盘

		this.currPiece = Piece.black; // 黑子先行
		this.history = []; // 记录
		this.isHandicapStones = false; // 未让子
	}

	get turn() {
		return PieceName[this.currPiece]
	}

	// 跳过
	pass() {
		// console.log(`game.pass()`)

		this.history.push({
			type: operateType.pass,
			currPiece: this.currPiece,
			board: JSON.parse(JSON.stringify(this.board))
		});

		this.currPiece = this.getOpposite(this.currPiece)
	}

	getOpposite(piece) {
		return piece == Piece.black ? Piece.white : Piece.black;
	}

	error(msg) {
		throw Error(msg)
		// console.log(msg)
	}

	/**
	 * 落子
	 * @param {String} point 坐标
	 */
	move(...args) {
		// console.log(`game.move(${args})`)

		for (let i = 0; i < args.length; i++) {
			const point = args[i];
			const pointArr = this.parsePoint(point);
			const rowIndex = pointArr[0];
			const colIndex = pointArr[1];

			if (
				!(rowIndex >= 0 &&
					rowIndex < this.size.height &&
					colIndex >= 0 &&
					colIndex < this.size.width)
			) {
				return this.error('超出棋盘')
			}

			if (this.board[rowIndex][colIndex] != Piece.empty) {
				return this.error('此位置已经有子')
			}

			this.board[rowIndex][colIndex] = this.currPiece;

			const isBreath = this.checkBreath([
				[rowIndex, colIndex]
			])

			// 是否吃掉棋子
			const eatPiece = this.eat(rowIndex, colIndex)

			if (eatPiece.length) {
				// 查询历史
				const tmpBoard = JSON.parse(JSON.stringify(this.board))
				this.clear(eatPiece, tmpBoard)

				const his = this.history.find(ele => JSON.stringify(ele.board) == JSON.stringify(tmpBoard))

				if (his) {
					// 违规
					this.board[rowIndex][colIndex] = Piece.empty;
					this.error('违规: 重复棋盘')
				}
			}

			
			// if (!isBreath) {
			// 	console.log('isBreath')
			// 	console.log(this.board)
			// 	console.log(pointArr)
			// 	console.log(eatPiece)
			// }

			if (isBreath || eatPiece.length) {
				this.history.push({
					type: operateType.move,
					point,
					eatPiece,
					currPiece: this.currPiece,
					board: JSON.parse(JSON.stringify(this.board))
				});

				// 清空被吃掉的棋子
				this.clear(eatPiece)

				// 下完轮到另一方下
				this.currPiece = this.getOpposite(this.currPiece)
			} else {
				// 没有气并且没有吃掉棋子 则不允许
				this.board[rowIndex][colIndex] = Piece.empty;
				this.error('违规: 不能自杀')
			}
		};
	}

	/**
	 * 检查周围棋子
	 * 棋子旁边没有对方棋子为一气
	 * 相邻棋子视为"块" "块"周围没有气则视为死棋
	 * @param {*} row 
	 * @param {*} col 
	 * @returns Array
	 */
	eat(row, col) {
		const result = [];

		// 周围的棋子
		const aroundPiece = this.getAroundPiece(row, col)

		for (const key in aroundPiece) {
			const point = aroundPiece[key]
			const piece = this.board[point[0]][point[1]]

			if (piece != Piece.empty && piece != this.currPiece) {
				const piece = this.getPiece(...point)

				// 检查piece还有没有气
				if (!this.checkBreath(piece)) {
					result.push(...piece)
				}
			}
		}
		return result;
	}

	clear(points, board = this.board) {
		points.forEach(point => {
			board[point[0]][point[1]] = Piece.empty;
		});
	}

	/**
	 * 检查piece还有没有气
	 * @param {Array} pipece 
	 * @return Boolean
	 */
	checkBreath(pipece, history = []) {
		for (let index = 0; index < pipece.length; index++) {
			const oriPoint = pipece[index];
			const oriTurn = this.board[oriPoint[0]][oriPoint[1]]
			const aroundPiece = this.getAroundPiece(...oriPoint)

			// 周围有没有气
			for (const key in aroundPiece) {
				const point = aroundPiece[key]
				const turn = this.board[point[0]][point[1]]

				if (turn == Piece.empty) {
					return true;
				} else if (turn == oriTurn) {
					history.push(oriPoint)

					// 相同颜色 检查相邻棋子是否有气
					if (!history.find(ele => this.equalPoint(ele, point)) && this.checkBreath([point], history)) {
						return true;
					}
				}
			}
		}

		return false;
	}

	// 获取坐标
	parsePoint(point) {
		const res = point.split('')

		let resArr = res;

		if (res.length > 2) {
			resArr = [res[0] + res[1], res[2]]
		}

		return [this.board.length - parseInt(resArr[0]), letter[resArr[1]]]
	}

	/**
	 * 获取一块棋子
	 * @param {Number} row 
	 * @param {Number} col 
	 * @param {Array} result ['yx',...]
	 * @returns ['yx',...]
	 */
	getPiece(row, col, result = []) {
		result.push([row, col])

		const aroundPiece = this.getAroundPiece(row, col)
		const current = this.board[row][col]

		// 周围同色棋子
		for (const key in aroundPiece) {
			const point = aroundPiece[key]
			const row = this.board[point[0]]

			if (row && row[point[1]] == current && !result.find(ele => ele[0] == point[0] && ele[1] == point[1])) {
				result.push(point);
				this.getPiece(...point, result)
			}
		}

		return result;
	}

	/**
	 * 获取四周的棋子
	 * @param {*} row 
	 * @param {*} col 
	 * @returns {left: [], right: [], up: [], down: []}
	 */
	getAroundPiece(row, col) {
		const result = {};

		if (col - 1 >= 0) {
			result.left = [row, col - 1]
		}
		if (col + 1 < this.size.width) {
			result.right = [row, col + 1]
		}
		if (row - 1 >= 0) {
			result.up = [row - 1, col]
		}
		if (row + 1 < this.size.height) {
			result.down = [row + 1, col]
		}

		return result
	}

	getPosition(point) {
		const p = this.parsePoint(point);

		return this.board[p[0]][p[1]]
	}

	// 2个点是否同一个点
	equalPoint(p1, p2) {
		return p1[0] == p2[0] && p1[1] == p2[1]
	}

	/**
	 * 让子
	 * @param {Number} num 让几子
	 */
	handicapStones(num) {
		// console.log(`game.handicapStones(${num})`)

		const size = ['9x9', '13x13', '19x19']

		if (!size.includes(`${this.size.height}x${this.size.width}`)) {
			this.error('该棋盘不可让子')
		} else if (this.history.length) {
			this.error('已经落子, 不可让子')
		} else if (this.isHandicapStones) {
			this.error('已经让子, 不可再次让子')
		} else {
			this.isHandicapStones = true;

			const isSmall = this.size.width == 9;

			const {
				width,
				height
			} = this.size

			const margin = (isSmall ? 2 : 4)
			const cDiff = isSmall ? 0 : 1;
			const rDiff = isSmall ? 1 : 0;
			
			const left = margin - cDiff;
			const right = width - margin - rDiff;
			const top = margin - cDiff;
			const down = height - margin - rDiff;

			const center = parseInt(width / 2);

			const max = isSmall ? 5 : 9;

			if (num > max) {
				this.error(`该棋盘不允许让${num}子`)
			}

			const points = [
				[top, right],
				[down, left],
				[down, right],
				[top, left],
				[center, center],
				[center, left],
				[center, right],
				[top, center],
				[down, center],
			];

			for (let i = 0; i < num; i++) {
				const point = points[i];
				
				this.board[point[0]][point[1]] = this.currPiece
			}
		}
	}

	/**
	 * 回滚
	 * @param {Number} num 回滚步数
	 */
	rollback (num) {
		// console.log(`game.rollback(${num})`)

		const history = this.history[this.history.length - num];

		this.board = history.board;
		this.currPiece = history.currPiece;

		if (history.point) {
			const point = this.parsePoint(history.point);
			this.board[point[0]][point[1]] = Piece.empty;
		}

		// this.history.push({
		// 	type: operateType.rollback,
		// 	currPiece: this.currPiece,
		// 	board: JSON.parse(JSON.stringify(this.board))
		// })

		this.history = this.history.slice(0, this.history.length - num)
	}
}

[ [ 'x','.','.','.','.','x','o','x','.','.','.','x','.','x','o','o','.','.','o','.' ],
  [ '.','.','o','.','.','x','o','x','.','x','x','.','x','.','x','.','.','.','.','.' ],
  [ '.','.','.','x','.','.','x','.','.','.','.','.','o','.','o','o','.','.','.','.' ],
  [ '.','.','x','.','.','.','.','x','o','.','.','.','.','.','.','.','.','.','.','.' ],
  [ '.','.','.','o','x','o','.','x','.','.','.','.','.','o','o','.','x','o','x','.' ],
  [ 'x','o','.','.','.','.','.','.','.','.','.','.','.','o','.','.','.','.','.','x' ],
  [ 'o','.','.','.','x','.','.','.','.','o','x','.','.','.','.','.','.','.','.','.' ],
  [ '.','.','.','.','.','x','o','x','.','.','.','o','.','.','.','.','.','.','.','o' ],
  [ '.','.','.','.','x','.','.','x','.','o','.','.','.','.','.','.','.','.','.','.' ],
  [ '.','.','.','.','.','.','.','.','.','.','.','.','.','.','o','.','.','.','.','o' ] ]
[ 1, 6 ]
[ [ 0, 6 ], [ 1, 6 ], [ 1, 6 ] ]



/**
 * 
 *[ [ 'x', '.', '.', '.', '.', '.', 'x', '.' ],
  [ 'o', 'o', 'o', '.', 'o', '.', 'o', 'o' ],
  [ '.', 'x', 'x', '.', '.', '.', '.', 'o' ],
  [ '.', '.', 'x', '.', '.', 'x', '.', '.' ],
  [ 'x', '.', '.', 'x', 'x', 'x', 'x', '.' ],
  [ '.', '.', '.', 'o', '.', '.', '.', 'o' ],
  [ '.', 'o', 'x', 'o', '.', '.', '.', '.' ],
  [ '.', '.', 'x', '.', '.', '.', '.', '.' ],
  [ 'x', 'x', '.', 'x', '.', '.', '.', '.' ],
  [ '.', 'o', '.', 'x', 'o', '.', '.', '.' ],
  [ '.', '.', 'x', '.', 'o', 'o', '.', 'x' ],
  [ '.', '.', 'x', '.', '.', 'x', '.', 'o' ],
  [ '.', 'o', 'o', '.', 'o', '.', 'x', '.' ],
  [ 'o', '.', '.', '.', '.', '.', '.', '.' ],
  [ '.', 'x', 'x', '.', '.', 'o', '.', 'o' ],
  [ '.', '.', '.', '.', 'x', 'x', 'o', 'o' ],
  [ 'x', 'x', '.', '.', '.', 'o', '.', '.' ],
  [ '.', '.', '.', 'o', '.', '.', '.', '.' ] ] 


[ [ 'x', '.', '.', '.', '.', '.', 'x', '.' ],
  [ '.', 'o', 'o', '.', 'o', '.', '.', 'o' ],
  [ '.', 'x', 'x', '.', '.', '.', '.', '.' ],
  [ '.', '.', 'x', '.', '.', 'x', '.', '.' ],
  [ 'x', '.', '.', '.', 'x', '.', '.', '.' ],
  [ '.', '.', '.', 'o', '.', '.', '.', 'o' ],
  [ '.', 'o', 'x', 'o', '.', '.', '.', '.' ],
  [ '.', '.', 'x', '.', '.', '.', '.', '.' ],
  [ 'x', 'x', '.', '.', '.', '.', '.', '.' ],
  [ '.', 'o', '.', 'x', 'o', '.', '.', '.' ],
  [ '.', '.', 'x', '.', '.', 'o', '.', 'x' ],
  [ '.', '.', '.', '.', '.', 'x', '.', 'o' ],
  [ '.', '.', 'o', '.', '.', '.', 'x', '.' ],
  [ 'o', '.', '.', '.', '.', '.', '.', '.' ],
  [ '.', '.', 'x', '.', '.', 'o', '.', 'o' ],
  [ '.', '.', '.', '.', 'x', 'x', '.', 'o' ],
  [ '.', 'x', '.', '.', '.', 'o', '.', '.' ],
  [ '.', '.', '.', 'o', '.', '.', '.', '.' ] ]
 * 
 */