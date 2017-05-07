'use strict';

const express = require('express');
const DynamoDB = require('aws-sdk/clients/dynamodb');


const router = express.Router();
const table = new DynamoDB({ params: { TableName: 'Survey' } });

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
});

// define the home page route
router.get('/', function (req, res) {
  var params = {
    KeyConditionExpression: '#O = :v0',
    ExpressionAttributeNames: {
      "#O" : "Owner"
    },
    ExpressionAttributeValues: {
        ":v0": {
          "S": 'bquach@umail.ucsb.edu'
        },
    },

  };
  table.query(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
  });
  res.send('Survey GET route')
});

module.exports = router;
