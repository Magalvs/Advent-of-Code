let input = require('fs').readFileSync('2024stdinD5', 'utf8').split('\n');
let rules = [];
let updates = [];
let sumOfMiddleVal = 0;

input.forEach((value) => {
    if (value.length === 5) {
        rules.push(value.trim().split('|'))
    }
    else {
        if (value !== '\r') {
            updates.push(value.trim().split(','))
        }
    }
})


updates.forEach((v) => {
    matchPairs(v);
})

console.log(sumOfMiddleVal);

function matchPairs(arr) {
    let tempArr = new Array(...arr);
    for (let i = 0; i < arr.length; i++) {
        tempArr.splice(0,1);

        for (let j = 0; j < tempArr.length; j++) {
            const found = rules.some(innerArray => innerArray.every((value, index) => {
                return value === new Array(arr[i], tempArr[j])[index];
            }))

            if (!found) {
                return;
            }
            else if (found && (i === arr.length-2 && j === tempArr.length-1)){
                console.log(arr);
                sumOfMiddleVal += parseInt(arr[Math.floor(arr.length/2)]);
            }
        }
    }
}
