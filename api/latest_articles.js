const { cors } = require('../utils');
const { yqReq } = require('../3_rd_party_utils')
const {
  YU_QUE_API,
  LATEST_ARTICLES_LIMIT
} = require('../const')

const fetchLatestArticles = async (req, res) => {
  const articleEntries = await yqReq(YU_QUE_API.docs);
  const latestArticleEntries = articleEntries.slice(0, LATEST_ARTICLES_LIMIT);
  const latestArticles = await Promise.all(
    latestArticleEntries.map(a => yqReq(`${YU_QUE_API.docs}/${a.slug}`))
  );
  const resObj = {
    entries: articleEntries,
    articles: latestArticles.map((a) => {
      const { body_html: content, ...rest } = a;
      return { content, ...rest };
    }),
  };

  res.json(resObj).end(200);
};

module.exports = cors(fetchLatestArticles);
