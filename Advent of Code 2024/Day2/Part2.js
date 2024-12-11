let input = require('fs').readFileSync('2024stdinD2', 'utf8').split('\n');
let lines = [];
let safeReports = 0;
let originalArr;
const safeDiff = [1,2,3];

input.forEach((value) => {
    lines.push(value.trim().split(' '))
})

validateArrays(lines);
console.log(safeReports);

function validateArrays(arr) {
    let correction = 0;
    for (let i = 0; i < arr.length; i++) {
        originalArr = arr[i];
        testApart(arr[i], correction);
    }
}

function testApart(arr, param0, param1, param2, param3 = false) {
    for (let j = 0; j < arr.length; j++) {
        param2 = arr[j+1] - arr[j];

        if (j === 0) {
            param1 = param2;
        }
        else {
            param1 = arr[j] - arr[j-1];
        }
        
        if ((safeDiff.includes(Math.abs(param1)) && safeDiff.includes(Math.abs(param2))) === true && 
            (Math.sign(param1) === Math.sign(param2))) {
            if (j === arr.length - 2) {
                if (param3) {
                    return true;
                }
                else {
                    console.log('Is good as it is', originalArr);
                    safeReports += 1;
                    break;
                }
            }
        }
        else if (param0 === 0) {
            let arrSpliced1 = new Array(...originalArr);
            let arrSpliced2 = new Array(...originalArr);
            let arrSpliced3 = new Array(...originalArr);
            arrSpliced1.splice(j,1);
            arrSpliced2.splice(j+1,1);
            arrSpliced3.splice(j-1,1);

            if (testApart(arrSpliced1, 1, 0, 0, true)) {
                console.log('Needed a correction on the current value', originalArr, arrSpliced1);
                safeReports += 1;
                break;
            }
            else if (testApart(arrSpliced2, 1, 0, 0, true)) {
                console.log('Needed a correction on the next value', originalArr, arrSpliced2);
                safeReports += 1;
                break;
            }
            else if (testApart(arrSpliced3, 1, 0, 0, true)) {
                console.log('Needed a correction on the previous value', originalArr, arrSpliced3);
                safeReports += 1;
                break;
            }
            else {
                console.log('Couldnt be helped', originalArr, '\n___');
                break;
            }
        }
        else {
            console.log(arr[j]);
            return false;
        }
    }
    return;
}