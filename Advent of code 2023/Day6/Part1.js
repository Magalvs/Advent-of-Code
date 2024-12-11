let input = (require('fs').readFileSync('stdinD6', 'utf8').split('\n')).map(n => n.slice(11));
let racesObj = [];
let errMargin = 1;

parseInput(input, racesObj);
console.log(waysToBeatTime(racesObj));

function parseInput(arr1, arr2) {
    arr1.forEach((element, index) => {
        arr1[index] = element.trim().split(' ').filter(n => n !== '');
    });
    for (let i = 0; i < arr1[0].length; i++) {
        arr2.push({
            time: arr1[0][i],
            distance: arr1[1][i],
            WaysToBeat: 0
        });
    }
}

function waysToBeatTime(arr) {
    let target = 0;
    for (let i = 0; i < arr.length; i++) {
        target = arr[i].distance;
        for (let j = 1; j <= arr[i].time; j++) {
            if ((-(j**2) + arr[i].time*j - target) > 0) {
                arr[i].WaysToBeat += 1;
            };
        }
        errMargin = errMargin * arr[i].WaysToBeat;
    }
    return errMargin;
}
