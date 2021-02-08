const { cors } = require('../../utils/');

const fetchYuQueArticles = async (req, res) => {
  const SDK = require('@yuque/sdk');
  const api = new SDK({ token: process.env.YU_QUE_TOKEN });
  const articles = await api._client.request('repos/zjhou/blog/docs', {});

  const latestArticlesInDetail = await Promise.all(articles.slice(0, 3)
    .map(a => api._client.request(`repos/zjhou/blog/docs/${a.slug}`)))

  res.json({
    latestArticles: latestArticlesInDetail.map(a => ({
      content: a.body_html,
      ...a,
    })),
    allArticles: articles,
  });
};

module.exports = cors(fetchYuQueArticles);
