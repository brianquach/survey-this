var express = require('express');
var app = module.exports = express();

require('../../app');

app.listen(3000, function () {
  console.log('Survey This is now online!');
});
