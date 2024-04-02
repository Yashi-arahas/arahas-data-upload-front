import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DepartmentPage.css";
import FileUploadPopup from "./upload-popup/FileUploadPopup";
import { BarChart, PieChart } from "./GraphVisuals"; // Import BarChart component
import Logo from "./HeaderLogo";
import { Select, MenuItem } from "@mui/material";
import EnvironmentCharts from "./EnvironmnetCharts";
import AQI from "./images/AQI.png";
import tvoc from "./images/tvoc.png";
import no2 from "./images/No-2.png";
import pm25 from "./images/pm2.5.png";
import pm10 from "./images/pm10.png";
import so2 from "./images/SO-2.png";
import TemperatureCharts from "./TemperatureCharts";
import hot from "./images/hot.png";
import humid from "./images/hum.png";

//import icons
import "bootstrap-icons/font/bootstrap-icons.css";
import "remixicon/fonts/remixicon.css";
//import BootStrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import PollutionCounts from "./PollutionCounts";
const DepartmentPage = ({ departmentName, apiUrl, uploadUrl }) => {
  // State variables and useEffect for data fetching, file upload, etc.
  const [showPopup, setShowPopup] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [pastConsumption, setPastConsumption] = useState([]);
  const [presentConsumption, setPresentConsumption] = useState([]);
  const [SDG11Target, setSDG11Target] = useState([]);
  const [categ, setCateg] = useState([]); // State for categories
  const [showModifyPopup, setShowModifyPopup] = useState(false);
  const [touristData, setTouristData] = useState([]); // State for tourist data
  const [wasteData, setWasteData] = useState([]); // State for showing the modification popup
  const [populationData, setPopulationData] = useState([]);
  const [vehical, setVehcialName] = useState([]);
  const [year1, setYearOne] = useState([]);
  const [year2, setYearTwo] = useState([]);
  const [year3, setYearThree] = useState([]);
  const [year4, setYearFour] = useState([]);
  const [year5, setYearFive] = useState([]);
  const [year6, setYearSix] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [envirolocation, setEnviroLocation] = useState("");
  const [envirotime, setEnviroTime] = useState("");
  const [envirodate, setEnviroDate] = useState("");
  const [envirotimeStamp, setEnviroTimeStamp] = useState("");
  const [enviropm25, setEnviroPM25] = useState("");
  const [enviropm10, setEnviroPM10] = useState("");
  const [enviroso2, setEnviroSO2] = useState("");
  const [enviroAQI, setEnviroAQI] = useState("");
  const [enviroNO2, setEnviroNO2] = useState("");
  const [selectedAction, setSelectedAction] = useState(""); // State for selected action
  const [average, setAverage] = useState({});
  const [insights, setInsights] = useState({});
  const [subCategory, setSubCategory] = useState("");
  const [pollution, setPollution] = useState("");
  const [templocation, setTempLocation] = useState("");
  const [temptime, setTempTime] = useState("");
  const [tempdate, setTempDate] = useState("");
  const [temptimeStamp, setTempTimeStamp] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");

  const handleSubCategory = (subCategory) => {
    setSubCategory(subCategory);
    console.log(subCategory);
  };

  // Function to handle action selection
  const handleActionSelect = (action) => {
    setSelectedAction(action);
    setShowPopup(true); // Show the upload popup when an action is selected
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (departmentName === "Electricity") {
        const response = await axios.get(apiUrl);
        const data = response.data.data;
        const pastConsumption = [];
        const presentConsumption = [];
        const SDG11Target = [];
        const categ = [];

        data.forEach((item) => {
          categ.push(item.category);
          pastConsumption.push(item.past_consumption);
          presentConsumption.push(item.present_consumption);
          SDG11Target.push(item.SDG_11_target);
        });

        setCateg(categ);
        setPastConsumption(pastConsumption);
        setPresentConsumption(presentConsumption);
        setSDG11Target(SDG11Target);
      } else if (departmentName === "Tourism") {
        const touristResponse = await axios.get(apiUrl); // Assuming correct URL for tourism data
        const wasteResponse = await axios.get(apiUrl + "/waste");
        setTouristData(touristResponse.data.data);
        setWasteData(wasteResponse.data.data);
      } else if (departmentName === "Housing") {
        const response = await axios.get(apiUrl);
        const data = response.data.data;
        setPopulationData(data);
      } else if (departmentName === "Transport") {
        const response = await axios.get(apiUrl);
        const data = response.data.data;
        const vehical = [];
        const year1 = [];
        const year2 = [];
        const year3 = [];
        const year4 = [];
        const year5 = [];
        const year6 = [];

        data.forEach((item) => {
          vehical.push(item.Vehical_class);
          year1.push(item["2016-2017"]);
          year2.push(item["2017-2018"]);
          year3.push(item["2018-2019"]);
          year4.push(item["2019-2020"]);
          year5.push(item["2020-2021"]);
          year6.push(item["2021-2022"]);
        });
        setVehcialName(vehical);
        setYearOne(year1);
        setYearTwo(year2);
        setYearThree(year3);
        setYearFour(year4);
        setYearFive(year5);
        setYearSix(year6);
      } else if (departmentName === "Environment") {
        const response = await axios.get(apiUrl);
        const data = response.data.data;
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
        data.forEach((item) => {
          location.push(item.location);
          timeStamp.push(item.timeStamp);
          time.push(item.time);

          // Parse the date string correctly
          const dateObj = new Date(item.date);
          const year = dateObj.getFullYear();
          const month = dateObj.getMonth() + 1; // getMonth() returns 0-based month index
          const day = dateObj.getDate();

          // Format the date to dd-mm-yyyy
          const formatted = `${day}-${month < 10 ? "0" + month : month}-${year}`;
          formattedDate.push(formatted);

          const hours = dateObj.getHours();
          const minutes = dateObj.getMinutes() + 1;
          const formattedTimeStr = `${hours}:${minutes}`;
          formattedTime.push(formattedTimeStr);
          pm25.push(item.pm25);
          pm10.push(item.pm10);
          so2.push(item.so2);
          AQI.push(item.AQI);
          NO2.push(item.NO2);
        });
        setEnviroLocation(location);
        setEnviroTimeStamp(timeStamp);
        setEnviroTime(formattedTime);
        setEnviroDate(formattedDate);
        setEnviroPM25(pm25);
        setEnviroPM10(pm10);
        setEnviroSO2(so2);
        setEnviroAQI(AQI);
        setEnviroNO2(NO2);
        // Initialize an object to store counts for each date
        const dateCounts = {};

        // Iterate through the data to calculate counts
        data.forEach((item) => {
          // Get the formatted date (without time)
          const dObj = new Date(item.date);
          const y = dObj.getFullYear();
          const m = dObj.getMonth() + 1; // getMonth() returns 0-based month index
          const d = dObj.getDate();

          // Format the date to dd-mm-yyyy
          const fDate = `${d}-${m < 10 ? "0" + m : m}-${y}`;

          // Check if the date exists in the counts, if not initialize it
          if (!dateCounts[fDate]) {
            dateCounts[fDate] = {
              AQI: 0,
              pm25: 0,
              pm10: 0,
              so2: 0,
              NO2: 0,
            };
          }

          // Increment counts if thresholds are exceeded
          if (item.AQI > 300) {
            dateCounts[fDate].AQI++;
          }
          if (item.pm25 > 60) {
            dateCounts[fDate].pm25++;
          }
          if (item.pm10 > 100) {
            dateCounts[fDate].pm10++;
          }
          if (item.so2 > 80) {
            dateCounts[fDate].so2++;
          }
          if (item.NO2 > 80) {
            dateCounts[fDate].NO2++;
          }
        });

        const pollutantCounts = {
          AQI: 0,
          pm25: 0,
          pm10: 0,
          so2: 0,
          NO2: 0,
        };

        for (const date in dateCounts) {
          if (dateCounts[date].AQI > 0) {
            pollutantCounts.AQI++;
          }
          if (dateCounts[date].pm25 > 0) {
            pollutantCounts.pm25++;
          }
          if (dateCounts[date].pm10 > 0) {
            pollutantCounts.pm10++;
          }
          if (dateCounts[date].so2 > 0) {
            pollutantCounts.so2++;
          }
          if (dateCounts[date].NO2 > 0) {
            pollutantCounts.NO2++;
          }
        }

        setPollution(pollutantCounts);
        const res = await axios.get(apiUrl + "/average");
        setAverage(res.data.data);
        const res2 = await axios.get(apiUrl + "/insights");
        // console.log(res2.data.data);
        setInsights(res2.data.data || []);

        const temp = await axios.get(apiUrl + "/temperature");
        const tlocation = [];
        const ttimeStamp = [];
        const ttime = [];
        const tformattedDate = [];
        const tformattedTime = [];
        const tTemperature = [];
        const tHumidity = [];
        temp.data.data.forEach((item) => {
          tlocation.push(item.location);
          ttimeStamp.push(item.timeStamp);
          ttime.push(item.time);
          const dateObj = new Date(item.date);
          const year = dateObj.getFullYear();
          const month = dateObj.getMonth() + 1; // getMonth() returns 0-based month index
          const day = dateObj.getDate();

          // Format the date to dd-mm-yyyy
          const formatted = `${day}-${month < 10 ? "0" + month : month}-${year}`;
          tformattedDate.push(formatted);

          const hours = dateObj.getHours();
          const minutes = dateObj.getMinutes() + 1;
          const formattedTimeStr = `${hours}:${minutes}`;
          tformattedTime.push(formattedTimeStr);
          tTemperature.push(item.temperature);
          tHumidity.push(item.humidity);
        });
        setTempLocation(tlocation);
        setTempTimeStamp(ttimeStamp);
        setTempTime(tformattedTime);
        setTempDate(tformattedDate);
        setTemperature(tTemperature);
        setHumidity(tHumidity);
        const rain_response = await axios.get(apiUrl +"/rainfall");
        const rYear = [];
        const rMonth = [];
        const rTotal = [];
        const rNormal = [];
        rain_response.data.data.forEach((item) => {
          rYear.push(item.Year);
          rMonth.push(item.Month);
          rTotal.push(item.Total);
          rNormal.push(item.rNormal);
       })
        

      }
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      await axios.post(uploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadSuccess(true);
      setUploadError(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadSuccess(false);
      setUploadError(true);
    }
  };
  // Prepare data for plotting Tourist Influx graph
  const prepareTouristData = () => {
    const Total_Tourist = touristData.map((entry) => ({
      x: entry.Year,
      y: entry.Total_Tourists,
    }));

    return [{ name: "Total Tourist", data: Total_Tourist }];
  };
  const preparePopulationData = () => {
    const populationChartData = populationData.map((entry) => ({
      name: entry.Type,
      data: [entry.Past_data, entry.Current_data, entry.Future_data],
    }));

    return populationChartData;
  };

  // Prepare data for plotting Waste Generation graph
  const prepareWasteData = () => {
    const Total_Waste = wasteData.map((entry) => ({
      x: entry.Year,
      y: entry.Total_Waste_Generated,
    }));

    return [{ name: "Total Waste Generated", data: Total_Waste }];
  };

  return (
    <>
      <header
        id="header"
        className="department-header fixed-top d-flex align-items-center"
      >
        <Logo />
      </header>
      <aside id="sidebar" className="sidebar">
        
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-items">
            <span className="nav-link">
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </span>
          </li>
          <li className="nav-items">
            <span
              className="nav-link collapsed"
              data-bs-target="#data-operations-collapse"
              data-bs-toggle="collapse"
            >
              <i className="bi bi-menu-button-wide"></i>
              <span>Data Operations</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </span>
            <ul className="collapse" id="data-operations-collapse">
              <li>
                <span onClick={() => handleActionSelect("upload")}>
                  <i className="bi bi-circle"></i>
                  <span>Upload</span>
                </span>
              </li>
              <li>
                <span onClick={() => handleActionSelect("average")}>
                  <i className="bi bi-circle"></i>
                  <span>Upload Average</span>
                </span>
              </li>
              <li>
                <span onClick={() => handleActionSelect("insights")}>
                  <i className="bi bi-circle"></i>
                  <span>Upload Perspectives</span>
                </span>
              </li>

              <li>
                <span>
                  <i className="bi bi-circle"></i>
                  <span>Modify</span>
                </span>
              </li>
            </ul>
          </li>
          {departmentName === "Environment" && (
            <>
              <li className="nav-items">
                <span
                  className="nav-link collapsed"
                  data-bs-target="#charts-collapse"
                  data-bs-toggle="collapse"
                >
                  <i class="bi bi-globe-central-south-asia"></i>
                  <span>Sub Indicators</span>
                  <i className="bi bi-chevron-down ms-auto"></i>
                </span>
                <ul className="collapse" id="charts-collapse">
                  <li>
                    <span onClick={() => handleSubCategory("Aqi")}>
                      <i className="bi bi-circle"></i>
                      <span>AQI</span>
                    </span>
                  </li>
                  <li>
                    <span onClick={() => handleSubCategory("Temperature")}>
                      <i className="bi bi-circle"></i>
                      <span>Temperature</span>
                    </span>
                  </li>
                  <li>
                    <span onClick={() => handleSubCategory("Rainfall")}>
                      <i className="bi bi-circle"></i>
                      <span>Rainfall</span>
                    </span>
                  </li>
                </ul>
              </li>
            </>
          )}
        </ul>
      </aside>

      {/* Rendering file upload popup if showPopup is true */}
      {showPopup && (
        <FileUploadPopup
          onClose={() => setShowPopup(false)}
          onUpload={handleUpload}
          department={departmentName.toLowerCase()}
          action={selectedAction}
          subCategory={subCategory} // Pass the subCategory as a prop
        />
      )}
      {/* Displaying upload success/error messages */}
      {uploadSuccess && (
        <div className="upload-success-message">
          File uploaded successfully!
        </div>
      )}
      {uploadError && (
        <div className="upload-error-message">
          Error uploading file. Please try again.
        </div>
      )}
      <main id="main" className="main">
        <section className="dashboard-section">
          <div className="row">
            <div className="col-lg-9">
              <div className="pagetitle">
                {departmentName === "Environment" &&
                  ((subCategory === "Aqi" && <h4>AQI Report</h4>) ||
                    (subCategory === "Temperature" && (
                      <h4>Temperature Report</h4>
                    )) ||
                    (subCategory === "Rainfall" && <h4>Rainfall Report</h4>))}

                {departmentName !== "Environment" && (
                  <h4>{departmentName} Department</h4>
                )}
              </div>
              <div className="row">
                {departmentName === "Environment" && (
                  <>
                    {subCategory && (
                      <div className="enviro-select z-index-low">
                        <Select
                          value={selectedYear}
                          onChange={handleYearChange}
                          displayEmpty
                          className="dropdown-menu"
                          style={{
                            height: "2.5rem",
                            width: "15rem",
                            fontSize: "1.1rem",
                          }}
                        >
                          <MenuItem value="" disabled>
                            Select Year
                          </MenuItem>
                          <MenuItem value={"2023"}>2023</MenuItem>
                          <MenuItem value={"2024"}>2024</MenuItem>
                        </Select>
                        <Select
                          value={selectedMonth}
                          onChange={handleMonthChange}
                          displayEmpty
                          className="dropdown-menu"
                          style={{
                            height: "2.5rem",
                            width: "15rem",
                            fontSize: "1.1rem",
                          }}
                        >
                          <MenuItem value="" disabled>
                            Select Month
                          </MenuItem>
                          <MenuItem value="01">January</MenuItem>
                          <MenuItem value="02">February</MenuItem>
                          <MenuItem value="03">March</MenuItem>
                          <MenuItem value="04">April</MenuItem>
                          <MenuItem value="05">May</MenuItem>
                          <MenuItem value="06">June</MenuItem>
                          <MenuItem value="07">July</MenuItem>
                          <MenuItem value="08">August</MenuItem>
                          <MenuItem value="09">September</MenuItem>
                          <MenuItem value="10">October</MenuItem>
                          <MenuItem value="11">November</MenuItem>
                          <MenuItem value="12">December</MenuItem>
                        </Select>
                        <Select
                          value={selectedDate}
                          onChange={handleDateChange}
                          displayEmpty
                          className="dropdown-menu"
                          style={{
                            height: "2.5rem",
                            width: "15rem",
                            fontSize: "1.1rem",
                          }}
                        >
                          <MenuItem value="" disabled>
                            Select Date
                          </MenuItem>
                          <MenuItem value="1">1</MenuItem>
                          <MenuItem value="2">2</MenuItem>
                          <MenuItem value="3">3</MenuItem>
                          <MenuItem value="4">4</MenuItem>
                          <MenuItem value="5">5</MenuItem>
                          <MenuItem value="6">6</MenuItem>
                          <MenuItem value="7">7</MenuItem>
                          <MenuItem value="8">8</MenuItem>
                          <MenuItem value="9">9</MenuItem>
                          <MenuItem value="10">10</MenuItem>
                          <MenuItem value="11">11</MenuItem>
                          <MenuItem value="12">12</MenuItem>
                          <MenuItem value="13">13</MenuItem>
                          <MenuItem value="14">14</MenuItem>
                          <MenuItem value="15">15</MenuItem>
                          <MenuItem value="16">16</MenuItem>
                          <MenuItem value="17">17</MenuItem>
                          <MenuItem value="18">18</MenuItem>
                          <MenuItem value="19">19</MenuItem>
                          <MenuItem value="20">20</MenuItem>
                          <MenuItem value="21">21</MenuItem>
                          <MenuItem value="22">22</MenuItem>
                          <MenuItem value="23">23</MenuItem>
                          <MenuItem value="24">24</MenuItem>
                          <MenuItem value="25">25</MenuItem>
                          <MenuItem value="26">26</MenuItem>
                          <MenuItem value="27">27</MenuItem>
                          <MenuItem value="28">28</MenuItem>
                          <MenuItem value="29">29</MenuItem>
                          <MenuItem value="30">30</MenuItem>
                          <MenuItem value="31">31</MenuItem>
                        </Select>
                        <Select
                          value={selectedLocation}
                          onChange={handleLocationChange}
                          displayEmpty
                          className="dropdown-menu"
                          style={{
                            height: "2.5rem",
                            width: "25rem",
                            fontSize: "1.1rem",
                          }}
                        >
                          <MenuItem value="" disabled>
                            Select Location
                          </MenuItem>
                          <MenuItem value="Ayodhya - Civil line,Tiny tots school">
                            Zone 1
                          </MenuItem>
                          <MenuItem value="Ayodhya - Shahadat Ganj">
                            Zone 2
                          </MenuItem>
                          <MenuItem value="Ayodhya-Bank colony near Railway station">
                            Zone 3
                          </MenuItem>
                          <MenuItem value="Ayodhya-near Airport">
                            Zone 4
                          </MenuItem>
                          <MenuItem value="Ayodhya-Ranopali near Kila ayodhya">
                            Zone 5
                          </MenuItem>
                        </Select>
                      </div>
                    )}
                    {selectedYear && selectedMonth && selectedLocation && (
                      <>
                        {departmentName === "Environment" &&
                          subCategory === "Aqi" && (
                            <>
                              <>
                                <div className="col-lg-4">
                                  <div className="mini-cards">
                                    <div className="mini-cards-icon">
                                      <img src={AQI}></img>
                                      <h1>{average[0].Avg_AQI}</h1>
                                      <h3>Avg AQI </h3>
                                    </div>
                                    <div className="mini-cards-text">
                                      <h3>Outliears:{pollution.AQI}</h3>
                                      <h3>Healthy Days:{40 - pollution.AQI}</h3>
                                    </div>

                                    <div className="card-hover-info">
                                      <ul>
                                        <li>0-50 (Good)</li>
                                        <li>51-100 (Moderate)</li>
                                        <li>
                                          101-150 (Unhealthy for sensitive
                                          groups)
                                        </li>
                                        <li>151-200 (Unhealthy)</li>
                                        <li>201-300 (Very Unhealthy)</li>
                                        <li>301-500 (Hazardous)</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="mini-cards">
                                    <div className="mini-cards-icon">
                                    <img src={pm25}></img>
                                    <h1>{average[0].Avg_pm25} μg/m³</h1>
                                    <h3>Avg PM 2.5 </h3>
                                    </div>
                                    
                                    <div className="mini-cards-text">
                                      <h3>Outliears:{pollution.pm25}</h3>
                                      <h3>
                                        Healthy Days:{40 - pollution.pm25}
                                      </h3>
                                    </div>
                                    <div className="card-hover-info">
                                      <ul>
                                        <li>
                                          Safe Exposure Levels: 0-60 micro grams
                                          per cubic meter
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="mini-cards">
                                    <div className="mini-cards-icon">
                                    <img src={pm10}></img>
                                    <h1>{average[0].Avg_pm10} μg/m³</h1>
                                    <h3>Avg PM 10 </h3>
                                    </div>
                                    
                                    <div className="mini-cards-text">
                                      <h3>Outliears:{pollution.pm10}</h3>
                                      <h3>
                                        Healthy Days:{40 - pollution.pm10}
                                      </h3>
                                    </div>
                                    <div className="card-hover-info">
                                      <ul>
                                        <li>
                                          Safe Exposure Levels: 0-100 micro
                                          grams per cubic meter
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="mini-cards">
                                    <div className="mini-cards-icon">
                                    <img src={so2}></img>
                                    <h1>{average[0].Avg_so2} μg/m³</h1>
                                    <h3>Avg SO2 </h3>
                                    </div>
                                    
                                    <div className="mini-cards-text">
                                      <h3>Outliears:{pollution.so2}</h3>
                                      <h3>Healthy Days:{40 - pollution.so2}</h3>
                                    </div>
                                    <div className="card-hover-info">
                                      <ul>
                                        <li>
                                          Safe Exposure Levels: 0-80 micro grams
                                          per cubic meter
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="mini-cards">
                                    <div className="mini-cards-icon">
                                    <img src={no2}></img>
                                    <h1>{average[0].Avg_NO2} μg/m³</h1>
                                    <h3>Avg NO2 </h3>
                                      </div>
                                    
                                    <div className="mini-cards-text">
                                      <h3>Outliears:{pollution.NO2}</h3>
                                      <h3>Healthy Days:{40 - pollution.NO2}</h3>
                                    </div>
                                    <div className="card-hover-info">
                                      <ul>
                                        <li>
                                          Safe Exposure Levels: 0-80 micro grams
                                          per cubic meter
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="mini-cards">
                                    <div className="mini-cards-icon">
                                    <img src={tvoc}></img>
                                    <h1>0.68 μg/m³</h1>
                                    <h3>Avg TVOC</h3>
                                    </div>
                                    <div className="mini-cards-text">
                                      <h3>Outliears:0</h3>
                                      <h3>Healthy Days:40</h3>
                                    </div>
                                    
                                    <div className="card-hover-info">
                                      <ul>
                                        <li>
                                          Safe Exposure Levels: 0.3 to 0.5 micro
                                          grams per cubic meter
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </>
                              <>
                                <EnvironmentCharts
                                  selectedYear={selectedYear}
                                  selectedMonth={selectedMonth}
                                  selectedDate={selectedDate}
                                  selectedLocation={selectedLocation}
                                  enviroLocation={envirolocation}
                                  enviroDate={envirodate}
                                  envirotime={envirotime}
                                  enviroPM25={enviropm25}
                                  enviroPM10={enviropm10}
                                  enviroSO2={enviroso2}
                                  enviroAQI={enviroAQI}
                                  enviroNO2={enviroNO2}
                                />
                              </>
                            </>
                          )}
                        {departmentName === "Environment" &&
                          subCategory === "Temperature" && (
                            <>
                              <>
                                <div className="col-lg-6">
                                  <div className="mini-cards">
                                  <div className="mini-cards-icon">
                                    <img src={hot}></img>
                                    <h1>25.7</h1>
                                    <h3>Avg Temperature</h3>
                                    </div>
                                    <div className="mini-cards-text">
                                      <h3>Outliears:0</h3>
                                      <h3>Healthy Days:40</h3>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="mini-cards">
                                  <div className="mini-cards-icon">
                                    <img src={humid}></img>
                                    <h1>25.7</h1>
                                    <h3>Avg Humidity</h3>
                                    </div>
                                    <div className="mini-cards-text">
                                      <h3>Outliears:0</h3>
                                      <h3>Healthy Days:40</h3>
                                    </div>
                                  </div>
                                </div>
                              </>
                              <>
                                <TemperatureCharts
                                  selectedYear={selectedYear}
                                  selectedMonth={selectedMonth}
                                  selectedDate={selectedDate}
                                  selectedLocation={selectedLocation}
                                  tempLocation={templocation}
                                  tempDate={tempdate}
                                  temptime={temptime}
                                  temperature={temperature}
                                  humidity={humidity}
                                />
                              </>
                            </>
                          )}
                      </>
                    )}
                  </>
                )}

                {departmentName !== "Environment" && (
                  <>
                    <div className="col-lg-3">
                      <div className="mini-cards">
                        <h1>parameter1</h1>
                      </div>
                    </div>

                    <div className="col-lg-3">
                      <div className="mini-cards">
                        <h1>parameter2</h1>
                      </div>
                    </div>

                    <div className="col-lg-3">
                      <div className="mini-cards">
                        <h1>parameter3</h1>
                      </div>
                    </div>

                    <div className="col-lg-3">
                      <div className="mini-cards">
                        <h1>parameter4</h1>
                      </div>
                    </div>
                  </>
                )}
              </div>
              {/* Render charts based on department */}
              {departmentName === "Electricity" && (
                <div className="row">
                  {categ.map((category, index) => (
                    <div className="cols-lg-10">
                      <div className="graph">
                        <div className="graph-conatiner">
                          <div
                            key={index}
                            className={` ${showPopup || showModifyPopup ? "z-index-low" : ""}`}
                          >
                            <BarChart
                              title={category}
                              categories={[
                                "Past Consumption",
                                "Present Consumption",
                                "SDG 11 Target",
                              ]}
                              series={[
                                {
                                  name: "Past Consumption",
                                  data: [pastConsumption[index]],
                                },
                                {
                                  name: "Present Consumption",
                                  data: [presentConsumption[index]],
                                },
                                {
                                  name: "SDG 11 Target",
                                  data: [SDG11Target[index]],
                                },
                              ]}
                              height={400}
                              width={600}
                              xtitle="Year"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {departmentName === "Housing" && (
                <div className="row">
                  <div className="cols-lg-10">
                    <div className="graph">
                      <div className="graph-conatiner">
                        <div
                          className={` ${showPopup || showModifyPopup ? "z-index-low" : ""}`}
                        >
                          <BarChart
                            title="Population Data"
                            categories={[
                              "Past_Data",
                              "Present_Data",
                              "Future_Data",
                            ]}
                            series={preparePopulationData()}
                            height={400}
                            width={600}
                            xtitle="Year"
                          />
                          <div>
                            <PieChart
                              title="Population"
                              labels={["Urban Population", "Slum Population"]}
                              series={[96.185096179, 3.814903821]}
                              height={400}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {departmentName === "Tourism" && (
                <div className="row">
                  <div className="cols-lg-10">
                    <div className="graph">
                      <div className="graph-conatiner">
                        <div
                          className={` ${showPopup || showModifyPopup ? "z-index-low" : ""}`}
                        >
                          <BarChart
                            title="Tourist Poplulation (in Lakhs)"
                            categories={touristData.map((entry) => entry.Year)}
                            series={prepareTouristData()}
                            height={400}
                            width={600}
                            xtitle="Year"
                          />
                          <BarChart
                            title="Tourist Waste Generation (in MT)"
                            categories={wasteData.map((entry) => entry.Year)}
                            series={prepareWasteData()}
                            height={400}
                            width={600}
                            xtitle="Year"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {departmentName === "Transport" && (
                <div className="row">
                  {vehical.map((name, index) => (
                    <div className="cols-lg-10">
                      <div className="graph">
                        <div className="graph-conatiner">
                          <div
                            key={index}
                            className={` ${showPopup || showModifyPopup ? "z-index-low" : ""}`}
                          >
                            <BarChart
                              title={name}
                              categories={[]}
                              series={[
                                { name: "2016-2017", data: [year1[index]] },
                                { name: "2017-2018", data: [year2[index]] },
                                { name: "2018-2019", data: [year3[index]] },
                                { name: "2019-2020", data: [year4[index]] },
                                { name: "2020-2021", data: [year5[index]] },
                                { name: "2021-2022", data: [year6[index]] },
                              ]}
                              height={400}
                              width={600}
                              xtitle="Year Range"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* right side bar */}
            <div className="col-lg-3">
              <div className="insights">
                
                {departmentName === "Environment" &&
                  selectedLocation &&
                  selectedDate &&
                  selectedYear &&
                  selectedMonth &&
                  subCategory === "Aqi" && (
                    <>
                    <h1>Insights</h1>
                      <div className="insights-content">
                        {insights.map((item, index) => (
                          <div key={index}>
                            <ul className="insights-text">
                              <li>{item.Insights}</li>
                            </ul>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                {departmentName !== "Environment" && (
                  <>
                    <h1>Insights</h1>
                  </>
                )}
              </div>
              <div className="insights">
                
                {departmentName === "Environment" &&
                  selectedLocation &&
                  selectedDate &&
                  selectedYear &&
                  selectedMonth &&
                  subCategory === "Aqi" && (
                    <>
                      <div className="insights-content">
                        <h1>Recommendations</h1>
                        {insights.map((item, index) => (
                          <div key={index}>
                            <ul className="insights-text">
                              <li> {item.Recommendations}</li>
                            </ul>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                {departmentName !== "Environment" && (
                  <>
                    <h1>Recommendations</h1>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default DepartmentPage;
