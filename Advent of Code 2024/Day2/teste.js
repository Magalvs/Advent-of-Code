let originalArr = [1,2,3,4,5,6,7];

let arr1 = new Array(...originalArr);
let arr2 = new Array(...originalArr);
arr1.splice(0,1);
arr2.splice(1,1);

console.log(arr1, arr2);