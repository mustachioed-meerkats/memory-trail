const db = require('../');
const Post = db.Model.extend({
  tableName: 'posts',
  profile: function() {
    return this.belongsTo('Profile');
  }
});

var postModel = db.model('Post', Post); //what is this line doing

module.exports.createPost = (profile_id, lat, lng, content, title) => {
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