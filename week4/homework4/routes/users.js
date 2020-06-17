var express = require('express');
var router = express.Router();

const userController = require('../controllers/user');
const AuthMiddleware = require('../middlewares/auth');
const upload = require('../modules/multer');

//const upload = multer({
//    dest : 'upload/'
//});

//const upload = require('../modules/multer');

//signup
router.post('/signup', userController.signup);

//signin
router.post('/signin', userController.signin);

//해당 ID profile 조회
router.get('/profile/:id', userController.profile);

//update profile --> request body를 imagefile로 받을 수 있도록 바꾸기.
router.post('/profile', AuthMiddleware.checkToken, upload.single('profile'), userController.updateProfile);



module.exports = router;
