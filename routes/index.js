
/*
 * GET home page.
 */

var mainTitle = 'Avoid the rock';

exports.index = function (req, res) {
  res.render('index', {
    title: mainTitle,
    screenResource: '/screen',
    driverResource: '/driver'
  });
};

exports.screen = function (req, res) {
  res.render('screen', {
    title: mainTitle,
    status: {
      desktopDevice: 'Connect to the driver using a mobile device.',
      mobileDevice: 'The screen is not available on mobile devices.'
    },
    rankingLabel: 'Ranking'
  });
};

exports.driver = function (req, res) {
  res.render('driver', {
    status: {
      desktopDevice: 'You can only control the object using a mobile device.',
      mobileDevice: 'Move your device like the image.'
    }
  });
};