const s3 = require('../middleware/s3.js').s3;

module.exports.upload = (req, res) => {

  let params = {
    Bucket: "memorytrail",
    Key: req.body.filename,
    Expires: 60,
  };

  console.log(req.body);
  s3.getSignedUrl('putObject', params, function(err, data) {
    if (err) {
      console.log('this is the error from getSignedUrl: ', err);
      return err;
    } else {
      res.send(data);
    }
  });
}

