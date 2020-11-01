const axios = require('axios');

const successHtmlWithMsg = (msg) => `
 <html>
    <script>
        if (window.opener) {
           // send them to the opening window
           window.opener.postMessage('${msg}', '*');
           // close the popup
           window.close();
        }
    </script>
 </html>
`;

const YuQueConfig = {
  tokenURL: 'https://www.yuque.com/oauth2/token',
  userInfoURL: 'https://www.yuque.com/api/v2/user',
  clientID: 'ab7VkEGAfseQU3ecnLNq',
  clientSecret: 'svLZYV7j0kZ1I9sCEWCXcSBS5Y8TUvHPYo5M2FcR',
  grantType: 'authorization_code',
  accountId: '42567'
}

const getAccessToken = async (code) => {
  const res = await axios
    .post(YuQueConfig.tokenURL, {
      client_id: YuQueConfig.clientID,
      client_secret: YuQueConfig.clientSecret,
      code,
      grant_type: YuQueConfig.grantType
    })

  return res.data.access_token;
}

const getUserInfo = async (token) => {
  const config = {
    headers: { 'X-Auth-Token': token }
  };

  const res = await axios.get(
    YuQueConfig.userInfoURL,
    config
  );

  return res.data;
}

const login = async (token) => {
  const loginResult = {
    token,
  };
  const { data: userInfo } = await getUserInfo(token);
  if (userInfo.account_id === YuQueConfig.accountId) {
    loginResult.login = true;
    loginResult.user = userInfo;
  } else {
    loginResult.login = false;
  }
  return JSON.stringify(loginResult);
}

module.exports = async (req, res) => {
  const code = req.query.code;
  const accessToken = await getAccessToken(code);
  const loginResult = await login(accessToken);
  res.setHeader('Content-Type', 'text/html');
  res.write(successHtmlWithMsg(loginResult));
  res.end();
}