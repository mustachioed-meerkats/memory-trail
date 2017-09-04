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

/** ============================================================
 * POST ROUTES
 * =============================================================
 */

router.route('/posts/new')
  .post((req, res) => {
    console.log(req.body);
    console.log('(Server) Intiating POST Request! CREATING NEW POST');
    models.Post.createPost(req.body)
      .then(result => {
        res.status(200).send(result);
      });
  });

// Determine the appropriate endpoint
router.route('/posts/user')
  .get((req, res) => {
    models.Post.getPostById(req.user.id)
      .then(post => {
        res.status(200).send(post);
      });
  });

/** ============================================================
 * TEST ROUTES
 * =============================================================
 */

router.route('/test')
  .get((req, res) => {
    var profile_id = 2;
    var lat = 37.7836920;
    var lng = -122.4089670;
    var content = 'Meerkats mobs yo';
    var title = 'Katz in Paris';
    models.Post.createPost(profile_id, lat, lng, content, title)
      .then(result => {
        res.status(200).send(result);
      });
  });

router.route('/test2')
  .get((req, res) => {
    var id = 2;
    models.Post.getPostById(id)
      .then(post => {
        res.send(post);
      });
  });

router.route('/posts')
  .post((req, res) => {
    var {lat, lng} = req.body;
    models.Post.getAllPosts()
      .then(results => {
        res.send(results);
      });
  });

module.exports = router;
