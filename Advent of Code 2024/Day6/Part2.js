let input = require('fs').readFileSync('2024stdinD6', 'utf8').split('\n');
let lines = [];
let tempLines = [];
let positions = ['^', '>', 'v', '<'];
let guardPath = [];
let possibleLoop = [];
let loops = [];

input.forEach((v) => {
    lines.push(v.trim().split(''));
    tempLines.push(v.trim().split(''));
})

const findPath = startingPos(lines, positions, guardPath);
findPath();
for (let i = 0; i < guardPath.length; i++) {
    findPath(true, possibleLoop, guardPath[0], i)
    possibleLoop = [];
}
console.log(loops, loops.length );

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
    return (notFirstTime = false, arr4 = arr3, element, idx) => {
        arr1 = JSON.parse(JSON.stringify(tempLines));
        let condt;
        let bol = true; 
        let firstTurn = 0;
        let obstacle;

        if (notFirstTime) {
            currentPos = {...element};
            arr4.push(element);
            arr3[idx+1] !== undefined && !loops.includes(`${arr3[idx+1].row},${arr3[idx+1].collumn}`)
                                    ? (obstacle = `${arr3[idx+1].row},${arr3[idx+1].collumn}`, arr1[arr3[idx+1].row][arr3[idx+1].collumn] = '#')
                                    : () => {return};
        }

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
                        if (arr1[currentPos.row][currentPos.collumn+1] === '#') {
                            currentPos.direction = 'v';
                        }
                        else {
                            currentPos.direction = '>';
                            currentPos.collumn++;   
                        }                        
                    }
                    firstTurn++;
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
                        if (arr1[currentPos.row+1][currentPos.collumn] === '#') {
                            currentPos.direction = '<';
                        }
                        else {
                            currentPos.direction = 'v';
                            currentPos.row++;
                        }
                    }
                    firstTurn++;
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
                        if (arr1[currentPos.row][currentPos.collumn-1] === '#') {   
                            currentPos.direction = '^';
                        }
                        else {
                            currentPos.direction = '<';
                            currentPos.collumn--;
                        }
                    }
                    firstTurn++;
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
                        if (arr1[currentPos.row-1][currentPos.collumn] === '#') {
                            currentPos.direction = '>';
                        }
                        else {
                            currentPos.direction = '^';
                            currentPos.row--;
                        }
                    }
                    firstTurn++;
                    break;
            }

            if (!bol) {
                return;
            }
            else if (!arr4.some(value => value.row === currentPos.row && value.collumn === currentPos.collumn && value.direction === currentPos.direction)) {
                arr4.push({row: currentPos.row, collumn: currentPos.collumn, direction: currentPos.direction});
            }
            else {
                loops.push(obstacle);
                return;
            }
        }
    }
}