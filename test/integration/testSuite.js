var Zombie = require('zombie');
var expect = require('expect.js');

// var server = require('../../app').httpServer;
var app = require('../../app');
var site = 'http://127.0.0.1:' + (process.env.PORT || 3000);

var screenTestCase = require('./screenTestCase');
var driverTestCase = require('./driverTestCase');

var userAgents = {
  zombieDefault: 'Bot',
  iPhoneSafari: 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25',
  iPadSafari: 'Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25',
  phoneChrome: 'Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19',
  tabletChrome: 'Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Safari/535.19'
};

describe('running the integration test suite', function () {
  before(function (done) {
    var self = this;
    app.loadApp(function (server) {
      self.server = server;
      self.client = new Zombie({
        site: site,
        userAgent: userAgents.zombieDefault
      });
      done();
    });
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
  driverTestCase.run();

  after(function (done) {
    this.client.close();
    this.server.close(done);
  });
});
