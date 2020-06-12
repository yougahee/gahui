var express = require('express');
var router = express.Router();

const userController = require('../controllers/user');

//signup
router.post('/signup', userController.signup);

//signin
router.post('/signin', userController.signin);

//profile --> 경로로 매개변수 받기
router.get('/profile/:id', userController.profile);

module.exports = router;
