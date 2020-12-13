const { cors } = require('../../utils/');

const fetchYuQueDocs = async (req, res) => {
  const SDK = require('@yuque/sdk');
  const api = new SDK({ token: process.env.YU_QUE_TOKEN });
  const articles = await api._client.request('repos/zjhou/blog/docs', {});
  const articlesInDetail = await Promise.all(articles.map(a => api._client.request(`repos/zjhou/blog/docs/${a.slug}`)))
  res.json(articlesInDetail.map(a => ({
    title: a.title,
    content: a.body_html,
  })));
};

module.exports = cors(fetchYuQueDocs);