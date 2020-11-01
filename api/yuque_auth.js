const axios = require('axios');

const successHtmlWithMsg = (msg) => `
 <html>
    <script>
        if (window.opener) {
           // send them to the opening window
           window.opener.postMessage('${msg}');
           window.postMessage('${msg}', 'http://localhost:8080');
           // close the popup
           window.close();
        }
    </script>
 </html>
`;

const YuQueConfig = {
  tokenURL: 'https://www.yuque.com/oauth2/token',
  clientID: 'ab7VkEGAfseQU3ecnLNq',
  clientSecret: 'svLZYV7j0kZ1I9sCEWCXcSBS5Y8TUvHPYo5M2FcR',
  grantType: 'authorization_code'
}

const getAccessToken = async (code) => {
  const tokenInfo = await axios
    .post(YuQueConfig.tokenURL, {
      client_id: YuQueConfig.clientID,
      client_secret: YuQueConfig.clientSecret,
      code,
      grant_type: YuQueConfig.grantType
    })

  return tokenInfo.access_token;
}

module.exports = async (req, res) => {
  const code = req.query.code;
  const accessToken = getAccessToken(code);
  res.setHeader('Content-Type', 'text/html');
  res.write(successHtmlWithMsg(accessToken));
  res.end();
}