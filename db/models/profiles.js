const db = require('../');

const Profile = db.Model.extend({
  tableName: 'profiles',
  auths: function() {
    return this.hasMany('Auth');
  },
  posts: function() {
    return this.hasMany('Post');
  },
  stories: function() {
    return this.hasMany('Story');
  },
  followings: function() {
    return this.hasMany('Following');
  }
});

module.exports = db.model('Profile', Profile);
