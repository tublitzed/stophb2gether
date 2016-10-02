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
  buildConfig: function(data) {
    var config = {
      labels: [],
      data: [],
      metadata: []
    };
    data.forEach((loss) => {
      config.labels.push(loss.date);
      config.data.push(loss.runningTotal);
      config.metadata.push({
        title: loss.title,
        amount: loss.amount
      });
    });
    return config;
  },

  /**
   * Build data for chart
   *
   * @param {Object} config
   *
   * @return {Object}
   */
  buildData: function(config) {
    return {
      labels: config.labels,
      datasets: [{
        label: 'Millions lost to HB2 over time',
        backgroundColor: 'rgba(183, 9, 30, 0.05)',
        borderColor: 'rgba(183, 9, 30, 0.25)',
        borderWidth: 1,
        pointBorderWidth: 2,
        pointBorderColor: '#FFF',
        pointBackgroundColor: '#B7091E',
        pointHoverBackgroundColor: '#2F2F2F',
        pointHoverBorderColor: '#FFF',
        pointHoverBorderWidth: 2,
        pointRadius: 3,
        lineTension: 0,
        data: config.data,
      }]
    };
  },

  /**
   * Build tooltips for chart
   *
   * @param {Object} config
   *
   * @return {Object}
   */
  buildTooltips: function(config) {
    return {
      callbacks: {
        label: function(tooltipItem, data) {
          return this._options.metadata[tooltipItem.index].amount;
        },
        footer: function(tooltipItem, data) {
          return moment(tooltipItem[0].xLabel).format('MMM DD');
        },
        title: function(tooltipItem, data) {
          return this._options.metadata[tooltipItem[0].index].title;
        },
        tooltipXPadding: 20,
        tooltipYPadding: 20
      }
    };
  },

  /**
   * Build x and y scale config for chart
   *
   * @param {Object} config
   *
   * @return {Object}
   */
  buildScales: function(config) {
    return {
      xAxes: [{
        afterFit: function(hmm) {
          console.log(hmm);
        },
        type: 'time',
        ticks: {
          suggestedMax: '2016-11-01'
        },
        time: {
          unit: 'month',
          displayFormats: {
            'month': 'MMM'
          },
        }
      }],
      yAxes: [{
        ticks: {
          callback: function(value) {
            // format y axis labels.
            if (value > 1000000) {
              value = value / 1000000;
            }
            return value;
          }
        }
      }]
    };
  },

  /**
   * Build out options config object for chart

   * @param {Object} config
   *
   */
  buildOptions: function(config) {
    return {
      metadata: config.metadata, // hack to get extra vals into the tooltips.
      tooltips: buildTooltips(config),
      scales: buildScales(config)
    };
  },

  /**
   * Build out Losses over time chart
   *
   * @param {Object} $el - DOM element to render chart into.
   * @param {Array}
   */
  build: function($el, data) {
    var config = this.buildConfig(data);
    var myLineChart = new Chart($el, {
      type: 'line',
      data: buildData(config),
      options: buildOptions(config)
    });
  }
};

module.exports = chart;
