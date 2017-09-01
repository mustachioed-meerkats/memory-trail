'use strict';
const express = require('express');
const router = express.Router();
const models = require('../../db/models');

router.route('/')
  .get((req, res) => {
    res.status(200).send('Hello World!');
  })
  .post((req, res) => {
    console.log('in the correct route');
    res.status(201).send({ data: 'Posted!' });
  });

router.route('/test')
  .get((req, res) => {
    models.Post.forge({
      profile_id: 2,
      lat: 37.7836920,
      lng: -122.4089670,
      content: 'This is my first blog! I am super excited about it!',
      title: 'First Blog Ever!'
    }).save()
      .then((result) => {
        res.status(200).send('oh heyyy');
      });
  });

router.route('/test2')
  .get((req, res) => {
    models.Post.where('id', 1).fetch()
      .then((post) => {
        res.send(post);
      });
  });

module.exports = router;
