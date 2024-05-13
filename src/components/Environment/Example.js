import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const BaseChartComponent = ({ firstSeries, secondSeries, selectedLocation, selectedMonth, setSelectedMonth }) => {
  const [chartData, setChartData] = useState({});
  const [isDrilldown, setIsDrilldown] = useState(false);
  const [drilldownChartData, setDrilldownChartData] = useState([]);

  useEffect(() => {
    const newChartData = {
      "BaseChart": [{
        click: baseChartDrilldownHandler,
        cursor: "pointer",
        explodeOnClick: false,
        name: "BaseChart",
        type: "splineArea",
        indexLabelFontColor: "red",
        dataPoints: firstSeries.data.map(({ month, averageAQI }) => ({
          label: month, // Use month as the label
          y: parseFloat(averageAQI),
          name: "BaseChart"
        }))
      }]
    };

    setChartData(newChartData);
  }, [firstSeries]);

  useEffect(() => {
    const selectedMonthData = secondSeries.map((value, index) => ({
      label: `Week ${index + 1}`,
      y: value ? parseFloat(value) : 0 // Using 0 if value is null
    }));

    setDrilldownChartData([{
      color: "#E7823A",
      name: selectedMonth,
      type: "splineArea",
      dataPoints: selectedMonthData
    }]);
  }, [selectedMonth, secondSeries]);

  const baseChartDrilldownHandler = (e) => {
    setSelectedMonth(e.dataPoint.label); // Update the selectedMonth state in the parent component
    setIsDrilldown(true); // Set drilldown view to true
  };

  const backButtonClickHandler = () => {
    setIsDrilldown(false); // Set drilldown view to false
  };

  const backButtonClassName = isDrilldown ? "" : "invisible";

  const baseChartOptions = {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: selectedLocation,
      fontSize: 15
    },
    legend: {
      fontFamily: "calibri",
      fontSize: 10,
    },
    axisX: {
      labelFontColor: "#717171",
      lineColor: "#a2a2a2",
      tickColor: "#a2a2a2"
    },
    axisY: {
      gridThickness: 0,
      includeZero: false,
      labelFontColor: "#717171",
      lineColor: "#a2a2a2",
      tickColor: "#a2a2a2",
      lineThickness: 1
    },
    data: chartData["BaseChart"]
  };

  const drilldownChartOptions = {
    animationEnabled: true,
    title: { text: selectedMonth },
    theme: "light2",
    axisX: {
      labelFontColor: "#717171",
      lineColor: "#a2a2a2",
      tickColor: "#a2a2a2"
    },
    axisY: {
      gridThickness: 0,
      includeZero: false,
      labelFontColor: "#717171",
      lineColor: "#a2a2a2",
      tickColor: "#a2a2a2",
      lineThickness: 1
    },
    data: drilldownChartData
  };

  return (
    <div>
      <div className='line-bar-chart'>
        <CanvasJSChart options={isDrilldown ? drilldownChartOptions : baseChartOptions} />
        <button className={backButtonClassName} onClick={backButtonClickHandler}>&lt; Back</button>
      </div>
    </div>
  );
};

export default BaseChartComponent;
