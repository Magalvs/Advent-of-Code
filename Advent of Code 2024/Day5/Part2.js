let input = require('fs').readFileSync('2024stdinD5', 'utf8').split('\n');
let rules = [];
let updates = [];
let sum = 0;

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

updates.forEach((value) => {
    if (value.length !== 1) {
       correctArrays(rules, value);
    }
}) 

console.log(sum);

function correctArrays(arr1, arr2, bol = false) {
    let startingArr = new Array(...arr2);

    for (let i = 0; i < arr1.length; i++) {
        if (arr2.includes(arr1[i][0]) && arr2.includes(arr1[i][1]) && arr2.indexOf(arr1[i][0]) > arr2.indexOf(arr1[i][1])) {
            arr2.splice(arr2.indexOf(arr1[i][0]), 1, arr1[i][1]);
            arr2.splice(arr2.indexOf(arr1[i][1]), 1, arr1[i][0]);
        }
    }
    if (!startingArr.every((value, idx) => value === arr2[idx])) {
        correctArrays(arr1, arr2, true);
    }
    else if (bol) {
        sum += parseInt(arr2[Math.floor(arr2.length/2)]);
    }
}