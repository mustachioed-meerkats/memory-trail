const models = require('../../db/models');
//done
module.exports.createStory = (req, res) => {
  models.Story.createStory(req.body)
    .then(result => {
      res.status(200).send(result);
    });
};

//done
module.exports.getStoryById = (req, res) => {
  models.Story.getStoryById(req.params.id)
    .then(results => {
      res.status(200).send(results);
    });
};

//done
module.exports.getStoriesByUserId = (req, res) => {
  models.Story.getStoriesByUserId(req.params.id)
    .then(results => {
      res.status(200).send(results);
    });
};