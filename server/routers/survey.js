'use strict';

const express = require('express');
const DynamoDB = require('aws-sdk/clients/dynamodb');
const uuidV4 = require('uuid/v4');


const router = express.Router();
const docClient = new DynamoDB.DocumentClient({
  params: {
    TableName: 'Survey'
  }
});

router.get('/:creator/:filter', function (request, response) {
  const creator = request.params.creator;

  let params = {
    KeyConditionExpression: 'Creator = :v0',
    ExpressionAttributeValues: {
        ":v0": creator,
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
  const title = request.body.title;
  const questions = request.body.questions;
  const uuid = uuidV4();

  let params = {
    Item: {
      "Creator": creator,
      "Title": title,
      "Questions": questions,
      "Id": uuid
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
