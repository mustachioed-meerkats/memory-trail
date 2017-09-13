const db = require('../');
const knex = db.knex;

const Landmark = db.Model.extend({
  tableName: 'landmarks',
  posts: function() {
    return this.hasMany('Post');
  },
  profiles: function() {
    return this.belongsToMany('Profile', 'landmarks_profiles');
  }
}, {
  //not sure if useful
  createLandmark: function(landmark) {
    return this.forge(landmark).save();
  },
  findOrCreateLandmark: function(landmarkInfo) {
    var {google_id} = landmarkInfo;
    return this.where({google_id}).fetch()
      .then(landmark => {
        if (landmark) {
          throw landmark;
        }
        return {
          name: landmarkInfo.name,
          image_url: landmarkInfo.image_url,
          lat: landmarkInfo.lat,
          lng: landmarkInfo.lng,
          google_id: landmarkInfo.google_id,
        };
      })
      .then(landmarkInfo => {
        return this.forge(landmarkInfo).save();
      })
      .catch(landmark => {
        return landmark;
      });
  },
  getLandmarkById: function(id) {
    return this.where({id}).fetch();
  },
  getLandmarksWithinRadius: function(center, radius = 13) {
    var {lat, lng} = center;
    var degreesPerMile = 0.0144722856;
    var maxLat = lat + degreesPerMile * radius;
    var minLat = lat - degreesPerMile * radius;
    var maxLng = lng + degreesPerMile * radius;
    var minLng = lng - degreesPerMile * radius;
    return this.where('lat', '<', maxLat)
      .where('lat', '>', minLat)
      .where('lng', '<', maxLng)
      .where('lng', '>', minLng)
      .fetchAll({withRelated: ['posts']});
  }
});

module.exports = db.model('Landmark', Landmark);