const successHtmlWithMsg = (msg) => `
 <html>
    <script>
        if (window.opener) {
           // send them to the opening window
           window.opener.postMessage(${msg});
           // close the popup
           window.close();
        }
    </script>
 </html>
`
module.exports = (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.write(successHtmlWithMsg(req.query.code));
  res.end();
}