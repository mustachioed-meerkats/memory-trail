const expect = require('chai').expect;
const Landmark = require('../../db/models/landmarks.js');
const dbUtils = require('../../db/lib/utils.js');
const dummyData = require('./dummy.js');

describe('Landmark model test', function() {
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('Should get landmark by id', function() {
    return Landmark.getLandmarkById(1)
      .then(model => {
        expect(model.get('name')).to.equal('Union Square');
        expect(model.get('description')).to.equal('Most touristy spot in SF.');
      });
  });

});