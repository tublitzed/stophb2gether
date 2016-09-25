/**
 * Uses chart.js
 */
var myChart = {
  TYPE_LOSSES_OVER_TIME: 'losses-over-time',

  /**
   * All losses over time.
   * @param  {Object} $el
   */
  buildLossesOverTime: function($el) {
    var data = {
      labels: [
        [2016, 3, 26],
        [2016, 3, 27],
        [2016, 5, 5],
        [2016, 10, 1]
      ],
      datasets: [{
        label: "Losses over time",
        fillColor : "rgba(255,255,255,0.1)",
        strokeColor: "rgba(255,255,255,1)",
        pointColor: "#123",
        pointStrokeColor: "rgba(255,255,255,1)",
        data: [
          1, 3, 6, 7
          // [2016, 3, 29],
          // [2016, 3, 29],
          // [2016, 4, 27],
          // [2016, 8, 29]
        ],
      }]
    };

    // var options = {
    //   scaleFontColor: "rgba(0,0,0,1)",
    //   scaleLineColor: "rgba(0,0,0,0.1)",
    //   scaleGridLineColor: "rgba(0,0,0,0.1)",
    //   scaleShowLabels: false,
    //   scaleShowHorizontalLines: false,
    //   bezierCurve: false,
    //   pointDot: true,
    //   pointDotRadius: 5,
    //   pointDotStrokeWidth: 2,
    //   scaleOverride: true,
    //   // scaleSteps: 6,
    //   // scaleStepWidth: 100,
    //   responsive: true,
    //   showTooltips: true,
    //   tooltipTemplate: "<%= value %> " + "Lost",
    //   tooltipFontSize: 16,
    //   tooltipYPadding: 12,
    //   tooltipXPadding: 12,
    //   tooltipCornerRadius: 3,
    //   tooltipFillColor: "#3797d3",
    // };

    var options = {
      scaleFontColor: "rgba(255,255,255,1)",
      scaleLineColor: "rgba(255,255,255,1)",
      scaleGridLineColor: "transparent",
      bezierCurve: false,
      scaleOverride: true,
      scaleSteps: 5,
      scaleStepWidth: 100,
      scaleStartValue: 0,
      scaleLabel: "<%= value + ' foo' %>",
      scaleOverride: true,
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            displayFormats: {
              unit: 'month'
            }
          }
        }]
      }
    }
    var myLineChart = new Chart($el, {
      type: 'line',
      data: data,
      options: options
    });
  },

  /**
   * Build out a single chart.
   * @param {Object} $el
   * @param {String} type
   */
  buildChart: function($el, type) {
    if (type === this.TYPE_LOSSES_OVER_TIME) {
      this.buildLossesOverTime($el);
    }
  },

  /**
   * If chart elements exist, build them.
   */
  init: function() {
    var $chartEls = $('.chart');
    if ($chartEls.length) {
      $chartEls.each((index, el) => {
        console.log(el);
        this.buildChart($(el), $(el).data('chart-type'));
      });
    }
  }
};

module.exports = myChart;
