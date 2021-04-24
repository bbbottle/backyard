const photos = require("../json_db/photos.json");
const { cors } = require("../utils");

module.exports = cors((req, res) => {
  res.json(photos);
});
