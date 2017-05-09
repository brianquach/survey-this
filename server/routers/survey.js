'use strict';

const express = require('express');
const DynamoDB = require('aws-sdk/clients/dynamodb');


const router = express.Router();
const docClient = new DynamoDB.DocumentClient({
  params: { TableName: 'Survey' }
});

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
});

router.get('/:creator/:filter', function (req, res) {
  const creator = req.params.creator;

  var params = {
    KeyConditionExpression: '#O = :v0',
    ExpressionAttributeNames: {
      "#O" : "Owner"
    },
    ExpressionAttributeValues: {
        ":v0": creator,
    },
  };

  docClient.query(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      res.send(data);
    }
  });
});

module.exports = router;
