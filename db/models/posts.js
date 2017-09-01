const db = require('../');
const Post = db.Model.extend({
  tableName: 'posts',
  profile: function() {
    return this.belongsTo('Profile');
  },

  createPost: function(profile_id, lat, lng, content, title) {
    return this.forge({
      profile_id,
      lat,
      lng,
      content,
      title
    }).save();
  },

  getPostById: function(id) {
    return this.where('id', id).fetch();
  }
});

module.exports = db.model('Post', Post);