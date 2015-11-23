var express = require('express');
var pkg = require('./package.json');
var app = express();

app.use(express.static('./build/index.html'));

var server = app.listen(process.env.port || 3000, function() {
  var port = server.address().port;
  console.log('Listening at :%s', port);
});

module.exports = server;