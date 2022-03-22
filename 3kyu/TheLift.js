// https://www.codewars.com/kata/58905bfa1decb981da00009e/train/javascript
// 未完成


// TODO 包含上下待处理
var theLift = function (queues, capacity) {
	console.log(queues, capacity)
	let isUp = true; // 电梯是否向上
	let current = 0; // 当前楼层

	// 在哪些楼层停靠了
	const result = [];
	// 当前电梯中要去的楼层
	let toLevel = [];

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

		if (toLevel.length < capacity) {
			if (isUp) {
				// 向上

				// 是否有人上
				const cInfo = kvQueues[current];
				const upL = cInfo[1].filter(to => to > cInfo[0])
				if (upL.length) {
					isStop = true;
					toLevel.push(...upL);
					kvQueues[current][1] = cInfo[1].filter(ele => !upL.includes(ele))
				}
			} else {
				// 向下
				const cInfo = kvQueues[current];
				const upL = cInfo[1].filter(to => to < cInfo[0])
				if (upL.length) {
					isStop = true;
					toLevel.push(...upL);
					kvQueues[current][1] = cInfo[1].filter(ele => !upL.includes(ele))
				}
			}
		}

		isStop && result.push(current);
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
	[],
	[4, 4, 4, 4],
	[],
	[2, 2, 2, 2],
	[],
	[]
], 2)