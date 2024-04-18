import React, { useState, useEffect } from "react";
import { BarChart } from "./GraphVisuals"; // Import chart components

const RainFallCharts = ({
  selectedYear,
  rainData
}) => {
  const [chartData, setChartData] = useState([]);
  
  useEffect(() => {
    if (rainData.length > 0) {
      const filteredData = filterDataByYear(selectedYear);
      setChartData(filteredData);
    }
  }, [selectedYear, rainData]);

  const filterDataByYear = (year) => {
    const yearNumber = parseInt(year, 10);
    const filterData = rainData.filter(item => item.Year === yearNumber);
    const chartData = filterData.map(data => ({
      Month: data.Month,
      Total: data.Total,
      Normal: data.Normal
    }));

    return chartData;
  };

  return (
    <div>
      <div className="row">
        <div className="col-lg-12">
          <div className="graph">
            <div className="graph-container">
              <div className="z-index-low">
                <BarChart
                  title={`Actual and Normal Rainfall for ${selectedYear}`}
                  categories={["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct" , "Nov", "Dec"]}
                  series={[
                    { name: "Actual Rainfall", data: chartData.map(data => data.Total) },
                    { name: "Normal Rainfall", data: chartData.map(data => data.Normal) }
                  ]}
                  height={400}
                  width={500}
                  xtitle="Month"
                  ytitle="Amount"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RainFallCharts;
