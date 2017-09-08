const db = require('../');
const knex = db.knex;

const Following = db.Model.extend({
  tableName: 'followings',
  profile: function() {
    return this.belongsTo('Profile', 'profile_id');
  }
});

module.exports = db.model('Following', Following);