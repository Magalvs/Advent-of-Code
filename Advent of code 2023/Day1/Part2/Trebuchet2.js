var input = (require('fs').readFileSync('stdinD1P2', 'utf8')).split('\n');
var lines = [];
var result = 0;
var indexes = [];
const numbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const regex = /(\d)|\n/;

// Separate each line between strings and digits into arrays.
for (var i = 0; i < input.length; i++) {
    lines.push(input[i].split(regex))
    lines[i] = lines[i].flat().filter(Boolean);
}

for (var i = 0; i < lines.length; i++) {
    // Convert each of the strings to numbers.
    for (var j = 0; j < lines[i].length; j++) {
        if (!Boolean(parseInt(lines[i][j]))) {
            lines[i][j] = compareStrToArr(lines[i][j], numbers);
        }
    }

    // Concatenates the first and last numbers from each array, as well as if there is only one number.
    lines[i] = lines[i].flat()
    lines[i][0] = lines[i][0].toString();
    if (lines[i].length > 1) {
        lines[i] = lines[i][0] + lines[i][lines[i].length - 1].toString();
    }
    else if (lines[i].length == 1) {
        lines[i] = lines[i][0] + lines[i][0];
    }
    // Add all the numbers to give the result.
    result += parseInt(lines[i]);
}

function compareStrToArr(altStr, array) {
    var matchesArr = [];
    var sortedArr = [];
// Convert the strings to numbers.
    for (var i = 0; i < array.length; i++) {
        if (altStr.includes(array[i])) {
            getAllIndexes(altStr, array[i]);
            for (var j = 0; j < indexes.length; j++) {
                matchesArr.push({match: i+1, order: indexes[j]});
            }
        }
    }
// Sort the numbers in order of appearance.
    matchesArr = matchesArr.sort((a, b) => a.order - b.order);
    matchesArr.forEach((element) => {
        sortedArr.push(element.match);
    })
    return sortedArr;
}

// Get the order of appearance and deals with repeated numbers.
function getAllIndexes(arr, val) {
    indexes = []; 
    var i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}

console.log(result);