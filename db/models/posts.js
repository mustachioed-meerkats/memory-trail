const db = require('../');
const knex = db.knex;
const haversine = require('haversine');

const Post = db.Model.extend({
  tableName: 'posts',
  profile: function() {
    return this.belongsTo('Profile');
  }
});

module.exports = db.model('Post', Post);

module.exports.createPost = (post) => {
  return knex('posts').insert(post);
};

module.exports.getPostById = (id) => {
  return knex('posts').where('id', id);
};

module.exports.getAllPosts = () => {
  return knex('posts');
};

module.exports.getPostsByUserId = (profile_id) => {
  return knex('posts').where('profile_id', profile_id);
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