const http = require('http')

const server = http.createServer(function (req, resp) {
  resp.end(`<h1>Hello NodeJs</h1>`);
});

server.listen('3000');

