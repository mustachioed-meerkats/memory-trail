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
  
router.route('/posts/story/:id')
  .get(controller.Posts.getPostsByStoryId);

router.route('/posts/landmark/:id')
  .get(controller.Posts.getPostsByLandmarkId);

router.route('/posts/following')
  .get(controller.Posts.getPostsByFollowing);

router.route('/posts/nearby')
  .post(controller.Posts.getPostsWithinRadius);

/** ============================================================
 * STORY ROUTES
 * =============================================================
 */

router.route('/stories/new')
  .post(controller.Stories.createStory);
  
router.route('/stories/:id')
  .get(controller.Stories.getStoryById);

router.route('/stories/user/:user_id')
  .get(controller.Stories.getStoriesByUserId);

/** ============================================================
 * LANDMARK ROUTES
 * =============================================================
 */

router.route('/landmarks/new')
  .post(controller.Landmarks.createLandmark);

router.route('/landmarks/:id')
  .get(controller.Landmarks.getLandmarkById);

/** ============================================================
 * FOLLOWING ROUTES
 * =============================================================
 */

router.route('/followings/new')
  .post(controller.Followings.createFollowing);

router.route('/followings')
  .get(controller.Followings.getAllFollowings);



module.exports = router;
