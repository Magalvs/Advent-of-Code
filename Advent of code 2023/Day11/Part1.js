let input = require('fs').readFileSync('stdinD11', 'utf8').split('\n');
let lines = [];
let shortestPathArr = [];
let sum = 0;
let callCount = 0;

input.forEach((value) => {
    lines.push(value.trim().split(''));
})

expandMatrix(lines, callCount);
console.log(sum);


function expandMatrix(arr) {
    let tempArr1 = [];

    for (let i = 0; i < arr.length; i++) {
        if ((arr[i].filter(n => n !== '.').length === 0)) {
            tempArr1.push(arr[i]);
            tempArr1.push(arr[i]);
        }
        else {
            tempArr1.push(arr[i]);
        }
    }

    if (callCount < 1) {
        transposeMatrix(tempArr1);
    }
    else {
        tempArr1 = transposeMatrix(tempArr1);
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
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] === '#') {
                shortestPathArr.push([i,j]);
            }
        }
    }
    console.log(shortestPathArr);
    while (shortestPathArr.length > 0) {
        for (let i = 1; i < shortestPathArr.length; i++) {
            sum += shortestPathArr[i] ?
            Math.abs(shortestPathArr[0][0] - shortestPathArr[i][0]) + Math.abs(shortestPathArr[0][1] - shortestPathArr[i][1]) :
            0;
        }
        shortestPathArr.splice(0,1);
    }
}
