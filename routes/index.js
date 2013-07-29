
/*
 * GET home page.
 */

var mainTitle = 'Avoid the rock';

function getFullRequestURL(req, resource) {
  return [req.secure ? 'https' : 'http', '://', req.get('Host'), '/', resource].join('');
}

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
    rankingLabel: 'Ranking',
    driverResource: getFullRequestURL(req, 'driver'),
    mobileDeviceMessage: 'The screen is not available on mobile devices.'
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