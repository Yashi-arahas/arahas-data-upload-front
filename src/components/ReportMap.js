import React, { useRef, useState } from "react";
import { Select, MenuItem } from "@mui/material";
import "./Admin.css";
import sample from "./images/bg_video.mp4";
import Header from "./Header";
import report from "./images/img_report.png";
import map from "./images/map.png";
import ParaHeatMap from "./ParaHeatMap";

const ReportMap = () => {
  const videoRef = useRef(null);
  const [showHeatMap, setShowHeatMap] = useState(false);
  const [selectedParameter, setSelectedParameter] = useState("AQI");
  const [showReportContainer, setShowReportContainer] = useState(false);

  const handleReportButtonClick = () => {
    // Redirect the user to the Power BI report URL
    window.location.href = "https://app.powerbi.com/groups/me/reports/e22098c7-0a36-43fa-a98d-91563a31d279/3f76fa52298544041400?experience=power-bi";
  };

  const handleMapButtonClick = () => {
    setShowHeatMap(true);
    setShowReportContainer(false);
  };

  const handleParameterChange = (event) => {
    setSelectedParameter(event.target.value);
  };

  return (
    <div>
      <Header />
      <div className="report">
        <video
          className="video-background"
          autoPlay
          loop
          muted
          ref={videoRef}
        >
          <source src={sample} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="report-map-btn">
          <div className="button-container">
            <div className="parameter-select">
              <Select
                value={selectedParameter}
                onChange={handleParameterChange}
                variant="outlined"
                style={{ width: "20vw", height: "3vw", backgroundColor: "white" }}
              >
                <MenuItem value="aqi">AQI</MenuItem>
                <MenuItem value="temp">Temperature</MenuItem>
                <MenuItem value="rainfall">Rainfall</MenuItem>
              </Select>
            </div>
            <button
              onClick={handleReportButtonClick}
              className="report-button"
            >
              <img src={report} alt="Report" />
              <h1>Report</h1>
            </button>
            <div
              className="report-button"
              onClick={handleMapButtonClick}
            >
              <img src={map} alt="Map" />
              <h1>Map</h1>
            </div>
          </div>

          {showReportContainer || showHeatMap ? (
            <div className="report-container">
             
              {showHeatMap && (
                <ParaHeatMap Parameter={selectedParameter} />
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ReportMap;
