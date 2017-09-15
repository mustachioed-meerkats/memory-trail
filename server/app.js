'use strict';
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');
const models = require('../db/models');

const app = express();

app.use(middleware.morgan('dev'));
app.use(middleware.cookieParser());
app.use(middleware.bodyParser.urlencoded({extended: false}));
app.use(middleware.bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(middleware.auth.session);
app.use(middleware.passport.initialize());
app.use(middleware.passport.session());
app.use(middleware.flash());

app.use(express.static(path.join(__dirname, '../public')));

var upload = middleware.multer();
app.use(upload.any());


app.use('/', routes.auth);
app.use('/api', routes.api);
app.use('/api/profiles', routes.profiles);
app.use('/upload', routes.upload);

app.use('*', (req, res) => {
  const preloadedState = {};  
  preloadedState.user = req.user;

  Promise.all([
    models.Post.getAllPosts(),
    //models.Post.getPostsByUserId(req.user.id),
    //models.Following.getAllFollowings(req.user.id)
  ])
    .then((results) => {
      preloadedState.posts = results[0];
    //preloadedState.userPosts = results[1];
    //preloadedState.following.posts = results[2];
    })
    .then(() => { 
      res.render('index', {preloadedState});
    })
    .catch((err) => {
      console.log('(Server) Error! Preloading State');
    });

});

module.exports = app;
