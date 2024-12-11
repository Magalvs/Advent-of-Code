let input = require('fs').readFileSync('2024stdinD5', 'utf8').split('\n');
let rules = [];
let updates = [];
let fullArray = [];
let wrongUpdates = [];
let sum = 0;
let count = 1;

class MyObject {
    constructor(length, value, order) {
        this.length = length,
        this[0] = value,
        this.order = order
    }
}

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

wrongUpdates= new Array(...updates);

createFullArray(rules);
updates.forEach((v) => {
    getWrongUpdates(v);
})

wrongUpdates.forEach((v) => {
    if (v.length !== 1) {
        getMiddleValues(v, fullArray);
    }
})

console.log(sum);
function createFullArray(arr) {
    let appearanceObj = [];
    let deleteArr = [];
    let count = 0;
    let tempNum = 0;
    let tempArray = new Array(...arr);

    for (let i = 0; i < arr.length; i++) {   
        let bol = true;

        appearanceObj.forEach((innerArray) => {
            if (Array.prototype.includes.call(innerArray, arr[i][0])) {
                bol = false;
            }
        })

        if (appearanceObj.length === 0 || bol) {
            count++;
            tempNum = arr[i][0];
        }

        tempArray.splice(0,1);

        for (let j = 0; j < tempArray.length; j++) {
            if (tempArray[j][0] === tempNum) {
                count++;
            }
        }
        
        if (count !== 0) {
            appearanceObj.push(new MyObject(2, tempNum, count));
        }

        deleteArr = []
        count = 0;
        tempNum = 0;
    }
    appearanceObj.sort((a, b) => b.order - a.order);

    appearanceObj.forEach(n => fullArray.push(n['0']))
    for (let i = 0; i < arr.length; i++) {
        if (!fullArray.includes(arr[i][1]) && fullArray.length === appearanceObj.length) {
            fullArray.push(arr[i][1])
            break;
        }
    }
}

function getWrongUpdates(arr) {
    let tempArr = new Array(...arr);
    for (let i = 0; i < arr.length; i++) {
        tempArr.splice(0,1);

        for (let j = 0; j < tempArr.length; j++) {
            const found = rules.some(innerArray => innerArray.every((value, index) => {
                return value === new Array(arr[i], tempArr[j])[index];
            }))

            if (!found) {
                return;
            }
            else if (found && (i === arr.length-2 && j === tempArr.length-1)){
                wrongUpdates.splice(wrongUpdates.indexOf(arr),1)
            }
        }
    }
}

function getMiddleValues(arr1, arr2) {
    let tempArr = [];

    for (let j = 0; j < arr2.length; j++) {
        if (arr1.includes(arr2[j])) {
            tempArr.push(arr2[j]);
        }
    }
    console.log(count,/* tempArr,  */parseInt(tempArr[Math.floor(tempArr.length/2)]))
    count++;
    sum += parseInt(tempArr[Math.floor(tempArr.length/2)])
}