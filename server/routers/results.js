'use strict';

const express = require('express');
const DynamoDB = require('aws-sdk/clients/dynamodb');
var bodyParser = require('body-parser');


const router = express.Router();
const docClient = new DynamoDB.DocumentClient({
  params: {
    TableName: 'SurveyResults'
  }
});

router.use(function timeLog (request, response, next) {
  console.log('Time: ', Date.now())
  next()
});

router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

router.get('/:surveyId', function (request, response) {
  const surveyId = request.params.surveyId;

  let params = {
    KeyConditionExpression: 'SurveyId = :v0',
    ExpressionAttributeValues: {
        ":v0": surveyId,
    }
  };

  docClient.query(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      response.send(data.Items[0]);
    }
  });
});

router.post('/', function (request, response) {
  const surveyResults = request.body.surveyResults;
  const surveyId = request.body.surveyId;
  const resultSetName = request.body.resultSetName;

  let params = {
    Item: {
      "SurveyId": surveyId,
      "Results": surveyResults,
      "ResultSetName": resultSetName
    }
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
