
/*
 * GET home page.
 */

var mainTitle = 'Avoid the rock';

exports.index = function (req, res) {
  res.render('index', { title: mainTitle });
};

exports.screen = function (req, res) {
  res.render('screen', { title: mainTitle });
};

exports.driver = function (req, res) {
  res.render('driver');
};