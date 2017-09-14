const db = require('../');
const knex = db.knex;

const Comment = db.Model.extend({
  tableName: 'comments',
  profile: function() {
    return this.belongsTo('Profile');
  },
  post: function() {
    return this.belongsTo('Post');
  }
}, {
  createComment: function(profile_id, post_id, text) {
    return this.forge({
      profile_id,
      post_id,
      text
    }).save();
  }
});

module.exports = db.model('Comment', Comment);