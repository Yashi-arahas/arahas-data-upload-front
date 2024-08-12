import React, { useState } from "react";
import {
  ExitToApp,
  Dashboard,
  Assessment,
  EmojiObjects,
  Apartment,
  People,
  AccountBalance,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  Spa,
} from "@mui/icons-material";
import "./CityHeader.css";
import CompanyLogo from "./images/arahas-logo.webp";
import { TabView, TabPanel } from "primereact/tabview";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import SidebarDivider from "./SidebarDivider";
import Admin from "./Admin"; // Import the Admin component
import ReportMap from "./ReportMap"; // Import the ReportMap component
import VillaIcon from "@mui/icons-material/Villa";
import bg_video from "./images/bg_video_csi.mp4";
import ReportPrint from "./ReportPrint";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import GenerateCityReport from "./GenerateCityReport";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import AqiDashboard from "./DashBoards/AqiDashboard";
import AQIRecommendations from "./DashBoards/Recommendations/AQIRecommendations";
import GenerateAqiReport from "./DashBoards/GenerateAQIReport";

function CityHeader({ pageName }) {
  const [expandedSection, setExpandedSection] = useState(null); // State to track expanded section
  const [activeSubTab, setActiveSubTab] = useState(""); // State to track active sub-tab
  const [showAdminComponent, setShowAdminComponent] = useState(false); // State to control Admin component visibility
  const [showReportMap, setShowReportMap] = useState(false); // State to control ReportMap visibility
  const [selectedParameter, setSelectedParameter] = useState(null); // State to track the selected parameter
  const [aqiValue, setAqiValue] = useState(null);
  const [pm25Value, setPM25Value] = useState(null);
  const [pm10Value, setPM10Value] = useState(null);

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
      setActiveSubTab("");
    }
  };

  const handleTabClick = (tab, parameter = null) => {
    if (expandedSection !== null) {
      setActiveSubTab("");
    }

    setActiveSubTab(tab);
    setSelectedParameter(parameter); // Set the selected parameter

    // Toggle Admin component visibility based on tab selection
    if (tab === "cityReportCard") {
      setShowAdminComponent(true); // Show Admin component when dashboard tab is clicked
    } else {
      setShowAdminComponent(false); // Hide Admin component for other tabs
    }

    // Toggle ReportMap visibility based on tab selection
    if (expandedSection === "environment" && tab === "report") {
      setShowReportMap(true); // Show ReportMap component when report tab is clicked
    } else {
      setShowReportMap(false); // Hide ReportMap component for other tabs
    }

    // Collapse the sidebar after selecting a sub-item
    setExpandedSection(null);
  };
  const handleAqiData = (data) => {
    setAqiValue(data.aqiValue);
    setPM25Value(data.pm25Value);
    setPM10Value(data.pm10Value);
  };
  // Render Admin component or ReportMap component based on conditions
  const renderTabContent = () => {
    if (showReportMap) {
      return (
        <div style={{ 
          marginLeft: "6rem"
           }}>
          <TabView className="w-full ">
            <TabPanel
              header="Performance"
              className="m-0 "
              headerClassName="text-teal-600"
            >
              {selectedParameter==="aqi" && (
                <>
                
                <AqiDashboard onDataChange={handleAqiData} show={true} />
                
                </>
              )}
               {selectedParameter!=="aqi" && (
                <ReportMap parameter={selectedParameter} />
              )}
              
            </TabPanel>
            <TabPanel
              header="Recommendations"
              className="m-0 "
              headerClassName="text-teal-600"
            >
              {selectedParameter==="aqi" && (
                <>
                <AQIRecommendations
                    aqi={aqiValue}
                    pm25={pm25Value}
                    pm10={pm10Value}
                  />
                </>
              )}
            </TabPanel>

            <TabPanel
              header="Report"
              headerClassName="text-green-500"
            >
              {selectedParameter==="aqi" && (
                <>
                <GenerateAqiReport/>
                </>
              )}
            </TabPanel>
          </TabView>
        </div>
      );
    } else if (!expandedSection && !activeSubTab) {
      // Show the video when no subcategory is selected
      return (
        <div className="video-container">
          <video src={bg_video} className="video-bg" autoPlay loop muted />
        </div>
      );
    }
  };

  // Render Admin component only when expandedSection is "cityReportCard" and activeSubTab is "dashboard"
  const renderAdminComponent = () => {
    if (showAdminComponent) {
      return (
        <div style={{ marginLeft: "6vw",  backgroundColor:"white"}}>
          <TabView className="w-full p-1">
            <TabPanel
              header="Performance"
              className="m-0 "
              headerClassName="text-teal-600"
            >
              <Admin />
            </TabPanel>
            <TabPanel
              header="Recommendations"
              className="m-0 "
              headerClassName="text-teal-600"
            >
              <ul>
                <li>
                  Extremely high levels of PM2.5 and PM10 were recorded in areas
                  like Ranopali Kila Road and near the airport in Ayodhya on
                  January 29, 2024. These levels exceeded 900 for PM2.5 and
                  touched 1000 for PM10, indicating an "extremely hazardous" air
                  quality condition. Limit outdoor activities as much as
                  possible, especially for sensitive groups like children and
                  elderly. Such concentrations of particulate matter pose
                  immediate health risks to vulnerable group exacerbating
                  respiratory conditions such as asthma and bronchitis.
                </li>
                <li>
                  Invest in alternative water sources such as rainwater
                  harvesting, desalination, and wastewater recycling. Implement
                  stringent regulations to prevent industrial, agricultural, and
                  domestic pollution of water sources.
                </li>
                <li>
                  Develop a Digital Waste Tracking System. Maintain a current
                  inventory of hazardous materials employed within work areas.
                </li>
              </ul>
            </TabPanel>

            <TabPanel header="Report" headerClassName="text-green-500">
              <GenerateCityReport />
            </TabPanel>
          </TabView>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className={`head-sidebar ${expandedSection ? "expanded" : ""}`}>
        <img
          src={CompanyLogo}
          alt="Arhas Technologies Logo"
          className="company-logo"
        />
        <div className="nav-container">
          <nav className="nav-ul">
            {/* First part of the sidebar */}
            <div
              className={`nav-section ${
                expandedSection === "cityReportCard" ? "city-active" : ""
              }`}
            >
              <div
                className="nav-section-header"
                onClick={() => handleTabClick("cityReportCard")}
              >
                <Apartment className="icon-section" />
                <span>City Report Card</span>
              </div>
            </div>

            <div
              className={`nav-section ${
                expandedSection === "environment" ? "city-active" : ""
              }`}
            >
              <div
                className="nav-section-header"
                onClick={() => toggleSection("environment")}
              >
                <Spa className="icon-section" />
                <span>Nature</span>
              </div>
            </div>

            <div
              className={`nav-section ${
                expandedSection === "social" ? "city-active" : ""
              }`}
            >
              <div
                className="nav-section-header"
                onClick={() => toggleSection("social")}
              >
                <People className="icon-section" />
                <span>Social</span>
              </div>
            </div>

            <div
              className={`nav-section ${
                expandedSection === "administration" ? "city-active" : ""
              }`}
            >
              <div
                className="nav-section-header"
                onClick={() => toggleSection("administration")}
              >
                <AccountBalance className="icon-section" />
                <span>Administration</span>
              </div>
            </div>

            {/* <ReportPrint /> */}
          </nav>
          {expandedSection && <SidebarDivider />}

          {/* Second part of the sidebar */}
          <nav className="second-nav">
            {expandedSection === "environment" && (
              <div className="sub-items">
                <div
                  className={`link ${
                    activeSubTab === "aqi" ? "sub-active" : ""
                  }`}
                  onClick={() => handleTabClick("report", "aqi")}
                >
                  <AirOutlinedIcon className="icon-sub" />
                  <span>AQI</span>
                </div>
                <div
                  className={`link ${
                    activeSubTab === "temp" ? "sub-active" : ""
                  }`}
                  onClick={() => handleTabClick("report", "temp")}
                >
                  <ThermostatIcon className="icon-sub" />
                  <span>Temperature</span>
                </div>
                <div
                  className={`link ${
                    activeSubTab === "rain" ? "sub-active" : ""
                  }`}
                  onClick={() => handleTabClick("report", "rainfall")}
                >
                  <ThunderstormIcon className="icon-sub" />

                  <span>Rainfall</span>
                </div>
                <div
                  className={`link ${
                    activeSubTab === "waste" ? "sub-active" : ""
                  }`}
                  onClick={() => handleTabClick("report", "waste")}
                >
                  <DeleteSweepIcon className="icon-sub" />
                  <span>Waste Management</span>
                </div>
                <div
                  className={`link ${
                    activeSubTab === "water" ? "sub-active" : ""
                  }`}
                  onClick={() => handleTabClick("report", "water")}
                >
                  <WaterDropIcon className="icon-sub" />
                  <span>Water Conservation & Preservation</span>
                </div>
                <div
                  className={`link ${
                    activeSubTab === "land" ? "sub-active" : ""
                  }`}
                  onClick={() => handleTabClick("report", "land")}
                >
                  <VillaIcon className="icon-sub" />
                  <span>Land Usage</span>
                </div>
              </div>
            )}
            {expandedSection === "social" && (
              <div className="sub-items">
                <div
                  className={`link ${
                    activeSubTab === "dashboard" ? "sub-active" : ""
                  }`}
                  onClick={() => handleTabClick("dashboard")}
                >
                  <Dashboard className="icon-sub" />
                  <span>Dashboard</span>
                </div>
                <div
                  className={`link ${
                    activeSubTab === "report" ? "sub-active" : ""
                  }`}
                  onClick={() => handleTabClick("report")}
                >
                  <Assessment className="icon-sub" />
                  <span>Report</span>
                </div>
                <div
                  className={`link ${
                    activeSubTab === "recommendations" ? "sub-active" : ""
                  }`}
                  onClick={() => handleTabClick("recommendations")}
                >
                  <EmojiObjects className="icon-sub" />
                  <span>Recommendations</span>
                </div>
              </div>
            )}
            {expandedSection === "administration" && (
              <div className="sub-items">
                <div
                  className={`link ${
                    activeSubTab === "dashboard" ? "sub-active" : ""
                  }`}
                  onClick={() => handleTabClick("dashboard")}
                >
                  <Dashboard className="icon-sub" />
                  <span>Dashboard</span>
                </div>
                <div
                  className={`link ${
                    activeSubTab === "report" ? "sub-active" : ""
                  }`}
                  onClick={() => handleTabClick("report")}
                >
                  <Assessment className="icon-sub" />
                  <span>Report</span>
                </div>
                <div
                  className={`link ${
                    activeSubTab === "recommendations" ? "sub-active" : ""
                  }`}
                  onClick={() => handleTabClick("recommendations")}
                >
                  <EmojiObjects className="icon-sub" />
                  <span>Recommendations</span>
                </div>
              </div>
            )}
          </nav>
        </div>
        {/* Collapse arrow */}
        <div className="collapse-arrow">
          {expandedSection ? (
            <KeyboardDoubleArrowLeft
              onClick={() => {
                setExpandedSection(null);
                // Retain the active tab and do not reset showReportMap
              }}
              style={{ backgroundColor: "#A9F3E0", borderRadius: "5px" }}
            />
          ) : (
            <KeyboardDoubleArrowRight
              onClick={() => {
                setShowReportMap(false); // Hide ReportMap when expanding sidebar
              }}
              style={{ backgroundColor: "#A9F3E0", borderRadius: "5px" }}
            />
          )}
        </div>
      </div>
      {/* Render Admin component or ReportMap component based on conditions */}
      {renderAdminComponent()}
      {renderTabContent()}
    </>
  );
}

export default CityHeader;
