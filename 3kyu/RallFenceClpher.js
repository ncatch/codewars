// https://www.codewars.com/kata/58c5577d61aefcf3ff000081

function encodeRailFenceCipher(string, numberRails) {
	const strArr = string.split('');
	const result = new Array(numberRails).fill(0).map(() => []);
	let row = 0;
	let diff = 1;

	do {
		result[row].push(strArr.shift())

		if (row >= numberRails - 1) {
			diff = -1;
		} else if (row == 0) {
			diff = 1;
		}

		row += diff;

	} while (strArr.length);

	return result.map(ele => ele.join('')).join('')
}

function decodeRailFenceCipher(string, numberRails) {
	if (!string) return string;

	// code
	let oriArr = string.split('');
	const strArr = [...oriArr];
	const result = new Array(numberRails).fill(0).map(() => []);

	for (let index = 0; index < oriArr.length; index += 2 * (numberRails - 1)) {
		result[0].push(strArr.shift())
	}

	for (let index = 1; index < numberRails; index++) {
		let count;

		if (index == numberRails - 1) {
			// 上一个长度的一半
			count = result[index - 1].length / 2
		} else if (index == 1) {
			// 上一个长度的 (length - 1) * 2
			count = (result[index - 1].length - 1) * 2
		} else {
			count = result[index - 1].length
		}

		for (let i = 0; i < count; i++) {
			result[index].push(strArr.shift())
		}
	}

	// TODO 处理多出的数据


	let resultStr = '';
	let row = 0;

	do {
		resultStr += result[row].shift()

		if (row >= numberRails - 1) {
			diff = -1;
		} else if (row == 0) {
			diff = 1;
		}

		row += diff;

	} while (resultStr.length < string.length);


	return resultStr
}

/**
 * 
 *	W       E       C       R       L       T       E
 *		E   R   D   S   O   E   E   F   E   A   O   C  
 *			A       I       V       D       E       N    
 */
// "WEAREDISCOVEREDFLEEATONCE"
// console.log('WECRLTEERDSOEEFEAOCAIVDEN')
// console.log(encodeRailFenceCipher("r!seu semta siianseo  pmevtaei,so  ui imteofsnqsiaciq a ntieits  uc  rotrm s,itne e  pip ioV fuete mekurt in   stoeeiaa i ubir ensusmimtnixedveipotgattiD! sajla eereiumoPfier uuafo Aritoepin!sdtixc dolrcadi a t inudp m anre  .iecr avurra erulee", 37));


// WEAREDISCOVEREDFLEEATONCE
console.log(decodeRailFenceCipher(" uriisndeiatDeeruaeoc iiuiieup cs siepntme!n cnfteoiouau p,riqf mfxsuioetaoqi  sanioAP o !  nie  nrl  otsiaeeil x!milvpma   mr  sd ,trmernfatc inttetir ta suiaeed  mktaritr veear ipgucs treu si i.venV  jeeuaeembrupaiotea d ea  itsdisosiostru em", 49))


// WIREEEDSEEEACAECVDLTNROFO

/**
 * W           D           C           L           O
 *   I       E   S       A   A       D   T       F
 *     R   E       E   E       E   V       N   O
 *       E           E           C           R
 * 
 * WIREE
 * IESAADTF
 * REEEEVNO
 * EECR
 */