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
   */
  buildChart: function($el, type) {
    if (type === this.TYPE_LOSSES_OVER_TIME) {
      LossesOverTime.build($el);
    }
  },

  /**
   * If chart elements exist, build them.
   */
  init: function() {
    var $chartEls = $('.chart');
    if ($chartEls.length) {
      $chartEls.each((index, el) => {
        this.buildChart($(el), $(el).data('chart-type'));
      });
    }
  }
};

module.exports = myChart;
