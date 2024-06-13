import React, { useRef, useState } from "react";
import "./Admin.css";
import Header from "./Header";
import ParaHeatMap from "./ParaHeatMap";
import powerbi from "./images/power-bi.png"
import aqi_img_1 from "./images/aqi_img1.png";
import aqi_img_2 from "./images/aqi_img2.png";
import aqi_img_3 from "./images/aqi_img3.png";
import aqi_img_4 from "./images/aqi_img4.png";
import aqi_img_5 from "./images/aqi_img5.png";
import aqi_img_6 from "./images/aqi_img6.png";
import rain_img1 from "./images/rain_img1.png";
import rain_img2 from "./images/rain_img2.png";
import rain_img3 from "./images/rain_img3.png";
import temp_img1 from "./images/temp_img1.png";
import temp_img2 from "./images/temp_img2.png";
import temp_img3 from "./images/temp_img3.png";
import temp_img4 from "./images/temp_img4.png";
import waste_img1 from "./images/waste_img1.png";
import waste_img2 from "./images/waste_img2.png";
import waste_img3 from "./images/waste_img3.png";
import waste_img4 from "./images/waste_img4.png";
import waste_img5 from "./images/waste_img1_img.png"
import waste_img6 from "./images/waste_img2_img.png"
import ImageSlider from "./ImageSlider";
import Footer from "./Footer";
const ReportMap = () => {
  const [selectedParameter, setSelectedParameter] = useState("aqi");

  const handleParameterChange = (parameter) => {
    setSelectedParameter(parameter);
  };

  const rain_images = [rain_img1, rain_img2, rain_img3, ];
  const temp_images = [temp_img1, temp_img2, temp_img3,temp_img4];
  const aqi_images = [aqi_img_1, aqi_img_2, aqi_img_3, aqi_img_4, aqi_img_5, aqi_img_6,]
  const waste_images=[waste_img5,waste_img6,waste_img1,waste_img2,waste_img3,waste_img4]

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
          {/* {selectedParameter === "rainfall" && (
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
          )} */}
           <iframe title="Ayodhya_AQI - Copy" width="730px" height="450px" style={{boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", padding:"1vw", backgroundColor:"white"}} src="https://app.powerbi.com/reportEmbed?reportId=8072f015-6879-429c-988c-7844fe9b288c&autoAuth=true&ctid=e25b7a25-9cae-4302-a16e-1fa1d5211fae" frameborder="0" allowFullScreen="true"></iframe>
        </div>
        {/* <div className="powerbi-link">
          <a href="https://app.powerbi.com/groups/me/reports/8072f015-6879-429c-988c-7844fe9b288c/3f76fa52298544041400?experience=power-bi">
            <img src={powerbi} alt="Power BI" />
            <p>View Full Dashboard</p>
          </a>
        </div> */}
       
      </div>
      <Footer/>
    </div>

  );
};

export default ReportMap;
