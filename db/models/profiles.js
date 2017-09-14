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
  },
  landmarks: function() {
    return this.belongsToMany('Landmark', 'landmarks_profiles');
  },
  posts_likes: function() {
    return this.belongsToMany('Post', 'posts_likes');
  }
}, {
  getProfileById: function(id) {
    return this.where({id}).fetch();
  }
});

module.exports = db.model('Profile', Profile);
