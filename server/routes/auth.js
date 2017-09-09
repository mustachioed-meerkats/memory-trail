const express = require('express');
const middleware = require('../middleware');
const models = require('../../db/models');
const router = express.Router();

router.route('/')
  .get(middleware.auth.verify, (req, res) => {
    const preloadedState = {};  
    preloadedState.user = req.user;

    Promise.all([models.Post.getAllPosts(), models.Post.getPostsByUserId(req.user.id)])
      .then((results) => {
        preloadedState.posts = results[0];
        preloadedState.userPosts = results[1];
      })
      .then(() => { 
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
