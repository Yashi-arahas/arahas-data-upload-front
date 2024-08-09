import React, { useState, useEffect } from "react";
import { ParetoChart } from "../GraphVisuals";
import { Select, MenuItem } from "@mui/material";
import "./AqiReport.css";
import BaseChartComponent from "./Example";
import DailyTrend from "./DailyTrend";

const AQIChart = ({
  envirolocation,
  enviroDate,
  envirotime,
  enviroPM25,
  enviroPM10,
  enviroSO2,
  enviroAQI,
  enviroNO2,
  enviroco2,
  selectedLocation
}) => {
  const [selectedMonth, setSelectedMonth] = useState("01");
  const [selectedDate, setSelectedDate] = useState("01-01-2024");
  const [chartData, setChartData] = useState([]);
  const [series, setSeries] = useState([]);
  const [weeklyAverages, setWeeklyAverages] = useState(null);
  const [filteredAQI, setFilteredAQI] = useState(null);
  const [dailyAverage, setDailyAverage] = useState(null);
  const [dailyData, setDailyData] = useState(null);
  const [fifteenDaysData, setFifteenDaysData] = useState(null);

  const calculateDailyAverages = () => {
    if (!envirolocation || !enviroDate || !enviroAQI) {
      return null;
    }

    const dailyAveragesData = {};

    envirolocation.forEach((location, index) => {
      const date = enviroDate[index];
      const aqi = enviroAQI[index];
      if (location === selectedLocation) {
        if (!dailyAveragesData[date]) {
          dailyAveragesData[date] = [];
        }
        dailyAveragesData[date].push(aqi);
      }
    });

    // // Extract unique dates
    // const uniqueDates = [...new Set(enviroDate)];

    // // Fill in missing dates with a value of 0
    // uniqueDates.forEach((date) => {
    //   if (!dailyAveragesData[date]) {
    //     dailyAveragesData[date] = [0]; // Set value to 0 for missing entries
    //   }
    // });

    // Convert dailyAveragesData to an object where each date has a single value
    const dailyAverages = {};
    for (const date in dailyAveragesData) {
      const dailyAQI = dailyAveragesData[date];
      const sum = dailyAQI.reduce((acc, aqi) => acc + aqi, 0);
      const average = sum / dailyAQI.length;
      dailyAverages[date] = parseFloat(average.toFixed(2));
    }
    // dailyAverages.sort((a, b) => {
    //   const dateA = a.date.split("-").reverse().join("-");
    //   const dateB = b.date.split("-").reverse().join("-");
    //   return new Date(dateB) - new Date(dateA);
    // });
    return dailyAverages;
  };
  const getDailyData = () => {
    if (!envirolocation || !enviroDate || !enviroAQI || !envirotime) {
      return null;
    }

    const selectedDateData = envirolocation.reduce((acc, location, index) => {
      const date = enviroDate[index];
      const time = envirotime[index];
      const aqi = enviroAQI[index];
      if (location === selectedLocation && date === selectedDate) {
        acc.push({ time, aqi });
      }
      return acc;
    }, []);

    return selectedDateData;
  };
  const getFifteenDaysData = () => {
    if (!envirolocation || !enviroDate || !enviroAQI || !envirotime) {
      return null;
    }

    // Parse the selectedDate to extract day, month, and year
    const [selectedDay, selectedMonth, selectedYear] = selectedDate
      .split("-")
      .map(Number);

    // Calculate the day 15 days ago from the selected day
    let fifteenDaysAgoDay = selectedDay - 15;
    let fifteenDaysAgoMonth = selectedMonth;
    let fifteenDaysAgoYear = selectedYear;

    // Adjust the month and year if the day goes below 1
    while (fifteenDaysAgoDay <= 0) {
      // Go to the previous month
      fifteenDaysAgoMonth--;
      if (fifteenDaysAgoMonth === 0) {
        // If the month becomes 0 (January), go to December of the previous year
        fifteenDaysAgoMonth = 12;
        fifteenDaysAgoYear--;
      }

      // Get the number of days in the previous month
      const daysInPreviousMonth = new Date(
        fifteenDaysAgoYear,
        fifteenDaysAgoMonth,
        0
      ).getDate();

      // Adjust the day to the corresponding day in the previous month
      fifteenDaysAgoDay += daysInPreviousMonth;
    }

    // Format the date of 15 days ago
    const formattedFifteenDaysAgo = `${String(fifteenDaysAgoDay).padStart(
      2,
      "0"
    )}-${String(fifteenDaysAgoMonth).padStart(2, "0")}-${fifteenDaysAgoYear}`;
    // Filter the data for the last 15 days

    const selectedDateData = envirolocation.reduce((acc, location, index) => {
      const currentDateParts = enviroDate[index].split("-").map(Number);
      const formattedDateParts = formattedFifteenDaysAgo.split("-").map(Number);

      const currentDate = new Date(
        currentDateParts[2],
        currentDateParts[1] - 1,
        currentDateParts[0]
      );
      const formattedDate = new Date(
        formattedDateParts[2],
        formattedDateParts[1] - 1,
        formattedDateParts[0]
      );

      // Check if the date is within the 15 days range
      if (
        location === selectedLocation &&
        currentDate >= formattedDate &&
        currentDate <= new Date(selectedYear, selectedMonth - 1, selectedDay)
      ) {
        const time = envirotime[index];
        const aqi = enviroAQI[index];
        const pm25 = enviroPM25[index];
        const pm10 = enviroPM10[index];
        const so2 = enviroSO2[index];
        const no2 = enviroNO2[index];
        const co2 = enviroco2[index];

        acc.push({
          date: enviroDate[index],
          time,
          aqi,
          pm25,
          pm10,
          so2,
          no2,
          co2,
        });
      }
      return acc;
    }, []);

    return selectedDateData;
  };

  const calculateWeeklyAverages = () => {
    if (!envirolocation || !enviroDate || !enviroAQI) {
      return null;
    }

    const filteredData = envirolocation.reduce((acc, location, index) => {
      const date = enviroDate[index];
      const month = date.split("-")[1];
      const day = date.split("-")[0];

      if (location === selectedLocation && month === selectedMonth) {
        const week = Math.ceil(day / 7);
        acc.push({ index, week, date });
      }
      return acc;
    }, []);

    const filteredAQI = filteredData.map((entry) => ({
      date: entry.date,
      aqi: enviroAQI[entry.index],
    }));
    setFilteredAQI(filteredAQI);

    const weeklyAveragesData = Array.from({ length: 4 }, () => []);

    filteredData.forEach((entry) => {
      const { index, week } = entry;
      const aqi = enviroAQI[index];
      if (week <= 4) {
        weeklyAveragesData[week - 1].push(aqi);
      }
    });

    for (let i = 0; i < weeklyAveragesData.length; i++) {
      if (weeklyAveragesData[i].length > 0) {
        const sum = weeklyAveragesData[i].reduce((acc, aqi) => acc + aqi, 0);
        const average = sum / weeklyAveragesData[i].length;
        weeklyAveragesData[i] = parseFloat(average.toFixed(2)); // Round to two decimal places
      } else {
        weeklyAveragesData[i] = null;
      }
    }
    console.log(weeklyAverages);
    return { weeklyAveragesData, filteredAQI };
  };

  useEffect(() => {
    fetchYearlyData();
    setWeeklyAverages(calculateWeeklyAverages());
    setDailyAverage(calculateDailyAverages());
    setDailyData(getDailyData());
    setFifteenDaysData(getFifteenDaysData());

    //
  }, [
    selectedMonth,
    selectedDate,
    envirolocation,
    enviroDate,
    enviroAQI,
    enviroPM25,
    enviroPM10,
    enviroSO2,
    enviroNO2,
    enviroco2,
  ]);

  const fetchYearlyData = () => {
    const yearlyData = {};
    if (envirolocation.length > 0) {
      envirolocation.forEach((location, index) => {
        if (location === selectedLocation) {
          const date = enviroDate[index];
          const year = date.split("-")[2];
          const month = date.split("-")[1];

          if (!yearlyData[year]) {
            yearlyData[year] = {};
          }

          if (!yearlyData[year][month]) {
            yearlyData[year][month] = [];
          }

          yearlyData[year][month].push(enviroAQI[index]);
        }
      });
    }

    const newChartData = Object.keys(yearlyData).map((year) => ({
      year,
      data: Object.keys(yearlyData[year])
        .sort() // Sort the months in ascending order
        .map((monthKey) => {
          const month = parseInt(monthKey, 10); // Parse the month number from the string representation
          const monthlyAQIData = yearlyData[year][monthKey];
          const totalAQI = monthlyAQIData.reduce((acc, val) => acc + val, 0);
          const averageAQI = totalAQI / monthlyAQIData.length;
          return {
            month: month < 10 ? `0${month}` : `${month}`,
            averageAQI: averageAQI.toFixed(2),
          };
        }),
    }));

    setChartData(newChartData);
    if (newChartData.length > 0) {
      setSeries(newChartData);
    }
  };

 
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    console.log(selectedDate);
  };
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div>
       
      <div >
        <div  >
        {chartData.length > 0 && (
        <>
          <DailyTrend
            selectedLocation={selectedLocation}
            selectedDate={selectedDate}
            dailyAverage={dailyAverage}
            dailyData={dailyData}
            setSelectedDate={setSelectedDate}
            fifteenDaysData={fifteenDaysData}
          />
        </>
      )}
        </div>
      </div>

      {/* {chartData.length > 0 && (
        <div className="line-bar-graph-container">
          
          {chartData.length > 0 && series && (
            <div className="line-bar-chart">
              <ParetoChart
                title={`AQI levels for ${selectedLocation}`}
                categories={[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ]}
                data={series[0].data.map((month) =>
                  parseFloat(month.averageAQI)
                )}
                height={300}
                width={400}
                xtitle="Months"
                ytitle="AQI Values"
              />
              
              {weeklyAverages && (
                <ParetoChart
                  title="Weekly Average AQI"
                  categories={["Week 1", "Week 2", "Week 3", "Week 4"]}
                  data={weeklyAverages.weeklyAveragesData}
                  height={400}
                  width={"100%"}
                  xtitle="Week"
                  ytitle="AQI"
                />
              )}
              <BaseChartComponent
                firstSeries={series[0]}
                secondSeries={weeklyAverages.weeklyAveragesData}
                selectedLocation={selectedLocation}
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
              />
              <DailyTrend
                selectedLocation={selectedLocation}
                selectedDate={selectedDate}
                dailyAverage={dailyAverage}
                dailyData={dailyData}
                setSelectedDate={setSelectedDate}
                fifteenDaysData={fifteenDaysData}
              />
            </div>
          )}
        </div>
      )} */}
      
    </div>
  );
};

export default AQIChart;
