const {
  fetchVoice
} = require('../../logic/z-blog/');

const { cors } = require('../../utils/');

module.exports = cors(async (req, res) => {
  const voice = await fetchVoice();
  res.json(voice).end();
});
