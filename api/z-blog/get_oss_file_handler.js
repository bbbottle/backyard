const OSS = require('ali-oss');
const client = new OSS({
  region: 'oss-cn-shenzhen',
  accessKeyId: process.env.ALI_ACCESS_KEY_ID,
  accessKeySecret: process.env.ALI_ACCESS_KEY_SECRET,
  bucket: 'zjh-im-res',
  secure: true
});

const { cors } = require('../../utils/');

module.exports = (dir) => cors(async (req, res) => {
  client.list({
    prefix: dir
  }).then((result) => {
    res.json(result.objects).end();
  })
});