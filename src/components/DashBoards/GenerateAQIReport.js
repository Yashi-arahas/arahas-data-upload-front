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
  const defaultStartDate = new Date(2024, 0, 1); // 19-01-2024
  const defaultEndDate = new Date(2024, 7, 13); // 29-04-2024

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
        const locationsResponse = await axios.get(`https://api-csi.arahas.com/data/locations`);
        // Extract unique locations


        if(locationsResponse.data)
        {
          const locationOptions = locationsResponse.data.data.map((data)=>({label:data,value:data}))

          console.log("Options", locationOptions)
          
          setLocations(locationOptions);
        }
        else{
          setLocations([])
        }
       
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
       
        const response = await axios.get(`https://api-csi.arahas.com/data/environment?location=${selectedLocation}`);
        const data = response.data.data;


        const pm25 = [];
        const pm10 = [];
        const aqi = [];
        const filteredDataWithDeviation = data
          .filter(item => item.AQI > 400)
          .map(item => ({
            date: formatDateNew(new Date(item.date)),
            time: formatTimeToHHMMSS(item.time),
            aqi: item.AQI,
            deviationPercentage: ((item.AQI - 400) / 400 * 100).toFixed(2) + "%"
          }));

          data.forEach(item => {
          pm25.push(item.pm25);
          pm10.push(item.pm10);
          aqi.push(item.AQI);
        });

        if (data.length > 0) {
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
  const handleStartDateChange = (e) => {
    setStartDate(e.value);
  };
  
  const handleEndDateChange = (e) => {
    setEndDate(e.value);
  };

  console.log(locations)

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
          optionLabel="label" optionValue="value"
          onChange={(e) => setSelectedLocation(e.value)}
          placeholder="Select Location"
        />
      </div>

      {/* Date Range Selection */}
      <div className="grid w-8 mb-3">
        <div className="col-6">
          <div className="field">
          <Calendar
        id="start-date"
        value={startDate}
        onChange={handleStartDateChange}
        showIcon
        dateFormat="dd-mm-yy"
        placeholder="Select a start date"
        minDate={new Date("2024-01-01")}  // Set the minimum selectable date
        maxDate={endDate} // Ensure the start date does not go beyond the end date
      />
           
          </div>
        </div>
        <div className="col-6">
          <div className="field">
          <Calendar
        id="end-date"
        value={endDate}
        onChange={handleEndDateChange}
        showIcon
        dateFormat="dd-mm-yy"
        placeholder="Select an end date"
        minDate={startDate} // Ensure the end date does not go before the start date
        maxDate={new Date("2024-08-13")}  // Set the maximum selectable date
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
