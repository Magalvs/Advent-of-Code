let input = require('fs').readFileSync('stdinD7', 'utf8').split('\n');
let cards = ['j','2','3','4','5','6','7','8','9','T','Q','K','A'];
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
console.log(/* hands.forEach(n => console.log(n)), */ accumulate);


function getHandType(arr) {
    let cardsValue = 1;
    let jArr = 0;
    let jValue = '';
    let cardsValueArr = [];

    for (let i = 0; i < arr.length; i++) {
        arr[i].hand.forEach((element, index, arr) => {
            if (cards.includes(element) && element !== 'j') {
                arr[index] = {
                    card: element,
                    value: ((cards.indexOf(element) + 1) < 10 ? '0' : '') + (cards.indexOf(element) + 1)
                }
            }
            else {
                arr[index] = {
                    card: element,
                    value: 1
                }
                jArr += 1;
            }
        })

        arr[i].hand.forEach((element, index, arr) => {
            for (let j = 0; j < arr.length; j++) {
                if (element.value === arr[j].value && index !== j && element.value !== undefined) {
                    cardsValue += 1;
                }
            }
            cardsValueArr.push(element.card === 'J' ? 0 : cardsValue + (element.value ? element.value : '1'));
            cardsValue = 1;
        })
        arr[i].hand.forEach((element, index, arr) => {
            if (element.card === 'J') {
                cardsValueArr[index] = (Math.max(...cardsValueArr)).toString();
                jValue = (Math.max(...cardsValueArr)).toString();
            }
        })

        cardsValueArr.forEach((element, index, arr) => {
            if (element === jValue) {
                arr[index] = parseInt(element.slice(0,1)) + jArr;
            }
            else {
                arr[index] = parseInt(element.slice(0,1));
            }
        })

        arr[i].handtype = cardsValueArr.reduce((accumulator, currentValue) => {
            return accumulator * currentValue;
        }); 
        jArr = 0;
        cardsValueArr = [];

        getHandValue(arr[i]);  
    }
}

function getHandValue(arr) {
    for (let i = 0; i < 5; i++) {
        arr.handValue += parseInt(arr.hand[i].value) * (10**((5-i)*2));
    }
    arr.handValue += arr.handtype*(10**12);
}
