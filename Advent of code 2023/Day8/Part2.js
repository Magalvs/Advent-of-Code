let input = require('fs').readFileSync('stdinD8', 'utf8').split('\n')
let directions = '';
let locations = [];
let startingLocations = [];
let endingLocations = [];
let objects = [];
let moves = [];

input.filter(n => n !== '').forEach((element, index) => {
    if (index === 0) {
        directions = element.trim();
    }
    else if (element.trim() !== '') {
        if (element.split(' =')[0].charAt(2) === 'A') {
            startingLocations.push(element.split(' =')[0]);
        }
        else if (element.split(' =')[0].charAt(2) === 'Z') {
            endingLocations.push(element.split(' =')[0]);
        }
        locations.push(element.split(' =')[0]);
        objects.push({
            roads: element.split(' =')[1].trim().split(/\(|\)|\,| /).filter(n => n !== '')
        })
    }
})

followDirections(directions, locations, startingLocations, endingLocations, objects);
console.log(moves.reduce(lcm));

function followDirections(str, arr1, arr2, arr3, objs) {
    let tempMoves = 0;
    let index;

    str = str.replaceAll('L', '0');
    str = str.replaceAll('R', '1');
    str = Array(...str)

    for (let j = 0; j < arr2.length; j++) {
        index = arr1.indexOf(arr2[j]);
        for (let i = 0; i <= str.length; i++) {
            if (i !== str.length) {
                if (!arr3.includes(arr1[index])) {
                    index = arr1.indexOf(objs[index].roads[str[i]]);
                    tempMoves += 1;
                }
                else {
                    moves.push(tempMoves);
                    tempMoves = 0;
                    break;
                }
            }
            else i = -1;
        }
    }
    return moves;
}

function gcd(a, b) {
    if (a === 0) {
        return b;
    }
    else {
        return gcd(b % a, a);
    }
}

function lcm(a, b) {
    return (a * b)/gcd(a, b);
}
