let lines = [];
let input = require('fs').readFileSync('2024stdinD3', 'utf8').split('mul').forEach((value, idx, arr) =>{
    if ((value.search(/\(\d+,\d+\)/) === 0)) {
        lines.push(value.match(/\((\d+),(\d+)\)/));
    }
});
let sum = 0;

lines.forEach((value, idx, arr) => {
    sum += value[1] * value[2];
})

console.log(sum);