var imageRepositoryTestCase = require('./imageRepositoryTestCase');
var playerTestCase = require('./playerTestCase');

describe('running the unit test suite', function () {
  imageRepositoryTestCase.run();
  playerTestCase.run();
});