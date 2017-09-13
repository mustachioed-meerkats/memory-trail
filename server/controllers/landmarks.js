const models = require('../../db/models');

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

module.exports.getGuestbookByLandmarkId = (req, res) => {
  models.Landmark.getLandmarkById(req.params.id)
    .profiles()
    .then(results => {
      res.status(200).send(results);
    });
};