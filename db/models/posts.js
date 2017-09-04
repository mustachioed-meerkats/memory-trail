const db = require('../');
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
  return postModel.where('id', id).fetch();
};

module.exports.getPostsByUserId = (profile_id) => {
  return postModel.where('profile_id', profile_id).fetchAll();
};