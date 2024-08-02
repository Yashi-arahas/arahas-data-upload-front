import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import CanvasJSReact from "@canvasjs/react-charts";
import { color } from "framer-motion";
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

// Adjust the import according to your setup
const colors = [
  "#00A269",
  "rgb(184, 184, 184)", // (Rich Purple)
  "#A9F3E0", // (orange)
  "grey", // (Strong Blue)
  "#1abc9c", // (Turquoise Green)
  "#FFC300", // (Vivid Yellow)
  "#C70039", // (Strong Red)
  "#581845", // (Dark Violet)
  "#9b59b6", // (Amethyst Purple)
];
const DonutChart = ({ title, labels, series, height }) => {
  const options = {
    animationEnabled: true,
    title: {
      text: title,
      fontSize: 10,
      fontWeight: 500,
    },
    height: height,

    data: [
      {
        type: "doughnut",
        startAngle: -10,
        toolTipContent: "<b>{label}</b>: {y} (#percent%)",
        showInLegend: false,
        indexLabelFontSize: 8,
        color: colors,
        indexLabel: "{label} - #percent%",
        dataPoints: series.map((value, index) => ({
          y: value,
          label: labels[index],
          color: colors[index % colors.length],
        })),
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default DonutChart;
export const GroupedBarChart = ({
  title,
  categories,
  series,
  height,
  width,
  xtitle,
  ytitle,
}) => {
  return (
    <div className="z-index-low">
      <CanvasJSChart
        options={{
          animationEnabled: true,
          title: {
            text: title,
            fontSize: 13,
          },
          axisX: {
            title: xtitle,
          },
          axisY: {
            title: ytitle,
          },
          data: series.map((data, index) => ({
            type: "column",
            name: categories[index],
            showInLegend: true,
            dataPoints: data.map((value, i) => ({
              y: value,
              label: categories[i],
            })),
            color: colors[index % colors.length],
          })),
        }}
        height={height}
        width={width}
      />
    </div>
  );
};

export const BarChart = ({
  title,
  categories,
  series,
  height,
  width,
  xtitle,
  ytitle,
}) => {
  return (
    <div className="z-index-low">
      <CanvasJSChart
        options={{
          animationEnabled: true,
          title: {
            text: title,
            fontSize: 13,
          },
          axisX: {
            title: xtitle,
          },
          axisY: {
            title: ytitle,
          },
          data: series.map((data, index) => ({
            type: "bar",
            name: categories[index],
            showInLegend: true,
            dataPoints: data.map((value, i) => ({
              y: value,
              label: categories[i],
            })),
            color: colors[index % colors.length],
          })),
        }}
        height={height}
        width={width}
      />
    </div>
  );
};

export const ParetoChart = ({
  title,
  categories,
  data,
  height,
  width,
  xtitle,
  ytitle,
}) => {
  const [lineDataPoints, setLineDataPoints] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (lineDataPoints.length >= categories.length) {
        setLineDataPoints([]);
      } else {
        const nextIndex = lineDataPoints.length;
        setLineDataPoints((prevPoints) => [
          ...prevPoints,
          { label: categories[nextIndex], y: data[nextIndex] },
        ]);
      }
    }, 300); // Adjust the interval time to control the animation speed

    return () => clearInterval(interval);
  }, [categories, data, lineDataPoints]);

  const chartData = categories.map((category, index) => ({
    label: category,
    y: data[index],
  }));

  const options = {
    height: height,
    width: width,

    animationEnabled: true,
    title: {
      text: title,
      fontSize: 13,
    },
    axisX: {
      title: xtitle,
      gridThickness: 0,
    },
    axisY: {
      title: ytitle,
      gridThickness: 0,
    },
    data: [
      {
        type: "column",
        name: "Column",
        showInLegend: true,
        indexLabel: "{y}",
        indexLabelPlacement: "inside",
        indexLabelFontWeight: "bold",
        indexLabelFontSize: 10,
        dataPoints: chartData,
        color: colors[2],
      },
      {
        type: "line",
        name: "Line",
        showInLegend: true,
        indexLabelPlacement: "outside",
        indexLabelFontWeight: "bold",
        indexLabelFontSize: 10,
        dataPoints: lineDataPoints,
        color: colors[4],
      },
    ],
  };

  return (
    <div className="esg-chart z-index-low">
      <CanvasJSChart options={options} />
    </div>
  );
};

