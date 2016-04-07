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
    if(req.url === '/'){   
      fs.readFile('web/public/index.html', function (err, data){
        res.writeHead(200, headers);
        res.write(data);
        res.end(archive.paths.list);
      });
    } else if (req.url === '/www.google.com') {  // TODO find actual var to pass isntead of 'google.com'.
        fs.readFile('archives/sites/www.google.com', function (err, data){
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.write(data);
        res.end(archive.paths.list);
      });        
    } else {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end();
    }
  } else if (req.method === 'POST') {
    // fs.open('web/archives/sites.txt', 'w', function() {
    //   fs.write(, req.url);
    //   res.writeHead(302, headers);
    //   res.end(); 
    // });
    var fd = fs.open('web/archives/sites.txt', "w");
    fs.write(fd, req.url);
    fs.close(fd);
    res.writeHead(302, headers);
    res.end(); 
  }
};
