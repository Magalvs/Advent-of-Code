let input = require('fs').readFileSync('stdinD9', 'utf8').split('\n')
let lines = [];
let extrapolatedValues = [];
let count = 0;
let order = 0;

input.forEach((element) => {
    lines.push(element.trim().split(' '));
})
lines.forEach((element) => {
    element.map((value, index, arr) => {
        arr[index] = parseInt(value);
    })
})

function createSequences(arr, num = 0) {
    extrapolatedValues.push(count);
    count = 0;

if (typeof(arr[0]) === 'number') {
    if (num % 2 === 0) {
        count += arr[0];
    }
    else {
        count -= arr[0];
    }

    arr.map((value, index, arr) => {
        arr[index] = typeof(arr[index+1]) === 'number' ? arr[index+1] - value : 0; 
    })
    arr.pop();
    
    if (arr.some((value, idx, arr) => value !== 0)) {
        num++;
        createSequences(arr, num);
    }
}
else {
    arr.forEach((element) => {
        createSequences(element);
    })
    extrapolatedValues.push(count);
}
}

createSequences(lines);
console.log(extrapolatedValues, extrapolatedValues.reduce((a, b) => a + b));