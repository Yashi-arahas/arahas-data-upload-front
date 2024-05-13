import React, { useState } from "react";
import { Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

import "./Admin.css";
import governance from "./images/governace.png";
import environmental from "./images/environmental.png";
import social from "./images/social.png";
import score from "./images/score.png";
import report from "./images/report.png";

const Admin = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [environmentalIndicator, setEnvironmentalIndicator] = useState("");
  const [socialIndicator, setSocialIndicator] = useState("");
  const [governanceIndicator, setGovernanceIndicator] = useState("");

  const [selectedIndicatorDateRange, setSelectedIndicatorDateRange] =
    useState("");
  const history = useNavigate();

  const [showEnvironmentalIndicators, setShowEnvironmentalIndicators] =
    useState(false);
  const [showSocialIndicators, setShowSocialIndicators] = useState(false);
  const [showGovernanceIndicators, setShowGovernanceIndicators] =
    useState(false);

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleDateRangeChange = (event) => {
    setSelectedDateRange(event.target.value);
  };

  const handleIndicatorDateRangeChange = (event) => {
    setSelectedIndicatorDateRange(event.target.value);
  };

  const handleEnvironmentalIndicatorChange = (event) => {
    setEnvironmentalIndicator(event.target.value);
    history("/environment");
  };

  const handleSocialIndicatorChange = (event) => {
    setSocialIndicator(event.target.value);
    history("/sex-ratio");
  };

  const handleGovernanceIndicatorChange = (event) => {
    setGovernanceIndicator(event.target.value);
    history("/crime");
  };
  const handleEnvironmentalModuleClick = () => {
    setShowEnvironmentalIndicators(true);
  };
  const handleSocialModuleClick = () => {
    setShowSocialIndicators(true);
  };
  const handleGovernanceModuleClick = () => {
    setShowGovernanceIndicators(true);
  };

  return (
    <>
      <Header />
      <div className="admin-main-conatiner">
        <div className="admin-heading">
          {/* {!selectedState || !selectedCity || !selectedDateRange ? ( */}
          <img src={report} alt="Report" />
          {/* // ) : null} */}
          <h1>City Sustainability Report Card</h1>
        </div>

        <div className="admin-select">
          <Select
            value={selectedState}
            onChange={handleStateChange}
            displayEmpty
            className="dropdown-menu"
            style={{
              height: "2.5rem",
              width: "20rem",
              fontSize: "1.1rem",
            }}
          >
            <MenuItem value="" disabled>
              Select State
            </MenuItem>
            <MenuItem value={"Uttar Pradesh"}>Uttar Pradesh</MenuItem>
            <MenuItem value={"Uttarakhand"}>Uttarakhand</MenuItem>
          </Select>
          <Select
            value={selectedCity}
            onChange={handleCityChange}
            displayEmpty
            className="dropdown-menu z-index-low"
            style={{
              height: "2.5rem",
              width: "20rem",
              fontSize: "1.1rem",
            }}
          >
            <MenuItem value="" disabled>
              Select City
            </MenuItem>
            {selectedState === "Uttar Pradesh" && (
              <MenuItem value={"Ayodhya"}>Ayodhya</MenuItem>
            )}
            {selectedState === "Uttarakhand" && (
              <MenuItem value={"Haridwar"}>Haridwar</MenuItem>
            )}
          </Select>
          <Select
            value={selectedDateRange}
            onChange={handleDateRangeChange}
            displayEmpty
            className="dropdown-menu"
            style={{
              height: "2.5rem",
              width: "20rem",
              fontSize: "1.1rem",
            }}
          >
            <MenuItem value="" disabled>
              Select Date Range
            </MenuItem>
            <MenuItem value={"Yearly"}>Yearly</MenuItem>
            <MenuItem value={"Monthly"}>Monthly</MenuItem>
            <MenuItem value={"Weekly"}>Weekly</MenuItem>
          </Select>
        </div>
        {selectedState && selectedCity && selectedDateRange && (
          <div className="admin-modules">
            <div className="module-card">
              <div
                className="module-single-card"
                onClick={handleEnvironmentalModuleClick}
              >
                <div className="module-content">
                  <div className="module-content-1">
                    <img src={environmental} alt="Environmental" />
                    <h1>Environment Indicators</h1>
                  </div>
                  {showEnvironmentalIndicators && (
                    <div className="module-extra">
                      <ul>
                        <li>AQI</li>
                        <li>Temperature</li>
                        <li>Rainfall</li>
                      </ul>
                    </div>
                  )}
                </div>

                <div className="Module-rating-big">
                  <div className="Module-rating-1">
                    <img src={score} alt="Overall Score" />
                    <h1>Score</h1>
                    <h1>90</h1>
                  </div>

                  <div className="Module-rating">
                    <h1 style={{ backgroundColor: "#edf9f9" }}>Bad</h1>
                    <h1 style={{ backgroundColor: "#edf9f9" }}>Average</h1>
                    <h1 style={{ backgroundColor: "#edf9f9" }}>Good</h1>
                    <h1 style={{ backgroundColor: "#edf9f9" }}>Excellent</h1>
                  </div>
                </div>
              </div>

              <div
                className="module-single-card"
                onClick={handleSocialModuleClick}
              >
                <div className="module-content">
                  <div className="module-content-1">
                    <img src={social} alt="Environmental" />
                    <h1>Social Indicators</h1>
                  </div>
                  {showSocialIndicators && (
                    <div className="module-extra">
                      <ul>
                        <li>AQI</li>
                        <li>Temperature</li>
                        <li>Rainfall</li>
                      </ul>
                    </div>
                  )}
                </div>

                <div className="Module-rating-big">
                  <div className="Module-rating-1">
                    <img src={score} alt="Overall Score" />
                    <h1>Score</h1>
                    <h1>90</h1>
                  </div>

                  <div className="Module-rating">
                    <h1 style={{ backgroundColor: "#edf9f9" }}>Bad</h1>
                    <h1 style={{ backgroundColor: "#edf9f9" }}>Average</h1>
                    <h1 style={{ backgroundColor: "#edf9f9" }}>Good</h1>
                    <h1 style={{ backgroundColor: "#edf9f9" }}>Excellent</h1>
                  </div>
                </div>
              </div>
              <div
                className="module-single-card"
                onClick={handleGovernanceModuleClick}
              >
                <div className="module-content">
                  <div className="module-content-1">
                    <img src={governance} alt="Environmental" />
                    <h1>Governace Indicators</h1>
                  </div>
                  {showGovernanceIndicators && (
                    <div className="module-extra">
                      <ul>
                        <li>AQI</li>
                        <li>Temperature</li>
                        <li>Rainfall</li>
                      </ul>
                    </div>
                  )}
                </div>
                <div className="Module-rating-big">
                  <div className="Module-rating-1">
                    <img src={score} alt="Overall Score" />
                    <h1>Score</h1>
                    <h1>90</h1>
                  </div>

                  <div className="Module-rating">
                    <h1 style={{ backgroundColor: "#edf9f9" }}>Bad</h1>
                    <h1 style={{ backgroundColor: "#edf9f9" }}>Average</h1>
                    <h1 style={{ backgroundColor: "#edf9f9" }}>Good</h1>
                    <h1 style={{ backgroundColor: "#edf9f9" }}>Excellent</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="module-right">
            <div className="module-score">
              <div className="module-single-card">
                <img src={score} alt="Overall Score" />
                <h1>Overall Score</h1>
                <h1>90</h1>
              </div>
            </div>
            <div className="module-score">
              <div className="module-single-card">
                <h1>Areas of Improvement</h1>
                <ul>
                  <li>Environment</li>
                  <li>Education</li>
                  <li>Healthcare</li>
                  <li>Crime</li>
                </ul>
              </div>
            </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Admin;
