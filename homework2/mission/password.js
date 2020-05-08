//password.txt를 불러와서 
//crypto 모듈로 암호화
//hashed.txt 작성

const fs = require('fs');
const crypto = require('crypto');
var origindata;


//.txt 파일만들기
function makeTXTfile(file, data) {
    fs.writeFile(file, data, (err) => {
        if(err) throw err;
        console.log('The file has been saved!');
    });
}

//password.txt파일 만들기
makeTXTfile('password.txt', 'querty');

//password.txt파일 text 읽기
fs.readFile('password.txt', (err, data) => {
    if(err) throw err;

    origindata = data.toString('utf-8');
    //QQ 왜 이 위치는 로그가 안나오지??
    //와,,, makeTXTfile함수가 아래있어서 그런 듯?!
    //와.. 그럼 이거 어떻게 해줘야 하는거지
    //이럴때 ascync await이런거 써줘야하는건가?
    //코드가 겁나 더러워졌다!!!
    console.log(origindata);

    //이게 최선인가...분명 아닐텐데...
    const salt = crypto.randomBytes(32).toString('hex');
    encrypt(salt, origindata);
});


const encrypt = (salt, password) => {
    crypto.pbkdf2(password, salt.toString(), 100, 32, 'sha512', (err, derivedKey) => {
        if(err) throw err;
        console.log(new Error);

        const hashed = derivedKey.toString('hex');
        console.log('hashed : ', hashed);

        //여기에 이걸 써야하나?!
        //일단 만들어지긴 했지만...다시 짜기!!
        //hash.txt파일 만들기
        makeTXTfile('hash.txt', hashed.toString());
    });

}




