
//json 객체
var sopt = {
    name : 'OUR SOPT',
    slogan : 'We Lead Our SOPT',
    part : ['plan','design','android','ios','server'],
    number : 180,
    printName : function() {
        console.log('name is : ' + this.name);
    },
    printNumber : function() {
        console.log("number is" + this.number);
    }
};

//sopt의 타입 return --> Object
console.log("typeof sopt : " + typeof sopt);


//number가 자동형변환을 한 것 같다! string으로..
//그렇다면.. +를 하면,,,, 우선순위에 따라 형변환이 되어 표현되는 것 같다!
//문자 > 숫자 > boolean
var number = 3;
var str = "string" + number;
console.log(typeof str); 

var ex = number + true;
console.log(typeof ex);


//+와 ,의 차이
//Q. String으로 바뀌어서 나오는건가?
//Q. 음.. 그렇다면 JSON.stringify와 다른점은????
console.log('sopt : ' + sopt);
//json형태 그대로 출력
console.log('sopt : ', sopt);
//json객체를 string으로 변환
console.log('sopt :' + JSON.stringify(sopt));



//json 배열 실습
var dogs = [
    {name : '식빵', family : '웰시코기', age : 1, weight: 2.14},
    {name : '콩콩', family : '포메라니안', age : 3, weight : 2.5},
    {name : '두팔', family : '푸들', age : 7, weight : 3.1}

];

console.log('dogs : ' + dogs);
console.log('dogs : ', dogs);
console.log('dogs : ' + JSON.stringify(dogs));

dogs.forEach(
    dogs => console.log(dogs.name+'이는 종이 '+dogs.family+'이고, 나이가 ' + dogs.age + '세 입니다~' )
);
