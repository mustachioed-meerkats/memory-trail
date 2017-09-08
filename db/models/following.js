const db = require('../');
const knex = db.knex;

const Following = db.Model.extend({
  tableName: 'followings',
  profile: function() {
    return this.belongsTo('Profile');
  }
});

module.exports = db.model('Following', Following);