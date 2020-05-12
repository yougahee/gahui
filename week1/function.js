
//1. function 선언
function addNum(a, b) {
    console.log(a+b);
}

addNum(2, 4);


//2. 표현식
var addStr = function addStr(a,b) {
    console.log( a+ b);
}

addStr("함수", "표현식");


//화살표 함수
var addBool = (x,y) => {
    console.log(x+y);
}

addBool(true, false);