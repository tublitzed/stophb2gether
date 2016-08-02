var Alert = {
  init: function() {
    $('.alert__close').on('click', function() {
      $(this).parents('.alert').slideUp(50);
    });
  }
};

module.exports = Alert;
