const models = require('../../db/models');

module.exports.createStory = (req, res) => {
  models.Stories.createStory()
    .then(result => {
      res.status(200).send(result);
    });
};

module.exports.getStoryById = (req, res) => {
  models.Stories.getStoryById()
    .then(results => {
      res.status(200).send(results);
    });
};

module.exports.getStoriesByUserId = (req, res) => {
  models.Stories.getStoriesByUserId()
    .then(results => {
      res.status(200).send(results);
    });
};