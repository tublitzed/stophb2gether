var Alert = {
  init: function() {
    console.log('ok, browserify is working');
    $('.alert__close').on('click', function() {
      $(this).parents('.alert').slideUp(50);
    });
  }
};

module.exports = Alert;
