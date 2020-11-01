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
  res.writeHead(200, { 'Content-Type': 'text/html'});
  console.log(req.query);
  res.send(successHtmlWithMsg(req.query.code));
}