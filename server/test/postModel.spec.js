const expect = require('chai').expect;
const Post = require('../../db/models/posts.js');
const dbUtils = require('../../db/lib/utils.js');
const dummyData = require('./dummyData.js');

describe('Post model test', function() {
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('Should create post', function() {
    const post = dummyData.post1;
    return Post.forge(post).save()
      .then(model => {
        expect(model.get('profile_id')).to.equal(post.profile_id);
        expect(model.get('content')).to.equal(post.content);
        expect(model.get('title')).to.equal(post.title);
      });
  });
});