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
    var profile_id = 2;
    var lat = 37.7836920;
    var lng = -122.4089670;
    var content = 'Spain was tight yo';
    var title = 'Kevin in Spain';
    models.Post.createPost(profile_id, lat, lng, content, title)
      .then(result => {
        res.status(200).send(result);
      });
  });

router.route('/test2')
  .get((req, res) => {
    var id = 3;
    models.Post.getPostById(id)
      .then(post => {
        res.send(post);
      });
  });

module.exports = router;
