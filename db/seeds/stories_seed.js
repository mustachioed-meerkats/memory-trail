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
    .error(err => {
      console.error('ERROR: failed to create profile');
      throw err;
    })
    .catch(() => {
      console.log('WARNING: defualt user already exists.');
    });
};
