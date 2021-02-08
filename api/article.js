const { cors } = require('../utils');
const {
  yqReq,
  yqDocFormatter,
} = require('../3_rd_party_utils')
const {
  YU_QUE_API,
  RES_CODE,
} = require('../const')

const fetchArticle = async (req, res) => {
  const slug = req.query.slug;
  if (!slug) {
    res.error(RES_CODE.TEA_POT);
  }

  try {
    const doc = await yqReq(`${YU_QUE_API.docs}/${slug}`);
    const article = yqDocFormatter(doc);
    res.json(article).end(RES_CODE.OK);
  } catch (e) {
    res.error(e)
  }
};

module.exports = cors(fetchArticle);
