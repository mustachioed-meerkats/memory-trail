const models = require('../../db/models');

module.exports.createFollowing = (req, res) => {
  models.Followings.createFollowing()
    .then(result => {
      res.status(200).send(result);
    });
};

module.exports.getAllFollowings = (req, res) => {
  models.Followings.getAllFollowings()
    .then(results => {
      res.status(200).send(results);
    });
};