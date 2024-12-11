let input = require('fs').readFileSync('stdinD3', 'utf8').split(/\n|\r/).filter(word => word !== '');
let lines = [];
let matrices = [];
let numbers = '';
let offset = 0;
let sumOfNums = 0;

class ValuesAndIndexes {
    constructor(value, line, collumn) {
        this.value = value;
        this.line = line;
        this.collumn = collumn;
    }
}

parseInput(input);
getEngines(lines);
console.log(sumOfNums);

function parseInput(arr) {
    let length = arr[0].split('').length;
    for (let i = 0; i < arr.length; i++) {
        if (i === 0) {
            lines.push(new Array(length).fill('.'));
        }
        lines.push(arr[i].split(''));
    }
    lines.push(new Array(length).fill('.'));
    lines.forEach(arr => {
        checkforNumbers(arr);
    })
    return lines;
}

function checkforNumbers(arr) {
    let resultsArr = [];
    for (let i = 0; i < arr.length; i++) {
        if(!isNaN(arr[i])) {
            resultsArr = extendNumber(arr, i);
            for (let j = i; j <= resultsArr[0]; j++) {
                arr[j] = resultsArr[1];
            }
            i = resultsArr[0];
        }
        numbers = '';
        offset = 0;
        resultsArr = [];
    }
}

function extendNumber(arr, collumn) {
    numbers += arr[collumn];
    if(!isNaN(arr[collumn+1])) {
        offset += 1;
        extendNumber(arr, collumn+1);
    }
    return [collumn + offset, numbers];
}

function getEngines(arr) {
    for (let i = 1; i < arr.length - 1; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] === '*') {
                construcMatrix(arr, i, j);
            }
        }
    }
}

function construcMatrix(arr, line, collumn) {
    for (let i = line - 1; i < line + 2; i++) {
        matrices.push(new ValuesAndIndexes(arr[i][collumn-1], i, collumn-1), 
        new ValuesAndIndexes(arr[i][collumn], i, collumn), new ValuesAndIndexes(arr[i][collumn+1], i, collumn+1));
    }

    matrices = matrices.filter((obj, index, arr) => {
        if(index !== 0) {
            return (!isNaN(obj.value) && (arr[index].value !== arr[index-1].value)); 
        }
        else return !isNaN(obj.value);
    })
    filterMatrix(matrices);
    matrices = [];
}

function filterMatrix(matrix) {
    if (matrix.length === 2) {
        sumOfNums += matrix.reduce((previousValue, currentValue) => {
            return currentValue.value * previousValue;
        }, 1) 
    } 
}