const models = require('../models');

var profile_id = '';
var story_id = '';
var landmark_id = '';

exports.seed = function (knex, Promise) {
  return models.Profile.forge({
    first: 'Kevin',
    last: 'Nivek',
    display: 'Kevin Nivek',
    email: 'kevin@hmail.com'
  }).save()
    .then(profile => {
      profile_id = profile.get('id');
      return models.Story.forge({
        profile_id: profile_id,
        title: 'China Trip',
        summary: 'It was so fun! OMG!'
      }).save();
    })
    .then(story => {
      story_id = story.get('id');
      return models.Landmark.forge({
        name: 'Union Square',
        image_url: 'www.google.com',
        lat: 37.7997456,
        lng: -122.408456,
        google_id: 'thisisafakegoogleid'
      }).save();
    })
    .then(landmark => {
      landmark_id = landmark.get('id');
      return models.Post.forge({
        profile_id: profile_id,
        lat: 37.7997979,
        lng: -122.408342,
        content: 'This is the best day ever!',
        // title: 'Testing Day',
        story_id: story_id,
        landmark_id: landmark_id,
        image_url: 'https://cache-graphicslib.viator.com/graphicslib/thumbs360x240/2660/SITours/private-san-francisco-city-tour-in-san-francisco-164077.jpg',
        profile_display: 'Kevin Nivek'
      }).save();
    })
    .then(post => {
      return models.Profile.forge({
        first: 'Nat',
        last: 'Tan',
        display: 'Nat Tan',
        email: 'nat@hmail.com'
      }).save();
    })
    .then(profile => {
      return models.Following.forge({
        profile_id: profile_id,
        following_id: profile.get('id')
      }).save();
    })
    .error(err => {
      console.error('ERROR: failed to create seeds');
    })
    .catch((error) => {
      console.log('WARNING!', error);
    });
};