import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import axios from "axios";
// import ReportPrint from "./ReportPrint"; // Import the ReportPrint component
import Lottie from "lottie-react";
import report_ani from "../animations/Report_ani.json";
import AQIReportPrint from "./AQIReportPrint";

// Utility functions
const formatDate = (date) => {
  if (!date) return "";
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const formatTimeToHHMMSS = (time) => {
  const dateObj = new Date(time);
  return `${dateObj.getUTCHours().toString().padStart(2, "0")}:${dateObj.getUTCMinutes().toString().padStart(2, "0")}:${dateObj.getUTCSeconds().toString().padStart(2, "0")}`;
};

const formatDateNew = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${day}-${month < 10 ? "0" + month : month}-${year}`;
};

const GenerateAqiReport = () => {
  const defaultStartDate = new Date(2024, 0, 19); // 19-01-2024
  const defaultEndDate = new Date(2024, 3, 29); // 29-04-2024

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locations, setLocations] = useState([]);
  const [averageAqi, setAverageAqi] = useState(null);
  const [averagePm25, setAveragePm25] = useState(null);
  const [averagePm10, setAveragePm10] = useState(null);
  const [dataTableData, setDataTableData] = useState([]);

  // Fetch unique locations on component mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("https://api-csi.arahas.com/data/environment");
        const locationsSet = new Set(response.data.data.map(item => item.location));
        setLocations(Array.from(locationsSet).map(location => ({ label: location, value: location })));
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations();
  }, []);

  // Fetch and process data when location or date range changes
  useEffect(() => {
    const fetchData = async () => {
      if (!selectedLocation || !startDate || !endDate) return;

      try {
        const startDateFormatted = formatDate(startDate);
        const endDateFormatted = formatDate(endDate);
        const response = await axios.get("https://api-csi.arahas.com/data/environment");
        const data = response.data.data;

        // Filter and sort the data based on selected location and date range
        const filteredData = data.filter(item =>
          item.location === selectedLocation &&
          new Date(item.date) >= new Date(startDateFormatted) &&
          new Date(item.date) <= new Date(endDateFormatted)
        ).sort((a, b) => new Date(a.date) - new Date(b.date));

        const pm25 = [];
        const pm10 = [];
        const aqi = [];
        const filteredDataWithDeviation = filteredData
          .filter(item => item.AQI > 400)
          .map(item => ({
            date: formatDateNew(new Date(item.date)),
            time: formatTimeToHHMMSS(item.time),
            aqi: item.AQI,
            deviationPercentage: ((item.AQI - 400) / 400 * 100).toFixed(2) + "%"
          }));

        filteredData.forEach(item => {
          pm25.push(item.pm25);
          pm10.push(item.pm10);
          aqi.push(item.AQI);
        });

        if (filteredData.length > 0) {
          const avgAqi = (aqi.reduce((sum, value) => sum + value, 0) / aqi.length).toFixed(2);
          const avgPm25 = (pm25.reduce((sum, value) => sum + value, 0) / pm25.length).toFixed(2);
          const avgPm10 = (pm10.reduce((sum, value) => sum + value, 0) / pm10.length).toFixed(2);

          setAverageAqi(avgAqi);
          setAveragePm25(avgPm25);
          setAveragePm10(avgPm10);
          setDataTableData(filteredDataWithDeviation);
        } else {
          setAverageAqi(null);
          setAveragePm25(null);
          setAveragePm10(null);
          setDataTableData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedLocation, startDate, endDate]);

  const allFieldsSelected = selectedLocation && startDate && endDate;

  return (
    <div className="p-fluid align-items-center flex justify-content-center flex-column">
      <Lottie
        animationData={report_ani}
        style={{ height: "20rem", width: "20rem" }}
      />

      {/* Location Dropdown */}
      <div className="field w-7 mb-3">
        <Dropdown
          value={selectedLocation}
          options={locations}
          onChange={(e) => setSelectedLocation(e.value)}
          placeholder="Select Location"
        />
      </div>

      {/* Date Range Selection */}
      <div className="grid w-8 mb-3">
        <div className="col-6">
          <div className="field">
            <Calendar
              value={startDate}
              onChange={(e) => setStartDate(e.value)}
              placeholder="Start Date"
              className="w-full"
              dateFormat="dd/mm/yy"
            />
          </div>
        </div>
        <div className="col-6">
          <div className="field">
            <Calendar
              value={endDate}
              onChange={(e) => setEndDate(e.value)}
              placeholder="End Date"
              className="w-full"
              dateFormat="dd/mm/yy"
            />
          </div>
        </div>
      </div>

      {/* Render ReportPrint Component only if all fields are selected */}
      {allFieldsSelected && (
        <div className="flex justify-content-center">
          <AQIReportPrint
            show={true}
            selectedLocation={selectedLocation}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
      )}
      {!allFieldsSelected && (
        <div className="flex justify-content-center">
          {/* <ReportPrint show={false} /> */}
        </div>
      )}
    </div>
  );
};

export default GenerateAqiReport;
