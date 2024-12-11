let input = require('fs').readFileSync('stdinD3', 'utf8').split(/\n|\r/).filter(word => word !== '');
let lines = [];
let symbols = [];
let offset = 0;
let number = '';
let sumOfNums = 0;

parseInput(input);
getParts(lines);
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

    return lines;
}

function getParts(arr) {
    for (let i = 1; i < arr.length - 1; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (Boolean(parseInt(arr[i][j]))) {
                j = checkForNumbers(arr, i, j);
                checkForSymbols(arr, i, j, j-offset, number);
                number = '';
                offset = 0;
                
            }
        }
    }
}

function checkForSymbols(arr, line, collumn, priorCollumn, currentNumber) {
    const regex = /[^\w\d.]/
    for (let i = priorCollumn - 1; i < collumn + 3; i++) {
        if (i === priorCollumn - 1) {
            symbols.push(currentNumber, arr[line][i], arr[line][collumn + 1]);
        }
        else {
            symbols.push(arr[line-1][i-1], arr[line+1][i-1]);
        }
    }
    for (let i = 0; i < symbols.length; i++) {
        if (regex.test(symbols[i])) {
            sumOfNums += parseInt(symbols[0]);
        }
    }
    symbols = [];
    return sumOfNums;
}

function checkForNumbers(arr, line, collumn) {
    number += arr[line][collumn];
    if (!isNaN(arr[line][collumn])) {
        offset += 1;
        checkForNumbers(arr, line, collumn+1);
    }
    return collumn + offset;
}