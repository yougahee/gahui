const sum = require('./sum');

//var result = sum(1,3);
//console.log("sum result : ", result);


const sumModule = require('./sum');

var result = sumModule.sum(1,2);
console.log("sum result : ", result);