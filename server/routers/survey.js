'use strict';

const express = require('express');
const DynamoDB = require('aws-sdk/clients/dynamodb');
var bodyParser = require('body-parser');


const router = express.Router();
const docClient = new DynamoDB.DocumentClient({
  params: { TableName: 'Survey' }
});

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
});
router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

router.get('/:creator/:filter', function (req, res) {
  const creator = req.params.creator;

  var params = {
    KeyConditionExpression: 'Creator = :v0',
    ExpressionAttributeValues: {
        ":v0": creator,
    }
  };

  docClient.query(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      res.send(data);
    }
  });
});

router.post('/', function (req, res) {
  const creator = req.body.Creator;
  const title = req.body.Title;
  const questions = req.body.Questions;

  var params = {
    Item: {
      "Creator": creator,
      "Title": title,
      "Questions": questions
    }
  };

  docClient.put(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      res.send({ "IsSuccessful": true });
    }
  });
});

module.exports = router;
