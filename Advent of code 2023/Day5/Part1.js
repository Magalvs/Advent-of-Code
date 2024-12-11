let input = require('fs').readFileSync('stdin', 'utf8').slice(7).split('\n');
let seeds = input[0];
let mapArr = [];
let tempMap = [];
let locations = [];

input.forEach((line, index) => {
    if (index === 0) {
        seeds = line.split(' ').map(Number);
    }
    else if (line.trim().includes(':')) {
        if (tempMap.length > 0) {
            mapArr.push(tempMap);
            tempMap = [];
        }
    }
    else if (line.trim() !== '') {
        tempMap.push(line.trim().split(' ').map(Number));
    }
})
mapArr.push(tempMap);
tempMap = [];

mapAll(seeds, mapArr);
console.log(Math.min(...locations), locations.indexOf(Math.min(...locations)));

function mapAll(arr1, arr2) {
    arr1.forEach(num => {
        for (let i = 0; i < arr2.length; i++) {
            num = extendArrOfMaps(num, i ,arr2);
        }
        locations.push(num);
    })
}

function extendArrOfMaps(num, index, arr) {
    for (let j = 0; j < arr[index].length; j++) {
        let srcTodest = arr[index][j][0] - arr[index][j][1];
        let min = arr[index][j][1];  
        let max = arr[index][j][1] + arr[index][j][2];
        if (num >= min && num < max) {
            return num + srcTodest;
        }
    }
    return num;
}
