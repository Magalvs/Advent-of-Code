var input = require('fs').readFileSync('stdinD2P1', 'utf8').split(/\r|\n/);
const regex = /[+:,;]( )/;
let newArr = [];
let sumOfgames = 0;

filtering(input);
console.log(countPossibleGames(newArr));


function countPossibleGames(arr) {
    let colorsObj = {
        'red': 0,
        'green': 0,
        'blue': 0,
    };
    for (let i = 0; i < arr.length; i++) {
        for (let j = 1; j < arr[i].length; j++) {
            const currentColor = arr[i][j].replace(/\d+ /, '');
            if (colorsObj[currentColor] < parseInt(arr[i][j])) {
                colorsObj[currentColor] = parseInt(arr[i][j]);
            }
        }
        sumOfgames += (colorsObj.red*colorsObj.green*colorsObj.blue);
        colorsObj.red = colorsObj.green = colorsObj.blue = 0;
    }
    return sumOfgames;
}

function filtering(arr) {
    arr = arr.filter(word => word !== '');
    for (let i = 0; i < arr.length; i++) {
        newArr.push(arr[i].split(regex).filter(word => word !== ' '));
    }
}
