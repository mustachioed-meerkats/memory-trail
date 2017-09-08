const models = require('../../db/models');

module.exports.createPost = (req, res) => {
  models.Post.createPost(req.body)
    .then(result => {
      res.status(200).send(result);
    });
};

module.exports.getPostsByUserId = (req, res) => {
  var userId = req.params.id;
  models.Post.getPostsByUserId(userId)
    .then(results => {
      res.status(200).send(results);
    });
};

module.exports.getPostsWithinRadius = (req, res) => {
  models.Post.getPostsWithinRadius(req.body)
    .then(results => {
      res.status(200).send(results);
    });
};


module.exports.getPostsByStoryId = (req, res) => {
  models.Post.getPostsByStoryId(req.body)
    .then(results => {
      res.status(200).send(results);
    });
};

module.exports.getPostsByLandmarkId = (req, res) => {
  models.Post.getPostsByLandmarkId(req.body)
    .then(results => {
      res.status(200).send(results);
    });
};

module.exports.getPostsByFollowing = (req, res) => {
  models.Post.getPostsByFollowing(req.body)
    .then(results => {
      res.status(200).send(results);
    });
};
