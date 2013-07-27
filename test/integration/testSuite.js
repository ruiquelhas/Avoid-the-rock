var Zombie = require('zombie');
var expect = require('expect.js');

var server = require('../../app').httpServer;
var site = 'http://127.0.0.1:' + (process.env.PORT || 3000);

var screenTestCase = require('./screenTestCase');

describe('running the integration test suite', function () {
  before(function () {
    this.server = server;
    this.client = new Zombie({ site: site });
  });

  describe('test the availability of the infrastructure', function () {
    it('the Express server should be running', function () {
      expect(this.server).not.to.be(undefined);
    });
    it('the Zombie.js client should be created', function () {
      expect(this.client).to.be.a(Zombie);
    });
  });

  screenTestCase.run();

  after(function (done) {
    this.client.close();
    this.server.close(done);
  });
});
