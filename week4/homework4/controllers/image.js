const Util = require('../modules/utils');
const statuscode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const util = require('../modules/utils');
const statusCode = require('../modules/statusCode');

module.exports = {
    array: async(req, res) => {
        const images = req.files;
        console.log(images);

        if(images === undefined) {
            return res.status(statuscode.BAD_REQUEST).send(Util.fail(statuscode.BAD_REQUEST, "이미지를 첨부해주세요."));
        }

        const location = images.map(img => img.location);
        res.status(statuscode.OK).send(util.success(statuscode.OK, images.length + "개의 이미지 저장 성공",
        {
            image : location
        }));
    }
}