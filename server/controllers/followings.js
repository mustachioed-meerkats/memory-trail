const models = require('../../db/models');

module.exports.createFollowing = (req, res) => {
  models.Following.createFollowing()
    .then(result => {
      res.status(200).send(result);
    });
};

module.exports.getAllFollowings = (req, res) => {
  models.Following.getAllFollowings()
    .then(results => {
      res.status(200).send(results);
    });
};