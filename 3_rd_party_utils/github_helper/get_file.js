const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({
  auth: process.env.GITHUB_REST,
});

const { cors } = require("../../utils");

module.exports = (filePath, options) =>
  cors(async (req, res) => {
    const { owner, repo, parseJSONContent } = options;
    const fileRes = await octokit.repos.getContent({
      owner,
      repo,
      path: filePath,
    });
    if (parseJSONContent) {
      return res.json(
        JSON.parse(
          Buffer.from(fileRes.data.content, "base64").toString("utf-8")
        )
      );
    }
    res.json(fileRes);
  });
