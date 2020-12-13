const fetchYuQueDocs = async () => {
  const SDK = require('@yuque/sdk');
  const client = new SDK({ token: process.env.YU_QUE_TOKEN });
  const namespace = 'zjhou/blog';
  const docs = await client.docs.list({ namespace });
  const docsInDetail = await Promise.all(docs.map(({slug}) => {
    return client.docs.get({namespace, slug, data: {raw: 1}});
  }));
  return docsInDetail.map((doc) => {
    return {
      title: doc.title,
      content: doc.body,
      html: doc.body_html,
    }
  })
};

module.exports = fetchYuQueDocs;