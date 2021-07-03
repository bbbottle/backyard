const { createGetRepoLatestReleaseHandler } = require("../3_rd_party_utils");
module.exports = createGetRepoLatestReleaseHandler("bbbottle/bbapp-store", {
  owner: "bbbottle",
  repo: "bbapp-store",
  formatter: (release) => {
    return {
      version: (release.data || {}).tag_name,
    };
  },
});
