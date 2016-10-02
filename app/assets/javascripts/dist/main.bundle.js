(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _alert = require('./modules/alert');

var _alert2 = _interopRequireDefault(_alert);

var _chart = require('./modules/chart');

var _chart2 = _interopRequireDefault(_chart);

var _form = require('./modules/form');

var _form2 = _interopRequireDefault(_form);

var _tab = require('./modules/tab');

var _tab2 = _interopRequireDefault(_tab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(function () {
  _alert2.default.init();
  _chart2.default.init();
  _form2.default.init();
  _tab2.default.init();
});

},{"./modules/alert":2,"./modules/chart":4,"./modules/form":5,"./modules/tab":6}],2:[function(require,module,exports){
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

/**
 * Assumes moment.js is on page and chart.js
 *
 * @type {Object}
 */

var chart = {

  /**
   * Convert data into a format that can be read by the chart.
   *
   * @param {Object} data
   *
   * @return {Object}
   */
  buildConfig: function buildConfig(data) {
    var config = {
      columns: [['x'], ['losses']],
      data: [],
      metadata: []
    };
    data.forEach(function (loss) {
      config.columns[0].push(loss.date);
      config.columns[1].push(loss.runningTotal);
      config.metadata.push({
        title: loss.title,
        amount: loss.amount
      });
    });
    return config;
  },

  buildTooltip: function buildTooltip(config) {
    // nested like this b/c of context inside of D3.
    var formatAmount = function formatAmount(number) {
      var formatter = d3.format('$s');
      return formatter(number);
    };

    var formatDate = function formatDate(date) {
      var formatter = d3.time.format('%B %d');
      return formatter(date);
    };
    return {
      contents: function contents(item, defaultTitleFormat, defaultValueFormat) {
        item = item[0];
        var html = '<div class="c3-tooltip__title">';
        html += config.metadata[item.index].title;
        html += '</div>';

        html += '<div class="c3-tooltip__body">';
        html += formatDate(item.x) + '<span class="splitter"> // </span>';
        html += formatAmount(config.metadata[item.index].amount) + ' lost';
        html += '</div>';

        return '<div class="c3-tooltip">' + html + '</div>';
      }
    };
  },

  /**
   * Build out Losses over time chart
   *
   * @param {Object} node - DOM node to generate chart into
   * @param {Array}
   */
  build: function build(node, data) {
    var config = this.buildConfig(data);
    var chart = c3.generate({
      bindto: node,
      data: {
        x: 'x',
        xFormat: '%Y-%m-%d', // how date is parsed
        columns: config.columns,
        colors: {
          losses: 'B7091E'
        }
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: function format(value) {
              var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
              var month = value.getMonth();
              return monthNames[month];
            },
            values: ['2016-03-01', '2016-04-01', '2016-05-01', '2016-05-01', '2016-06-01', '2016-07-01', '2016-08-01', '2016-09-01', '2016-10-01'] // needs to match xFormat  in data
          }
        },
        y: {
          tick: {
            format: d3.format('$s')
          }
        }
      },
      tooltip: this.buildTooltip(config)
    });
  }
};

module.exports = chart;

},{}],4:[function(require,module,exports){
'use strict';

var _lossesOverTime = require('./charts/lossesOverTime.js');

var _lossesOverTime2 = _interopRequireDefault(_lossesOverTime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Uses chart.js
 */
var myChart = {
  TYPE_LOSSES_OVER_TIME: 'losses-over-time',

  /**
   * Build out a single chart.
   * @param {Object} $el
   * @param {String} type
   *
   * @return {Boolean}
   */
  buildChart: function buildChart($el, type) {
    var $dataEl = $('[name="data-for-' + type + '"]');
    if (!$dataEl.length) {
      return false;
    }

    var data = JSON.parse($dataEl.val());
    if (!data) {
      return false;
    }

    if (type === this.TYPE_LOSSES_OVER_TIME) {
      _lossesOverTime2.default.build($el, data);
    }

    return true;
  },

  /**
   * If chart elements exist, build them.
   */
  init: function init() {
    var _this = this;

    var $chartEls = $('.chart');
    var $el;
    if ($chartEls.length) {
      $chartEls.each(function (index, el) {
        $el = $(el);
        var success = _this.buildChart(el, $el.data('chart-type'));
        if (!success) {
          $el.hide();
        }
      });
    }
  }
};

module.exports = myChart;

},{"./charts/lossesOverTime.js":3}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
'use strict';

var urlUtil = require('../../util/url');

/**
 * Assumes the presence of Foundation, using the Tabs API.
 * @link http://foundation.zurb.com/sites/docs/tabs.html
 */
var Tab = {
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

module.exports = Tab;

},{"../../util/url":7}],7:[function(require,module,exports){
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
