import React, { useState, useEffect } from "react";
import { BarChart, LineChart } from "./GraphVisuals"; // Import chart components

const EnvironmentCharts = ({
  selectedYear,
  selectedMonth,
  selectedDate,
  selectedLocation,
  enviroLocation,
  enviroDate,
  envirotime,
  enviroPM25,
  enviroPM10,
  enviroSO2,
  enviroAQI,
  enviroNO2,
  enviroco2,
}) => {
  const [chartData, setChartData] = useState({});

  const filterDataByLocation = (location, year, month, date) => {
    // Filter data based on the selected location, year, month, and date
    const filteredData = {
      date: enviroDate.filter((dateString, index) => {
        const [day, monthStr, yearStr] = dateString.split("-");
        return (
          enviroLocation[index] === location &&
          yearStr === year &&
          monthStr === month &&
          day === date
        );
      }),
      time: envirotime.filter((_, index) => {
        const [day, monthStr, yearStr] = enviroDate[index].split("-");
        return (
          enviroLocation[index] === location &&
          yearStr === year &&
          monthStr === month &&
          day === date
        );
      }),
      pm25: enviroPM25.filter((_, index) => {
        const [day, monthStr, yearStr] = enviroDate[index].split("-");
        return (
          enviroLocation[index] === location &&
          yearStr === year &&
          monthStr === month &&
          day === date
        );
      }),
      pm10: enviroPM10.filter((_, index) => {
        const [day, monthStr, yearStr] = enviroDate[index].split("-");
        return (
          enviroLocation[index] === location &&
          yearStr === year &&
          monthStr === month &&
          day === date
        );
      }),
      so2: enviroSO2.filter((_, index) => {
        const [day, monthStr, yearStr] = enviroDate[index].split("-");
        return (
          enviroLocation[index] === location &&
          yearStr === year &&
          monthStr === month &&
          day === date
        );
      }),
      AQI: enviroAQI.filter((_, index) => {
        const [day, monthStr, yearStr] = enviroDate[index].split("-");
        return (
          enviroLocation[index] === location &&
          yearStr === year &&
          monthStr === month &&
          day === date
        );
      }),
      NO2: enviroNO2.filter((_, index) => {
        const [day, monthStr, yearStr] = enviroDate[index].split("-");
        return (
          enviroLocation[index] === location &&
          yearStr === year &&
          monthStr === month &&
          day === date
        );
      }),
      co2: enviroco2.filter((_, index) => {
        const [day, monthStr, yearStr] = enviroDate[index].split("-");
        return (
          enviroLocation[index] === location &&
          yearStr === year &&
          monthStr === month &&
          day === date
        );
      }),
    };
    filteredData.refCO2 = Array(filteredData.time.length).fill(400);
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
    enviroLocation,
    enviroDate,
    enviroPM25,
    enviroPM10,
    enviroSO2,
    enviroAQI,
    enviroNO2,
    enviroco2,
  ]);

  return (
    <div>
      {/* Render charts based on chartData */}
      {/* Example: Bar chart for PM2.5 */}

      {chartData.time && (
        <div className="row">
          <div className="cols-lg-10">
            <div className="graph">
              <div className="graph-conatiner">
                <div className="z-index-low">
                  <BarChart
                    title={`AQI for ${selectedDate}-${selectedMonth}-${selectedYear}`}
                    categories={chartData.time}
                    series={[{ name: "AQI", data: chartData.AQI },
                    { name: "Safe Limit", data: Array(chartData.time.length).fill(300) }]}
                    height={400}
                    width={500}
                    xtitle="Time"
                    ytitle="AQI Value"
                    
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {chartData.time && (
        <div className="row">
          <div className="cols-lg-10">
            <div className="graph">
              <div className="graph-conatiner">
                <div className="z-index-low">
                  <BarChart
                    title={`PM2.5 Levels for ${selectedDate}-${selectedMonth}-${selectedYear}`}
                    categories={chartData.time}
                    series={[
                      {
                        name: "PM2.5",
                        data: chartData.pm25.map((value) =>
                          parseFloat(value.toFixed(2))
                        ),
                      },
                      { name: "Safe Limit", data: Array(chartData.time.length).fill(60) }
                    ]}
                    height={400}
                    width={500}
                    xtitle="Time"
                    ytitle="PM2.5 Value"
                    
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {chartData.time && (
        <div className="row">
          <div className="cols-lg-10">
            <div className="graph">
              <div className="graph-conatiner">
                <div className="z-index-low">
                  <BarChart
                    title={`PM10 Levels for ${selectedDate}-${selectedMonth}-${selectedYear}`}
                    categories={chartData.time}
                    series={[
                      {
                        name: "PM 10",
                        data: chartData.pm10.map((value) =>
                          parseFloat(value.toFixed(2))
                        ),
                      },
                      { name: "Safe Limit", data: Array(chartData.time.length).fill(100) }
                    ]}
                    height={400}
                    width={500}
                    xtitle="Time"
                    ytitle="PM10 Value"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {chartData.time && (
        <div className="row">
          <div className="cols-lg-10">
            <div className="graph">
              <div className="graph-conatiner">
                <div className="z-index-low">
                  <BarChart
                    title={`SO2 Levels for ${selectedDate}-${selectedMonth}-${selectedYear}`}
                    categories={chartData.time}
                    series={[
                      {
                        name: "SO2",
                        data: chartData.so2.map((value) =>
                          parseFloat(value.toFixed(2))
                        ),
                      },
                      { name: "Safe Limit", data: Array(chartData.time.length).fill(80) }
                    ]}
                    height={400}
                    width={500}
                    xtitle="Time"
                    ytitle="So2 Value"
                    
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {chartData.time && (
        <div className="row">
          <div className="cols-lg-10">
            <div className="graph">
              <div className="graph-conatiner">
                <div className="z-index-low">
                  <BarChart
                    title={`NO2 Levels for ${selectedDate}-${selectedMonth}-${selectedYear}`}
                    categories={chartData.time}
                    series={[
                      {
                        name: "NO2",
                        data: chartData.NO2.map((value) =>
                          parseFloat(value.toFixed(2))
                        ),
                      },
                      { name: "Safe Limit", data: Array(chartData.time.length).fill(80) }
                    ]}
                    height={400}
                    width={500}
                    xtitle="Time"
                    ytitle="No2 Value"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {chartData.time && (
        <div className="row">
          <div className="cols-lg-10">
            <div className="graph">
              <div className="graph-conatiner">
                <div className="z-index-low">
                  <LineChart
                    title={`CO2 Levels for ${selectedDate}-${selectedMonth}-${selectedYear}`}
                    categories={chartData.time}
                    series={[
                      
                      {
                        name: "Co2",
                        data: chartData.co2.map((value) =>
                          parseFloat(value.toFixed(2))
                        ),
                      },
                      { name: "Safe Limits", data: chartData.refCO2 },
                    ]}
                    height={400}
                    width={500}
                    xtitle="Time"
                    ytitle="CO2 value"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Render other charts similarly for PM10, SO2, AQI, NO2 */}
    </div>
  );
};

export default EnvironmentCharts;
