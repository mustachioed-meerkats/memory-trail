const db = require('../');
const knex = db.knex;

const Landmark = db.Model.extend({
  tableName: 'landmarks',
  posts: function() {
    return this.hasMany('Post');
  }
});

module.exports = db.model('Landmark', Landmark);