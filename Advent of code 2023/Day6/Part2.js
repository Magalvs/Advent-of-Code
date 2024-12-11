let input = (require('fs').readFileSync('stdinD6', 'utf8').split('\n')).map(n => n.slice(11));
let raceObj = {};
let objTest = {};
parseInput(input, raceObj);
console.log(waysToBeatTime(raceObj));

function parseInput(arr1, obj) {
    arr1.forEach((element, index) => {
        arr1[index] = element.trim().split(' ').filter(n => n !== '').join('');
    });

    Object.defineProperties(obj, {
        time: {
            value: arr1[0],
            writable: true,
        },
        distance: {
            value: arr1[1],
            writable: true,
        },
        waysToBeat: {
            value: 0,
            writable: true,
            configurable: true
        }
    })
}

function waysToBeatTime(obj) {
    let min = Math.floor((-(obj.time) + Math.sqrt((obj.time**2) - (4*obj.distance)))/(-2));
    let max = Math.floor((-(obj.time) - Math.sqrt((obj.time**2) - (4*obj.distance)))/(-2));
    return (max - min)
}