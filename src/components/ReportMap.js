import React, { useRef, useState } from "react";
import "./Admin.css";
import Header from "./Header";
import ParaHeatMap from "./ParaHeatMap";
import aqi from "./images/AQI.png";
import area from "./images/area.png";
import powerbi from "./images/power-bi.png";  // Import Power BI logo
import ImageSlider from "./ImageSlider";

const ReportMap = () => {
  const [selectedParameter, setSelectedParameter] = useState("aqi");

  const handleParameterChange = (parameter) => {
    setSelectedParameter(parameter);
  };

  const images = [aqi, area];

  return (
    <div>
      <Header />
      <div className="report">
        <div className="parameter-tabs">
          <div
            className={`parameter-tab ${selectedParameter === "aqi" && "active"}`}
            onClick={() => handleParameterChange("aqi")}
          >
            AQI
          </div>
          <div
            className={`parameter-tab ${selectedParameter === "temp" && "active"}`}
            onClick={() => handleParameterChange("temp")}
          >
            Temperature
          </div>
          <div
            className={`parameter-tab ${selectedParameter === "rainfall" && "active"}`}
            onClick={() => handleParameterChange("rainfall")}
          >
            Rainfall
          </div>
        </div>
        <div className="report-container">
          <div className="map-container">
            <ParaHeatMap Parameter={selectedParameter} />
          </div>
          <div className="image-slider">
            <ImageSlider images={images} />
          </div>
        </div>
        <div className="powerbi-link">
          <a href="https://app.powerbi.com/groups/me/reports/e22098c7-0a36-43fa-a98d-91563a31d279/3f76fa52298544041400?experience=power-bi" target="_blank" rel="noopener noreferrer">
            <img src={powerbi} alt="Power BI" />
            <p>View Full Dashboard</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ReportMap;
