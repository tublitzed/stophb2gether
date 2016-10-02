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

  buildTooltip: function(config) {
    // nested like this b/c of context inside of D3.
    var formatAmount = function(number) {
      var formatter = d3.format('$s');
      return formatter(number);
    };

    var formatDate = function(date) {
      var formatter = d3.time.format('%B %d');
      return formatter(date);
    };
    return {
      contents: function(item, defaultTitleFormat, defaultValueFormat) {
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
  build: function(node, data) {
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
            format: function(value) {
              var monthNames = ['January', 'February', 'March',
                'April', 'May', 'June',
                'July', 'August', 'September',
                'October', 'November', 'December'
              ];
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
