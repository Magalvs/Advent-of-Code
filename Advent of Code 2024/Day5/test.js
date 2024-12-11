let arrtest = [
    {length: 2, 0: '97', amount: 5}, 
    {length: 2, 1: '53', amount: 2}
];

arrtest.forEach((innerArray) => {
    if (Array.prototype.includes.call(innerArray, '97')) {
        console.log('its in')
    }
})
console.log();
    