const express = require('express');
const router = express.Router();
const UploadsController = require('../controllers').Uploads;

router.route('/')
  .post(UploadsController.upload);

module.exports = router;