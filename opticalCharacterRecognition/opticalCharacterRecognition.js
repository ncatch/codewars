// https://www.codewars.com/kata/5ec9e176721b990029ebce83/train/javascript

class Image {
	constructor(w, h, data) {
		this.pixels = data.slice();
		this.width = w;
		this.height = h;
	}
}

let imageData = new Image(13, 18, [
	0xff, 0xff, 0xff, 0xc0, 0xad, 0xad, 0xad, 0xad, 0xaf, 0xe8, 0xff, 0xff, 0xff,
	0xff, 0xff, 0xda, 0x2, 0x0, 0x0, 0x0, 0x0, 0x0, 0x3c, 0xff, 0xff, 0xff,
	0xff, 0xff, 0xd4, 0x0, 0x0, 0x28, 0x2e, 0xe, 0x0, 0x37, 0xff, 0xff, 0xff,
	0xff, 0xff, 0xd4, 0x0, 0x0, 0xdc, 0xff, 0x50, 0x0, 0x37, 0xff, 0xff, 0xff,
	0xff, 0xff, 0xd4, 0x0, 0x0, 0xdc, 0xff, 0x50, 0x0, 0x37, 0xff, 0xff, 0xff,
	0xff, 0xff, 0xd4, 0x0, 0x0, 0xdc, 0xff, 0x50, 0x0, 0x37, 0xff, 0xff, 0xff,
	0xff, 0xff, 0xd4, 0x0, 0x0, 0xdc, 0xff, 0x50, 0x0, 0x37, 0xff, 0xff, 0xff,
	0xff, 0xff, 0xd4, 0x0, 0x0, 0xdc, 0xff, 0x50, 0x0, 0x37, 0xff, 0xff, 0xff,
	0xff, 0xd3, 0x42, 0x0, 0x0, 0x3a, 0x44, 0x12, 0x0, 0xe, 0x81, 0xf3, 0xff,
	0xd9, 0xb, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x4f, 0xff,
	0xb0, 0x0, 0xb, 0x43, 0x43, 0x43, 0x43, 0x43, 0x43, 0x35, 0x0, 0xa, 0xf1,
	0xad, 0x0, 0x2b, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xc8, 0x0, 0x0, 0xe8,
	0xad, 0x0, 0x2b, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xc8, 0x0, 0x0, 0xe8,
	0xad, 0x0, 0x2b, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xc8, 0x0, 0x0, 0xe8,
	0xad, 0x0, 0x2b, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xc8, 0x0, 0x0, 0xe8,
	0xad, 0x0, 0x2b, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xc8, 0x0, 0x0, 0xe8,
	0xb2, 0x0, 0x8, 0x32, 0x32, 0x32, 0x32, 0x32, 0x32, 0x28, 0x0, 0xe, 0xf5,
	0xe8, 0x1e, 0x15, 0x15, 0x15, 0x15, 0x15, 0x15, 0x15, 0x15, 0x15, 0x6b, 0xff
]);

const template = [
	{
		y: 2,
		x1: 2,
		x1L: 1,
		x1R: 1,
		x2: 2,
		x2L: 1,
		x2R: 1,
	},
	{
		y: 1,
		x1: 1,
		x1L: 0,
		x1R: 1,
		x2: 1,
		x2L: 0,
		x2R: 1,
	},
	{
		y: 3,
		x1: 1,
		x1L: 0,
		x1R: 1,
		x2: 1,
		x2L: 1,
		x2R: 0,
	},
	{
		y: 3,
		x1: 1,
		x1L: 0,
		x1R: 1,
		x2: 1,
		x2L: 0,
		x2R: 1,
	},
	{
		y: 2,
		x1: 2,
		x1L: 1,
		x1R: 1,
		x2: 1,
		x2L: 0,
		x2R: 1,
	},
	{
		y: 3,
		x1: 1,
		x1L: 1,
		x1R: 0,
		x2: 1,
		x2L: 0,
		x2R: 1,
	},
	{
		y: 2,
		x1: 1,
		x1L: 1,
		x1R: 0,
		x2: 2,
		x2L: 1,
		x2R: 1,
	},
	{
		y: 2,
		x1: 1,
		x1L: 0,
		x1R: 1,
		x2: 1,
		x2L: 0,
		x2R: 1,
	},
	{
		y: 3,
		x1: 2,
		x1L: 1,
		x1R: 1,
		x2: 2,
		x2L: 1,
		x2R: 1,
	},
	{
		y: 2,
		x1: 2,
		x1L: 1,
		x1R: 1,
		x2: 1,
		x2L: 0,
		x2R: 1,
	},
]

