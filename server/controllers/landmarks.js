const models = require('../../db/models');

//not sure if useful
module.exports.createLandmark = (req, res) => {
  models.Landmark.createLandmark(req.body)
    .then(result => {
      res.status(200).send(result);
    });
};

module.exports.getLandmarkById = (req, res) => {
  models.Landmark.getLandmarkById(req.params.id)
    .then(results => {
      res.status(200).send(results);
    });
};

module.exports.getLandmarksWithinRadius = (req, res) => {
  models.Landmark.getLandmarksWithinRadius(req.body)
    .then(results => {
      res.status(200).send(results);
    });
};