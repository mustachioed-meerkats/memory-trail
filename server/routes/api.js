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

//insert entry into post table, return created entry
router.route('/posts/new')
  .post(controller.Posts.createPost);

router.route('/posts/user/:id')
  .get(controller.Posts.getPostsByUserId);
  
//return posts entries from post table by story id SORTED BY TIME STAMP
router.route('/posts/story/:id')
  .get(controller.Posts.getPostsByStoryId);

// return all posts entries by a landmark id
router.route('/posts/landmark/:id')
  .get(controller.Posts.getPostsByLandmarkId);

//return posts entries by user's followings with userinfo
router.route('/posts/followings/:id')
  .get(controller.Posts.getPostsByFollowings);

router.route('/posts/nearby')
  .post(controller.Posts.getPostsWithinRadius);

/** ============================================================
 * STORY ROUTES
 * =============================================================
 */

// expect story object and create entry in story table, return added entry
router.route('/stories/new')
  .post(controller.Stories.createStory);
  
// get story entry by id
router.route('/stories/:id')
  .get(controller.Stories.getStoryById);

// get all story entries by a certain userId
router.route('/stories/user/:id')
  .get(controller.Stories.getStoriesByUserId);

/** ============================================================
 * LANDMARK ROUTES
 * =============================================================
 */

// return landmark entry by landmark id
router.route('/landmarks/:id')
  .get(controller.Landmarks.getLandmarkById);

router.route('/landmarks/nearby')
  .post(controller.Landmarks.getLandmarksWithinRadius);

router.route('/landmarks/guestbook/:id')
  .get(controller.Landmarks.getGuestbookByLandmarkId);

/** ============================================================
 * FOLLOWING ROUTES
 * =============================================================
 */

// create new following relationship with current user id and following id
router.route('/followings/new')
  .post(controller.Followings.createFollowing);

// return list of profile entries current user is following 
router.route('/followings/:id')
  .get(controller.Followings.getAllFollowings);

module.exports = router;