/**
 * 根据坐标获取像素
 * @param {Number} x X 坐标 从0开始
 * @param {Number} y Y 坐标 从0开始
 * @returns Number
 */
Image.prototype.getPixelByXY = function (x, y) {
	return this.pixels[this.width * y + x];
}

/**
 * 切割数字
 * @returns Array
 */
Image.prototype.getNumbers = function () {
	let startX = -1;
	const numbers = [];

	// 拆分数字
	for (let x = 0; x < this.width; x++) {
		let isEnd = true;

		for (let y = 0; y < this.height; y++) {
			const pixel = this.getPixelByXY(x, y);

			if (pixel == 0) {
				isEnd = false;

				// 第一次出现黑色 记为开始位置
				if (startX < 0) {
					startX = x;
				}
			}
		}

		// 一个数字结束  重新开始找下一个数字
		if (isEnd && startX >= 0 && startX != x) {
			numbers.push({
				sX: startX,
				eX: x,
			})

			startX = -1;
		}
	}

	return numbers;
}

/**
 * 在sX - eX范围内 从左往右 从上往下 找第一个黑色坐标
 * @param {Number} sX 开始 X
 * @param {Number} eX 结束 X
 * @returns 
 */
Image.prototype.getBlackPointByRange = function (sX, eX) {
	for (let x = sX; x <= eX; x++) {
		for (let y = 0; y < this.height; y++) {
			if (this.getPixelByXY(x, y)) {
				return {
					x,
					y
				}
			}
		}
	}
}

/**
 * 去除上下空白
 * @param {Array} arr 
 * @returns Array
 */
function rmTupperAndLower(arr, image) {
	return arr.map(ele => {
		let y = 0;

		ele.sY = -1;

		for (; y < image.height; y++) {
			let isEnd = true;

			for (let x = ele.sX; x <= ele.eX; x++) {
				if (image.getPixelByXY(x, y) == 0) {
					isEnd = false;

					// 第一次出现黑色 记为开始位置
					if (ele.sY < 0) {
						ele.sY = y;
					}
				}
			}

			// 数字结束
			if (isEnd && ele.sY >= 0 && ele.sY != y) {
				ele.eY = y;

				return ele;
			}
		}

		ele.eY = y;
		return ele;
	})
}

/**
 * 获取阈值
 * @param {Array} arr 像素数组
 * @param {Number} preVal 上一次阈值
 * @returns 
 */
function getThreshold(arr, preVal = 0) {
	let val1 = 0, valCount1 = 0, val2 = 0, valCount2 = 0;

	for (let i = 0; i < arr.length; i++) {
		const ele = arr[i];
		if (ele > preVal) {
			val1 += ele;
			valCount1++;
		} else {
			val2 += ele;
			valCount2++;
		}
	}

	const result = (val1 / valCount1 + val2 / valCount2) / 2;

	if (Math.abs(result - preVal) < 10) {
		return result;
	}

	return getThreshold(arr, result);
}

