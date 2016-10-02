var chart = {
  /**
   * Build out Losses over time chart
   * @param  {Object} $el - DOM element to render chart into.
   */
  build: function($el) {
    var data = {
      labels: [
        [2016, 3, 26],
        [2016, 3, 27],
        [2016, 3, 27],
        [2016, 3, 27],
        [2016, 5, 5],
        [2016, 10, 1]
      ],
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
        data: [
          345, 567, 987, 1041, 2000, 2500

          /*
          * TODO: change these to the following: objects that are parsed so that the values are plotted on the chart, but the metadata
          is shown in tooltips. Need the following:
          {
            runningTotal: Number, // data point on chart - Y axis.
            amount: Number, // actual loss amount.
            date: Date, // loss reported date - X axis.
            title: String // name of the loss.
          }
          */
        ],
      }]
    };

    var metadata = [];
    for (var i = 0; i <= data.datasets[0].data.length; i++) {
      metadata.push({
        amount: i * 10,
        title: 'some loss here ' + i
      });
    }
    console.log(metadata);

    var options = {
      metadata: metadata, // hack to get extra vals into the tooltips.
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            var html = tooltipItem.xLabel[1] + tooltipItem.xLabel[2];
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
          afterBuildTicks: function(chart) {
            //console.log(chart);
            // example of modifying ticks after render
            //chart.ticks = chart.ticks.slice(0,5);
          },
          type: 'time',
          time: {
            unit: 'month',
            displayFormats: {
              'month': 'MMM'
                // 'millisecond': 'HH:mm:ss',
                // 'second': 'HH:mm:ss',
                // 'minute': 'HH:mm:ss',
                // 'hour': 'HH:mm:ss'
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
