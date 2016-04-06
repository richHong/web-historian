var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var http = require('http-request')
// require more modules/folders here!
var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "text/html",
};

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    // console.log('res:',res)
    fs.readFile('web/public/index.html', function (err, data){
      console.log('data:',data);
      res.writeHead(200, headers);
      res.write(data);
      res.end(archive.paths.list);
    });
    // http.get({
    //   'url':'http://localhost/public',
    //   'proxy': {
    //     host: 'localhost',
    //     port: 8080
    //   }
    // }, 'index.html', function (err, res) {
    //   res.writeHead(200, headers);
    //   res.write(response);
    //   res.end(archive.paths.list);
    //   })
  } else if (req.method === 'POST') {
    res.writeHead(200, headers);
    res.end(archive.paths.list);
  }
};
