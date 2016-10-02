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
      columns: [
        ['x'],
        ['losses']
      ],
      data: [],
      metadata: []
    };
    data.forEach((loss) => {
      config.columns[0].push(loss.date);
      config.columns[1].push(loss.runningTotal);
      config.metadata.push({
        title: loss.title,
        amount: loss.amount
      });
    });
    return config;
  },


  /**
   * Build out Losses over time chart
   *
   * @param {Object} node - DOM node to generate chart into
   * @param {Array}
   */
  build: function(node, data) {
    console.log(data);
    var config = this.buildConfig(data);
    console.log(config);

    var chart = c3.generate({
        bindto: node,
        data: {
            x: 'x',
            columns: config.columns
    //        xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
            // columns: [
            //     ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
            //     ['losses', 130, 340, 200, 500, 250, 350]
            // ]
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%m',
                    count: 10 // only show x number of ticks
                }
            }
        }
    });
    console.log(chart);
  }
};

module.exports = chart;
