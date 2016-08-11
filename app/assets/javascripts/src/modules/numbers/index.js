import Odometer from '../../vendor/odometer.js';

var Numbers = {
  init: function() {
    console.log(Odometer);
    console.log('ok now animate them');
    var $el = $('.number-field');
    var amount = $el.data('amount');
    console.log(amount);
    var od = new Odometer({
      el: $('.number-field')[0],
      duration: 1000,

      // Any option (other than auto and selector) can be passed in here
      format: ',ddd',
      theme: 'default'
    });
    od.update(amount)

    // window.odometerOptions = {
    //   auto: false, // Don't automatically initialize everything with class 'odometer'
    //   selector: '.number-field', // Change the selector used to automatically find things to be animated
    //   format: '(,ddd).dd', // Change how digit groups are formatted, and how many digits are shown after the decimal point
    //   duration: 3000, // Change how long the javascript expects the CSS animation to take
    //   theme: 'car', // Specify the theme (if you have more than one theme css file on the page)
    //   animation: 'count' // Count is a simpler animation method which just increments the value,
    //     // use it when you're looking for something more subtle.
    // };
  }
};

module.exports = Numbers;
