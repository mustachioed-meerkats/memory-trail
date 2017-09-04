const db = require('../');
const knex = db.knex;
const haversine = require('haversine');

const Post = db.Model.extend({
  tableName: 'posts',
  profile: function() {
    return this.belongsTo('Profile');
  }
});

var postModel = db.model('Post', Post);
module.exports = postModel;

module.exports.createPost = (post) => {
  let profile_id = post.profile_id;
  let lat = post.lat;
  let lng = post.lng;
  let content = post.content;
  let title = post.title;
  
  return postModel.forge({
    profile_id,
    lat,
    lng,
    content,
    title
  }).save();
};

module.exports.getPostById = (id) => {
  return knex('posts').where('id', id);
};

module.exports.getAllPosts = () => {
  return knex('posts');
};

module.exports.getPostsByUserId = (profile_id) => {
  // refactor to use knex
  return postModel.where('profile_id', profile_id).fetchAll();
};

module.exports.getPostsWithinRadius = (center, radius = 13) => {
  // rough calculation
  var {lat, lng} = center;
  var degreesPerMile = 0.0144722856;
  var maxLat = lat + degreesPerMile * radius;
  var minLat = lat - degreesPerMile * radius;
  var maxLng = lng + degreesPerMile * radius;
  var minLng = lng - degreesPerMile * radius;
  return knex('posts')
    .where('lat', '<', maxLat)
    .andWhere('lat', '>', minLat)
    .andWhere('lng', '<', maxLng)
    .andWhere('lng', '>', minLng);
};