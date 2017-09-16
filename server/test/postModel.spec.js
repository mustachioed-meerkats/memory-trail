const expect = require('chai').expect;
const Post = require('../../db/models/posts.js');
const dbUtils = require('../../db/lib/utils.js');
const dummyData = require('./dummy.js');

describe('Post model test', function() {
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('Should create post', function() {
    const post = dummyData.post1;
    return Post.createPost(post)
      .then(model => {
        expect(model.get('profile_id')).to.equal(post.profile_id);
        expect(model.get('content')).to.equal(post.content);
        // expect(model.get('title')).to.equal(post.title);
        expect(model.get('story_id')).to.equal(post.story_id);
        expect(model.get('landmark_id')).to.equal(post.landmark_id);
      });
  });

  it('Should get all posts', function() {
    return Post.getAllPosts()
      .then(results => {
        expect(results.length).to.equal(1);
        // expect(results.at(0).get('title')).to.equal('Testing Day');
      });
  });

  it('Should get posts by story id', function() {
    return Post.getPostsByStoryId(1)
      .then(results => {
        expect(results.length).to.equal(1);
        // expect(results.at(0).get('title')).to.equal('Testing Day');
      });
  });

  it('Should get posts by user id', function() {
    return Post.getPostsByUserId(1)
      .then(results => {
        expect(results.length).to.equal(1);
        // expect(results.at(0).get('title')).to.equal('Testing Day');
      });
  });

  it('Should get posts by landmark id', function() {
    return Post.getPostsByLandmarkId(1)
      .then(results => {
        expect(results.length).to.equal(1);
        // expect(results.at(0).get('title')).to.equal('Testing Day');
      });
  });
});