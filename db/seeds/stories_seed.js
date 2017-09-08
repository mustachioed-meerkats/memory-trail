const models = require('../models');

exports.seed = function (knex, Promise) {

  return models.Story.where({title: 'everyday life'}).fetch()
    .then(story => {
      if (story) {
        throw story;
      }
      return models.Story.forge({
        profile_id: 1,
        title: 'everyday life',
        summary: 'This is a test story. it is getting late.'
      }).save();
    })
    .catch(() => {
      console.log('WARNING: story already exists.');
    })
    .then(() => {
      return models.Story.where({title: 'Europe Trip'}).fetch();
    })
    .then(story => {
      if (story) {
        throw story;
      }
      return models.Story.forge({
        profile_id: 1,
        title: 'Europe Trip',
        summary: 'This was so much fun. Can not wait to go back!'
      }).save();
    })
    .error(err => {
      console.error('ERROR: failed to create story');
      throw err;
    })
    .catch(() => {
      console.log('WARNING: story already exists.');
    });
};
