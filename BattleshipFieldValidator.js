// 已解决
// 必须有单个战列舰（4个单元的大小），2艘巡洋舰（3个大小），3艘驱逐舰（2个大小）和4艘潜艇（1个大小）。不允许任何其他船只以及失踪船只。


function validateBattlefield(field) {
	const tmpVal = new Proxy(field, {
		get(target, key) {
			return target[key] || []
		},
	});

	let subMarines = 0,
		destroyers = 0,
		cruisers = 0,
		battleship = 0;

	// write your magic here
	for (let y = 0; y < field.length; y++) {
		const element = field[y];

		for (let x = 0; x < element.length; x++) {
			const val = element[x];

			if (val === 1) {
				const addSubMarines = checkSubmarines(y, x, tmpVal);

				if (addSubMarines) {
					subMarines += addSubMarines;
					continue;
				}

				let length = checkRight(y, x, tmpVal);
				let isX = true;

				if (length <= 0) {
					length = checkDown(y, x, tmpVal);
					ixX = false;
				}

				if (length > 0) {
					field[y][x] = -1;

					// 检查附近是否有其他船只
					if (checkNearby(y, x, tmpVal, length, isX)) {
						return false;
					}

					switch (length) {
						case 1:
							destroyers++;
							break;
						case 2:
							cruisers++;
							break;
						case 3:
							battleship++;
							break;
					}
				}
			}
		}
	}
	return subMarines === 4 && destroyers === 3 && cruisers === 2 && battleship === 1;
}

// 潜艇 1
function checkSubmarines(y, x, field) {
	if (
		!field[y - 1][x] && // 上
		!field[y + 1][x] && // 下
		!field[y][x - 1] && // 左
		!field[y][x + 1] // 右
	) {
		field[y][x] = -1;
		return 1;
	}

	return 0;
}

function checkRight(y, x, field) {
	let addX = 0;
	let isNext = true;
	do {
		addX++;
		if (field[y][x + addX] === 1) {
			field[y][x + addX] = -1;
			isNext = true;
		} else {
			isNext = false;
		}
	} while (isNext);

	return addX - 1;
}

function checkDown(y, x, field) {
	let addY = 0;
	let isNext = true;
	do {
		addY++;
		if (field[y + addY][x] === 1) {
			field[y + addY][x] = -1;
			isNext = true;
		} else {
			isNext = false;
		}
	} while (isNext);

	return addY - 1;
}

function checkNearby(y, x, field, length, isX) {
	/**
	 * isX = true
	 * x - 1 < newX < x + length + 1
	 * y - 1 < newY < y + 1
	 * 
	 * isX = false
	 * x - 1 < newX < x + 1
	 * y - 1 < newY < y + length + 1
	 */
	let minX = x - 1,
		minY = y - 1,
		maxX = x + 1,
		maxY = y + 1;
	if (isX) {
		maxX = x + length;
	} else {
		maxY = y + length;
	}

	for (let tmpY = minY; tmpY < maxY + 1; tmpY++) {
		const element = field[tmpY];

		for (let tmpX = minX; tmpX < maxX + 1; tmpX++) {
			const val = element[tmpX];

			if ((tmpX < x || tmpX > maxX || tmpY < y || tmpY > maxY) && (val === -1 || val === 1)) {
				return true;
			}
		}
	}
}

// good
function validateBattlefield(field) {
	var hit = (row, col) => (row < 0 || col < 0 || row > 9 || col > 9) ? 0 : field[row][col];
	for (var ships = [10,0,0,0,0], row = 0; row < 10; row++) {
	  for (var col = 0; col < 10; col++) {
		if ( hit(row,col) ) {
		  if ( hit(row-1, col-1) || hit(row-1, col+1) ) return false; // Corner is touching
		  if ( hit(row-1, col  ) && hit(row  , col-1) ) return false; // Side is touching
		  if ( ( field[row][col] += hit(row-1, col) + hit(row, col-1) ) > 4 ) return false; // Ship is too long
		  ships[field[row][col]]++; ships[field[row][col] - 1]--;
	} } }
	return [0,4,3,2,1].every((s,i) => s == ships[i]);
  }


validateBattlefield([
	[1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
	[1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
	[1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
	[0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
	[0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
])