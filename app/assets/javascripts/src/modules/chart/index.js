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
                fill: false,
                strokeColor: "rgba(255,255,255,1)",
                pointColor: "#123",
                pointStrokeColor: "rgba(255,255,255,1)",
                data: [
                    1, 3, 6, 7
                ],
            }]
        };

        var options = {
            scales: {
                xAxes: [{
                    afterBuildTicks: function(chart) {
                        console.log(chart);
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
