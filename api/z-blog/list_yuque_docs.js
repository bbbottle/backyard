const { cors } = require('./utils');
const findBlogRepo = (repos) => {
  return repos.find(({ name }) => name === 'blog');
};

const fetchYuQueDocs = async (token) => {
  const SDK = require('@yuque/sdk');
  const client = new SDK({ token });
  const { id: user } = await client.users.get();
  const repos = await client.repos.list({ user });
  const blogRepo = findBlogRepo(repos);
  if (!blogRepo) {
    return [];
  }
  const { namespace } = blogRepo;
  const docs = await client.docs.list({ namespace });
  return await Promise.all(docs.map(({slug}) => {
    return client.docs.get({namespace, slug, data: {raw: 1}});
  }));
};

const reqHandler = async (req, res) => {
  const docs = await fetchYuQueDocs(req.headers['x-auth-token']);
  const posts = docs.map((doc) => {
    return {
      title: doc.title,
      content: doc.body,
    }
  })
  res.json(posts).end();
}

module.exports = cors(reqHandler);