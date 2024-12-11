let input = require('fs').readFileSync('2024stdinD3', 'utf8').split(/(do)\(\)|(don't)\(\)/);
let lines = [];
let sum = 0;

input = input.filter((n) => {
    return n !== undefined;
})

doOrDont(input);
console.log(sum);

function doOrDont(arr) {
    let bol = false;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 'do') {
            bol = true;
        }
        else if (arr[i] === "don't") {
            bol = false;
        }
        
        if (bol && arr[i] !== 'do') {
            let tempArr = [...arr[i].matchAll(/mul\((\d+),(\d+)\)/g)];
            lines.push(tempArr);
        }
    }
    lines = lines.flat(1);

    for (let i = 0; i < lines.length; i++) {
        sum+= lines[i][1] * lines[i][2];
    }
}