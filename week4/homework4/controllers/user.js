const User = require('./../models/user');
const Util = require('../modules/utils');
const statuscode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const crypto = require('crypto');
const jwt = require('../modules/jwt');

const encrypt = async(salt, password) => {
    return (await crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512')).toString('hex');
  }

const user = {

    signup: async(req, res) => {

      const {id, email, password, name} = req.body;
      const salt = crypto.randomBytes(32).toString('hex');
      const hashedpw = await encrypt(salt, password);

      //null
      if(!id || !email || !password || !name) {
        console.log('null 값');
        return res.status(statuscode.BAD_REQUEST)
        .send(Util.fail(statuscode.BAD_REQUEST, resMessage.NULL_VALUE));
      }
      
      //ID 중복확인
      const idCheck = await User.checkUser(id);
      if (idCheck) {
        return await res.status(statuscode.BAD_REQUEST).send(Util
        .fail(statuscode.BAD_REQUEST, resMessage.ALREADY_ID));
      }
      
        const idx = await User.signup(id, name, hashedpw, salt, email);
        if(idx === -1) {
          return res.status(statuscode.DB_ERROR)
          .send(Util.fail(statuscode.DB_ERROR, resMessage.DB_ERROR));
        }
      
        res.status(statuscode.OK)
        .send(Util.success(statuscode.OK, resMessage.CREATED_USER, {InsertId : idx}));
      
    },
    
    signin: async(req, res) => {
        const {id, password} = req.body;

        console.log("DD");
      
        //비동기... 이 코드를 여기에 적어두고 만약에, 뒤에 있는 User.signin이 먼저 실행되면 오류가 날 것 같다..
         //존재하는 회원인지
        const loginName = await User.checkUser(id);
        if(!loginName) {
          res.status(statuscode.BAD_REQUEST).send(Util.fail(statuscode.BAD_REQUEST, resMessage.NO_USER));
          return;
        }
      
        const result = await User.signin(id);
        const DBsalt = result[0].salt;
        const DBhashedpw = result[0].password;
        
        const hashedpw = await encrypt(DBsalt, password);
      
        const token = await jwt.sign(result[0]);
      
        console.log("hashedpw   " +hashedpw);
        console.log("token", token);
      
        //null 값 들어왔을 경우
        if(!id || !password) {
          res.status(statuscode.BAD_REQUEST)
          .send(Util.fail(statuscode.BAD_REQUEST, resMessage.NULL_VALUE));
          return ;
        }
      
        //비밀번호가 일치하지 않는 경우
        if(hashedpw !== DBhashedpw) {
          res.status(statuscode.BAD_REQUEST).send(Util.fail(statuscode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
          return;
        }
      
        res.status(statuscode.OK).send(Util.success(statuscode.OK, resMessage.LOGIN_SUCCESS, { accessToken : token }));
      
    },
      
    profile: async(req, res) => {

        var id = req.params.id;
      
        const idCheck = await User.checkUser(id);
        if (!idCheck) {
          return await res.status(statuscode.BAD_REQUEST).send(Util.fail(statuscode.BAD_REQUEST, resMessage.NO_USER));
        }
      
        const profile = await User.getUserById(id);
      
        const userData = {
          userName : profile[0].name,
          userId : profile[0].id,
          userEmail : profile[0].email
        };
      
        res.status(statuscode.OK)
        .send(Util.success(statuscode.OK, resMessage.READ_PROFILE_SUCCESS, userData));
      
    }
    
}

module.exports = user;