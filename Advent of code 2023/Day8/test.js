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

console.log([2, 3, 4, 6].reduce(lcm));