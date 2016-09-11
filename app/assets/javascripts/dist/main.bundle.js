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

var urlUtil = require('../../util/url');

/**
 * Assumes the presence of Foundation, using the Tabs API.
 * @link http://foundation.zurb.com/sites/docs/tabs.html
 */
var Tabs = {
  /**
   * Adjust url param on tab change.
   */
  onTabChange: function onTabChange() {
    var activeTabName = $('.tabs-title.is-active').data('tab-name');
    var path = document.location.pathname;
    var params = urlUtil.addReplaceParam('tab', activeTabName);
    if (params) {
      path += params;
    }
    window.history.pushState(null, window.document.title, path);
  },

  /**
   * Init tabs
   */
  init: function init() {
    var _this = this;

    $('.tabs').bind('change.zf.tabs', function () {
      setTimeout(function () {
        _this.onTabChange();
      });
    });
  }
};

module.exports = Tabs;

},{"../../util/url":5}],5:[function(require,module,exports){
'use strict';

/**
 * Url utils.
 */
var url = {

  /**
   * TODO: move to string util if/when you add one, that's all this is.
   *
   * Does a given query string key exist in url.
   * @param  {string} url
   * @param  {string} key
   * @return {boolean}
   */
  keyExistsInUrl: function keyExistsInUrl(url, key) {
    var patt = key + '=';
    var re = new RegExp(patt, 'i');
    return re.test(url);
  },

  /**
   * Returns url param from query string.
   * @param  {string} str
   * @return {string}
   */
  getParam: function getParam(key) {
    var queryParams = window.location.search;

    if (queryParams && this.keyExistsInUrl(queryParams, key)) {
      var patt = key + '=([^&|\\s]+)';
      var re = new RegExp(patt, 'i');
      var match = queryParams.match(re);
      return match[1] || null;
    }

    return null;
  },

  /**
   * Add param to url string
   * @param {[type]} key         [description]
   * @param {[type]} value       [description]
   * @param {[type]} existingStr [description]
   */
  addParam: function addParam(key, value, existingStr) {
    var str = existingStr || '';
    if (/(\?)/.test(str)) {
      //already have query params, just not this one.
      return str + '&' + key + '=' + value;
    }
    return str + '?' + key + '=' + value;
  },

  /**
   * Replace param value in a url string.
   *
   * @param  {string} key
   * @param  {string} value
   * @param  {str} url
   * @return {str}
   */
  replaceParam: function replaceParam(key, value, url) {
    var patt = '(' + key + '=[^&|\\s]+)';
    var re = new RegExp(patt, 'i');
    return url.replace(re, key + '=' + value);
  },

  /**
   * Replace query string value if it exists. If the string does not exist in the url, it will be added.
   *
   * @param {string} key
   * @param {string} value
   * @param {existingStr=} optional search string, if not set use url.
   *
   * @return {string} - new url with value added/replaced
   */
  addReplaceParam: function addReplaceParam(key, value, existingStr) {
    var str = existingStr || window.location.search;

    if (!str) {
      return this.addParam(key, value, str);
    }

    if (this.keyExistsInUrl(str, key)) {
      return this.replaceParam(key, value, str);
    }
    return this.addParam(key, value, str);
  }
};

module.exports = url;

},{}]},{},[1]);
