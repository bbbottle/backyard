const { cors } = require('../utils');
const { yqReq } = require('../3_rd_party_utils')
const {
  YU_QUE_API,
} = require('../const')

const fetchArticles = async (req, res) => {
  const articles = await yqReq(YU_QUE_API.docs);
  const resObj = { articles };
  res.json(resObj).end(200);
};

module.exports = cors(fetchArticles);
