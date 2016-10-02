var chart = {


  parseData: function(data) {
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
   * Build out Losses over time chart
   * @param {Object} $el - DOM element to render chart into.
   * @param {Array}
   */
  build: function($el, data) {
    // console.log(data);
    var parsed = this.parseData(data);
    var data = {
      labels: parsed.labels,
      datasets: [{
        label: 'Millions lost to HB2 over time',
        fill: false,
        backgroundColor: 'rgba(183, 9, 30, 0.4)',
        borderColor: 'rgba(183, 9, 30, 0.4)',
        borderWidth: 1,
        pointBorderWidth: 0,
        pointBackgroundColor: '#B7091E',
        // pointHitRadius: 20,
        // pointHoverRadius: 10,
        pointRadius: 3,
        data: parsed.data,
      }]
    };

    var options = {
      metadata: parsed.metadata, // hack to get extra vals into the tooltips.
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            var date = tooltipItem.xLabel;
            var html = date;
            html += ' - ';
            html += this._options.metadata[tooltipItem.index].amount;
            return html;
          },
          title: function(tooltipItem, data) {
            return this._options.metadata[tooltipItem[0].index].title;
          }
        }
      },
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            unit: 'month',
            displayFormats: {
              'month': 'MMM'
            },
          }
        }]
      }
    };
    var myLineChart = new Chart($el, {
      type: 'line',
      data: data,
      options: options
    });
  }
};
module.exports = chart;
