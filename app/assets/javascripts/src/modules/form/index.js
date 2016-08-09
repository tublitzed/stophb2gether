var Form = {
  init: function() {
    var $autoFocusEl = $('.autofocus');
    if ($autoFocusEl.length) {
      $autoFocusEl.focus();
    }
  }
};

module.exports = Form;
