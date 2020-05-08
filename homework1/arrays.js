var server1  = ["server", "sopt", 43, null, true];
var server2 = Array("유가희", "가희", 13);
var server3 = new Array("a", "bb", false, undefined);

console.log('server1 :', server1);
console.log('server2 :', server2);
console.log('server3 :', server3);


//배열 추가
server1.push(123);
server2[server2.length] = "length";
server3[99] = "server3의 길이는 얼마일까?";


//덮어씌워짐
server1[3] ="sopt";


console.log('server1 :', server1);
console.log('server2 :', server2);
console.log('server3 :', server3);
console.log(server3.length);


//3. 배열 순회

let str1 = 'server1에서는 ';
for(var item of server1) {
    str1 += item + ', ';
}

str1 +='이 들어있숩니다~';

console.log(str1);

//
let str2 = 'server2에서는 ';

//item에 index가 들어감
for(var item in server2) {
    str2 += server2[item] + ', ';
}

str2 +='이 들어있숩니다~';
console.log(str2);

//3.
let str3 = 'server3에서는 ';

server3.forEach( 
    item => str3 += item + ', '
);
str3 +='이 들어있숩니다~';
console.log(str3);