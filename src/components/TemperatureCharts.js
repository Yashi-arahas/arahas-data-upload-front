import React, { useState, useEffect } from "react";
import { AreaChart, LineChart } from "./GraphVisuals"; // Import chart components

const TemperatureCharts = ({
  selectedYear,
  selectedMonth,
  selectedDate,
  selectedLocation,
  tempLocation,
  tempDate,
  temptime,
  temperature,
  humidity
}) => {
  const [chartData, setChartData] = useState({});

  const filterDataByLocation = (location, year, month, date) => {
    // Filter data based on the selected location, year, month, and date
    const filteredData = {
        
      date: tempDate.filter((dateString, index) => {
        const [day, monthStr, yearStr] = dateString.split("-");
        return (
          tempLocation[index] === location &&
          yearStr === year &&
          monthStr === month &&
          day === date
        );
      }),
      time: temptime.filter((_, index) => {
        const [day, monthStr, yearStr] = tempDate[index].split("-");
        return (
          tempLocation[index] === location &&
          yearStr === year &&
          monthStr === month &&
          day === date
        );
      }),
      temperature: temperature.filter((_, index) => {
        const [day, monthStr, yearStr] = tempDate[index].split("-");
        return (
          tempLocation[index] === location &&
          yearStr === year &&
          monthStr === month &&
          day === date
        );
      }),
      humidity: humidity.filter((_, index) => {
        const [day, monthStr, yearStr] = tempDate[index].split("-");
        return (
          tempLocation[index] === location &&
          yearStr === year &&
          monthStr === month &&
          day === date
        );
      })
    };

    return filteredData;
  };

  useEffect(() => {
    const filteredData = filterDataByLocation(
      selectedLocation,
      selectedYear,
      selectedMonth,
      selectedDate
    );
    setChartData(filteredData);
  }, [
    selectedYear,
    selectedMonth,
    selectedDate,
    selectedLocation,
    tempLocation,
    tempDate,
    temptime,
    temperature, 
    humidity
  ]);

  return (
    <div>
      {/* Render charts based on chartData */}
      {/* Example: Bar chart for PM2.5 */}
      
       {chartData.time && (
        <div className="row">
          <div className="cols-lg-12">
            <div className="graph">
              <div className="graph-conatiner">
                <div
                  className="z-index-low"
                >
                  <AreaChart
                    title={`Temperature for ${selectedDate}-${selectedMonth}-${selectedYear}`}
                    categories={chartData.time}
                    series={[{ name: "Temperature", data: chartData.temperature.map(value => parseFloat(value.toFixed(2))) }]}
                    height={400}
                    width={700}
                    xtitle="Time"
                    ytitle='Temperature'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {chartData.time && (
        <div className="row">
          <div className="cols-lg-12">
            <div className="graph">
              <div className="graph-conatiner">
                <div
                  className="z-index-low"
                >
                  <LineChart
                    title={`Humidity for ${selectedDate}-${selectedMonth}-${selectedYear}`}
                    categories={chartData.time}
                    series={[{ name: "Humidity", data: chartData.humidity.map(value => parseFloat(value.toFixed(2))) }]}
                    height={400}
                    width={700}
                    xtitle="Time"
                    ytitle='Humidity'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
       
    </div>
  );
};

export default TemperatureCharts;


