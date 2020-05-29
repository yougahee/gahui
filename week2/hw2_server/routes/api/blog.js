var express = require('express');
var router = express.Router();


router.get('/post', (req, res) => {
    res.send('respond api/blog/post!!');
});


//router을 모듈화하는 과정?
//index.js에서 사용하려고 하는 것인가?!
//##알아보기!
module.exports = router;