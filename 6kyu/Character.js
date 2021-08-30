// https://www.codewars.com/kata/586d6cefbcc21eed7a001155/train/javascript


function longestRepetition(s) {
	let tmp = {}
	let res = {
		str: '',
		count: 0,
	}

	let pre = '';

	s.split('').forEach(ele => {
		if (!tmp[ele] || ele != pre) {
			tmp[ele] = 0;
			pre = ele;
		};
		
		tmp[ele]++;

		if (tmp[ele] > res.count) {
			res.str = ele;
			res.count = tmp[ele];
		}
	});

	return [res.str, res.count];
}

longestRepetition("bbbaaabaaaa")