export const LineBar = ({
  title,
  categories,
  chartSeries,
  height,
  width,
  xtitle,
  ytitle,
}) => {
  const options = {
    animationEnabled: true,
    title: {
      text: title,
      fontSize: 13,
    },
    axisX: {
      title: xtitle,
    },
    axisY: [
      {
        title: {
          text: ytitle,
        },
      },
      {
        opposite: true,
        title: {
          text: "",
        },
      },
    ],
    data: chartSeries.map((series, index) => ({
      type: "line",
      name: categories[index],
      showInLegend: true,
      dataPoints: series.map((value, i) => ({
        y: value,
        label: categories[i],
      })),
      color: colors[index % colors.length],
    })),
  };

  return (
    <div className="chart-container z-index">
      <CanvasJSChart options={options} height={height} width={width} />
    </div>
  );
};

export const PieChart = ({ title, labels, series, height }) => {
  return (
    <div className="z-index-low">
      <CanvasJSChart
        options={{
          height: height,
          animationEnabled: true,
          title: {
            text: title,
            fontSize: 10,
          },
          legend: {
            horizontalAlign: "right",
            verticalAlign: "center",
            fontSize: 8,
          },
          data: [
            {
              type: "pie",
              startAngle: 75,
              toolTipContent: "<b>{label}</b>: {y} (#percent%)",
              showInLegend: true,
              legendText: "{label}",
              indexLabelFontSize: 8,
              indexLabelFontWeight: "bold",
              indexLabelPlacement: "inside",
              dataPoints: labels.map((label, index) => ({
                y: series[index],
                label: label,
                color: colors[index % colors.length],
              })),
            },
          ],
        }}
      />
    </div>
  );
};
export const LineChart = ({
  title,
  group,
  categories,
  series,
  height,
  width,
  xtitle,
  ytitle,
}) => {
  return (
    <div className="chart-container z-index-low">
      <ApexCharts
        className="chart"
        options={{
          chart: {
            type: "line",
            height: height,
            group: group,
            toolbar: {
              show: true,
            },
          },
          title: {
            text: title,
            align: "center",
            offsetY: 10,
            offsetX: -60,
            style: {
              fontSize: "0.7vw",
            },
          },
          xaxis: {
            tickPlacement: "on",
            type: "category",
            categories: categories,
            title: {
              text: xtitle,
              style: {
                fontSize: "0.5vw",
                fontWeight: 800,
              },
              offsetY: 10,
            },
            labels: {
              style: {
                fontSize: "0.5vw", // Adjust the font size of categories
              },
            },
          },
          yaxis: {
            title: {
              text: ytitle,
              style: {
                fontSize: "0.5vw",
                fontWeight: 800,
              },
            },
          },
          colors,
          stroke: {
            width: 1,
          },
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
export const AreaChart = ({
  title,
  categories,
  series,
  height,
  width,
  xtitle,
  ytitle,
}) => {
  return (
    <div className="chart-container z-index-low">
      <ApexCharts
        className="chart"
        options={{
          chart: {
            type: "area",
            height: height,
            group: "same",
            toolbar: {
              show: true,
            },
          },
          title: {
            text: title,
            align: "center",
            offsetY: 20,
            style: {
              fontSize: "1vw",
            },
          },
          xaxis: {
            tickPlacement: "on",
            type: "category",
            categories: categories,
            title: {
              text: xtitle,
            },
          },
          yaxis: {
            title: {
              text: ytitle,
            },
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
