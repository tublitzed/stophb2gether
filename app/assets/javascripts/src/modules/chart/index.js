import LossesOverTime from './charts/lossesOverTime.js';

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
  buildChart: function($el, type) {
    var $dataEl = $('[name="data-for-' + type + '"]');
    if (!$dataEl.length) {
      return false;
    }

    var data = JSON.parse($dataEl.val());
    if (!data) {
      return false;
    }

    if (type === this.TYPE_LOSSES_OVER_TIME) {
      LossesOverTime.build($el, data);
    }

    return true;
  },

  /**
   * If chart elements exist, build them.
   */
  init: function() {
    var $chartEls = $('.chart');
    var $el;
    if ($chartEls.length) {
      $chartEls.each((index, el) => {
        $el = $(el);
        var success = this.buildChart(el, $el.data('chart-type'));
        if (!success) {
          $el.hide();
        }
      });
    }
  }
};

module.exports = myChart;
