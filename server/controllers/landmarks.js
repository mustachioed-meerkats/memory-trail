const models = require('../../db/models');

module.exports.createLandmark = (req, res) => {
  models.Landmark.createLandmark(req.body)
    .then(result => {
      res.status(200).send(result);
    });
};

module.exports.getLandmarkById = (req, res) => {
  models.Landmark.getLandmarkById()
    .then(results => {
      res.status(200).send(results);
    });
};

module.exports.getStoriesByUserId = (req, res) => {
  models.Landmark.getPostsWithinRadius()
    .then(results => {
      res.status(200).send(results);
    });
};