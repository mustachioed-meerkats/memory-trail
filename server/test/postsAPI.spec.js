'use strict';
const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;
const app = require('../app.js');
const dbUtils = require('../../db/lib/utils.js');

describe('Posts API', function () {
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('accepts POST requests to /api/posts/new to create new posts', function () {
    let post = {};
    post.profile_id = 1;
    post.lat = 37.741576;
    post.lng = -122.508059;
    post.content = 'Going to the beach';
    post.title = 'We are going to the beach yay yay yay. best day ever.';
    return request(app)
      .post('/api/posts/new')
      .send(post)
      .expect(200);
  });

  it('accepts POST request to retrieve all posts nearby', function () {
    let post = {};
    post.profile_id = 1;
    post.lat = 37.741576;
    post.lng = -122.508059;
    post.content = 'Going to the beach';
    post.title = 'We are going to the beach yay yay yay. best day ever.';
    return request(app)
      .post('/api/posts/new')
      .send(post)
      .then(() => {
        return request(app)
          .post('/api/posts/nearby')
          .send({lat: 37.741576, lng: -122.508059})
          .expect(res => {
            res.body = {
              length: res.body.length
            };
          })
          .expect(200, {
            length: 2
          });
      });
  });
});