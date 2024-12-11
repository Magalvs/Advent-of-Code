let lines = [];
let input = require('fs').readFileSync('2024stdinD4', 'utf8').split('\n').forEach(n => lines.push(n.trim()));
let count = 0;

console.log(lines);
findXmas(lines);
console.log(count)

function findXmas(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] === 'A') {
                lookUpMatrix(arr, i, j);
            }
        }
    }
}

function lookUpMatrix(arr, row, col) {
    	let m = row; 
        let n = col;
        /* console.log(arr[m-1]?arr[m-1][n-1]:undefined,arr[m-2]?arr[m-2][n-2]:undefined,arr[m-3]?arr[m-3][n-3]:undefined) */
        if (((arr[m-1]?arr[m-1][n-1]==='M':false) &&(arr[m+1]?arr[m+1][n+1]==='S':false)) && ((arr[m-1]?arr[m-1][n+1]==='M':false)&&(arr[m+1]?arr[m+1][n-1]==='S':false))) {
            count++;
        }
        if (((arr[m-1]?arr[m-1][n-1]==='S':false) &&(arr[m+1]?arr[m+1][n+1]==='M':false)) && ((arr[m-1]?arr[m-1][n+1]==='S':false)&&(arr[m+1]?arr[m+1][n-1]==='M':false))) {
            count++;
        }
        if (((arr[m-1]?arr[m-1][n-1]==='M':false) &&(arr[m+1]?arr[m+1][n+1]==='S':false)) && ((arr[m-1]?arr[m-1][n+1]==='S':false)&&(arr[m+1]?arr[m+1][n-1]==='M':false))) {
            count++;
        }
        if (((arr[m-1]?arr[m-1][n-1]==='S':false) &&(arr[m+1]?arr[m+1][n+1]==='M':false)) && ((arr[m-1]?arr[m-1][n+1]==='M':false)&&(arr[m+1]?arr[m+1][n-1]==='S':false))) {
            count++;
        }
}
