const express = require('express');
const middleware = require('../middleware');
const models = require('../../db/models');
const router = express.Router();

router.route('/')
  .get(middleware.auth.verify, (req, res) => {
    const preloadedState = {};  
    preloadedState.user = req.user;
    // models.Post.getPostsByUserId(req.user.id)  
    //   .then((results) => {
    //     preloadedState.posts = results;
    //   })
    //   .then(middleware.auth.getPostion)
    //   .then((results) => {
    //     preloadedState.userLocation = results;
    //   })
    //   .catch((err) => {
    //     console.log('(Auth) Error! Preloading state!');
    //     console.log(err);
    //   });

    Promise.all([models.Post.getAllPosts(), models.Post.getPostsByUserId(req.user.id)])  
      .then((results) => {
        preloadedState.posts = results[0];
        preloadedState.userPosts = results[1];
      })
      .then(() => { 
        res.render('index', {preloadedState});
      })
      .catch((err) => {

      });


    // models.Post.getPostsByUserId(req.user.id)
    //   .then(posts => {
    //     preloadedState.posts = posts;
    //     res.render('index', {preloadedState});
    //   });
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

router.get('/auth/facebook', middleware.passport.authenticate('facebook', {
  scope: ['public_profile', 'email']
}));

router.get('/auth/facebook/callback', middleware.passport.authenticate('facebook', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/auth/twitter', middleware.passport.authenticate('twitter'));

router.get('/auth/twitter/callback', middleware.passport.authenticate('twitter', {
  successRedirect: '/profile',
  failureRedirect: '/login'
}));

module.exports = router;
