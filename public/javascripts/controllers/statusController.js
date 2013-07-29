function StatusController(selector, message) {
  this.selector = selector;
  this.message = message || selector.html();
}

StatusController.prototype.displayMessage = function (message) {
  if (message) {
    this.message = message;
  }
  this.selector.html(this.message);
  this.selector.show();
};

StatusController.prototype.hideMessage = function () {
  this.selector.hide();
};

module.exports.create = function (selector, message) {
  return new StatusController(selector, message);
};