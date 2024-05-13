import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DepartmentPage.css";
import FileUploadPopup from "./upload-popup/FileUploadPopup";
import { BarChart, PieChart, LineChart } from "./GraphVisuals";
import Logo from "./HeaderLogo";
import { Select, MenuItem } from "@mui/material";
import EnvironmentCharts from "./EnvironmnetCharts";
import AQI from "./images/AQI.png";
import co2 from "./images/carbon-dioxide.png";
import no2 from "./images/No-2.png";
import pm25 from "./images/pm2.5.png";
import pm10 from "./images/pm10.png";
import so2 from "./images/SO-2.png";
import TemperatureCharts from "./TemperatureCharts";
import hot from "./images/hot.png";
import humid from "./images/hum.png";
import RainFallCharts from "./RainFallCharts";
import rain from "./images/rainfall.png";
import slum from "./images/slum.png";
import pop from "./images/pop.png";
import increase_pop from "./images/increase-pop.png";
import land_use from "./images/land-use.png";
import road from "./images/intersection.png";
import traffic from "./images/traffic-jam.png";
import accident from "./images/accident.png";
import peak_time from "./images/future.png";
import tourist from "./images/traveler.png";
import waste from "./images/food-waste.png";
import AqiReport from "./Environment/AqiReport";
import AQIChart from "./Environment/AQIChart";


