const db = require('../');

const Profile = db.Model.extend({
  tableName: 'profiles',
  auths: function() {
    return this.hasMany('Auth');
  },
  posts: function() {
    return this.hasMany('Post');
  }
});

var profileModel = db.model('Profile', Profile);
module.exports = profileModel;