function ocr(image) {
	// 找到阈值
	const effective = image.pixels.filter(ele => ele != 0 && ele != 255)
	let avg = effective.reduce((a, b) => a + b) / effective.length;

	avg = getThreshold(image.pixels, avg);

	// 二值化
	image.pixels = image.pixels.map(ele => ele <= avg ? 0 : 255);

	// 画出image
	drawImage('#canvas', image);

	// 切割
	let numbers = image.getNumbers();

	// 去除上下空白
	numbers = rmTupperAndLower(numbers, image);

	// 对比
	return numbers.map(ele => {
		// 计算 x1(2/5) x2(2/3) y(1/2)
		const yLine = parseInt((ele.sX + ele.eX) / 2);
		const xLine1 = parseInt((ele.sY + ele.eY) * 2 / 5);
		const xLine2 = parseInt((ele.sY + ele.eY) * 2 / 3);

		let yCount = 0,
			x1Count = 0,
			x1CountL = 0,
			x1CountR = 0,
			x2Count = 0,
			x2CountL = 0,
			x2CountR = 0;

		let pre = -1,
			pre2 = -1;

		for (let y = ele.sY; y <= ele.eY; y++) {
			if (!image.getPixelByXY(yLine, y)) {
				if (y - pre > 1) {
					yCount++;
				}

				pre = y;
			}
		}

		pre = -1;
		pre2 = -1;

		for (let x = ele.sX; x <= ele.eX; x++) {
			if (!image.getPixelByXY(x, xLine1)) {
				if (x - pre > 1) {
					if (x < yLine) {
						x1CountL++;
					} else {
						x1CountR++;
					}
					x1Count++;
				}
				pre = x;
			}
			if (!image.getPixelByXY(x, xLine2)) {
				if (x - pre2 > 1) {
					if (x < yLine) {
						x2CountL++;
					} else {
						x2CountR++;
					}
					x2Count++;
				}
				pre2 = x;
			}
		}

		let result = -1;
		let diff = 999999;
		let zeroCount = 0;

		template.forEach((ele, index) => {
			let tmpZero = 0;

			const yDiff = yCount - ele.y;
			const x1Diff = x1Count - ele.x1;
			const x2Diff = x2Count - ele.x2;

			yDiff == 0 && (tmpZero += 2);
			x1Diff == 0 && tmpZero++;
			x2Diff == 0 && tmpZero++;

			let tmp = yDiff + x1Diff + x2Diff;

			// console.log(index, yCount, x1Count, x1CountL, x1CountR, x2Count, x2CountL, x2CountR)
			tmp = Math.abs(tmp);

			if (tmpZero > zeroCount || tmp < diff) {
				diff = tmp;
				result = index;
				zeroCount = tmpZero;
			}
		})

		diff = 999999;

		if ([2, 3, 5].includes(result)) {
			[2, 3, 5].forEach(num => {
				const ele = template[num];

				let tmpZero = 0;

				const yDiff = yCount - ele.y;
				const x1Diff = x1Count - ele.x1;
				const x1DiffL = x1CountL - ele.x1L;
				const x1DiffR = x1CountR - ele.x1R;
				const x2Diff = x2Count - ele.x2;
				const x2DiffL = x2CountL - ele.x2L;
				const x2DiffR = x2CountR - ele.x2R;

				yDiff == 0 && (tmpZero+=2);
				x1Diff == 0 && tmpZero++;
				x1DiffL == 0 && tmpZero++;
				x1DiffR == 0 && tmpZero++;
				x2Diff == 0 && tmpZero++;
				x2DiffL == 0 && tmpZero++;
				x2DiffR == 0 && tmpZero++;

				let tmp = yDiff +
					x1Diff +
					x1DiffL +
					x1DiffR +
					x2Diff +
					x2DiffL +
					x2DiffR;

				tmp = Math.abs(tmp);

				if (tmpZero > zeroCount || tmp < diff) {
					diff = tmp;
					result = num;
					zeroCount = tmpZero;
				}
			})
		}

		return result;
		// return template.findIndex(ele => ele.y == yCount && ele.x1 == x1Count && ele.x2 == x2Count);
	}).join('')
}

/**
 * 7   1
 * 0   9
 * 9   7
 * 
 * 以上值识别混乱  加重y占比？
 */

console.log(ocr(imageData));