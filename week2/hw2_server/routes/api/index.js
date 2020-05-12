var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    const result  = {
        status : 200,
        message : 'api!!'
    }
    res.status(200).send(result);
});

//blogs
router.use('/blog', require('./blog'));
//users
router.use('/users', require('./users'));


module.exports = router;