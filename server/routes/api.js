'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../controllers');

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
  .post(controller.Posts.createPost);

router.route('/posts/user/:id')
  .get(controller.Posts.getPostsByUserId);

router.route('/posts/nearby')
  .post(controller.Posts.getPostsWithinRadius);


  
module.exports = router;
