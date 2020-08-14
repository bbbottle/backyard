const multer = require('multer');

const aliOssStorage = require('multer-ali-oss');

const upload = multer( {
  storage: aliOssStorage({
    config: {
      region: 'oss-cn-shenzhen',
      accessKeyId: process.env.ALI_ACCESS_KEY_ID,
      accessKeySecret: process.env.ALI_ACCESS_KEY_SECRET,
      bucket: 'zjh-im-res',
    },
    filename: function (req, file, cb) {
      cb(null, `/image/${req.body.id}` || file.originalname);
    }
  })
}).single('file');

const { cors } = require('./z-blog/utils.js');

const handler = (req, res) => {
  upload(req, res, (err, ...rest) => {
    if(err) {
      res.json({
        error: err
      }).end();
      return;
    }
    res.json({
      error: null,
    }).end();
  })
};

module.exports = cors(handler);
