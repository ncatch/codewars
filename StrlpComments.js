function solution(input, markers) {
  const rows = input.split('\n');

  return rows.map(ele => {
	let str = ele;

	markers.forEach(e => {
		const tmp = str.indexOf(e);
		if (tmp >= 0) {
			str = str.substr(0, tmp).trim();
		}
	})

	return str;
  }).join('\n');
};


console.log(solution("apples, plums % and bananas\npears\noranges !applesauce", ["%", "!"]) === "apples, plums\npears\noranges");