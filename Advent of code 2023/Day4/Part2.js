let input = require('fs').readFileSync('stdinD4', 'utf8').split(/\n|\r/).filter(word => word !== '');
let cardsArr = [];
let sumOfCards = 0;

class Cards {
    constructor(cardIndex, winningNums, numsToMatch, numOfCards = 1) {
        this.Card = cardIndex;
        this.NumOfCards = numOfCards;
        this.WinningNums = winningNums;
        this.NumsToMatch = numsToMatch;
        this.NumsMatched = 0;
    }
}

parseInput(input);
getWinningGames(cardsArr);
console.log(sumOfCards);

function parseInput(arr) {
    arr = arr.forEach(element => {
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
        arr[i].NumsToMatch.forEach(element => {
            if (arr[i].WinningNums.includes(element)) {
                arr[i].NumsMatched += 1;
            }
        });
        for (let j = i+1; j <= i + arr[i].NumsMatched; j++) {
            arr[j].NumOfCards += (1 * arr[i].NumOfCards);
        }
        sumOfCards += arr[i].NumOfCards;
    }
}