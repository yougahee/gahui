const User = require("./../models/user");
const Util = require("../modules/utils");
const statuscode = require("../modules/statusCode");
const resMessage = require("../modules/responseMessage");
const crypto = require("crypto");
const jwt = require("../modules/jwt");
const { STATUS_CODES } = require("http");
const { kMaxLength } = require("buffer");
const { use } = require("../routes/users");

const encrypt = async (salt, password) => {
  return (await crypto.pbkdf2Sync(password, salt, 1, 32, "sha512")).toString(
    "hex"
  );
};

const user = {
  signup: async (req, res) => {
    const { id, email, password, name } = req.body;
    const salt = crypto.randomBytes(32).toString("hex");
    const hashedpw = await encrypt(salt, password);

    //null
    if (!id || !email || !password || !name) {
      console.log("null 값");
      return res
        .status(statuscode.BAD_REQUEST)
        .send(Util.fail(statuscode.BAD_REQUEST, resMessage.NULL_VALUE));
    }

    //ID 중복확인
    const idCheck = await User.checkUser(id);
    if (idCheck) {
      return await res
        .status(statuscode.BAD_REQUEST)
        .send(Util.fail(statuscode.BAD_REQUEST, resMessage.ALREADY_ID));
    }

    const idx = await User.signup(id, name, hashedpw, salt, email);
    if (idx === -1) {
      return res
        .status(statuscode.DB_ERROR)
        .send(Util.fail(statuscode.DB_ERROR, resMessage.DB_ERROR));
    }

    res
      .status(statuscode.OK)
      .send(
        Util.success(statuscode.OK, resMessage.CREATED_USER, { InsertId: idx })
      );
  },

  signin: async (req, res) => {
    const { id, password } = req.body;

    const loginName = await User.checkUser(id);
    if (!loginName) {
      res
        .status(statuscode.BAD_REQUEST)
        .send(Util.fail(statuscode.BAD_REQUEST, resMessage.NO_USER));
      return;
    }

    const result = await User.signin(id);
    const DBsalt = result[0].salt;
    console.log(result[0].id);
    const DBhashedpw = result[0].password;

    const hashedpw = await encrypt(DBsalt, password);

    const { token, _ } = await jwt.sign(result[0]);

    console.log("hashedpw   " + hashedpw);
    console.log("token", token);

    //null 값 들어왔을 경우
    if (!id || !password) {
      res
        .status(statuscode.BAD_REQUEST)
        .send(Util.fail(statuscode.BAD_REQUEST, resMessage.NULL_VALUE));
      return;
    }

    //비밀번호가 일치하지 않는 경우
    if (hashedpw !== DBhashedpw) {
      res
        .status(statuscode.BAD_REQUEST)
        .send(Util.fail(statuscode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
      return;
    }

    res
      .status(statuscode.OK)
      .send(
        Util.success(statuscode.OK, resMessage.LOGIN_SUCCESS, {
          accessToken: token,
        })
      );
  },

  profile: async (req, res) => {

    const id = req.params.id;
    const profile = await User.getUserById(id);

    //console.log(profile);

    const userData = {
      userName: profile[0].name,
      userId: profile[0].id,
      userEmail: profile[0].email,
    };

    res
      .status(statuscode.OK)
      .send(
        Util.success(statuscode.OK, resMessage.READ_PROFILE_SUCCESS, userData)
      );
  },

  updateProfile: async (req, res) => {
    //데이터 받아오기
    const userIdx = req.decoded.idx;

    //local 에 저장
    //const profileImg = req.file.path;

    //s3 에 저장
    const profileImg = req.file.location;

    //console.log(profileImg);
    // console.log(req.file);

    //data check - undefined
    if (profileImg === undefined || !userIdx) {
      return res
        .status(statuscode.BAD_REQUEST)
        .send(Util.fail(statuscode.BAD_REQUEST, resMessage.NULL_VALUE));
    }

    //image type check
    const type = req.file.mimetype.split("/")[1];
    if (type !== "jpeg" && type !== "jpg" && type !== "png") {
      return res
        .status(statuscode.BAD_REQUEST)
        .send(Util.fail(statuscode.BAD_REQUEST, resMessage.UNSUPPORTED_TYPE));
    }

    //call model - database
    const result = await User.updateProfile(userIdx, profileImg);
    res
      .status(statuscode.OK)
      .send(
        Util.success(statuscode.OK, resMessage.UPDATE_PROFILE_SUCCESS, result)
      );
  },

  sendImages: async (req, res) => {
    const userid = req.params.id;
    //console.log(userid);
    const images = await User.sendImages(userid);

    if (images === undefined || !userid) {
      res.status(statuscode.BAD_REQUEST).send(Util.fail(statuscode.BAD_REQUEST, resMessage.NULL_VALUE));
      return;
    }

    res
      .status(statuscode.OK)
      .send(
        Util.success(statuscode.OK, resMessage.SEND_MULTI_IMAGE_SUCCESS, images));
  }
};

module.exports = user;
