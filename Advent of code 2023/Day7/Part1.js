let input = require('fs').readFileSync('stdinD7', 'utf8').split('\n');
let cards = ['2','3','4','5','6','7','8','9','T','J','Q','K','A'];
let hands = [];
let accumulate = 0;

input.forEach(element => {
    element = element.split(' ').filter(n => n !== '');
    hands.push({
        hand: Array(...element[0]),
        handtype: 0,
        handValue: 0,
        bet: element[1].trim()
    });
})

getHandType(hands);
hands.sort((a,b) => a.handValue - b.handValue);
for (let i = 0; i < hands.length; i++) {
    accumulate += (i+1) * hands[i].bet;
}
console.log(hands, accumulate);


function getHandType(arr) {
    let cardsValue = 1;
    let fullHandValue = 1;
    for (let i = 0; i < arr.length; i++) {
        arr[i].hand.forEach((element, index, arr) => {
            if (cards.includes(element)) {
            arr[index] = cards.indexOf(element) + 2;
            }
        })
        arr[i].hand.forEach((element, index, arr) => {
            for (let j = 0; j < arr.length; j++) {
                if (element === arr[j] && index !== j) {
                    cardsValue += 1;
                }
            }
            fullHandValue = fullHandValue * cardsValue;
            cardsValue = 1;
        })
        arr[i].handtype = fullHandValue;
        fullHandValue = 1;      
        getHandValue(arr[i]);  
    }
}

function getHandValue(arr) {
    for (let i = 0; i < 5; i++) {
        arr.handValue += arr.hand[i] * (10**((5-i)*2));
    }
    arr.handValue += arr.handtype*(10**12);
}
