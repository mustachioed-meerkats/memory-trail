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
  },
  getStoriesByUserId: function(profile_id) {
    return this.where({profile_id}).fetchAll({withRelated: ['posts']});
  }
});

module.exports = db.model('Story', Story);