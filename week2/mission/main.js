const calculator = require('./calculator');

//선언부분과 실행부분은 분류해서 적어야 보기 편하다!
var add = calculator.add(1,5);
var substract = calculator.substract(5,2);
var multiply = calculator.multiply(2,3);
var divide = calculator.divide(4,2);


console.log(add);
console.log(substract);
console.log(multiply);
console.log(divide);