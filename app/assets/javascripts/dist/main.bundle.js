(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _alert = require('./modules/alert');

var _alert2 = _interopRequireDefault(_alert);

var _form = require('./modules/form');

var _form2 = _interopRequireDefault(_form);

var _tabs = require('./modules/tabs');

var _tabs2 = _interopRequireDefault(_tabs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(function () {
  _alert2.default.init();
  _form2.default.init();
  _tabs2.default.init();
});

},{"./modules/alert":2,"./modules/form":3,"./modules/tabs":4}],2:[function(require,module,exports){
'use strict';

var Alert = {
  init: function init() {
    $('.alert__close').on('click', function () {
      $(this).parents('.alert').slideUp(50);
    });
  }
};

module.exports = Alert;

},{}],3:[function(require,module,exports){
'use strict';

var Form = {
  init: function init() {
    var $autoFocusEl = $('.autofocus');
    if ($autoFocusEl.length) {
      $autoFocusEl.focus();
    }
  }
};

module.exports = Form;

},{}],4:[function(require,module,exports){
'use strict';

/**
 * Assumes presence of Foundation for site.
 */
var Tabs = {
  onTabChange: function onTabChange() {
    var activeTabName = $('.tabs-title.is-active').data('tab-name');
    console.log(activeTabName);
    console.log('TODO: change url param');
  },

  init: function init() {
    var _this = this;

    $('.tabs-title').on('click', function () {
      _this.onTabChange();
    });
  }
};

module.exports = Tabs;

},{}]},{},[1]);
