const s3 = require('../middleware/s3.js').s3;

module.exports.upload = (req, res) => {

  console.log('request files from sending form data: ', req.files);
  var filename = req.files[0].originalname.split('.')[0];
  var key = filename + '_' + Date.now().toString();
  var region = 'us-west-1';
  var bucket = 'memorytrail';
  var awsLink = `https://s3-${region}.amazonaws.com/localized-0001/${key}`;

  let params = {
    ACL: 'public-read',
    Bucket: bucket,
    Key: key,
    Body: req.files[0].buffer,
    ContentType: req.files[0].mimetype,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.log('this is the error from the server on upload', err);
    } else {
      res.send(data);
    }
  });
}


