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

router.route('/posts/nearby')
  .post((req, res) => {
    var {lat, lng} = req.body;
    models.Post.getPostsWithinRadius(req.body)
      .then(results => {
        res.send(results);
      });
  });

/** ============================================================
 * TEST ROUTES
 * =============================================================
 */

router.route('/test')
  .get((req, res) => {
    var post = {};
    post.profile_id = 2;
    post.lat = 37.741576;
    post.lng = -122.508059;
    post.content = 'Going to the beach';
    post.title = 'We are going to the beach yay yay yay. best day ever.';
    models.Post.createPost(post)
      .then(result => {
        res.status(200).send(result);
      });
  });

router.route('/test2')
  .get((req, res) => {
    var id = 11;
    models.Post.getPostById(id)
      .then(post => {
        res.send(post);
      });
  });


  
module.exports = router;
