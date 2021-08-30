// https://www.codewars.com/kata/5a25ac6ac5e284cfbe000111/train/javascript
// https://www.codewars.com/kata/insane-coloured-triangles

// R   G  B
// 00 01 10

const dic = {
	'GG': 'G',
	'GB': 'R',
	'GR': 'B',

	'BB': 'B',
	'BG': 'R',
	'BR': 'G',

	'RR': 'R',
	'RG': 'B',
	'RB': 'G'
}

// R B R G B R B B
//  G G B R G G B
//   G R G B G R
//    B B R R B   节点
//     B G R G
//      R B B
//       G B
//        R


// R : 0
// G : 1
// B : 2
// 3


// 0 2 0 1 2 0 2
//  G G B R G G
//   G R G B G
//    B B R R
//     B G R
//      R B
//       G

// R B R G B R B G G R R R B G B B B G G
// 0 2 0 1 2 0 2 1 1 0 0 0 2 1 2 2 2 1 1




function rule(a, b) {
	if (a == b) {
		return a;
	}
	if (a != 'R' && b != 'R') {
		return 'R';
	}
	if (a != 'G' && b != 'G') {
		return 'G';
	}
	if (a != 'B' && b != 'B') {
		return 'B';
	}
	return "";
}

function reduceSimple(row) {
	var retval = "";
	for (var i = 0; i < row.length - 1; ++i) {
		retval += rule(row[i], row[i + 1]);
	}
	return retval;
}

function reduce(row) {
	var windowsize = 1;
	while (windowsize * 3 + 1 < row.length) {
		windowsize = windowsize * 3;
	}
	if (windowsize == 1) {
		var retval = reduceSimple(row);
		return retval;
	}
	var retval = "";
	for (var x = 0; x < row.length - windowsize; ++x) {
		retval += rule(row[x], row[x + windowsize]);
	}
	return retval;
}

function triangle(row) {
	while (row.length > 1) {
		row = reduce(row);
	}
	return row;
}

console.log(triangle('RBRGBRBGGRRRBGB'));

// R B R G B R B G G R R R B G B B B G G
//