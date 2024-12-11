let input = require('fs').readFileSync('stdinD10', 'utf8').split('\n');
let lines = [];
let directions = [['0011', '0110', '1010'], ['1001', '0011', '0101'], ['1001', '1100', '1010'], ['1100', '0110', '0101']];
let numOfMoves = 0;
input.forEach((value, idx, arr) => {
    lines.push(value.trim().split(''));
})

for (let i = 0; i < lines.length; i++) {
    lines[i].forEach((value, idx, arr) => {
        switch (value) {
            case '|':
                arr[idx] = '1010'
                break;
            case '-':
                arr[idx] = '0101'
                break;
            case 'L': 
                arr[idx] = '1100'
                break;
            case 'J': 
                arr[idx] = '1001'
                break;
            case '7':
                arr[idx] = '0011' 
                break;
            case 'F':
                arr[idx] = '0110' 
                break;
            case 'S':
                arr[idx] = '1111'
                break;
        }
    })
}

findStartingPipe(lines);

function findStartingPipe(val) {
    val.forEach((element, idx, arr) => {
        for (let i = 0; i < element.length; i++) {
            if (element[i] === '1111') {
                findLoopPath(arr, idx, i);
            }
        }
    })
}

function findLoopPath(arr, row, col, imposDirections = [true, true, true, true]) {
    let currentRow = row;
    let currentCol = col;
    let arrOfBols = imposDirections;
    let bolVar = true;

    while (bolVar) {
        console.log(arr[currentRow][currentCol]);
        numOfMoves += 1;
        switch (true) {
            case ((currentRow-1 !== -1 ? directions[0].includes(arr[currentRow-1][currentCol]) : false) && 
                arrOfBols[0] && 
                Boolean(parseInt(arr[currentRow][currentCol].at(0)))):
                    currentRow -= 1;
                    arrOfBols = [true, true, false, true];
                    break;

            case ((currentCol+1 !== arr[currentRow].length ? directions[1].includes(arr[currentRow][currentCol+1]) : false) && 
                arrOfBols[1] && 
                Boolean(parseInt(arr[currentRow][currentCol].at(1)))):
                    currentCol += 1;
                    arrOfBols = [true, true, true, false];
                    break;

            case ((currentRow+1 !== arr.length ? directions[2].includes(arr[currentRow+1][currentCol]) : false) && 
                arrOfBols[2] && 
                Boolean(parseInt(arr[currentRow][currentCol].at(2)))):
                    currentRow += 1;
                    arrOfBols = [false, true, true, true];
                    break;

            case ((currentCol-1 !== -1 ? directions[3].includes(arr[currentRow][currentCol-1]) : false) && 
                arrOfBols[3] && 
                Boolean(parseInt(arr[currentRow][currentCol].at(3)))):
                    currentCol -= 1;
                    arrOfBols = [true, false, true, true];
                    break;
            default:
                bolVar = false;
                return console.log(numOfMoves/2);
        }
    }
}
