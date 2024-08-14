import React, { useState, useEffect } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import "../Environment/AqiReport.css";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PollutantChart = ({
  envirodate,
  envirotime,
  pollutantData,
  pollutantName,
  width, // Default width
  height, // Default height
  baseChartColor = "lightblue", // Default base chart color
  drilldownChartColor = "lightgreen", // Default drilldown chart color
  safeLimit, // Safe limit value
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDrilldown, setIsDrilldown] = useState(false);
  const [chartOptions, setChartOptions] = useState({});

  const calculateDailyAverages = () => {
    if (!envirodate || !pollutantData) return null;

    const dailyAveragesData = {};

    envirodate.forEach((date, index) => {
      const pollutantValue = pollutantData[index];
      if (!dailyAveragesData[date]) {
        dailyAveragesData[date] = [];
      }
      dailyAveragesData[date].push(pollutantValue);
    });

    const dailyAverages = {};
    for (const date in dailyAveragesData) {
      const dailyPollutantValues = dailyAveragesData[date];
      const sum = dailyPollutantValues.reduce((acc, value) => acc + value, 0);
      const average = sum / dailyPollutantValues.length;
      dailyAverages[date] = parseFloat(average.toFixed(2));
    }
    return dailyAverages;
  };

  const getDailyData = () => {
    if (!envirodate || !pollutantData || !selectedDate) return null;

    const selectedDateData = envirodate.reduce((acc, date, index) => {
      const time = envirotime[index];
      const pollutantValue = pollutantData[index];
      if (date === selectedDate) {
        acc.push({ time, value: pollutantValue });
      }
      return acc;
    }, []);

    return selectedDateData;
  };

  const handleDrilldown = (e) => {
    const date = e.dataPoint.label;
    setSelectedDate(date);
    setIsDrilldown(true);
  };

  const handleBackButtonClick = () => {
    setIsDrilldown(false);
    setSelectedDate(null);
  };

  const prepareChartOptions = () => {
    if (!isDrilldown) {
      const dailyAverage = calculateDailyAverages();

      return {
        animationEnabled: true,
        theme: "light2",
        title: {
          text: `${pollutantName} Trend`,
          fontSize: 12,
        },
        axisX: {
          fontSize: 10,
          gridThickness: 0, // Remove X-axis gridlines
        },
        axisY: {
          includeZero: false,
          gridThickness: 0, // Remove Y-axis gridlines
          labelFontSize: 10, // Adjust Y-axis labels font size
          stripLines: [
            {
              value: safeLimit,
              label: `Safe Limit (${safeLimit})`,
              color: "rgb(93, 92, 97)",
              lineDashType: "dash",
              labelFontSize: 8,
              thickness: 1,
            },
          ],
        },
        height: height,
        width: width,
        data: [
          {
            type: "area",
            color: baseChartColor,
            dataPoints: Object.entries(dailyAverage || {}).map(
              ([date, value]) => ({
                label: date,
                y: value,
                click: handleDrilldown,
                toolTipContent: `<table>
                                  <tr><th>Date</th><td>${date}</td></tr>
                                  <tr><th>Average ${pollutantName}</th><td>${value}</td></tr>
                                </table>`,
              })
            ),
          },
        ],
      };
    } else {
      const dailyData = getDailyData();

      return {
        animationEnabled: true,
        theme: "light2",
        title: {
          text: `${pollutantName} Levels on ${selectedDate}`,
          fontSize: 10,
        },
        axisX: {
          gridThickness: 0, // Remove X-axis gridlines
        },
        axisY: {
          includeZero: false,
          gridThickness: 0, // Remove Y-axis gridlines
          labelFontSize: 10, // Adjust Y-axis labels font size
          stripLines: [
            {
              value: safeLimit,
              label: `Safe Limit (${safeLimit})`,
              color: "rgb(93, 92, 92)",
              labelFontSize: 8,
              lineDashType: "dash",
              thickness: 2,
            },
          ],
        },
        height: height,
        width: width,
        data: [
          {
            type: "area",
            color: drilldownChartColor,
            dataPoints:
              dailyData?.map(({ time, value }) => ({
                label: time,
                y: parseFloat(value),
                toolTipContent: `<table>
                                  <tr><th>Time</th><td>${time}</td></tr>
                                  <tr><th>${pollutantName}</th><td>${value}</td></tr>
                                </table>`,
              })) || [],
          },
        ],
      };
    }
  };

  useEffect(() => {
    setChartOptions(prepareChartOptions());
  }, [isDrilldown, selectedDate, envirodate, pollutantData]);

  return (
    <div className="main-graph-pollutant">
      {isDrilldown && (
        <button onClick={handleBackButtonClick}>
          Back
        </button>
      )}
      <CanvasJSChart options={chartOptions} />
    </div>
  );
};

export default PollutantChart;
