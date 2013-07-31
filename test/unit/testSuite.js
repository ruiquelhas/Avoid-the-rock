var imageRepositoryTestCase = require('./imageRepositoryTestCase');
var playerTestCase = require('./playerTestCase');
var rockTestCase = require('./rockTestCase');

describe('running the unit test suite', function () {
  imageRepositoryTestCase.run();
  playerTestCase.run();
  rockTestCase.run();
});