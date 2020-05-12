function sum(a,b) {
    return a+b;
}

//함수
module.exports = sum;

//객체
module.exports = {
    sum : (a,b) => {
        return a+b;
    }
}