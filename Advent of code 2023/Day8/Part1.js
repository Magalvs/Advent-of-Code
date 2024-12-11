let input = require('fs').readFileSync('stdinD8', 'utf8').split('\n')
let directions = '';
let locations = [];
let objects = [];
let moves = 0;

input.filter(n => n !== '').forEach((element, index) => {
    if (index === 0) {
        directions = element.trim();
    }
    else if (element.trim() !== '') {
        locations.push(element.split(' =')[0]);
        objects.push({
            roads: element.split(' =')[1].trim().split(/\(|\)|\,| /).filter(n => n !== '')
        })
    }
})

function followDirections(str, arr, objs) {
    let bol = 1;
    let index = arr.indexOf('AAA');
    str = str.replaceAll('L', '0');
    str = str.replaceAll('R', '1');
    str = Array(...str)
    console.log(str);

    while (bol) {
        for (let i = 0; i <= str.length; i++) {
            if (i !== str.length) {
                if (arr[index] !== 'ZZZ') {
                    index = arr.indexOf(objs[index].roads[str[i]]);
                    moves += 1;
                }
                else {
                    return moves;
                }
            }
            else i = -1;
        }
    }
}
console.log(locations, objects)
console.log(followDirections(directions, locations, objects));

