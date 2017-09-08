const db = require('../');
const knex = db.knex;

const Story = db.Model.extend({
  tableName: 'stories',
  profile: function() {
    return this.belongsTo('Profile');
  },
  posts: function() {
    return this.hasMany('Post');
  }
});

module.exports = db.model('Story', Story);