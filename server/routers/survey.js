'use strict';

const express = require('express');
const DynamoDB = require('aws-sdk/clients/dynamodb');
const uuidV4 = require('uuid/v4');
var bodyParser = require('body-parser');


const router = express.Router();
const docClient = new DynamoDB.DocumentClient();

router.use(function timeLog (request, response, next) {
  console.log('Time: ', Date.now())
  next()
});
router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

router.get('/:creator/:filter', function (request, response) {
  const creator = request.params.creator;

  var params = {
    KeyConditionExpression: 'Creator = :v0',
    ExpressionAttributeValues: {
        ":v0": creator,
    },
    TableName: 'Survey'
  };

  docClient.query(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      response.send(data);
    }
  });
});

router.post('/', function (request, response) {
  const creator = request.body.creator;
  const title = request.body.title;
  const questions = request.body.questions;
  const uuid = uuidV4();

  var params = {
    Item: {
      "Creator": creator,
      "Title": title,
      "Questions": questions,
      "Id": uuid
    },
    TableName: 'Survey'
  };

  docClient.put(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      response.send({ "IsSuccessful": true });
    }
  });
});

router.post('/results', function (request, response) {
  const surveyResults = request.body.surveyResults;
  const surveyId = request.body.surveyId;
  const resultSetName = request.body.resultSetName;
  
  var params = {
    Item: {
      "SurveyId": surveyId,
      "Results": surveyResults,
      "ResultSetName": resultSetName
    },
    TableName: 'SurveyResults'
  };

  docClient.put(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      response.send({ "IsSuccessful": true });
    }
  });
});

module.exports = router;
