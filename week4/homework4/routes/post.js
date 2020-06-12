var express = require('express');
var router = express.Router();

const postController = require('../controllers/post');
const authUtil = require('../middlewares/auth');


//모든 게시글 조회
router.get('/post', postController.getAllPost);

//게시글 고유 id 조회
router.get('/post/:id', postController.getPostById);

//게시글 생성
router.post('/post', postController.createPost);

//게시글 고유 id값을 가진 게시글을 수정
router.put('/post', postController.putPostById);

//게시글 고유 id 값을 가진 게시글 삭제
router.delete('/post/:id', postController.deletePostById);

module.exports = router;
