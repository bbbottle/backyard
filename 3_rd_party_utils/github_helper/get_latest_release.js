const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({
  auth: process.env.GITHUB_REST,
});

const { cors } = require("../../utils");

module.exports = (repoPath, options) =>
  cors(async (req, res) => {
    const { owner, repo } = options;
    const release = await octokit.request(
      `GET /repos/${repoPath}/releases/latest`,
      { owner, repo }
    );
    res.json(release);
  });
