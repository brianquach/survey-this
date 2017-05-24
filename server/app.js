'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/configuration');
const user = require('./routers/user');
const survey = require('./routers/survey');
const results = require('./routers/results');


const app = module.exports = express();

// Log time
app.use((request, response, next) => {
  console.log('Time: ', Date.now())
  next()
});

// Parse body of http requests into json
app.use(bodyParser.json());
//router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/user', user);
app.use('/survey', survey);
app.use('/results', results);
