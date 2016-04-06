var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "application/json",
};

exports.handleRequest = function (req, res) {
  // console.log('request: ',req);
  if (req.method === 'GET') {
    fs.readFile('/public/loading.html', function (err, data) {
    console.log('our data: ',data);     
    res.writehead(200, headers);
    res.write(data);
    res.end(archive.paths.list);
    });    
  } else if (req.method === 'POST') {
    res.writehead(200, headers);
    res.end(archive.paths.list);
  }
};
