const { createGetRepoLatestReleaseHandler } = require("../3_rd_party_utils");
module.exports = createGetRepoLatestReleaseHandler("bbbottle/bbapp-store", {
  owner: "bbbottle",
  repo: "bbapp-store",
});
