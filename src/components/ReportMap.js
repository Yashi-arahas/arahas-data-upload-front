import React, { useRef, useState } from "react";
import "./Admin.css";
import Header from "./Header";
import ParaHeatMap from "./ParaHeatMap";
import powerbi from "./images/power-bi.png"
import aqi_img_1 from "./images/img1.png";
import aqi_img_2 from "./images/img2.png";
import aqi_img_3 from "./images/img3.png";
import aqi_img_4 from "./images/img4.png";
import aqi_img_5 from "./images/img5.png";
import aqi_img_6 from "./images/img6.png";
import aqi_img_7 from "./images/img7.png";
import rain_img1 from "./images/rain_img1.png";
import rain_img2 from "./images/rain_img2.png";
import rain_img3 from "./images/rain_img3.png";
import rain_img4 from "./images/rain_img4.png";
import temp_img1 from "./images/temp_img1.png";
import temp_img2 from "./images/temp_img2.png";
import temp_img3 from "./images/temp_img3.png";
import waste_img1 from "./images/waste_img1.png";
import waste_img2 from "./images/waste_img2.png";
import waste_img3 from "./images/waste_img3.png";
import waste_img4 from "./images/waste_img4.png";
import ImageSlider from "./ImageSlider";

const ReportMap = () => {
  const [selectedParameter, setSelectedParameter] = useState("aqi");

  const handleParameterChange = (parameter) => {
    setSelectedParameter(parameter);
  };

  const rain_images = [rain_img1, rain_img2, rain_img3, rain_img4];
  const temp_images = [temp_img1, temp_img2, temp_img3];
  const aqi_images = [aqi_img_1, aqi_img_2, aqi_img_3, aqi_img_4, aqi_img_5, aqi_img_6, aqi_img_7]
  const waste_images=[waste_img1,waste_img2,waste_img3,waste_img4]

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
          <div
            className={`parameter-tab ${selectedParameter === "waste" && "active"}`}
            onClick={() => handleParameterChange("waste")}
          >
            Waste Management
          </div>
        </div>
        <div className="report-container">
          <div className="map-container">
            <ParaHeatMap Parameter={selectedParameter} />
          </div>
          {selectedParameter === "rainfall" && (
            <div className="image-slider">
              <ImageSlider images={rain_images} />
            </div>
          )}
          {selectedParameter === "temp" && (
            <div className="image-slider">
              <ImageSlider images={temp_images} />
            </div>
          )}
          {selectedParameter === "aqi" && (
            <div className="image-slider">
              <ImageSlider images={aqi_images} />
            </div>
          )}
          {selectedParameter === "waste" && (
            <div className="image-slider">
              <ImageSlider images={waste_images} />
            </div>
          )}
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
