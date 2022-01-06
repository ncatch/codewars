// https://www.codewars.com/kata/58e24788e24ddee28e000053/train/javascript

// mov x y- 将y（常量值或寄存器的内容）复制到寄存器中x
// inc x- 将寄存器的内容x加一
// dec x- 将寄存器的内容减x一
// jnz x y- 跳转到一条y远离的指令（正表示向前，负表示向后，y 可以是寄存器或常数），但前提是x（常数或寄存器）不为零

function simple_assembler(program) {
	let index = 0;
	const storage = new Proxy({}, {
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

	function run (instruct) {
		instruct = instruct.split(' ');

		const storageKey = instruct[1];
		const value = instruct[2];

		instruct = instruct[0];

		switch (instruct) {
			case 'mov':
				storage[storageKey] = value;
				break;
			case 'inc':
				storage[storageKey]++;
				break;
			case 'dec':
				storage[storageKey]--;
				break;
			case 'jnz':
				if (storage[storageKey] != 0) {
					index += parseInt(value);
					return;
				}
		}

		index++;
	}

	do {
		run(program[index]);
	} while (index < program.length);

	return storage;
}




console.log(simple_assembler(['mov a -10','mov b a','inc a','dec b','jnz a -2'])); // {'a': 1}
