var input = require('fs').readFileSync('stdin', 'utf8');
var lines = []
var result = 0;
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

// Separate each line of input, then further split it into its own array.
for (var i = 0; i < input.split('\r').length; i++) {
    lines.push(input.split('\r')[i].split(''));
}

for (var i = 0; i < lines.length; i++) {
    // Checks which elements of the array are letters and delete them.
    for (var j = 0; j < lines[i].length; j++) {
        if (!(numbers.includes(lines[i][j]))) {
            lines[i].splice(j, 1, '');
        }
    }
    // Filter each array for empty strings.
    lines[i] = lines[i].filter((word) => word.length > 0);

    // Concatenates the first and last numbers from each array, as well as if there is only one number.
    if (lines[i].length > 1) {
        lines[i] = lines[i][0] + lines[i][lines[i].length - 1];
    }
    else if (lines[i].length == 1) {
        lines[i] = lines[i][0] + lines[i][0];
    }
    /* lines[i] = lines[i].length > 1 ? lines[i][0] + lines[i][lines[i].length - 1] : lines[i][0] + lines[i][0]; */
    result += parseInt(lines[i]);
}

console.log(result);
