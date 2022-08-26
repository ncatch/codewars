// https://www.codewars.com/kata/5a20eeccee1aae3cbc000090/train/javascript
// https://jingyan.baidu.com/article/6dad5075a92348e023e36e9f.html

// 获取两点的距离
function getDistance(pointA, pointB) {
	return Math.abs(pointA[0] - pointB[0]) + Math.abs(pointA[1] - pointB[1]);
}

// 是否同一个点
function isSamePoint(pointA, pointB) {
    try {
	    return pointA[0] == pointB[0] && pointA[1] == pointB[1];
    } catch (error) {
        return true;
    }
}

function slidePuzzle(arr){
    const maxNumber = Math.pow(arr.length, 2) - 1;
    const max = arr.length;

    // 筛选合法点
    const compliance = function (arr) {
        return arr.filter(ele =>
            ele[0] >= 0 && ele[0] < max &&
            ele[1] >= 0 && ele[1] < max
        )
    }
    // 走到目标点
    const go = function (end, start, pass) {
        if (isSamePoint(start, end)) return true;
    
        const points = compliance([
            [start[0], start[1] - 1],
            [start[0] + 1, start[1]],
            [start[0] - 1, start[1]],
            [start[0], start[1] + 1],
        ])

        let currPoint = null;
        let currDistance = getDistance(start, end);

        points.forEach(ele => {
            // 已经走过
            if (!pass.filter(p => isSamePoint(p, ele)).length) {
                let tmpDistance = getDistance(ele, end);
                if (tmpDistance < currDistance || !currPoint) {
                    currDistance = tmpDistance;
                    currPoint = ele;
                }
            }
        })
    
        if (!currPoint || isSamePoint(start, currPoint)) {
            return false;
        }
    
        toPoint(currPoint);

        if (isSamePoint(currPoint, end)) {
            return true;
        }
    
        return go(end, currPoint, [...pass, currPoint]);
    }
    // 0 到哪个坐标
    const toPoint = function (point) {
        const nextNum = arr[point[0]][point[1]];

        res.push(nextNum);
        // 交换位置
        arr[emptyPoint[0]][emptyPoint[1]] = nextNum;
        arr[point[0]][point[1]] = 0;

        emptyPoint = point;
    }
    // 获取数字当前坐标 [rowIndex, colIndex]
    const getNumPoint = function (num) {
        for (let r = 0; r < arr.length; r++) {
            const row = arr[r];
            
            for (let c = 0; c < row.length; c++) {
                const col = row[c];
                
                if (col == num) {
                    return [r, c]
                }
            }
        }
    }
    // 获取数字应该在的坐标 [rowIndex, colIndex]
    const getNumShouldPoint = function (num) {
        return [parseInt((num - 1) / arr.length), (num - 1) % arr.length]
    }
    // 这个点旁边是不是只有一个格子，并且那个格子的数字应该在这个点
    const isImpasse = function (point, num) {
        // 筛选有效点
        const points = compliance(
            [
                [-1, 0],
                [0, -1],
                [1, 0],
                [0, 1],
            ].map(ele => [point[0] + ele[0], point[1] + ele[1]]) // 计算点
        ).filter(ele => !pass.find(p => isSamePoint(p, ele)));

        if (points.length == 1 && arr[points[0][0]][points[0][1]] == num) {
            return true;
        }

        return false;
    }
    
    // 路径结果
    const res = [];
    const pass = [];

    // 0 所在位置
    let emptyPoint = getNumPoint(0);
    let c = 0, r = 0;

    // 一列一列归位，最后一列会自动归位
    for (; c < max; c++) {
        
        r = 0;
        
        for (; r < max; r++) {
            const num = r * max + c + 1;

            // 最后一个数
            if (num > maxNumber) continue;

            let currPoint = getNumPoint(num);
            const shouldPoint = getNumShouldPoint(num);

            // 位置差
            const diff = [
                Math.abs(currPoint[0] - shouldPoint[0]), // r
                Math.abs(currPoint[1] - shouldPoint[1]), // c
            ]

            const diffUnit = [
                currPoint[0] > shouldPoint[0] ? -1 : 1,
                currPoint[1] > shouldPoint[1] ? -1 : 1
            ]

            function reset(index) {
                // 行归位
                while (diff[index] > 0) {
                    let endPoint;

                    if ((diff[0] + diff[1]) == 1) {
                        if (
                            !isSamePoint(shouldPoint, emptyPoint) && // 应该在的位置不是0
                            isImpasse(shouldPoint, num)// 四周只有一个可动数字并且哪个数字是原本它应该在的位置
                        ) {
                            if (currPoint[1] < (max - 2)) {
                                endPoint = [currPoint[0], currPoint[1] + 1]
                                go(endPoint, emptyPoint, [...pass, currPoint]);

                                // 左 左 上 右 下 右 上 左 左 下 右
                                [
                                    [0, -1],
                                    [0, -1],
                                    [-1, 0],
                                    [0, 1],
                                    [1, 0],
                                    [0, 1],
                                    [-1, 0],
                                    [0, -1],
                                    [0, -1],
                                    [1, 0],
                                    [0, 1],
                                ].forEach(ele => {
                                    toPoint([emptyPoint[0] + ele[0], emptyPoint[1] + ele[1]])
                                })

                                continue;
                            } else {

                            }
                        }
                        endPoint = [...shouldPoint];
                    } else {
                        endPoint = [...currPoint];
                        endPoint[index] += diffUnit[index];
                    }

                    if (pass.find(p => p[0] == endPoint[0] && p[1] == endPoint[1])) break;

                    if (go(endPoint, emptyPoint, [...pass, currPoint, emptyPoint])) {
                        currPoint = [...endPoint];
                        endPoint[index] -= diffUnit[index];
                        toPoint(endPoint);
                        diff[index]--;
                    } else {
                        console.log('没有路径');
                    }
                }
            }

            reset(0);
            reset(1);

            pass.push(shouldPoint);
        }
    }

    return res;
}

slidePuzzle([
    [ 10, 3, 6, 4 ],
    [ 1,  5, 8, 0 ],
    [ 2,  13,7, 15 ],
    [ 14, 9, 12,11 ]
])

/**
 * [1, 2, 3],
 * [4, 5, 6],
 * [7, 8, 9],
 */
