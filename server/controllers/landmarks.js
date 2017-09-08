const models = require('../../db/models');

module.exports.createLandmark = (req, res) => {
  models.Landmarks.createLandmark()
    .then(result => {
      res.status(200).send(result);
    });
};

module.exports.getLandmarkById = (req, res) => {
  models.Landmarks.getLandmarkById()
    .then(results => {
      res.status(200).send(results);
    });
};

module.exports.getStoriesByUserId = (req, res) => {
  models.Landmarks.getPostsWithinRadius()
    .then(results => {
      res.status(200).send(results);
    });
};