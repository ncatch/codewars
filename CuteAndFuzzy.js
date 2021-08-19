/*
 * @Description: 
 * @Author: Walker
 * @Date: 2021-03-26 21:15:19
 * @LastEditTime: 2021-06-11 17:17:23
 * @LastEditors: Walker
 */
// 未解决
// https://www.codewars.com/kata/59669eba1b229e32a300001a/train/javascript

function wire_DHD_SG1(existingWires) {
	const map = existingWires.split('\n').map(ele => ele.split(''));

	console.log(map);
	// return 'Oh for crying out loud...';
}

wire_DHD_SG1(`XX.S.XXX..
XXXX.X..XX
...X.XX...
XX...XXX.X
....XXX...
XXXX...XXX
X...XX...X
X...X...XX
XXXXXXXX.X
G........X`)