// https://www.codewars.com/kata/58e61f3d8ff24f774400002c

// mov x, y - 将 y（整数或寄存器的值）复制到寄存器 x 中。
// inc x - 将寄存器 x 的内容加一。
// dec x - 将寄存器 x 的内容减一。
// add x, y - 将寄存器 x 的内容与 y（整数或寄存器的值）相加，并将结果存储在 x 中（即 register[x] += y）。
// sub x, y - 从寄存器 x 中减去 y（整数或寄存器的值）并将结果存储在 x 中（即 register[x] -= y）。
// mul x, y - 与乘法相同（即 register[x] *= y）。
// div x, y - 与整数除法相同（即 register[x] /= y）。
// label:- 定义一个标签位置（label = identifier + ":"，一个标识符是一个不匹配任何其他命令的字符串）。跳转命令和call针对程序中的这些标签位置。
// jmp lbl- 跳转到标签lbl。
// cmp x, y- 比较 x（整数或寄存器值）和 y（整数或寄存器值）。结果用于条件跳转 ( jne, je, jge, jg, jleand jl)
// jne lbl-lbl如果前一个cmp命令的值不相等，则跳转到标签。
// je lbl-lbl如果前一个cmp命令的值相等，则跳转到标签。
// jge lbl-lbl如果 x 大于或等于前一个cmp命令中的y，则跳转到标签。
// jg lbl-lbl如果在上一个cmp命令中x 大于 y，则跳转到标签。
// jle lbl-lbl如果 x 小于或等于前一个cmp命令中的y，则跳转到标签。
// jl lbl-lbl如果在上一个cmp命令中x 小于 y，则跳转到标签。
// call lbl- 调用由 标识的子程序lbl。当ret在子程序中找到 a 时，指令指针应返回到该命令旁边的call指令。
// ret- 当ret在子程序中找到 a 时，指令指针应返回到调用当前函数的指令。
// msg 'Register: ', x- 该指令存储程序的输出。它可能包含文本字符串（由单引号分隔）和寄存器。参数的数量不受限制，并且会因程序而异。
// end - 此指令表示程序正确结束，因此返回存储的输出（如果程序在没有此指令的情况下终止，则应返回默认输出：见下文）。
// ; comment - 在程序执行期间不应考虑注释。

function assemblerInterpreter(program) {
	let indexArr = [0];
	let labelArr = ['main'];
	let isEnd = false;
	let cmp = '';
	let msg = -1;
	let instruct = '';
	const _register = {};

	const register = new Proxy(_register, {
		get (target, key) {
			if (target.hasOwnProperty(key)) {
				return target[key]
			}
			return key;
		},
		set (target, key, val) {
			if (isNaN(val)) {
				target[key] = target[val]
			} else {
				target[key] = parseInt(val);
			}
		}
	});

	const ins = parseInstruct(program);

	do {
		let index = indexArr.pop();
		const label = labelArr.pop();
		let labelEnd = false;
		let isCall = false;

		instruct = ins[label][index];

		if (instruct) {
			instruct = instruct.split(' ');
			const insKey = instruct.shift();
			let pars = parseParams(ins[label][index].replace(insKey, ''));

			const insFun = {
				mov: (key, val) => register[key] = val,
				inc: (key) => register[key]++,
				dec: (key) => register[key]--,
				add: (a, b) => register[a] += register[b],
				sub: (a, b) => register[a] -= register[b],
				mul: (a, b) => register[a] *= register[b],
				div: (a, b) => register[a] /= register[b],
				jmp: (lbl) => {
					isCall = true;

					indexArr.push(index + 1);
					labelArr.push(label);

					indexArr[labelArr.length - 1] = 0;
					labelArr[labelArr.length - 1] = lbl;
				},
				call: (lbl) => {
					isCall = true;
					
					indexArr.push(index + 1);
					labelArr.push(label);

					indexArr.push(0);
					labelArr.push(lbl);
				},
				jne: (lbl) => cmp[0] != cmp[1] && insFun.jmp(lbl),
				je: (lbl) => cmp[0] == cmp[1] && insFun.jmp(lbl),
				jge: (lbl) => cmp[0] >= cmp[1] && insFun.jmp(lbl),
				jg: (lbl) => cmp[0] > cmp[1] && insFun.jmp(lbl),
				jle: (lbl) => cmp[0] <= cmp[1] && insFun.jmp(lbl),
				jl: (lbl) => cmp[0] < cmp[1] && insFun.jmp(lbl),
				cmp: (a, b) => cmp = [register[a], register[b]],
				msg: (...arg) => {
					if (arg.find(ele => ele.length == 1 && 'abcdefghijklmnopqrstuvwxyz'.indexOf(ele) >= 0 && !_register.hasOwnProperty(ele))) {
						msg = -1
					} else {
						msg = arg.map(ele => register[ele]).join('')
					}
				},
				end: () => isEnd = hasResult = true,
				ret: () => labelEnd = hasResult = true,
			}

			insFun[insKey](...pars)
		} else {
			if (label != 'main') {
				msg = -1;
				labelEnd  = true;
			}
		}

		if (!labelEnd && !isCall) {
			indexArr.push(++index);
			labelArr.push(label)
		}
	} while (!isEnd);

	return msg;
}

function parseInstruct(str) {
	const instructs = str.split('\n');

	const result = {
		main: [],
	}

	let key = 'main';

	instructs.forEach(instruct => {
		instruct = instruct.split(';')[0].trim();

		if (!instruct) return;

		if (instruct.endsWith(':')) {
			key = instruct.replace(':', '');
			result[key] = [];
		} else if (instruct == 'ret') {
			result[key].push(instruct);
			key = 'main';
		} else {
			result[key].push(instruct);
		}
	})

	return result;
}

function parseParams (str) {
	str = str.trim();

	if (str.indexOf(' ') < 0) return [str];

	const res = [];

	do {
		let end;
		let next;

		if (str.startsWith('\'')) {
			// 字符串处理
			str = str.substring(1);

			end = str.indexOf('\'');
			next = 3;
		} else {
			end = str.indexOf(', ');
			next = 2;
		}

		if (end < 0) {
			// 最后一个参数
			end = undefined
		}

		res.push(str.substring(0, end));

		str = str.substring((end || 0) + next);
	} while (str.length);

	return res;
}

parseParams(`a, 11`)

console.log(assemblerInterpreter(
	`mov a, 6   ; instruction mov a, 6
	mov h, 13   ; instruction mov h, 13
	call func
	msg 'Random result: ', u
	end
	
	func:
		cmp a, h
		jl exit
		mov u, a
		div u, h
		ret
	; Do nothing
	exit:
		msg 'Do nothing'`
));
