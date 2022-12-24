const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  let filePath = path.join(
    __dirname,
    req.url === '/' ? 'index.html' : req.url
  );
  console.log(req.url);//////////
  let extname = path.extname(filePath);
  let contentType = 'text/html';
  switch(extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
  }
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.readFile(path.join(__dirname, '404.html'), (err, content) => {
          res.writeHead(200, {'Content-type': 'text/html'})
          res.end(content, 'utf-8');
        })
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`)
      }
    } else {
      res.writeHead(200, { 'Content-type': contentType });
      res.end(content, 'utf-8');
    }
  })
});
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

