const db = require('../');
const knex = db.knex;

const Landmark = db.Model.extend({
  tableName: 'landmarks',
  posts: function() {
    return this.hasMany('Post');
  }
}, {
  createLandmark: function(landmark) {
    return this.forge(landmark).save();
  }
});

module.exports = db.model('Landmark', Landmark);