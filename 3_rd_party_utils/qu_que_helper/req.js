const SDK = require('@yuque/sdk');
const api = new SDK({ token: process.env.YU_QUE_TOKEN });

module.exports = (apiURL, options = {}) => {
  return api._client.request(apiURL, options);
}

