const expect = require('chai').expect;
const Story = require('../../db/models/stories.js');
const dbUtils = require('../../db/lib/utils.js');
const dummyData = require('./dummy.js');

describe('Post model test', function() {
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('Should create story', function() {
    const story = dummyData.story;
    return Story.createStory(story)
      .then(model => {
        expect(model.get('profile_id')).to.equal(story.profile_id);
        expect(model.get('summary')).to.equal(story.summary);
        expect(model.get('title')).to.equal(story.title);
      });
  });

  it('Should get story by id', function() {
    return Story.getStoryById(1)
      .then(model => {
        expect(model.get('profile_id')).to.equal(1);
        expect(model.get('title')).to.equal('China Trip');
        expect(model.get('summary')).to.equal('It was so fun! OMG!');
      });
  });

  it('Should get story by user id', function() {
    return Story.getStoriesByUserId(1)
      .then(models => {
        expect(models.at(0).get('profile_id')).to.equal(1);
        expect(models.at(0).get('title')).to.equal('China Trip');
        expect(models.at(0).get('summary')).to.equal('It was so fun! OMG!');
      });
  });
});