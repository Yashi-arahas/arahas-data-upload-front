import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import "./AqiReport.css";
import TempHeatMap from "./TempHeatMap";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const TemperatureTrend = ({
  selectedLocation,
  selectedDate,
  dailyAverage,
  dailyData,
  setSelectedDate,
  fifteenDaysData,
}) => {
    const [chartData, setChartData] = useState({});
    const [isDrilldown, setIsDrilldown] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [drilldownChartData, setDrilldownChartData] = useState([]);
    console.log(fifteenDaysData)
    useEffect(() => {
      const dataPoints = Object.entries(dailyAverage).map(([date, value]) => ({
        label: date,
        x: new Date(date.split("-").reverse().join("-")),
        y: parseFloat(value),
      }));
      dataPoints.sort((a, b) => a.x - b.x);
      const newChartData = {
        BaseChart: [
          {
            click: baseChartDrilldownHandler,
            cursor: "pointer",
            explodeOnClick: false,
            name: "BaseChart",
            type: "splineArea",
            indexLabelFontColor: "red",
            dataPoints: dataPoints,
            color:"#EE4E4E"
          },
        ],
      };
  
      setChartData(newChartData);
    }, [selectedLocation, dailyAverage]);
  
    useEffect(() => {
      const selectedDateData = dailyData
        .map(({ time, temp }) => ({
          label: time,
          y: parseFloat(temp),
        }))
        .sort((a, b) => {
          const timeA =
            parseInt(a.label.split(":")[0]) * 60 +
            parseInt(a.label.split(":")[1]);
          const timeB =
            parseInt(b.label.split(":")[0]) * 60 +
            parseInt(b.label.split(":")[1]);
          return timeA - timeB;
        });
  
      setDrilldownChartData([
        {
          color: "#FFAF61",
          name: selectedDate,
          type: "splineArea",
          dataPoints: selectedDateData,
        },
      ]);
    }, [selectedDate, dailyData]);
  
    const baseChartDrilldownHandler = (e) => {
      setSelectedDate(e.dataPoint.label);
      setIsDrilldown(true);
    };
  
    const backButtonClickHandler = () => {
      setIsDrilldown(false);
      setShowTable(false);
    };
  
    const lastFifteenClickHandler = () => {
      setShowTable(true);
    };
  
    const backButtonClassName = isDrilldown ? "" : "invisible";
  
    const baseChartOptions = {
      animationEnabled: true,
      theme: "red",
      title: {
        text: "Temperature Trend for " + selectedLocation,
        fontSize: 20,
        fontFamily: "Inter",
        fontWeight: 600,
      },
      legend: {
        fontSize: 10,
      },
      axisX: {
        labelFontColor: "#717171",
        lineColor: "#a2a2a2",
        tickColor: "#a2a2a2",
      },
      axisY: {
        gridThickness: 0,
        includeZero: false,
        labelFontColor: "#717171",
        lineColor: "#a2a2a2",
        tickColor: "#a2a2a2",
        lineThickness: 1,
        stripLines: [
          {
            value: 300,
            thickness: 1,
            color: "blue",
            label: "Safe Limit",
            labelFontColor: "black",
          },
        ],
      },
      data: chartData["BaseChart"],
      toolTip: {
        contentFormatter: function (e) {
          setSelectedDate(e.entries[0].dataPoint.label);
          const selectedDataForDate = dailyData
            .map(({ time, temp }) => ({
              label: time,
              y: parseFloat(temp).toFixed(2),
            }))
            .sort((a, b) => {
              const timeA =
                parseInt(a.label.split(":")[0]) * 60 +
                parseInt(a.label.split(":")[1]);
              const timeB =
                parseInt(b.label.split(":")[0]) * 60 +
                parseInt(b.label.split(":")[1]);
              return timeA - timeB;
            });
  
          const uniqueSelectedDateData = selectedDataForDate.filter(
            (entry, index, self) =>
              index ===
              self.findIndex((t) => t.label === entry.label && t.y === entry.y)
          );
  
          let content = "";
          content += `<div style="font-size: 1vw; font-weight:600; text-align:center; padding:0.5vw">`;
          content += `Average Temperature for ${selectedDate} is ${dailyAverage[selectedDate]}`;
          content += "</div>";
  
          content +=
            "<div style='display: inline-block;margin-left: 1vw;; padding:0.5vw'>";
          content += "<table style='font-size: 0.8vw; color: black'>";
          content +=
            "<tr><th>&nbsp&nbsp&nbspTime&nbsp&nbsp&nbsp&nbsp&nbsp;</th><th>&nbsp&nbsp&nbsp&nbsp&nbsp;Temperature&nbsp&nbsp&nbsp</th></tr>";
  
          uniqueSelectedDateData
            .slice(0, Math.ceil(uniqueSelectedDateData.length / 2))
            .forEach((entry) => {
              const colorClass = getColorClass(entry.y);
              content += `<tr><td class="${colorClass}">&nbsp&nbsp${entry.label}&nbsp&nbsp&nbsp&nbsp</td><td class="${colorClass}">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp${entry.y}&nbsp&nbsp&nbsp</td></tr>`;
            });
  
          content += "</table>";
          content += "</div>";
  
          content +=
            "<div style='display: inline-block; margin-left: 2vw;margin-right: 1vw;; padding:0.5vw'>";
          content += "<table style='font-size: 0.8vw;'>";
          content +=
            "<tr><th>&nbsp&nbsp&nbspTime&nbsp&nbsp&nbsp&nbsp&nbsp;</th><th>&nbsp&nbsp&nbsp&nbsp&nbsp;Temperature&nbsp&nbsp&nbsp</th></tr>";
  
          uniqueSelectedDateData
            .slice(Math.ceil(uniqueSelectedDateData.length / 2))
            .forEach((entry) => {
              const colorClass = getColorClass(entry.y);
              content += `<tr><td class="${colorClass}">&nbsp&nbsp&nbsp${entry.label}&nbsp&nbsp&nbsp&nbsp</td><td class="${colorClass}">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp${entry.y}&nbsp&nbsp&nbsp</td></tr>`;
            });
  
          content += "</table>";
          content += "</div>";
  
          return content;
        },
      },
    };
  
    const getColorClass = (aqi) => {
        if (aqi >= 0 && aqi <10) {
            return "shade-1";
        } else if (aqi >= 10 && aqi <20) {
            return "shade-2";
        } else if (aqi >= 20 && aqi < 30) {
            return "shade-3";
        } else if (aqi >= 30 && aqi <40) {
            return "shade-4";
        } else if (aqi >= 40 && aqi < 50) {
            return "shade-5";
        } else if (aqi >= 50) {
            return "shade-6";
        } else {
            return "";
        }
    };
  
    const drilldownChartOptions = {
      animationEnabled: true,
      title: {
        text: "Temperature for " + selectedDate,
        fontSize: 15,
      },
      theme: "light2",
      axisX: {
        labelFontColor: "#717171",
        lineColor: "#a2a2a2",
        tickColor: "#a2a2a2",
      },
      axisY: {
        gridThickness: 0,
        includeZero: false,
        labelFontColor: "black",
        lineColor: "#a2a2a2",
        tickColor: "#a2a2a2",
        lineThickness: 1,
        stripLines: [
          {
            value: 300,
            thickness: 1,
            color: "blue",
            label: "Safe Limit",
            labelFontColor: "black",
          },
        ],
      },
      data: drilldownChartData,
      toolTip: {
        contentFormatter: function (e) {
          let content = "";
          content +=
            "Temperature at " +
            e.entries[0].dataPoint.label +
            " is " +
            e.entries[0].dataPoint.y;
          return content;
        },
      },
    };

  return (
    <div>
      <div className="main-graph">
      <CanvasJSChart
    options={isDrilldown ? drilldownChartOptions : baseChartOptions}
    height={500} // Add containerProps to apply border radius
/>

              <button
                className={backButtonClassName}
                onClick={backButtonClickHandler}
                style={{
                  borderRadius: "4px",
                  padding: "8px",
                  border: "none",
                  fontSize: "16px",
                  backgroundColor: "#2eacd1",
                  color: "white",
                  cursor: "pointer",
                  margin:"0.5vw 1vw"
                
                }}
              >
                &lt; Back
              </button>
              <button
                className={backButtonClassName}
                onClick={lastFifteenClickHandler}
                style={{
                  borderRadius: "4px",
                  padding: "8px",
                  border: "none",
                  fontSize: "16px",
                  backgroundColor: "#2eacd1",
                  color: "white",
                  cursor: "pointer",
                  margin:"0.5vw 1vw"
                }}
              >
                View Last 15 days Trend
                </button>
              </div>
              {showTable===true && (
                <div className="main-graph">
        <div className="graph-big">
          <div className="graph">
            <div className="graph-container">
              
              
             
            </div>
            <TempHeatMap data={fifteenDaysData} />
          </div>
        </div>
      </div>
              )}
      
    </div>
  );
};

export default TemperatureTrend;
