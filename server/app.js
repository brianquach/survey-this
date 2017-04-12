let express = require('express');
let app = module.exports = express();

app.get('/', function (req, res) {
  res.send('Hello World!')
})
