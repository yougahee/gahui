const jwt = require("../modules/jwt");
const MSG = require("../modules/responseMessage");
const CODE = require("../modules/statusCode");
const util = require("../modules/utils");
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const authUtil = {
  //middlewares
  //미들웨어로 token이 있는지 없는지 확인하고
  //token이 있다면 jwt.verify함수를 이용해서 토큰 hash를 확인하고 토큰에 들어있는 정보 해독
  //해독한 정보는 req.decoded에 저장하고 있으며 이후 로그인 유무는 decoded가 있는지 없는지를 통해 알 수 있음
  checkToken: async (req, res, next) => {
    var token = req.headers.jwt;
    console.log(token);
    if (!token) {
      return res.json(util.fail(CODE.BAD_REQUEST, MSG.EMPTY_TOKEN));
    }

    const user = await jwt.verify(token);
    //console.log(user);
    //console.log(user.idx);
    if (user === TOKEN_EXPIRED) {
      return res.json(util.fail(CODE.UNAUTHORIZED, MSG.EXPIRED_TOKEN));
    }

    if (user === TOKEN_INVALID) {
      return res.json(util.fail(CODE.UNAUTHORIZED, MSG.INVALID_TOKEN));
    }

    if (user.name === undefined) {
      return res.json(util.fail(CODE.UNAUTHORIZED, MSG.INVALID_TOKEN));
    }

    console.log(user);
    req.decoded = user;
    //controller를 호출
    next();
  },
};

module.exports = authUtil;
