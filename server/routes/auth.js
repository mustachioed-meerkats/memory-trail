const express = require('express');
const middleware = require('../middleware');
const models = require('../../db/models');
const router = express.Router();

router.route('/')
  .get(middleware.auth.verify, (req, res) => {
    const preloadedState = {};
    preloadedState.currentUser = req.user;
    models.Story.getStoriesByUserId(req.user.id)
      .then(stories => {
        preloadedState.stories = stories;
        return models.Post.getPostsByUserId(req.user.id);
      })
      .then(posts => {
        preloadedState.posts = posts;
        return models.Following.getAllFollowings(req.user.id);
      })
      .then(following => {
        preloadedState.following = following;
        res.render('index', {preloadedState});
      })
      .catch((err) => {
        console.log('(Server) Error! Preloading State');
      });

  });

router.route('/login')
  .get((req, res) => {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  })
  .post(middleware.passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));

router.route('/signup')
  .get((req, res) => {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  })
  .post(middleware.passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  }));

router.route('/logout')
  .get((req, res) => {
    req.logout();
    res.redirect('/');
  });

router.get('/auth/google', middleware.passport.authenticate('google', {
  scope: ['email', 'profile']
}));

router.get('/auth/google/callback', middleware.passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

module.exports = router;
