var express = require('express');
var router = express.Router();

const Util = require('../modules/utils');
const postList = require('../models/post');
const statuscode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');

//모든 게시글 조회
router.get('/post', async(req, res) => {
    const result = await postList.getPostAll();

    res.status(statuscode.OK).send(Util.success(statuscode.OK, resMessage.POST_GET_ALL_SUCCESS, {result}));
});

//게시글 고유 id 조회
router.get('/post/:id', async(req, res) => {
    const id = req.params.id;

    const result = await postList.getPostByID(id);

    if(result[0].id === -1) {
        res.status(statuscode.NOT_FOUND).send(Util.fail(statuscode.NOT_FOUND, resMessage.POST_NO_ID) );
    }

    res.status(statuscode.OK).send(Util.success(statuscode.OK, resMessage.POST_GET_ID_SUCCESS, result));

});

//게시글 생성
router.post('/post', async(req, res) => {
    const {id, content, title} = req.body;

    const result = await postList.createPost(id, content, title);

    //모두 필수로 입력해야한다고 가정하고
    if(!id || !content || !title) {
        res.status(statuscode.BAD_REQUEST).send(Util.fail(statuscode.BAD_REQUEST, resMessage.NULL_VALUE));
    }

    res.status(statuscode.OK).send(Util.success(statuscode.OK, resMessage.POST_GET_ID_SUCCESS, {insertId : result}));
});

//게시글 고유 id값을 가진 게시글을 수정
router.put('/post', async(req, res) => {
    const {id, content, title} = req.body;

    const existenceId = await postList.checkPostId(id);
    if(!existenceId) {
        return res.status(statuscode.BAD_REQUEST).send(Util.fail(statuscode.NOT_FOUND, resMessage.POST_NO_ID));
    }

    const result = await postList.updatePost(id, content, title);

    res.status(statuscode.OK).send(Util.success(statuscode.OK, resMessage.PUT_POST_SUCCESS,
         {updateId : id}));
});

//게시글 고유 id 값을 가진 게시글 삭제
router.delete('/post/:id', async(req, res) => {
    const id = req.params.id;

    const existenceId = await postList.checkPostId(id);
    if(!existenceId) {
        return res.status(statuscode.BAD_REQUEST).send(Util.fail(statuscode.NOT_FOUND, resMessage.POST_NO_ID));
    }

    const result = await postList.deletePost(id);
    res.status(statuscode.OK).send(Util.success(statuscode.OK, resMessage.DELETE_POST_SUCCESS, 
        {deletId : id}));
});

module.exports = router;
