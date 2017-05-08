'use strict';

const AWS = require('aws-sdk/global');
const https = require('https');


const configureAWS = () => {
  var agent = new https.Agent({
     maxSockets: 25
  });

  AWS.config.update({
    region: 'us-west-2',
    dynamodb: '2012-08-10',
    httpOptions: {
      agent: agent,
    },
  });
};
configureAWS();
