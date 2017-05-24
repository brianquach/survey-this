'use strict';

const express = require('express');
const config = require('./config/configuration');
const user = require('./routers/user');
const survey = require('./routers/survey');
const results = require('./routers/results');


const app = module.exports = express();

app.use('/user', user);
app.use('/survey', survey);
app.use('/results', results);
