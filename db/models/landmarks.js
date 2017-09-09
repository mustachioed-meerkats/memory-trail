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
  },
  findOrCreateLandmark: function(postInfo) {
    var {lat, lng} = postInfo;
    return this.where({lat, lng}).fetch()
      .then(landmark => {
        if (landmark) {
          throw landmark;
        }
        return {
          name: 'dummy landmark',
          description: 'this is a dummy landmark',
          image_url: 'www.google.com',
          lat,
          lng
        };
      })
      .then(landmarkInfo => {
        return this.forge(landmarkInfo).save();
      })
      .catch(landmark => {
        return landmark;
      });
  }
});

module.exports = db.model('Landmark', Landmark);