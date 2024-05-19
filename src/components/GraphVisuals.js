import React from 'react';
import ApexCharts from 'react-apexcharts';
import CanvasJSReact from '@canvasjs/react-charts';
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

// Define the colors array
const colors = [
  "#DD761C",// (Rich Purple)
  "#6DC5D1", // (orange)
  "#AD88C6", // (Strong Blue)
  "#FFB1B1", // (Dark Cyan)
  "#1abc9c", // (Turquoise Green)
  "#FFC300", // (Vivid Yellow)
  

"#C70039", // (Strong Red)

"#581845",// (Dark Violet)



"#9b59b6", // (Amethyst Purple)

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
            offsetX:-50,
            style: {
              fontSize: '0.6rem'
            }
          },
          xaxis: {
            tickPlacement:'on',
            categories: categories,
            labels:{
              style:{
                fontSize:"0.5rem"
              }
            }
            
          },
          yaxis:{
            title:{
              offsetX:0,
              text:ytitle,
              style:{
                fontSize:"0.5rem"
              }
            }, 
           
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
export const ParetoChart = ({ title, categories, data, height, width, xtitle, ytitle }) => {
  // Adjust column width and add padding
  const columnWidth = Math.min(40, 200 / data.length); // Set maximum column width to 40
  const padding = {
    left: 80, // Padding from left
    right: 40, // Padding from right
    top: 10, // Padding from top
    bottom: 10 // Padding from bottom
  };

  const options = {
    animationEnabled: true,
    title: {
      text: title,
      fontSize: 18,
      margin: 40
    },
    axisX: {
      title: xtitle,
      titleFontSize: 15,
      interval: 1
    },
    axisY: {
      title: ytitle,
      includeZero: true,
      titleFontSize: 15,
      titleFontColor: "red",
      padding: 40 // Corrected property name
    },
    toolTip: {
      shared: true
    },
    data: [{
      type: "column",
      name: "Column",
      showInLegend: true,
      indexLabel: "{y}",
      indexLabelPlacement: "inside",
      indexLabelOrientation: "horizontal",
      indexLabelFontWeight: "bold",
      indexLabelFontSize: 10,
      indexLabelFontColor: "white",
      dataPoints: data.map((value, index) => ({ label: categories[index], y: value })),
      columnWidth: columnWidth
    }, {
      type: "line",
      name: "Line",
      showInLegend: true,
      indexLabel: "{y}",
      indexLabelPlacement: "outside",
      indexLabelFontWeight: "bold",
      indexLabelFontSize: 10,
      indexLabelFontColor: "red",
      dataPoints: data.map((value, index) => ({ label: categories[index], y: value }))
    }],
    padding: padding // Add padding
  };

  return (
    <div>
      <CanvasJSChart options={options} height={height} width={width} />
    </div>
  );
};


export const LineBar = ({ title, categories, chartSeries, height, width, xtitle, ytitle }) => {
  const options = {
    series:chartSeries,
    chart: {
      height: height,
      type: 'line',
    },
    stroke: {
      width: [0, 4],
    },
    title: {
      text: title,
      align: 'center',
      offsetY: 20,
      style: {
        fontSize: '1vw',
      },
    },
    xaxis: {
      type: 'category',
      categories: categories,
      title: {
        text: xtitle,
      },
    },
    yaxis: [
      {
        title: {
          text: ytitle,
        },
      },
      {
        opposite: true,
        title: {
          text: '',
        },
      },
    ],
  };

  return (
    <div className="chart-container">
      <ApexCharts options={options} series={options.series} type="line" height={height} width={width} />
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
            fontSize:"10"
          },
          labels: labels,
          
          title: {
            text: title,
            align: 'center',
            offsetY: 10,
            style: {
              fontSize: '0.8vw'
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
                position: 'bottom',
              }
            }
          }],
          dataLabels: {
            offsetY: 20, // Adjust the offset as needed
            style: {
              fontSize: '0.6vw' // Adjust the font size as needed
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

export const LineChart = ({ title, group, categories, series, height, width, xtitle, ytitle }) => {
  return (
    <div className='chart-container z-index-low'>
      <ApexCharts className='chart'
        options={{
          chart: {
            type: 'line',
            height: height,
            group: group,
            toolbar: {
              show: true
            }
          },
          title: {
            text: title,
            align: 'center',
            offsetY: 10,
            offsetX: -60,
            style: {
              fontSize: '0.7vw'
            }
          },
          xaxis: {
            tickPlacement: 'on',
            type: 'category',
            categories: categories,
            title: {
              text: xtitle,
              style:{
                fontSize: "0.5vw",
                fontWeight:800
              },
              offsetY:10
              
            },
            labels: {
              style: {
                fontSize: "0.5vw" // Adjust the font size of categories
              }
            }
          },
          yaxis: {
            title: {
              text: ytitle,
              style:{
                fontSize: "0.5vw",
                fontWeight:800
              }
            }
          },
          colors,
          stroke:{
            width:1
          }
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
