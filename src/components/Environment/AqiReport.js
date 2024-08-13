import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import AqiMap from "./Maps/AqiMap";
import "./AqiReport.css";

const AqiReport = () => {
  const [avgAqi, setAvgAqi] = useState([]);
  const [latestDate, setLatestDate] = useState("");
  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://api-csi.arahas.com/data/environment"
      );
      const data = response.data.data;

      // Process the data
      const processedData = processAqiData(data);

      // Set the processed data to state
      setLocationData(processedData.locationData);
      setLatestDate(processedData.latestDate);
      setAvgAqi(processedData.averageAQI);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const processAqiData = (data) => {
    const locationData = {};
    let latestDate = "";

    data.forEach((item) => {
      const dateObj = new Date(item.date);
      const formattedDate = `${dateObj.getDate() < 10 ? "0" : ""}${dateObj.getDate()}-${dateObj.getMonth() + 1 < 10 ? "0" : ""}${dateObj.getMonth() + 1}-${dateObj.getFullYear()}`;

      if (!latestDate || new Date(formattedDate) > new Date(latestDate)) {
        latestDate = formattedDate;
      }

      if (!locationData[item.location]) {
        locationData[item.location] = [];
      }

      locationData[item.location].push({
        time: item.time,
        AQI: item.AQI,
        temp: item.temp,
        humidity: item.humidity,
        pm25: item.pm25,
        pm10: item.pm10,
        NO2: item.NO2,
        so2: item.so2,
        co2: item.co2,
        tvoc: item.tvoc,
        date: formattedDate
      });
    });

    const averageAQI = Object.keys(locationData).map((location) => {
      const aqiValues = locationData[location].map((item) => item.AQI);
      const averageAQI = aqiValues.reduce((sum, value) => sum + value, 0) / aqiValues.length;

      return {
        location,
        AQI: averageAQI.toFixed(2),
      };
    });

    return { locationData, latestDate, averageAQI };
  };

  return (
    <div className="Aqi-zone-map">
      {Array.isArray(avgAqi) && avgAqi.length > 0 ? (
        <AqiMap averageAQI={avgAqi} latestDate={latestDate} />
      ) : (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "15rem", width: "35rem" }}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default AqiReport;
