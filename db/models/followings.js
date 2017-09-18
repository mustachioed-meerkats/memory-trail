const db = require('../');
const knex = db.knex;

const Following = db.Model.extend({
  tableName: 'followings',
  profile: function() {
    return this.belongsTo('Profile', 'following_id');
  }
}, {
  createFollowing: function(following) {
    return this.forge(following).save();
  },
  removeFollowing: function(unfollow) {
    return this.where(unfollow).save({currently_following: false}, {patch: true});
  },
  getAllFollowings: function(profile_id) {
    return this.where({
      profile_id: profile_id, 
      currently_following: true})
      .fetchAll({withRelated: ['profile']});
  }
});

module.exports = db.model('Following', Following);