//import icons
import "bootstrap-icons/font/bootstrap-icons.css";
import "remixicon/fonts/remixicon.css";
//import BootStrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import zIndex from "@mui/material/styles/zIndex";
import AqiMap from "./Environment/Maps/AqiMap";
const DepartmentPage = ({ departmentName, apiUrl, uploadUrl }) => {
  // State variables and useEffect for data fetching, file upload, etc.
  const [showPopup, setShowPopup] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [categ, setCateg] = useState([]);
  const [showModifyPopup, setShowModifyPopup] = useState(false);
  const [touristData, setTouristData] = useState([]);
  const [wasteData, setWasteData] = useState([]);
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
  const [enviroco2, setEnviroco2] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
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
  const [rainData, setRainData] = useState("");
  const [sexRatio, setSexRatio] = useState("");
  const [socioCulture, setSocioCulture] = useState("");
  const [crimeData, setCrimeData] = useState("");
  const [educationData, setEducationData] = useState("");
  const [healthData, setHealthData] = useState("");
  const [doctorData, setDoctorData] = useState("");

  const handleSubCategory = (subCategory) => {
    setSubCategory(subCategory);
  };

  const handleActionSelect = (action) => {
    setSelectedAction(action);
    setShowPopup(true);
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
        setCateg(data);
      } else if (departmentName === "Tourism") {
        const touristResponse = await axios.get(apiUrl);
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
        const co2 = [];
        data.forEach((item) => {
          location.push(item.location);
          timeStamp.push(item.timeStamp);
          time.push(item.time);
          const dateObj = new Date(item.date);
          const year = dateObj.getFullYear();
          const month = dateObj.getMonth() + 1;
          const day = dateObj.getDate();
          const formatted = `${day}-${
            month < 10 ? "0" + month : month
          }-${year}`;
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
        console.log(formattedTime);
        setEnviroLocation(location);
        setEnviroTimeStamp(timeStamp);
        setEnviroTime(formattedTime);
        setEnviroDate(formattedDate);
        setEnviroPM25(pm25);
        setEnviroPM10(pm10);
        setEnviroSO2(so2);
        setEnviroAQI(AQI);
        setEnviroNO2(NO2);
        setEnviroco2(co2);
        const dateCounts = {};
        data.forEach((item) => {
          const dObj = new Date(item.date);
          const y = dObj.getFullYear();
          const m = dObj.getMonth() + 1;
          const d = dObj.getDate();
          const fDate = `${d}-${m < 10 ? "0" + m : m}-${y}`;
          if (!dateCounts[fDate]) {
            dateCounts[fDate] = {
              AQI: 0,
              pm25: 0,
              pm10: 0,
              so2: 0,
              NO2: 0,
              co2: 0,
            };
          }
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
          if (item.co2 > 80) {
            dateCounts[fDate].co2++;
          }
        });

        const pollutantCounts = {
          AQI: 0,
          pm25: 0,
          pm10: 0,
          so2: 0,
          NO2: 0,
          co2: 0,
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
          if (dateCounts[date].co2 > 0) {
            pollutantCounts.co2++;
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
          const month = dateObj.getMonth() + 1;
          const day = dateObj.getDate();
          const formatted = `${day}-${
            month < 10 ? "0" + month : month
          }-${year}`;
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
        const rain_response = await axios.get(apiUrl + "/rainfall");
        const rData = [];
        rain_response.data.data.forEach((item) => {
          rData.push(item);
        });
        setRainData(rData);
      }
      const sex_ratio_response = await axios.get(apiUrl);
      setSexRatio(sex_ratio_response.data.data);
      console.log(sex_ratio_response.data);
      const socio_culture_response = await axios.get(apiUrl);
      setSocioCulture(socio_culture_response.data.data);
      const crime_response = await axios.get(apiUrl);
      setCrimeData(crime_response.data.data);
      console.log(crime_response.data.data);
      const health_response = await axios.get(apiUrl);
      setHealthData(health_response.data.data);
      const doctor_response = await axios.get(apiUrl + "/doctors");
      setDoctorData(doctor_response.data.data);
      const education_response = await axios.get(apiUrl);
      setEducationData(education_response.data.data);
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

  const preparePopulationData = () => {
    const populationChartData = populationData.map((entry) => ({
      name: entry.Type,
      data: [
        (entry.Past_data / 100000).toFixed(2),
        (entry.Current_data / 100000).toFixed(2),
        (entry.Future_data / 100000).toFixed(2),
      ],
    }));

    return populationChartData;
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
          {departmentName === "Health" && (
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
                    <span onClick={() => handleSubCategory("health")}>
                      <i className="bi bi-circle"></i>
                      <span>Health</span>
                    </span>
                  </li>
                  <li>
                    <span onClick={() => handleSubCategory("doctors")}>
                      <i className="bi bi-circle"></i>
                      <span>Doctors</span>
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
          subCategory={
            subCategory.length > 0 ? subCategory : departmentName.toLowerCase()
          }
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
                {subCategory.length > 0 && (
                  <h4>{subCategory.toLocaleUpperCase()} Report</h4>
                )}
                {subCategory.length === 0 && (
                  <h4>{departmentName} Department</h4>
                )}
              </div>
              <div className="row">
                {departmentName === "Environment" && (
                  <>
                    {subCategory && (
                      <div className="enviro-select z-index-low">
                        {(
                          subCategory === "Temperature" ||
                          subCategory === "Rainfall") && (
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
                            <MenuItem value={"2017"}>2017</MenuItem>
                            <MenuItem value={"2018"}>2018</MenuItem>
                            <MenuItem value={"2019"}>2019</MenuItem>
                            <MenuItem value={"2020"}>2020</MenuItem>
                            <MenuItem value={"2021"}>2021</MenuItem>
                            <MenuItem value={"2022"}>2022</MenuItem>
                            <MenuItem value={"2023"}>2023</MenuItem>
                            <MenuItem value={"2024"}>2024</MenuItem>
                          </Select>
                        )}

                        {(
                          subCategory === "Temperature") && (
                          <>
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
                          </>
                        )}
                      </div>
                    )}
                    {departmentName === "Environment" && (
                      <>
                        {
                          subCategory === "Aqi" && (
                            <>
                            <AqiReport/>
                              {average.length > 0 && (
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
                                        <h3>
                                          Healthy Days:{40 - pollution.AQI}
                                        </h3>
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
                                            Safe Exposure Levels: 0-60 micro
                                            grams per cubic meter
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
                                        <h3>
                                          Healthy Days:{40 - pollution.so2}
                                        </h3>
                                      </div>
                                      <div className="card-hover-info">
                                        <ul>
                                          <li>
                                            Safe Exposure Levels: 0-80 micro
                                            grams per cubic meter
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
                                        <h3>
                                          Healthy Days:{40 - pollution.NO2}
                                        </h3>
                                      </div>
                                      <div className="card-hover-info">
                                        <ul>
                                          <li>
                                            Safe Exposure Levels: 0-80 micro
                                            grams per cubic meter
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-4">
                                    <div className="mini-cards">
                                      <div className="mini-cards-icon">
                                        <img src={co2}></img>
                                        <h1>561 ppm</h1>
                                        <h3>Avg CO2</h3>
                                      </div>
                                      <div className="mini-cards-text">
                                        <h3>Outliears:0</h3>
                                        <h3>Healthy Days:40</h3>
                                      </div>

                                      <div className="card-hover-info">
                                        <ul>
                                          <li>
                                            Safe Exposure Levels: 0.3 to 0.5
                                            micro grams per cubic meter
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    
                                  </div>
                                  <>
                                    <AQIChart envirolocation={envirolocation} enviroDate={envirodate} envirotime={envirotime} enviroPM25={enviropm25} enviroPM10={enviropm10} enviroSO2={enviroso2} enviroNO2={enviroNO2} enviroco2={enviroco2} enviroAQI={enviroAQI}/>
                                    </>
                                </>
                              )}

                            </>
                          )}
                        {selectedYear &&
                          selectedMonth &&
                          selectedDate &&
                          selectedLocation &&
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
                        {selectedYear && subCategory === "Rainfall" && (
                          <>
                            <>
                              <div className="col-lg-6">
                                <div className="mini-cards">
                                  <div className="mini-cards-icon">
                                    <img src={rain}></img>
                                    <h1>25.7</h1>
                                    <h3>Avg Actual Rainfall</h3>
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
                                    <img src={rain}></img>
                                    <h1>25.7</h1>
                                    <h3>Avg Normal Rainfall</h3>
                                  </div>
                                  <div className="mini-cards-text">
                                    <h3>Outliears:0</h3>
                                    <h3>Healthy Days:40</h3>
                                  </div>
                                </div>
                              </div>
                            </>
                            <>
                              <RainFallCharts
                                selectedYear={selectedYear}
                                rainData={rainData}
                              />
                            </>
                          </>
                        )}
                      </>
                    )}
                    
                  </>
                )}
                {departmentName === "Housing" && (
                  <>
                    <div className="col-lg-3">
                      <div className="mini-cards">
                        <div className="mini-cards-icon">
                          <img src={pop}></img>
                          <h1>672861</h1>
                          <h3>Current Population</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="mini-cards">
                        <div className="mini-cards-icon">
                          <img src={increase_pop}></img>
                          <h1>69.84%</h1>
                          <h3>Projected population increase by 2031</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="mini-cards">
                        <div className="mini-cards-icon">
                          <img src={land_use}></img>
                          <h1>2841.37 ha</h1>
                          <h3>Land consumption projected by 2031</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="mini-cards">
                        <div className="mini-cards-icon">
                          <img src={slum}></img>
                          <h1>41</h1>
                          <h3>Identified Slum sites</h3>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {departmentName === "Transport" && (
                  <>
                    <div className="col-lg-3">
                      <div className="mini-cards">
                        <div className="mini-cards-icon">
                          <img src={land_use}></img>
                          <h1>18.2%</h1>
                          <h3>Current use of proposed land in transport</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="mini-cards">
                        <div className="mini-cards-icon">
                          <img src={accident}></img>
                          <h1>50.8%</h1>
                          <h3>Decrease in Road Accidents</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="mini-cards">
                        <div className="mini-cards-icon">
                          <img src={road}></img>
                          <h1>63% good</h1>
                          <h3>Road condition</h3>
                        </div>
                        <div className="card-hover-info" style={{zIndex:1000}}>
                        <PieChart
                              title="Road Condition"
                              labels={["Good", "Average", "Poor"]}
                              series={[63, 24.9, 12.1]}
                              height={300}
                            />
              
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="mini-cards">
                        <div className="mini-cards-icon">
                          <img src={traffic}></img>
                          <h1>30</h1>
                          <h3>Number of traffic jam points</h3>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {departmentName === "Tourism" && (
                  <>
                    <div className="col-lg-3">
                      <div className="mini-cards">
                        <div className="mini-cards-icon">
                          <img src={increase_pop}></img>
                          <h1>215%</h1>
                          <h3>Increase in Tourist</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="mini-cards">
                        <div className="mini-cards-icon">
                          <img src={waste}></img>
                          <h1>25%</h1>
                          <h3>Increase in Waste</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="mini-cards">
                        <div className="mini-cards-icon">
                          <img src={tourist}></img>
                          <h1>2.01%</h1>
                          <h3>Percentage Foreign tourist share with state </h3>
                        </div>
                        
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="mini-cards">
                        <div className="mini-cards-icon">
                          <img src={peak_time}></img>
                          <h1>3</h1>
                          <h3>Peak Seasons</h3>
                        </div>
                        <div className="card-hover-info" style={{zIndex:1000}}>
                          <ul>
                            <li>September to April</li>
                            <li>Ram navami mela</li>
                            <li>Parikramas</li>
                          </ul>
              
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {departmentName !== "Environment" &&
                  departmentName !== "Electricity" &&
                  departmentName !== "Sex-Ratio" &&
                  departmentName !== "Socio-Cultural-Activities" &&
                  departmentName !== "Crime" &&
                  departmentName !== "Health" &&
                  departmentName !== "Education" &&
                  departmentName !== "Housing" &&
                  departmentName !== "Transport" && departmentName!=="Tourism"&&(
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
              {departmentName === "Electricity" && categ.length > 0 && (
                <div className="row">
                  <div className="cols-lg-10">
                    <div className="graph">
                      <div className="graph-container">
                        <div
                          className={`${
                            showPopup || showModifyPopup ? "z-index-low" : ""
                          }`}
                        >
                          <BarChart
                            title={"Number of Connections"}
                            categories={categ.map((item) => item.Type)}
                            series={categ.map((item) => ({
                              name: item.Type,
                              data: [item.No_of_Connections],
                            }))}
                            height={400}
                            width={500}
                            xtitle=""
                          />
                          <BarChart
                            title={"Electricity Consumption in KWH"}
                            categories={categ.map((item) => item.Type)}
                            series={categ.map((item) => ({
                              name: item.Type,
                              data: [item.Electric_Consumption],
                            }))}
                            height={400}
                            width={700}
                            xtitle=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {departmentName === "Sex-Ratio" && sexRatio.length > 0 && (
                <div className="row">
                  {Object.keys(sexRatio).map((key, index) => {
                    const { Title, Ayodhya, India } = sexRatio[key];

                    return (
                      <div key={index} className="cols-lg-10">
                        <div className="graph">
                          <div className="graph-container">
                            <div
                              className={
                                showPopup || showModifyPopup
                                  ? "z-index-low"
                                  : ""
                              }
                            >
                              <BarChart
                                title={Title}
                                categories={["Location"]}
                                series={[
                                  {
                                    name: "Ayodhya",
                                    data: [Ayodhya],
                                  },
                                  {
                                    name: "India",
                                    data: [India],
                                  },
                                ]}
                                height={400}
                                width={500}
                                xtitle="Location"
                                ytitle={
                                  Title === "Number of Females /1000 males"
                                    ? "Number of Females"
                                    : "Female Participation Rate"
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              {departmentName === "Crime" && (
                <div className="row">
                  <div className="cols-lg-10">
                    <div className="graph">
                      <div className="graph-container">
                        <div
                          className={`${
                            showPopup || showModifyPopup ? "z-index-low" : ""
                          }`}
                        >
                          {crimeData.length > 0 && (
                            <BarChart
                              title={crimeData.map((item) => item.Title)}
                              categories={["Value"]}
                              series={[
                                {
                                  name: "Target Value",
                                  data: crimeData.map(
                                    (item) => item.Target_Value
                                  ),
                                },
                                {
                                  name: "Current Value",
                                  data: crimeData.map(
                                    (item) => item.Current_Value
                                  ),
                                },
                              ]}
                              height={400}
                              width={500}
                              xtitle=""
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {departmentName === "Health" && (
                <div className="row">
                  {Object.keys(healthData).map((key, index) => {
                    const { Title, Current_Value, Target_Value } =
                      healthData[key];

                    return (
                      <div key={index} className="cols-lg-10">
                        <div className="graph">
                          <div className="graph-container">
                            <div
                              className={
                                showPopup || showModifyPopup
                                  ? "z-index-low"
                                  : ""
                              }
                            >
                              <BarChart
                                title={Title}
                                categories={["Current Value", "Target Value"]}
                                series={[
                                  {
                                    name: "Value",
                                    data: [Current_Value, Target_Value],
                                  },
                                ]}
                                height={400}
                                width={500}
                                xtitle=""
                                ytitle={
                                  Title ===
                                  "Number of  physicians, nurses and midwives/1 lakh population"
                                    ? "Number of  physicians, nurses and midwives/1 lakh population"
                                    : "Number of Patients/doctor"
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {doctorData.length > 0 && (
                    <>
                      <div className="cols-lg-10">
                        <div className="graph">
                          <div className="graph-container">
                            <div
                              className={
                                showPopup || showModifyPopup
                                  ? "z-index-low"
                                  : ""
                              }
                            >
                              <BarChart
                                title={"Birth and Death Rate"}
                                categories={doctorData.map((item) => item.Year)}
                                series={[
                                  {
                                    name: "Birth",
                                    data: doctorData.map((item) => item.Birth),
                                  },
                                  {
                                    name: "Death",
                                    data: doctorData.map((item) => item.Death),
                                  },
                                ]}
                                height={400}
                                width={500}
                                xtitle=""
                                ytitle="Number of Birth/Death"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="cols-lg-10">
                        <div className="graph">
                          <div className="graph-container">
                            <div
                              className={
                                showPopup || showModifyPopup
                                  ? "z-index-low"
                                  : ""
                              }
                            >
                              <LineChart
                                title={"Number of cases of various diseases"}
                                categories={doctorData.map((item) => item.Year)}
                                series={[
                                  {
                                    name: "Malaria",
                                    data: doctorData.map(
                                      (item) => item.Malaria
                                    ),
                                  },
                                  {
                                    name: "J.E.",
                                    data: doctorData.map((item) => item.JE),
                                  },
                                  {
                                    name: "A.E.S.",
                                    data: doctorData.map((item) => item.AES),
                                  },
                                  {
                                    name: "Dengue",
                                    data: doctorData.map((item) => item.Dengue),
                                  },
                                  {
                                    name: "Chikengunia",
                                    data: doctorData.map(
                                      (item) => item.Chikengunia
                                    ),
                                  },
                                ]}
                                height={400}
                                width={500}
                                xtitle=""
                                ytitle="Number of Cases"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
              {departmentName === "Education" && (
                <div className="row">
                  <div className="cols-lg-10">
                    <div className="graph">
                      <div className="graph-container">
                        <div
                          className={`${
                            showPopup || showModifyPopup ? "z-index-low" : ""
                          }`}
                        >
                          {educationData.length > 0 && (
                            <BarChart
                              title={educationData.map((item) => item.Title)}
                              categories={["Value"]}
                              series={[
                                {
                                  name: "Target Value",
                                  data: educationData.map(
                                    (item) => item.Target_Value
                                  ),
                                },
                                {
                                  name: "Current Value",
                                  data: educationData.map(
                                    (item) => item.Current_Value
                                  ),
                                },
                              ]}
                              height={400}
                              width={500}
                              xtitle=""
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {departmentName === "Socio-Cultural-Activities" && (
                <div className="row">
                  <div className="cols-lg-10">
                    <div className="graph">
                      <div className="graph-container">
                        <div
                          className={`${
                            showPopup || showModifyPopup ? "z-index-low" : ""
                          }`}
                        >
                          {socioCulture.length > 0 && (
                            <BarChart
                              title={"Population served Per Unit Area"}
                              categories={socioCulture.map(
                                (item) => item.Category
                              )}
                              series={[
                                {
                                  name: "Population served Per Unit Area",
                                  data: socioCulture.map(
                                    (item) => item.Population
                                  ),
                                },
                              ]}
                              height={400}
                              width={500}
                              xtitle=""
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {departmentName === "Housing" && (
                <div className="main-graph">
                  <div className="graph-big">
                    <div className="graph">
                      <div className="graph-conatiner">
                        <div
                          className={` ${
                            showPopup || showModifyPopup ? "z-index-low" : ""
                          }`}
                        >
                          <BarChart
                            title="Population Data"
                            categories={[
                              "Past Data(2011)",
                              "Present Data",
                              "Future Data(2026)",
                            ]}
                            series={preparePopulationData()}
                            height={400}
                            width={500}
                            xtitle="Year"
                            ytitle="Population (in Lakhs)"
                          />
                          <div>
                            <PieChart
                              title="Population"
                              labels={["Urban Population", "Slum Population"]}
                              series={[672861, 45554]}
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
                <div className="main-graph">
                  <div className="graph-big">
                    <div className="graph">
                      <div className="graph-conatiner">
                        <div
                          className={` ${
                            showPopup || showModifyPopup ? "z-index-low" : ""
                          }`}
                        >
                          <LineChart
                            title={"Tourist Population in Lakhs"}
                            categories={touristData.map((item) =>
                              item.Year.toString()
                            )}
                            series={[
                              {
                                name: "Tourist Population in Lakhs",
                                data: touristData.map(
                                  (item) => item.Total_Tourists
                                ),
                              },
                            ]}
                            height={400}
                            width={500}
                            xtitle="Year"
                            ytitle="Population"
                          />
                          <LineChart
                            title={"Tourist Waste Generation in MT"}
                            categories={wasteData.map((item) =>
                              item.Year.toString()
                            )}
                            series={[
                              {
                                name: "Tourist Waste Generated",
                                data: wasteData.map(
                                  (item) => item.Total_Waste_Generated
                                ),
                              },
                            ]}
                            height={400}
                            width={500}
                            xtitle="Year"
                            ytitle="Waste Generated"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {departmentName === "Transport" && (
                <div className="main-graph">
                  {vehical.map((name, index) => (
                    <div className="graph-big">
                      <div className="graph">
                        <div className="graph-container">
                          <div
                            key={index}
                            className={` ${
                              showPopup || showModifyPopup ? "z-index-low" : ""
                            }`}
                          >
                            <LineChart
                              title={name}
                              categories={[
                                "2016-2017",
                                "2017-2018",
                                "2018-2019",
                                "2019-2020",
                                "2020-2021",
                                "2021-2022",
                              ]}
                              series={[
                                {
                                  name: "Number",
                                  data: [
                                    year1[index],
                                    year2[index],
                                    year3[index],
                                    year4[index],
                                    year5[index],
                                    year6[index],
                                  ],
                                },
                              ]}
                              height={300}
                              xtitle="Year Range"
                              ytitle="Number"
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
            {departmentName !== "Electricity" &&
              departmentName !== "Sex-Ratio" &&
              departmentName !== "Socio-Cultural-Activities" &&
              departmentName !== "Crime" &&
              departmentName !== "Health" &&
              departmentName !== "Education" &&
              departmentName !=="Tourism"&& (
                <>
                  <div className="col-lg-3">
                    <div className="insights">
                      {departmentName ==="Transport" && (
                        <>
                        <h2>Share of Electric Vehicles</h2>
                        <div className="insights-content"> 
                        
                               <PieChart
                              title=""
                              labels={["Three Wheeler", "e-Rickshaw", "e-Rickshaw with cart"]}
                              series={[180,6600,189]}
                              height={400}
                            />
                        </div>
                      </>

                      )}
                      {departmentName === "Environment" &&
                       
                        subCategory === "Aqi" && (
                          <>
                            <h1>Insights</h1>
                            <div className="insights-content">
                              {insights.length > 0 &&
                                insights.map((item, index) => (
                                  <div key={index}>
                                    <ul className="insights-text">
                                      <li>{item.Insights}</li>
                                    </ul>
                                  </div>
                                ))}
                            </div>
                          </>
                        )}
                      {departmentName !== "Environment" &&
                        departmentName !== "Electricity" &&
                        departmentName !== "Sex-Ratio" &&
                        departmentName !== "Socio-Cultural-Activities" &&
                        departmentName !== "Crime" &&
                        departmentName !== "Health" &&
                        departmentName !== "Education" &&
                        departmentName !=="Transport" && (
                          <>
                            <h1>Insights</h1>
                          </>
                        )}
                    </div>
                    {departmentName !=="Transport" && (
                      <div className="insights">
                      {departmentName === "Environment" &&
                        insights.length > 0 &&
                        
                        subCategory === "Aqi" && (
                          <>
                            <div className="insights-content">
                              <h1>Recommendations</h1>
                              {insights.length > 0 &&
                                insights.map((item, index) => (
                                  <div key={index}>
                                    <ul className="insights-text">
                                      <li> {item.Recommendations}</li>
                                    </ul>
                                  </div>
                                ))}
                            </div>
                          </>
                        )}
                      {departmentName !== "Environment" &&
                        departmentName !== "Electricity" &&
                        departmentName !== "Sex-Ratio" &&
                        departmentName !== "Socio-Cultural-Activities" &&
                        departmentName !== "Crime" &&
                        departmentName !== "Health" && 
                        departmentName !== "Education"
                        && (
                          <>
                            <h1>Recommendations</h1>
                          </>
                        )}
                    </div>
                    )}
                    
                  </div>
                </>
              )}
          </div>
        </section>
      </main>
    </>
  );
};

export default DepartmentPage;
