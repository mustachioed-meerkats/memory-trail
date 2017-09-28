const db = require('../');
const knex = db.knex;

const Post = db.Model.extend({
  tableName: 'posts',
  profile: function() {
    return this.belongsTo('Profile');
  },
  story: function() {
    return this.belongsTo('Story');
  },
  landmark: function() {
    return this.belongsTo('Landmark');
  },
  profiles_likes: function() {
    return this.belongsToMany('Profile', 'posts_likes');
  },
  comments: function() {
    return this.hasMany('Comment');
  }
}, {
  getPostsByStoryId: function(story_id) {
    return this.where({story_id}).orderBy('created_at', 'ASC').fetchAll({withRelated: ['profile']});
  }, 
  createPost: function(post) {
    return this.forge(post).save();
  },
  getAllPosts: function(profile_id) {
    return this.fetchAll({withRelated: ['profile']});
  },
  getPostsByUserId: function(profile_id) {
    return this.where({profile_id}).fetchAll({withRelated: ['comments.profile']});
  },
  getPostsWithinRadius: function(center, radius = 13) {
    var {lat, lng} = center;
    var degreesPerMile = 0.0144722856;
    var maxLat = lat + degreesPerMile * radius;
    var minLat = lat - degreesPerMile * radius;
    var maxLng = lng + degreesPerMile * radius;
    var minLng = lng - degreesPerMile * radius;
    return this.where('lat', '<', maxLat)
      .where('lat', '>', minLat)
      .where('lng', '<', maxLng)
      .where('lng', '>', minLng)
      .fetchAll({withRelated: ['profile']});
  },
  getPostsByLandmarkId: function(landmark_id) {
    return this.where({landmark_id}).fetchAll({withRelated: ['profile', 'landmark']});
  },
  getPostsByFollowings: function(followings) {
    return this.forge().query(function(qb) {
      qb.havingIn('profile_id', followings).groupBy('id');
    })
      .fetchAll({withRelated: ['profile']});
  },
  getPostById: function(id) {
    return this.where({id}).fetch();
  }
});

module.exports = db.model('Post', Post);
