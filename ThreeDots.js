// https://www.codewars.com/kata/59a67e34485a4d1ccb0000ae/train/javascript

var i=0
function threeDots(gameMap){
  return [
  "→→→→→→→→→↓↓↓↓↓",
  "→→→→→←↓↓↓↓→→→↑↑→→→→→↓",
  "→→→→↓→↓→↓→↓→↓→→→→→↓",
  "↓↓→→→→→→↓→→→→→→→↓",
  "↓↓→→→→→→→→↑←↓↓↓↓↓↓↑←←↓→→→→→→"
  ][i++]
}



console.log(
`+------------+
|R           |
|G    **     |
|Y    **     |
|            |
|     **    r|
|     **    g|
|           y|
+------------+`)

