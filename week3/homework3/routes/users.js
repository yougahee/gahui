var express = require('express');
var router = express.Router();

const User = require('./../models/users');
const Util = require('../modules/utils');
const statuscode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const crypto = require('crypto');


const encrypt = async(salt, password) => {
  return (await crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512')).toString('hex');
}

//signup
router.post('/signup', async(req, res) => {

  const {id, email, password, name} = req.body; 

  const salt = crypto.randomBytes(32).toString('hex');
  const hashedpw = await encrypt(salt, password);

  //const hashedpw = (await crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512')).toString('hex');

  //null
  if(!id || !email || !password || !name) {
    return res.status(400).send(Util.fail(400, 'BAD REQUEST'));
  }

  //already ID
  if(User.filter(user => user.id == id).length > 0) {
    return res.status(400).send(Util.fail(400, "ALREADY ID"));
  }

  User.push({id, email, name, salt, hashedpw});
  res.status(200).send(Util.success(200, "회원가입 성공", User));

});

//signin
router.post('/signin', async(req, res) => {
  const {id, password} = req.body;
  const user = User.filter(user => user.id == id);

  const hashedpw = await encrypt(user.salt, password);

  if(!id || !password) {
    res.status(statuscode.BAD_REQUEST)
    .send(Util.fail(statuscode.BAD_REQUEST, resMessage.NULL_VALUE));
    return ;
  }

  if(user.length == 0) {
    res.status(statuscode.BAD_REQUEST)
    .send(Util.fail(statuscode.BAD_REQUEST, resMessage.NO_USER));
    return;
  }

  //mismatch pws --> hash
  if(user[0].hashedpw !== hashedpw) {
    res.status(statuscode.BAD_REQUEST)
    .send(Util.fail(statuscode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
    return;
  }

  res.status(statuscode.OK)
  .send(Util.success(statuscode.OK, resMessage.LOGIN_SUCCESS, {userId : id}));

});

//profile --> 경로로 매개변수 받기
router.get('/profile/:id', async(req, res) => {

  var id = req.params.id;
  const user = User.filter(user => user.id == id);
  
  if(user.length == 0) {
    res.status(statuscode.BAD_REQUEST)
    .send(Util.fail(statuscode.BAD_REQUEST, resMessage.NO_USER));
    return;
  }

  userData = User.filter(function(val){
    return val.id === id;
  });

  res.status(statuscode.OK)
  .send(Util.success(statuscode.OK, resMessage.READ_PROFILE_SUCCESS, userData))

})

module.exports = router;
