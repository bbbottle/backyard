const {
  fetchPosts
} = require('../../logic/z-blog/');
const fetchYuQueDocs = require('./list_yuque_docs');

const { cors } = require('./utils.js');

module.exports = cors(async (req, res) => {
  const yuQueToken = req.query.token;
  const posts = yuQueToken
    ? await fetchYuQueDocs(yuQueToken)
    : await fetchPosts();

  res.json(posts).end();
});
