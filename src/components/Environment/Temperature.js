import React, { useState, useEffect } from "react";
import { Select, MenuItem } from "@mui/material";
import "./AqiReport.css";
import TemperatureTrend from "./TemperatureTrend";

const Temperature = ({
  templocation, tempdate, temptime, temperature, humidity
}) => {
  const [selectedLocation, setSelectedLocation] = useState(templocation[0]);
  const [selectedDate, setSelectedDate] = useState("01-01-2024");
  const [filteredTemperature, setFilteredTemperature] = useState([]);
  const [dailyAverageTemp, setDailyAverageTemp] = useState({});
  const [dailyData, setDailyData] = useState([]);
  const [fifteenDaysData, setFifteenDaysData] = useState([]);
  console.log(humidity);

  // Function to filter temperature data based on selected location
  const filterTemperatureData = () => {
    if (templocation && templocation.length > 0) {
      return templocation.reduce((acc, location, index) => {
        if (location === selectedLocation) {
          acc.push({ date: tempdate[index], time: temptime[index], temp: temperature[index] });
        }
        return acc;
      }, []);
    }
    return [];
  };

  // Function to calculate daily average temperatures
  const calculateDailyAverages = (data) => {
    const dailyAveragesData = {};

    data.forEach(({ date, temp }) => {
      if (!dailyAveragesData[date]) {
        dailyAveragesData[date] = [];
      }
      dailyAveragesData[date].push(temp);
    });

    const dailyAverages = {};
    for (const date in dailyAveragesData) {
      const dailyTemps = dailyAveragesData[date];
      const sum = dailyTemps.reduce((acc, temp) => acc + temp, 0);
      const average = sum / dailyTemps.length;
      dailyAverages[date] = parseFloat(average.toFixed(2));
    }
    console.log(dailyAverages);
    return dailyAverages;
  };

  const getDailyData = () => {
    if (!templocation || !tempdate || !temptime || !temperature) {
      return [];
    }

    const selectedDateData = templocation.reduce((acc, location, index) => {
      const date = tempdate[index];
      const time = temptime[index];
      const temp = temperature[index];
      if (location === selectedLocation && date === selectedDate) {
        acc.push({ time, temp });
      }
      return acc;
    }, []);
    console.log(selectedDateData);
    return selectedDateData;
  };

  const getFifteenDaysData = () => {
    if (!templocation || !tempdate || !temptime || !temperature) {
      return [];
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
    const fifteenDaysData = templocation.reduce((acc, location, index) => {
      const currentDateParts = tempdate[index].split("-").map(Number);
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
        const time = temptime[index];
        const temp = temperature[index];

        acc.push({
          date: tempdate[index],
          time,
          temp
        });
      }
      return acc;
    }, []);

    console.log(fifteenDaysData);
    return fifteenDaysData;
  };

  // Update filtered temperature data, daily averages, daily data, and 15 days data when selected location or date changes
  useEffect(() => {
    const filteredData = filterTemperatureData();
    setFilteredTemperature(filteredData);

    const dailyAverages = calculateDailyAverages(filteredData);
    setDailyAverageTemp(dailyAverages);

    const dailyDataForDate = getDailyData();
    setDailyData(dailyDataForDate);

    const fifteenDaysDataForDate = getFifteenDaysData();
    setFifteenDaysData(fifteenDaysDataForDate);
  }, [selectedLocation, selectedDate, templocation, tempdate, temptime, temperature]);

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div>
        
        <div className="main-graph-temp">
            <div className="graph-big-temp">
                {templocation.length > 0 && (
                    <>
                        <Select 
                            value={selectedLocation} 
                            onChange={handleLocationChange} 
                            className="dropdown-menu-temp"
                            style={{ height: "2vw", fontSize: "0.8vw",  width:"100%"}}>
                            {Array.from(new Set(templocation)).map((location, index) => (
                                <MenuItem key={index} value={location}>
                                    {location}
                                </MenuItem>
                            ))}
                        </Select>
                    </>
                )}
            </div>
        </div>

        {templocation.length > 0 && (
            <TemperatureTrend 
                selectedLocation={selectedLocation}
                selectedDate={selectedDate}
                dailyAverage={dailyAverageTemp}
                dailyData={dailyData}
                setSelectedDate={setSelectedDate}
                fifteenDaysData={fifteenDaysData} 
            />
        )}
    </div>
);

};

export default Temperature;
