const AWS = require('aws-sdk');
const AWSconfig = require('config')['AWS'];

AWS.config.update({
  accessKeyId: AWSconfig.accessKeyId,
  secretAccessKey: AWSconfig.secretAccessKey
});

module.exports.s3 = new AWS.S3();