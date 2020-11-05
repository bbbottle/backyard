module.exports = async (req, res) => {
  const SDK = require('@yuque/sdk');
  const client = new SDK({
    token: req.header.X_Auth_Token
  });
  console.log(client.docs.list({
    namespace: 'ypsyim',
  }));
  res.send(200);
};