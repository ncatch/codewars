// https://www.codewars.com/kata/571b93687beb0a8ade000a80/train/javascript

function solveIt(excel){
	//coding and coding
	const rows = excel.length;
	const columns = excel[0].length;

	const sum = excel[rows - 1][columns - 1];

	let count = 0;
	for (let i = 0; i < columns - 1; i++) {
		count += excel[rows - 1][i];
	}

	if (count == sum) {
		// 行有错误
		for (let y = 0; y < rows - 1; y++) {
			let count = 0;
			for (let x = 0; x < columns - 1; x++) {
				count += excel[y][x];
			}
			if (count != excel[y][columns - 1]) {
				return excel[y][columns - 1];
			}
		}
	} else {
		// 列有错误
		for (let y = 0; y < columns - 1; y++) {
			let count = 0;
			for (let x = 0; x < rows - 1; x++) {
				count += excel[x][y];
			}
			if (count != excel[rows - 1][y]) {
				return excel[rows - 1][y];
			}
		}
	}
}


console.log(solveIt([
    [1 ,2 ,3 ,6 ],
    [4 ,5 ,6 ,15],
    [7 ,8 ,9 ,24],
    [12,15,18,45]
]))