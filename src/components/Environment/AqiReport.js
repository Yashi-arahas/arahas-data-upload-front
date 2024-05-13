import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header";
import AqiMap from "./Maps/AqiMap";
import "./AqiReport.css";
import AQIChart from "./AQIChart";

const AqiReport = () => {
  const [avgAqi, setAvgAqi] = useState("");
  const [latestDate, setLatestDate] = useState("");
  const [envirolocation, setEnviroLocation] = useState("");
  const [envirotime, setEnviroTime] = useState("");
  const [envirodate, setEnviroDate] = useState("");
  const [envirotimeStamp, setEnviroTimeStamp] = useState("");
  const [enviropm25, setEnviroPM25] = useState("");
  const [enviropm10, setEnviroPM10] = useState("");
  const [enviroso2, setEnviroSO2] = useState("");
  const [enviroAQI, setEnviroAQI] = useState("");
  const [enviroNO2, setEnviroNO2] = useState("");
  const [enviroco2, setEnviroco2] = useState("");
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const aqi_response = await axios.get(
        "https://arahas-data-upload-back.onrender.com/data/environment"
      );
      const data = aqi_response.data.data;
      const location = [];
      const timeStamp = [];
      const time = [];
      const formattedDate = [];
      const formattedTime = [];
      const pm25 = [];
      const pm10 = [];
      const so2 = [];
      const AQI = [];
      const NO2 = [];
      const co2 = [];
      data.forEach((item) => {
        location.push(item.location);
        timeStamp.push(item.timeStamp);
        time.push(item.time);
        const dateObj = new Date(item.date);
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        const formatted = `${day<10? "0" + day : day }-${month < 10 ? "0" + month : month}-${year}`;
        formattedDate.push(formatted);
        
        const localDateObj = new Date(
          dateObj.getTime() + dateObj.getTimezoneOffset() * 60000
        );
        const hours = localDateObj.getHours();
        const minutes = localDateObj.getMinutes();
        const formattedTimeStr = `${hours}:${
          minutes < 10 ? "0" + minutes : minutes
        }`;
        formattedTime.push(formattedTimeStr);
        pm25.push(item.pm25);
        pm10.push(item.pm10);
        so2.push(item.so2);
        AQI.push(item.AQI);
        NO2.push(item.NO2);
        co2.push(item.co2);
      });
      setEnviroLocation(location);
      setEnviroTimeStamp(timeStamp);
      setEnviroTime(formattedTime);
      setEnviroDate(formattedDate);
      
      const latestDate = new Date(
        Math.max(
          ...formattedDate.map((date) => {
            const [day, month, year] = date.split("-");
            return new Date(`${year}-${month}-${day}`).getTime();
          })
        )
      );

      const latestDay = latestDate.getDate();
      const latestMonth = latestDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month index
      const latestYear = latestDate.getFullYear();

      const formattedLatestDate = `${
        latestDay < 10 ? "0" + latestDay : latestDay
      }-${latestMonth < 10 ? "0" + latestMonth : latestMonth}-${latestYear}`;

      console.log(formattedLatestDate);
      const latestDataEntries = data.filter((item) => {
        const dateObj = new Date(item.date);
        console.log(item.date);
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        const formattedDate = `${day<10 ? "0"+day :day}-${
          month < 10 ? "0" + month : month
        }-${year}`;
        return formattedDate === formattedLatestDate;
      });
      const averageAQIByLocation = latestDataEntries.reduce((acc, item) => {
        if (!acc[item.location]) {
          acc[item.location] = { totalAQI: 0, count: 0 };
        }
        acc[item.location].totalAQI += item.AQI;
        acc[item.location].count++;

        return acc;
      }, {});

      const averageAQI = Object.entries(averageAQIByLocation).map(
        ([location, { totalAQI, count }]) => ({
          location,
          AQI: totalAQI / count,
        })
      );
      setLatestDate(formattedLatestDate);
      setAvgAqi(averageAQI);
      setEnviroPM25(pm25);
      setEnviroPM10(pm10);
      setEnviroSO2(so2);
      setEnviroAQI(AQI);
      setEnviroNO2(NO2);
      setEnviroco2(co2);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div className="map" >
            <div className="main-graph">
            <h1>AQI Level for {latestDate}</h1>
            </div>
            
            {Array.isArray(avgAqi) ? (
              <AqiMap averageAQI={avgAqi} />
            ) : (
              <p>Loading...</p>
            )}
         </div>
    
  );
};

export default AqiReport;
