let input = require('fs').readFileSync('2024stdinD1', 'utf8').split(' ').filter(n => n !== ' ');
let lines = [];
let dSum = 0;

input.forEach(element => {
    lines.push(element.split('\n'));    
});
lines = lines.flat().filter(n => n !== '');
lines.forEach((element, idx, arr) => {
    arr[idx] = element.trim();
})

console.log(lines);

solveArr(lines);
console.log(dSum);

function solveArr(arr) {
    let tempArr1 = [];
    let tempArr2 = [];
    let tempSum = 0;

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
        if (tempArr1[i] === tempArr1[i-1]) {
            dSum += tempSum * tempArr1[i];
        }
        else {
            tempSum = 0;
            for (let j = 0; j < tempArr2.length; j++) {
                if (tempArr1[i] === tempArr2[j]) {
                    tempSum += 1;
                    tempArr2.splice(j,1);
                    j--;
                }
            }
            dSum += tempSum * tempArr1[i];
        }
    }
    console.log(tempArr1, tempArr2);
}