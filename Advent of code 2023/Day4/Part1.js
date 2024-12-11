let input = require('fs').readFileSync('stdinD4', 'utf8').split(/\n|\r/).filter(word => word !== '');
let cardsArr = [];
let sumOfPoints = 0;
let tempSum = 0;

class Cards {
    constructor(cardIndex, winningNums, numsToMatch, numsMatched = []) {
        this.Card = cardIndex;
        this.winningNums = winningNums;
        this.numsToMatch = numsToMatch;
        this.numsMatched = numsMatched
    }
}

parseInput(input);
getWinningGames(cardsArr);
console.log(sumOfPoints);

function parseInput(arr) {
    arr.forEach(element => {
        element = element.split(/:|\|/);

        cardsArr.push(new Cards(
        element[0], 
        element[1].split(' ').filter((n) => n !== ''), 
        element[2].split(' ').filter((n) => n !== '')
    ))
    });
}

function getWinningGames(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].numsToMatch.forEach(element => {
            if (arr[i].winningNums.includes(element)) {
                arr[i].numsMatched.push(element);
            }
        });
        
        for (let j = 0; j < arr[i].numsMatched.length; j++) {
            if (j === 0) {
                tempSum += 1;
            }
            else {
                tempSum = tempSum * 2;
            }
        }
        sumOfPoints += tempSum;
        tempSum = 0;
    }

}

