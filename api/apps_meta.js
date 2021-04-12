const { createGetGithubFileHandler } = require("../3_rd_party_utils");
module.exports = createGetGithubFileHandler("apps_meta.json", {
  owner: "bbbottle",
  repo: "bbapp-store",
  parseJSONContent: true,
});
