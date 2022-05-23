// https://www.codewars.com/kata/58905bfa1decb981da00009e/train/javascript
// 已解决

var theLift = function (queues, capacity) {
	console.log(queues, capacity)
	let isUp = true; // 电梯是否向上
	let current = 0; // 当前楼层

	// 在哪些楼层停靠了
	const result = [];
	// 当前电梯中要去的楼层
	let toLevel = [];

	// 还有几个空位
	const getEmpty = () => capacity - toLevel.length;

	const kvQueues = Object.entries(queues);

	while (kvQueues.find(ele => ele[1].length) || toLevel.length) {
		// 是否停靠
		let isStop = false;

		if (current >= queues.length - 1) {
			isUp = false;
		} else if (current <= 0) {
			isUp = true;
		}

		// 是否有人下
		if (toLevel.includes(current)) {
			isStop = true;
			toLevel = toLevel.filter(ele => ele != current);
		}

		const cInfo = kvQueues[current];
		const tmpty = getEmpty();

		let upL;

		if (isUp) {
			// 向上
			upL = cInfo[1].filter(to => to > cInfo[0])
		} else {
			// 向下
			upL = cInfo[1].filter(to => to < cInfo[0])
		}

		if (upL && upL.length) {
			// TODO 处理满员
			const add = upL.slice(0, tmpty);

			isStop = true;
			toLevel.push(...add);

			add.forEach(ele => {
				const index = cInfo[1].findIndex(e => e == ele);

				cInfo[1][index] = null;
			})
			
			kvQueues[current][1] = cInfo[1].filter(ele => ele != null)
		}

		isStop && result[result.length - 1] !== current && result.push(current);
		current += isUp ? 1 : -1;
	}

	if (result[result.length - 1] != 0) {
		result.push(0)
	}
	if (result[0] != 0) {
		result.unshift(0)
	}

	return result;
}



theLift([
	[],
	[ 0, 0, 0, 0 ],
	[ 0, 0, 0, 0 ],
	[ 0, 0, 0, 0 ],
	[ 0, 0, 0, 0 ],
	[ 0, 0, 0, 0 ],
	[ 0, 0, 0, 0 ]], 5)