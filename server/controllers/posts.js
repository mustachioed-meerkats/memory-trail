const models = require('../../db/models');

module.exports.createPost = (req, res) => {
  var {post, landmark} = req.body;
  models.Landmark.findOrCreateLandmark(landmark)
    .then(landmarkModel => {
      var landmark_id = landmarkModel.get('id');
      post.landmark_id = landmark_id;
      return models.Post.createPost(post);
    })
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

//done
module.exports.getPostsByStoryId = (req, res) => {
  models.Post.getPostsByStoryId(req.params.id)
    .then(results => {
      res.status(200).send(results);
    });
};

module.exports.getPostsByLandmarkId = (req, res) => {
  models.Post.getPostsByLandmarkId(req.params.id)
    .then(results => {
      res.status(200).send(results);
    });
};

module.exports.getPostsByFollowings = (req, res) => {
  models.Following.getAllFollowings(req.params.id)
    .then(results => {
      console.log('this is res', results);
      return results.models.map(following => {
        return following.get('following_id');
      });
    })
    .then(followingIdArray => {
      models.Post.getPostsByFollowings(followingIdArray)
        .then(results => {
          res.status(200).send(results);
        });
    });
};
