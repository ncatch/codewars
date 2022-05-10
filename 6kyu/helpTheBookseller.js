// https://www.codewars.com/kata/54dc6f5a224c26032800005c/train/javascript
// 已解决

// b = ["ABAR 200", "CDXE 500", "BKWR 250", "BTSQ 890", "DRTY 600"]
// c = ["A", "B"]
// res = "(A : 200) - (B : 1140)"

function stockList(listOfArt, listOfCat){
	// ... 
  let has = false;
  
	const result = listOfCat.map(ele => {
		const tmp = listOfArt.filter(item => item.startsWith(ele));

		let result = 0;

		tmp.forEach(item => {
			result += parseInt(item.split(' ')[1]);
		});
    
    if (result > 0) has = true;

		return `(${ele} : ${result})`
	})
  
  return has ? result.join(' - ') : ''
}