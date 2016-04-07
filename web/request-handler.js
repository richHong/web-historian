var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var http = require('http');
// require more modules/folders here!
var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "text/html",
};
var router = [{route:'/', location:'web/public/index.html'}, {route:'/www.google.com', location:'archives/sites/www.google.com'}];

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    var found = false;
    router.forEach(function (page){
      if (req.url === page.route){
        found = true;
        fs.readFile(page.location, function (err, data){
          res.writeHead(200, headers);
          res.write(data);
          res.end(archive.paths.list);
        })
      }
    })
    if (!found){
      res.writeHead(404, {"Content-Type": "text/plain"});
      res.end();
    } 
    // if(req.url === '/'){
    //   fs.readFile('web/public/index.html', function (err, data){
    //     res.writeHead(200, headers);
    //     res.write(data);
    //     res.end(archive.paths.list);
    //   });
    // } else if (req.url === '/www.google.com') {  // TODO find actual var to pass isntead of 'google.com'.
    //   fs.readFile('archives/sites/www.google.com', function (err, data){
    //     res.writeHead(200, {"Content-Type": "text/plain"});
    //     res.write(data);
    //     res.end(archive.paths.list);
    //   });
    // } else {
    //     res.writeHead(404, {"Content-Type": "text/plain"});
    //     res.end();
    // }
  } else if (req.method === 'POST') {
    var body = '';
    var parsed; 

    req.addListener('data', function(chunk){
      console.log('got a chunk');
      body += chunk;
    });

    req.addListener('error', function(error){
      console.error('got a error', error);
      next(err);
    });

    req.addListener('end', function(chunk){
      console.log('ended');
      if (chunk) {
        body += chunk;
      }

      parsed = JSON.parse(body);

      fs.appendFile(archive.paths.list, 'string' +'\n', function(err) {
        console.log('parsed in fs.writeFile', parsed);
        if (err) {
          console.log(err);
          res.end();
        } else {
          console.log('Success');
          res.writeHead(302, {"Content-Type": "text/plain"});
          res.end();
        }
      });
      
    });     
  }
};
