let input = require('fs').readFileSync('2024stdinD2', 'utf8').split('\n');
let lines = [];
let safeReports = 0;
const safeDiff = [1,2,3];

input.forEach((value) => {
    lines.push(value.trim().split(' '))
})

validateArrays(lines);

function validateArrays(arr) {
    let diff = 0;
    let tempDiff = 0;

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (j === 0) {
                diff = arr[i][j+1] - arr[i][j];
            }
            tempDiff = arr[i][j+1] - arr[i][j];

            if ((safeDiff.includes(Math.abs(diff)) && safeDiff.includes(Math.abs(tempDiff))) === true && (Math.sign(diff) === Math.sign(tempDiff))) {
                if (j === arr[i].length - 2) {
                    safeReports += 1;
                }
            }
            else {
                break;
            }
        }
    }
    console.log(safeReports);
}