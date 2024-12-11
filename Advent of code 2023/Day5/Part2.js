let input = require('fs').readFileSync('stdinD5', 'utf8').slice(7).split('\n');
let seeds = input[0];
let mapArr = [];
let tempMap = [];
let locations = -1;

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

console.log(mapAll(seeds, mapArr));

function mapAll(arr1, arr2) {
    arr1.forEach((num, index, arr) => {
        if (index % 2 === 0) {
            let tempNum = num;
            for (let i = 1; i <= arr[index+1]; i++) {
                for (let j = 0; j < arr2.length; j++) {
                    num = extendArrOfMaps(num, j ,arr2);
                }

                if (num === 0) {
                    locations = num;
                    return locations;
                }
                else if (locations === -1) {
                    locations = num;
                }
                else if (num < locations) {
                    locations = num;
                }
                num = tempNum + i;
            } 
        }
    })
    return locations;
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
