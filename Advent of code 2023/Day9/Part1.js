let input = require('fs').readFileSync('stdinD9', 'utf8').split('\n')
let lines = [];
let extrapolatedValues = [];
let count = 0;
let amount = 0;

input.forEach((element) => {
    lines.push(element.trim().split(' '));
})
lines.forEach((element) => {
    element.map((value, index, arr) => {
        arr[index] = parseInt(value);
    })
})

function createSequences(arr) {
        extrapolatedValues.push(count);
        count = 0;

    if (typeof(arr[0]) === 'number') {
        count += (arr[arr.length - 1]);

        arr.map((value, index, arr) => {
            arr[index] = typeof(arr[index+1]) === 'number' ? arr[index+1] - value : 0; 
        })
        arr.pop();
        
        if (arr.some((value, idx, arr) => value !== arr[0])) {
            createSequences(arr);
        }
        else {
            count += arr[arr.length -1];
        }
    }
    else {
        arr.forEach((element) => {
            amount += 1;
            createSequences(element);
        })
        extrapolatedValues.push(count);
    }
}

createSequences(lines);
console.log(extrapolatedValues, extrapolatedValues.reduce((a, b) => a + b));

