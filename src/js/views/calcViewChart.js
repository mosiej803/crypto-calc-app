import calcView from './calcView';
import Chart from 'chart.js/auto';

class CalcViewChart extends calcView {
  data;

  render(chartData) {
    // if (!chartData) return;
    this._data = chartData;
    this._parentElement = document.querySelector('.calc');

    // Render canvas for the chart
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);

    // Render chart
    const canvas = document.querySelector('.chart');
    const config = this._generateChartConfig();
    const chart = new Chart(canvas, config);
  }

  _generateMarkup() {
    return `
            <div class="chart-view">
            <canvas class="chart"></canvas>
            </div>
            `;
  }

  _generateChartConfig() {
    const chartData = this._data;
    Chart.defaults.font.family = `'Rubik', sans-serif`;
    Chart.defaults.color = `#343a40`;

    // To set larger space between chart legend and chart itself
    const legendMargin = {
      id: `legendMargin`,
      beforeInit(chart, legend, options) {
        // Get reference to the original fit function
        const originalFit = chart.legend.fit;

        // Override the fit function
        chart.legend.fit = function fit() {
          // Call original function and bind scope in order to use `this` correctly inside it
          originalFit.bind(chart.legend)();
          // Change the height as suggested in another answers
          this.height += 32;
        };
      },
    };

    const config = {
      type: 'line',
      data: chartData,
      plugins: [legendMargin],
      options: {
        aspectRatio: 1.9,
        plugins: {
          legendMargin,
          legend: {
            display: true,
            labels: {
              font: {
                size: 16,
                weight: 500,
              },
              boxWidth: 32,
            },
          },
        },
        scales: {
          y: {
            ticks: {
              // Include a dollar sign in the ticks
              callback: function (value, index, ticks) {
                return `${value} $`;
              },
            },
          },
        },
      },
    };

    return config;
  }
}

export default new CalcViewChart();
