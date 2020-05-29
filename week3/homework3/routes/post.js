var express = require('express');
var router = express.Router();

const Util = require('../modules/utils');
const postList = require('./../models/post');
const statuscode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');


//모든 게시글 조회
router.get('/post', (req, res) => {
    res.status(statuscode.OK).send(Util.success(statuscode.OK, resMessage.POST_GET_ALL_SUCCESS, postList));
});


//게시글 고유 id 조회
router.get('/post/:id', (req, res) => {
    const id = req.params.id;

    post = postList.filter(function(val) {
        return val.id === id;
    });

    if(post == null) {
        res.status(statuscode.NOT_FOUND).send(Util.fail(statuscode.NOT_FOUND, resMessage.POST_NO_ID) );
    }

    res.status(statuscode.OK).send(Util.success(statuscode.OK, resMessage.POST_GET_ID_SUCCESS, post));

});

//게시글 생성
router.post('/post', (req, res) => {
    const {id, content, title} = req.body;

    //모두 필수로 입력해야한다고 가정하고
    if(!id || !content || !title) {
        res.status(statuscode.BAD_REQUEST).send(Util.fail(statuscode.BAD_REQUEST, resMessage.NULL_VALUE));
    }

     //already ID
    if(postList.filter(post => post.id == id).length > 0) {
        return res.status(400).send(Util.fail(400, "ALREADY ID"));
    }

    postList.push({id, content, title});
    res.status(statuscode.OK).send(Util.success(statuscode.OK, resMessage.POST_GET_ID_SUCCESS, postList));
});


//게시글 고유 id값을 가진 게시글을 수정
router.put('/post/:id', (req, res) => {
    const id = req.params.id;

    const index = postList.findIndex(post => post.id === id);

    if(index == -1) 
        return res.status(statuscode.NOT_FOUND).send(Util.fail(statuscode.NO_CONTENT, resMessage.POST_NO_ID));

    postList[index] = req.body;
    res.status(statuscode.OK).send(Util.success(statuscode.OK, resMessage.PUT_POST_SUCCESS, postList));
});

//게시글 고유 id 값을 가진 게시글 삭제
router.delete('/post/:id', (req, res) => {
    const id = req.params.id;
    const index = postList.findIndex(post => post.id === id);

    if(index == -1) 
        return res.status(statuscode.NOT_FOUND).send(Util.fail(statuscode.NO_CONTENT, resMessage.POST_NO_ID));
    
    postList.splice(index, 1);
    res.status(statuscode.OK).send(Util.success(statuscode.OK, resMessage.DELETE_POST_SUCCESS));
});

module.exports = router;
