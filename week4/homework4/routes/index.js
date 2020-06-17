var express = require('express');
var router = express.Router();

const ImageController = require('../controllers/image');
const AuthMiddleware = require('../middlewares/auth');
const upload = require('../modules/multer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/auth', require('./auth'));

router.post('/image', AuthMiddleware.checkToken, upload.array('images', 4), ImageController.array);

module.exports = router;
