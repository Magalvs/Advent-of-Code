let input = require('fs').readFileSync('stdin', 'utf8').split('\n');
let lines = [];
let positions = ['^', '>', 'v', '<'];
let guardPath = [];

input.forEach((v) => {
    lines.push(v.trim().split(''));
})

function startingPos(arr1, arr2, arr3) {
    let currentPos = {};
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr1[i].length; j++) {
            if (arr2.includes(arr1[i][j])) {
                currentPos = {row: i, collumn: j, direction: arr1[i][j]};
                arr3.push({row: i, collumn: j, direction: arr1[i][j]});
            }
        }
    }
    return () => {
        let condt;
        let bol = true;
        while (bol) {
            switch (currentPos.direction) {
                case '^':
                    condt = arr1[currentPos.row-1] !== undefined ? arr1[currentPos.row-1][currentPos.collumn] : undefined;
                    if (condt === undefined) {
                        bol = false;
                    }
                    else if (condt !== '#') {
                        currentPos.row--;
                    }
                    else {
                        currentPos.direction = '>';
                        currentPos.collumn++;
                    }
                    break;

                case '>':
                    condt = arr1[currentPos.row][currentPos.collumn+1];
                    if (condt === undefined) {
                        bol = false;
                    }
                    else if (condt !== '#') {
                        currentPos.collumn++;
                    }
                    else {
                        currentPos.direction = 'v';
                        currentPos.row++;
                    }
                    break;

                case 'v':
                    condt = arr1[currentPos.row+1] !== undefined ? arr1[currentPos.row+1][currentPos.collumn] : undefined;
                    if (condt === undefined) {
                        bol = false;
                    }
                    else if (condt !== '#') {
                        currentPos.row++;
                    }
                    else {
                        currentPos.direction = '<';
                        currentPos.collumn--;
                    }
                    break;

                case '<':
                    condt = arr1[currentPos.row][currentPos.collumn-1];
                    if (condt === undefined) {
                        bol = false;
                    }
                    else if (condt !== '#') {
                        currentPos.collumn--;
                    }
                    else {
                        currentPos.direction = '^';
                        currentPos.row--;
                    }
                    break;
            }
            
            if (!arr3.some(value => value.row === currentPos.row && value.collumn === currentPos.collumn)) {
                arr3.push({row: currentPos.row, collumn: currentPos.collumn, direction: currentPos.direction});
            }
        }
        return arr3;
    }
}
const findPath = startingPos(lines, positions, guardPath);

console.log(findPath());

