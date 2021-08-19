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

const dic3 = {
	"RRR": "R",
	"RRG": "B",
	"RRB": "G",
	"RGR": "B",
	"RGG": "R",
	"RGB": "G",
	"RBR": "G",
	"RBG": "B",
	"RBB": "R",
	"GRR": "G",
	"GRG": "B",
	"GRB": "R",
	"GGR": "R",
	"GGG": "G",
	"GGB": "R",
	"GBR": "B",
	"GBG": "R",
	"GBB": "G",
	"BRR": "B",
	"BRG": "R",
	"BRB": "G",
	"BGR": "G",
	"BGG": "B",
	"BGB": "R",
	"BBR": "R",
	"BBG": "G",
	"BBB": "B"
}

function triangle(row) {
	// Return the answer
	if (row.length <= 1) return row;

	let result = '';

	for (let index = 0; index < row.length - 1; index++) {
		result += dic[row[index] + row[index + 1]];
	}

	return triangle(result);
}

function triangle2 (row) {
	console.log(row)
	if (row.length === 3) return dic3[row];
	if (row.length === 2) return dic[row];
	if (row.length <=1) return row;
	
	let result = '';

	for (let index = 1; index < row.length - 1; index++) {
		result += dic3[row[index - 1] + row[index] + row[index + 1]];
	}

	return triangle2(result);
}


console.log(triangle2('RBRGBRBGGRRRBGBBBGG'));

function renderTestData () {
	const tmp = {
		1: 'R',
		2: 'G',
		3: 'B',
	}

	let result = new Array(100).fill('').map(() => tmp[parseInt(3*Math.random())+1]);
	
	console.log(result.join(''));
}

// renderTestData();

// R B R G B R B B
//  G G B R G G B
//   G R G B G R
//    B B R R B
//     B G R G
//      R B B
//       G B


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
