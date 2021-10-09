// https://www.codewars.com/kata/574e890e296e412a0400149c/train/javascript

/**
 * 数字 4
 * 运算符 3
 * 括号 4
 */
//  set_time_limit(0); 
const $values = [5, 5, 5, 1];
const $result = 24;
const $list = [];

makeValue($values);
console.log($list);

function makeValue($values, $set = []) {
	const $words = ["+", "-", "*", "/"];
	if ($values.length == 1) {
		$set.push($values.unshift())
		return makeSpecial($set);
	}

	$values.forEach(($value, index) => {
		const $tmpValues = $values;
		$tmpValues.splice(index, 1)

		$words.forEach($word => {
			makeValue($tmpValues, $set.concat($value, $word));
		});
	});
}

function makeSpecial($set) {
	const $size = $set.length;
	if ($size <= 3 || !$set.includes("/") && !$set.includes("*")) {
		return makeResult($set);
	}
	for (let $len = 3; $len < $size - 1; $len += 2) {
		for (let $start = 0; $start < $size - 1; $start += 2) {
			if (!($set[$start - 1] == "*" || $set[$start - 1] == "/" || $set[$start + $len] == "*" || $set[$start + $len] == "/"))
				continue;
			const $subSet = $set.slice($start, $len);
			if (!$subSet.includes("+") && !$subSet.includes("-"))
				continue;
			let $tmpSet = $set;
			$tmpSet.splice($start, $len - 1);
			$tmpSet[$start] = "(" + $subSet.join('') + ")";
			makeSpecial($tmpSet);
		}
	}
}

function makeResult($set) {
	const $str = $set.join("");

	console.log($str)

	$num = eval($str);

	if ($num == $result && !$list.filter(ele => $str.includes(ele)).length)
		$list = $str;
}