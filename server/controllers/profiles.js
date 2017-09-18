const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.Profile.fetchAll()
    .then(profiles => {
      res.status(200).send(profiles);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

// module.exports.create = (req, res) => {
//   models.Profile.forge({ username: req.body.username, password: req.body.password })
//     .save()
//     .then(result => {
//       res.status(201).send(result.omit('password'));
//     })
//     .catch(err => {
//       if (err.constraint === 'users_username_unique') {
//         return res.status(403);
//       }
//       res.status(500).send(err);
//     });
// };

module.exports.getOne = (req, res) => {
  models.Profile.where({ id: req.params.id }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      res.status(200).send(profile);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.update = (req, res) => {
  models.Profile.where({ id: req.params.id }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      return profile.save(req.body, { method: 'update' });
    })
    .then(() => {
      res.sendStatus(201);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

// module.exports.deleteOne = (req, res) => {
//   models.Profile.where({ id: req.params.id }).fetch()
//     .then(profile => {
//       if (!profile) {
//         throw profile;
//       }
//       return profile.destroy();
//     })
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .error(err => {
//       res.status(503).send(err);
//     })
//     .catch(() => {
//       res.sendStatus(404);
//     });
// };

module.exports.getPassportByUserId = (req, res) => {
  models.Profile.getProfileById(req.params.id)
    .then(profile => {
      return profile.landmarks().fetch();
    })
    .then(results => {
      res.status(200).send(results);
    });
};

module.exports.getInfoByUserId = (req, res) => {
  var info = [];
  models.Profile.getProfileById(req.params.id)
    .then(profile => {
      info.push(profile);
      return models.Story.getStoriesByUserId(req.params.id);
    })
    .then(stories => {
      info.push(stories);
      res.send(info);
    });
};

module.exports.preloadUserInfo = (req, res) => {
  const preloadedState = {};
  preloadedState.user = {};
  preloadedState.user.user = req.user;
  if (req.user) {
    models.Story.getStoriesByUserId(req.user.id)
      .then(stories => {
        preloadedState.user.stories = stories;
        return models.Post.getPostsByUserId(req.user.id);
      })
      .then(posts => {
        preloadedState.user.posts = posts;
        return models.Following.getAllFollowings(req.user.id);
      })
      .then(following => {
        preloadedState.user.following = following;
        res.render('index', {preloadedState});
      })
      .catch((err) => {
        console.log('(Server) Error! Preloading State');
      });
  } else {
    res.render('index', {preloadedState});
  }
};



