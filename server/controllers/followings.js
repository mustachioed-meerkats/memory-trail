const models = require('../../db/models');

module.exports.createFollowing = (req, res) => {
  models.Following.createFollowing(req.body)
    .then(result => {
      res.status(200).send(result);
    });
};

module.exports.removeFollowing = (req, res) => {
  models.Following.removeFollowing(req.body)
    .then(result => {
      res.status(200).send(result);
    });
};

module.exports.getAllFollowings = (req, res) => {
  models.Following.getAllFollowings(req.params.id)
    .then(results => {
      res.status(200).send(results);
    });
};