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
}, {
  getStoryById: function(id) {
    return this.where({id}).fetch();
  },
  createStory: function(story) {
    return this.forge(story).save();
  }
});

module.exports = db.model('Story', Story);