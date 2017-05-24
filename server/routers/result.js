'use strict';

const express = require('express');
const DynamoDB = require('aws-sdk/clients/dynamodb');


const router = express.Router();
const docClient = new DynamoDB.DocumentClient({
  params: {
    TableName: 'SurveyResult'
  }
});

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
      response.send(data);
    }
  });
});

router.post('/', function (request, response) {
  const creator = request.body.creator;
  const surveyResults = request.body.surveyResults;
  const surveyId = request.body.surveyId;
  const resultSetName = request.body.resultSetName;
  const surveyTitle = request.body.surveyTitle;

  let params = {
    Item: {
      "Creator": creator,
      "SurveyId": surveyId,
      "SurveyTitle": surveyTitle,
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
