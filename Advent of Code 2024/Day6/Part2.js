let input = require('fs').readFileSync('stdintest', 'utf8').split('\n');
let lines = [];
let positions = ['^', '>', 'v', '<'];
let guardPath = [];

input.forEach((v) => {
    lines.push(v.trim().split(''));
})

const findPath = startingPos(lines, positions, guardPath);
findPath(), checkForCrosses(guardPath);


function startingPos(arr1, arr2, arr3) {
    let currentPos = {};
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr1[i].length; j++) {
            if (arr2.includes(arr1[i][j])) {
                currentPos = {row: i, collumn: j, direction: arr1[i][j]};
                arr3.push({row: i, collumn: j, direction: arr1[i][j], obstacle: false});
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
                        arr3.push({row: currentPos.row-1, collumn: currentPos.collumn, direction: currentPos.direction, obstacle: true});
                        arr3[arr3.length-2].direction = '>';
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
                        arr3.push({row: currentPos.row, collumn: currentPos.collumn+1, direction: currentPos.direction, obstacle: true});
                        arr3[arr3.length-2].direction = 'v';
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
                        arr3.push({row: currentPos.row+1, collumn: currentPos.collumn, direction: currentPos.direction, obstacle: true})
                        arr3[arr3.length-2].direction = '<';
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
                        arr3.push({row: currentPos.row, collumn: currentPos.collumn-1, direction: currentPos.direction, obstacle: true})
                        arr3[arr3.length-2].direction = '^';
                        currentPos.direction = '^';
                        currentPos.row--;
                    }
                    break;
            }
            arr3.push({row: currentPos.row, collumn: currentPos.collumn, direction: currentPos.direction, obstacle: false});
        }
        /* console.log(arr3); */
    }
}

function checkForCrosses(arr) {
    let loops = 0;
    let otherObstacles = false;
    arr.forEach(element => {
        if (element.obstacle === true) {
            switch (element.direction) {
                case '^':
                    arr.forEach(value1 => {
                        if (value1.collumn === element.collumn && value1.direction === '<' && value1.obstacle === false && arr.indexOf(value1) > arr.indexOf(element)) {
                            if (!arr.some((value2) => value2.collumn === element.collumn && value2.row > element.row && value2.obstacle === true && value2.row < value1.row)) {
                                console.log(element, value1);
                                loops++;
                            }
                        }
                    })
                    break;

                case '>':
                    arr.forEach(value1 => {
                        if (value1.row === element.row && value1.direction === '^' && value1.obstacle === false && arr.indexOf(value1) > arr.indexOf(element)) {
                            if (!arr.some((value2) => value2.row === element.row && value2.collumn < element.collumn && value2.obstacle === true && value2.collumn > value2.collumn)) {
                                console.log(element, value1);
                                loops++;
                            }
                        }
                    })
                    break;

                case 'v':
                    arr.forEach(value1 => {
                        if (value1.collumn === element.collumn && value1.direction === '>' && value1.obstacle === false && arr.indexOf(value1) > arr.indexOf(element)) {
                            if (!arr.some((value2) => value2.collumn === element.collumn && value2.row < element.row && value2.obstacle === true && value2.row > value2.row)) {
                                console.log(element, value1);
                                loops++;
                            }
                        }
                    })
                    break;

                case '<':
                    arr.forEach(value1 => {
                        if (value1.row === element.row && value1.direction === 'v' && value1.obstacle === false && arr.indexOf(value1) > arr.indexOf(element)) {
                            if (!arr.some((value2) => value2.row === element.row && value2.collumn > element.collumn && value2.obstacle === true && value2.collumn < value2.collumn)) {
                                console.log(element, value1);
                                loops++;
                            }
                        }
                    })
                    break;
            }
        }
    })
    console.log(loops);
}