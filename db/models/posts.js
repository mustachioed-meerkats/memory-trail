const db = require('../');
const Post = db.Model.extend({
  tableName: 'posts',
  profile: function() {
    return this.belongsTo('Profile');
  }
});

module.exports = db.model('Post', Post);