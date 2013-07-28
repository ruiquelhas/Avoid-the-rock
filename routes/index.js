
/*
 * GET home page.
 */

var mainTitle = 'Avoid the rock';

exports.index = function (req, res) {
  res.render('index', { title: mainTitle });
};

exports.screen = function (req, res) {
  res.render('screen', {
    title: mainTitle,
    status: {
      desktopDevice: 'Connect to the driver using a mobile device.',
      mobileDevice: 'The screen is not available on mobile devices.'
    }
  });
};

exports.driver = function (req, res) {
  res.render('driver', {
    status: {
      desktopDevice: 'You can only control the object using a mobile device.',
      mobileDevice: 'Rotate your device on the z-axis to move the object.'
    }
  });
};