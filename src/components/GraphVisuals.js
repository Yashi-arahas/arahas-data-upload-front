import React from 'react';
import ApexCharts from 'react-apexcharts';

// Function to render a bar chart
export const BarChart = ({ title, categories, series, height, width , xtitle }) => {
  return (
    <div className='chart-container z-index-low'>
      <ApexCharts className='chart'
        options={{
          chart: {
            type: 'bar',
            height: 350,
            toolbar: {
              show: true
            }
          },
          dataLabels: {
            enabled: false,
          },
          title: {
            text: title,
            align: 'center',
            offsetY: 10,
            style: {
              fontSize: '1vw'
            }
          },
          xaxis: {
            tickPlacement: 'on',
            type: 'category',
            categories,
            title: {
              text: xtitle
            },
          },
          plotOptions: {
            bar: {
              columnWidth: '20rem', // Adjust the width of the bars as needed
              endingShape: 'rounded'
            }
          },
          // colors: ['#08415C', '#CC2936', '#E09190', '#4CA8BD', '#70AE6E', '#826754'],
        }}
        series={series}
        type="bar"
        height={height}
        width={width}
      />
    </div>
  );
};


// Function to render a pie chart
export const PieChart = ({ title, labels, series, height }) => {
  return (
    <div className='chart-container z-index-low'>
      <ApexCharts className='chart'
        options={{
          chart: {
            type: 'pie',
            height: height,
            toolbar: {
              show: true
            }
          },
          legend: {
            position: 'bottom',
            onItemHover: {
              highlightDataSeries: true
            },
          },
          labels: labels,
          title: {
            text: title,
            align: 'center',
            offsetY: 10,
            style: {
              fontSize: '1vw'
            }
          },
          // colors: ['#08415C','#CC2936','#E09190','#4CA8BD','#70AE6E','#826754'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }],
          dataLabels: {
            offsetY: 20, // Adjust the offset as needed
            style: {
              fontSize: '1vw' // Adjust the font size as needed
            }
          }
        }}
        series={series}
        type="pie"
        height={height}
      />
    </div>
  );
};
// Function to render a line chart
export const LineChart = ({ title, categories, series, height, width, xtitle, ytitle }) => {
  return (
    <div className='chart-container z-index-low'>
      <ApexCharts className='chart'
        options={{
          chart: {
            type: 'line',
            height: height,
            toolbar: {
              show: true
            }
          },
          title: {
            text: title,
            align: 'center',
            offsetY: 20,
            style: {
              fontSize: '1vw'
            }
          },
          xaxis: {
            tickPlacement: 'on',
            type: 'category',
            categories: categories,
            title: {
              text: xtitle
            },
          },
          yaxis: {
            title: {
              text: ytitle
            }
          },
          // colors: ['#08415C', '#CC2936', '#E09190', '#4CA8BD', '#70AE6E', '#826754'],
        }}
        series={series}
        type="line"
        height={height}
        width={width}
      />
    </div>
  );
};

// Function to render an area chart
export const AreaChart = ({ title, categories, series, height, width, xtitle, ytitle }) => {
  return (
    <div className='chart-container z-index-low'>
      <ApexCharts className='chart'
        options={{
          chart: {
            type: 'area',
            height: height,
            toolbar: {
              show: true
            }
          },
          title: {
            text: title,
            align: 'center',
            offsetY: 20,
            style: {
              fontSize: '1vw'
            }
          },
          xaxis: {
            tickPlacement: 'on',
            type: 'category',
            categories: categories,
            title: {
              text: xtitle
            },
          },
          yaxis: {
            title: {
              text: ytitle
            }
          },
          // colors: ['#08415C', '#CC2936', '#E09190', '#4CA8BD', '#70AE6E', '#826754'],
        }}
        series={series}
        type="area"
        height={height}
        width={width}
      />
    </div>
  );
};