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
  getAllFollowings: function(profile_id) {
    return this.where({profile_id}).fetchAll({withRelated: ['profile']});
  }
});

module.exports = db.model('Following', Following);