var app = require('./bin/www/init');

app.get('/', function (req, res) {
  res.send('Hello World!')
})
