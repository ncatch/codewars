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
// console.log(decodeRailFenceCipher(" vaeegVlr tdqemr  ,xa ci osooieaica erueteuse eueiniod ios asresaqeice i stvsi naep undite lvinmporciatmiAisueir P mn irfe .r tmism iruioeiit nfitmenu ipkeaeet sri  o rf   tbre iutaaapunueaes ,atiast usostpnu!oroei x m pnimD! !ju artflced  tdt", 49))

var str = 'pt  i poaitvrcar emua talmnejA euue sqcuferea iaier!d e usraimn ii.sesetemaesbur t arnip umauiiit  !pVeod ei Donacxio,nedtrsv,otd t iiiaamrmtrlgpnt ducu!o ts i tnste resme  iqko tteiuises aeo aie eceosntfsvfmifeu   rin saooe lrp P ii nurxii e i';

var enCode = encodeRailFenceCipher(str, 13)
console.log(enCode)
console.log(decodeRailFenceCipher(enCode, 13))


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