//##혼자 해보기 --> 코드 탐방 후 리팩토링!(좀 더 깔끔하게, 구조적으로)
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//api폴더에 생성한 index.js에 접근
//이 친구는 api폴더에 파일이 많아지게 되면 index.js라는 것을 인식할까 --> 한다!
router.use('/api', require('./api'));

//블로그 파일 접근
router.use('/blog', require('./blog'));


module.exports = router;
