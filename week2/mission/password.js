//password.txt를 불러와서(없다면 만들기)
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

const encrypt = (salt, password) => {
    crypto.pbkdf2(password, salt.toString(), 100, 32, 'sha512', (err, derivedKey) => {
        if(err) throw err;

        const hashed = derivedKey.toString('hex');
        console.log('hashed : ', hashed);

        makeTXTfile('./gahui_server/week2/mission/hash.txt', hashed.toString());
    });
}

//password.txt파일 만들기
//이미 만들어져 있으면 
makeTXTfile('./gahui_server/week2/mission/password.txt', 'querty');

//password.txt파일 text 읽기
fs.readFile('./gahui_server/week2/mission/password.txt', (err, data) => {
    if(err) throw err;

    origindata = data.toString('utf-8');
    console.log(origindata);

    //이게 최선인가...분명 아닐텐데...
    const salt = crypto.randomBytes(32).toString('hex');
    encrypt(salt, origindata);
});
