var express = require('express');
var router = express.Router();

router.get('/login', (req, res) => {
    const result = {
        status : 200,
        message : 'It is api blog login!!'
    }
    res.status(200).send(result);
});

router.get('/signup', function(req, res) {
    res.send('It is api blog signup!!')
});

module.exports = router;