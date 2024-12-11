let input = require('fs').readFileSync('2024stdinD1', 'utf8').split(' ').filter(n => n !== ' ');
let lines = [];
let dSum = 0;

input.forEach(element => {
    lines.push(element.split('\n'));    
});
lines = lines.flat().filter(n => n !== '');

console.log(lines);

solveArr(lines);

function solveArr(arr) {
    let tempArr1 = [];
    let tempArr2 = [];

    arr.forEach((value, idx, arr) => {
        if (idx % 2 === 0) {
            tempArr1.push(value);
        }
        else {
            tempArr2.push(value);      
        }
    })

    tempArr1.sort((a,b) => {
        return a - b;
    })
    tempArr2.sort((a,b) => {
        return a - b;
    })
    for (let i = 0; i < tempArr1.length; i++) {
        dSum += Math.abs(tempArr1[i] - tempArr2[i]);
    }
    console.log(dSum);
}