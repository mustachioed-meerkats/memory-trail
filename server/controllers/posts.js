const models = require('../../db/models');
const axios = require('axios');
// const NL_API = require('./natural_language_api.js');

module.exports.createPost = (req, res) => {
  var {post, landmark} = req.body;
  var landmark_id;
  models.Landmark.findOrCreateLandmark(landmark)
    .then(landmarkModel => {
      landmark_id = landmarkModel.get('id');
      post.landmark_id = landmark_id;
      return models.Profile.getProfileById(post.profile_id);
    })
    .then(profile => {
      return profile.landmarks().attach(landmark_id);
    })
    // .then(() => {
    //   return NL_API(post.content);
    // })
    .then(sentiment => {
      // post.score = sentiment.score;
      // post.magnitude = sentiment.magnitude;
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

module.exports.likePost = (req, res) => {
  var {profile_id, post_id} = req.body;
  models.Post.getPostById(post_id)
    .then(post => {
      post.profiles_likes().attach(profile_id);
    })
    .then(result => {
      res.send(result);
    });
};

module.exports.commentPost = (req, res) => {
  var {profile_id, post_id, text} = req.body;
  models.Comment.createComment(profile_id, post_id, text)
    .then(result => {
      res.send(result);
    });
};