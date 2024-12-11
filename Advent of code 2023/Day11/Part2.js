let input = require('fs').readFileSync('stdinD11', 'utf8').split('\n');
let lines = [];
let shortestPathArr = [];
let sum = 0;
let callCount = 0;

input.forEach((value) => {
    lines.push(value.trim().split('').map((n) => {
        return {
            value: n,
            xAxis: 1,
            yAxis: 1
        }
    }));
})

expandMatrix(lines);
console.log(sum);

function expandMatrix(arr) {
    let tempArr1 = [];

    for (let i = 0; i < arr.length; i++) {
        if ((arr[i].filter(n => n.value !== '.').length === 0) && callCount === 0) {
            arr[i].map(n => n.yAxis = 1000000);
        }
        else if ((arr[i].filter(n => n.value !== '.').length === 0) && callCount === 1) {
            arr[i].map(n => n.xAxis = 1000000);
        }
    }
    if (callCount < 1) {
        transposeMatrix(arr);
    }
    else {
        tempArr1 = transposeMatrix(arr);
    }
}

function transposeMatrix(arr) {
    let tempRow = [];
    let tempArr2 = [];
    callCount++;

    for (let i = 0; i < arr[0].length; i++) {
        for (let j = 0; j < arr.length; j++) {
            tempRow.push(arr[j][i]);
        }
        tempArr2.push(tempRow);
        tempRow = [];
    }
    if (callCount < 2) {
        expandMatrix(tempArr2);
    }
    else {
        getDistances(tempArr2);
    }
}

function getDistances(arr) {
    let xDiff, yDiff = 0;

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j].value === '#') {
                shortestPathArr.push([i,j]);
            }
        }
    }

    while (shortestPathArr.length > 0) {
        for (let i = 1; i < shortestPathArr.length; i++) {
            let yCoord = shortestPathArr[0][0], xCoord = shortestPathArr[0][1];

            shortestPathArr[i] ? (yDiff = (shortestPathArr[i][0] - shortestPathArr[0][0]) 
                                , xDiff = (shortestPathArr[i][1] - shortestPathArr[0][1]))
                               : (xDiff = xCoord, yDiff = yCoord);

            while ((((-1*Math.abs(xDiff))+shortestPathArr[0][1]) < xCoord && xDiff < 0) || (xCoord < (Math.abs(xDiff)+shortestPathArr[0][1]) && xDiff > 0)) {
                if (xDiff > 0) {
                    sum += arr[yCoord][xCoord+1].xAxis;
                    xCoord +=1;
                }
                else if (xDiff < 0) {
                    sum += arr[yCoord][xCoord-1].xAxis;
                    xCoord -=1;
                }
            }
            while ((((-1*Math.abs(yDiff))+shortestPathArr[0][0]) < yCoord && yDiff < 0) || (yCoord < (Math.abs(yDiff)+shortestPathArr[0][0]) && yDiff > 0))  {
                if (yDiff > 0) {
                    sum += arr[yCoord+1][xCoord].yAxis;
                    yCoord +=1;
                }
                else if (yDiff < 0) {
                    sum += arr[yCoord-1][xCoord].yAxis;
                    yCoord -=1;
                }
            }
        }
        shortestPathArr.splice(0,1);
    }
}