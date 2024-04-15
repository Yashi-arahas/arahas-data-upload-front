import React from 'react';
import ApexCharts from 'react-apexcharts';

// Define the colors array
const colors = [
  "#DDA63A", // Zero Hunger
  "#4C9F38", // Good Health and Well-being
  "#ff3a21", // Gender Equality
  "#26BDE2", // Clean Water
  "#fcc30b", // Affordable and Clean Energy
  "#a21942", // Decent Work and Economic Growth
  "#fd6925", // Industry, Innovation, and Infrastructure
  "#fd9d24", // Sustainable Cities and Communities
  "#DD1367", // Reduced Inequalities
  "#BF8B2E", // Responsible Consumption and Production
  "#3F7E44", // Climate Action
  "#0A97D9", // Life Below Water
  "#56c02b", // Life on Land
  "#00689D", // Peace, Justice, and Strong Institutions
  "#19486A", // Partnerships for the Goals
];

// Function to render a bar chart
export const BarChart = ({ title, group, categories, series, height, width, xtitle, ytitle }) => {
  return (
    <div className='chart-container z-index-low'>
      <ApexCharts className='chart'
        options={{
          chart: {
            type: 'bar',
            group:group,
            height: 350,
            toolbar: {
              show: true
            },
          },
          dataLabels: {
            enabled: false,
          },
          title: {
            text: title,
            align: 'center',
            offsetY: 7,
            style: {
              fontSize: '0.8rem'
            }
          },
          xaxis: {
            categories: categories,
            labels:{
              style:{
                fontSize:"0.6rem"
              }
            }
            
          },
          yaxis:{
            title:{
              offsetX:0,
              text:ytitle
            }
          },
          plotOptions: {
            bar: {
              endingShape: 'rounded'
            }
          },
          colors, // Include the colors array here
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
            group:'same',
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
          colors, // Include the colors array here
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
export const LineChart = ({ title, group,categories, series, height, width, xtitle, ytitle }) => {
  return (
    <div className='chart-container z-index-low'>
      <ApexCharts className='chart'
        options={{
          chart: {
            type: 'line',
            height: height,
            group:group,
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
          colors, // Include the colors array here
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
            group:'same',
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
          colors, // Include the colors array here
        }}
        series={series}
        type="area"
        height={height}
        width={width}
      />
    </div>
  );
};
