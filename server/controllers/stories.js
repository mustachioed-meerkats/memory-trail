const models = require('../../db/models');

module.exports.createStory = (req, res) => {
  models.Story.createStory()
    .then(result => {
      res.status(200).send(result);
    });
};

module.exports.getStoryById = (req, res) => {
  models.Story.getStoryById(req.params.id)
    .then(results => {
      res.status(200).send(results);
    });
};

module.exports.getStoriesByUserId = (req, res) => {
  models.Story.getStoriesByUserId()
    .then(results => {
      res.status(200).send(results);
    });
};