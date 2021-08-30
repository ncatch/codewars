// https://www.codewars.com/kata/534e01fbbb17187c7e0000c6
// 已解决

const directionDic = {
	left: 1,
	top: 2,
	right: 3,
	bottom: 4,
}

function getArr (length) {
	return new Array(length).fill(0)
}

var spiralize = function(size) {
	// insert code here
	let isNext = true;
	let x = 0, y = 0, direction = directionDic.right, changeDirection = false;

	const result = new Proxy(new Array(size).fill(size).map(ele => getArr(size)), {
		get(target, key) {
			return target[key] || []
		}
	})

	const checkIsEnd = () => {
		if (changeDirection === true) {
			isNext = false;
		} else {
			changeDirection = true;
		}
	}

	do {
		result[y][x] = 1;

		switch (direction) {
			case directionDic.right:
				// 走一步
				x++;

				if (x >= size || result[y][x + 1] || result[y - 1][x] || result[y + 1][x]) {
					x--;
					direction = directionDic.bottom;

					checkIsEnd();
				} else {
					changeDirection = false;
				}

				break;
			case directionDic.bottom:
				// 走一步t
				y++;

				if (y >= size || result[y + 1][x] || result[y][x - 1] || result[y][x + 1]) {
					y--;
					direction = directionDic.left;

					checkIsEnd();
				} else {
					changeDirection = false;
				}
				break;
			case directionDic.left:
				// 走一步t
				x--;

				if (x < 0 || result[y][x - 1] || result[y + 1][x] || result[y - 1][x]) {
					x++;
					direction = directionDic.top;
					
					checkIsEnd();
				} else {
					changeDirection = false;
				}
				break;
			case directionDic.top:
				// 走一步t
				y--;

				if (y < 0 || result[y - 1][x] || result[y][x - 1] || result[y][x + 1]) {
					y++;
					direction = directionDic.right;
					
					checkIsEnd();
				} else {
					changeDirection = false;
				}
				break;
		}
	} while (isNext);

	return result;
}


console.log(spiralize(100))