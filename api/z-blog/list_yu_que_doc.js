const { cors } = require('../../utils/');

const fetchYuQueDoc = async (req, res) => {
  const SDK = require('@yuque/sdk');
  const api = new SDK({ token: process.env.YU_QUE_TOKEN });
  const article = await api._client.request(`repos/zjhou/blog/docs/${req.query.slug}`, {});
  res.json({
    title: article.title,
    ...article,
    content: article.body_html,
  });
};

module.exports = cors(fetchYuQueDoc);
