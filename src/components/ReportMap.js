import React, { useState } from "react";
import Header from "./Header";
import ParaHeatMap from "./ParaHeatMap";
import Footer from "./Footer";

const ReportMap = () => {
  const [selectedParameter, setSelectedParameter] = useState("aqi");

  const handleParameterChange = (parameter) => {
    setSelectedParameter(parameter);
  };

  

  return (
    <div className="report-main">
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
          <div
            className={`parameter-tab ${selectedParameter === "water" && "active"}`}
            onClick={() => handleParameterChange("water")}
          >
            Water Conservation and Prevention
          </div>
          <div
            className={`parameter-tab ${selectedParameter === "land" && "active"}`}
            onClick={() => handleParameterChange("land")}
          >
            Land Usage
          </div>
        </div>
        <div className="report-container">
          {selectedParameter !== "waste" && selectedParameter!=="water" && selectedParameter!=="land" && (
            <div className="map-container">
              <ParaHeatMap Parameter={selectedParameter} />
            </div>
          )}
          {selectedParameter === "waste" && (
            <iframe
              title="Waste Management"
              width="730px"
              height="450px"
              src="https://app.powerbi.com/reportEmbed?reportId=c77055df-e77f-4bb6-af0b-070b6435bb7a&autoAuth=true&ctid=e25b7a25-9cae-4302-a16e-1fa1d5211fae"
              frameborder="0"
              allowFullScreen="true"
              style={{
                margin: "1vw",
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                padding: "1vw",
                backgroundColor: "white",
              }}
            ></iframe>
          )}
          {selectedParameter === "water" && (
            <iframe
              title="Water Conservation and Prevention"
             width="730px"
              height="450px"
              src="https://app.powerbi.com/reportEmbed?reportId=30f563e0-18d2-46ec-888a-ad4eeba6a58e&autoAuth=true&ctid=e25b7a25-9cae-4302-a16e-1fa1d5211fae"
              frameborder="0"
              allowFullScreen="true"
              style={{
                margin: "1vw",
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                padding: "1vw",
                backgroundColor: "white",
              }}
            ></iframe>
          )}
           {selectedParameter === "land" && (
          
           
           <iframe title="Land_Dashboard" width="730px"
           height="450px"  src="https://app.powerbi.com/reportEmbed?reportId=50afd8ec-664b-42c6-8493-c7cee9cdb39b&autoAuth=true&ctid=e25b7a25-9cae-4302-a16e-1fa1d5211fae" frameborder="0" allowFullScreen="true"  style={{
            margin: "1vw",
            boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
            padding: "1vw",
            backgroundColor: "white",
          }}></iframe>
           
          )}
           {selectedParameter === "aqi" && (
          
           
          <iframe title="Ayodhya_AQI and Health Impacts" width="650px"
          height="450px"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
            padding: "1vw",
            backgroundColor: "white",
          }}
           src="https://app.powerbi.com/reportEmbed?reportId=4864d779-5853-4521-b6da-3f94bd730c06&autoAuth=true&ctid=e25b7a25-9cae-4302-a16e-1fa1d5211fae"
          frameborder="0" allowFullScreen="true"></iframe>
          
         )}
         {selectedParameter === "temp" && (
          
           
          <iframe title="Temp. Dashboard"
          width="650px"
              height="450px"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                padding: "1vw",
                backgroundColor: "white",
              }} src="
          https://app.powerbi.com/reportEmbed?reportId=c681af69-5780-4ecc-af1f-48049fb683cb&autoAuth=true&ctid=e25b7a25-9cae-4302-a16e-1fa1d5211fae"
          frameborder="0" allowFullScreen="true"></iframe>
          
         )}
         {selectedParameter === "rainfall" && (
          
           
          <iframe title="Rainfall Dashboard"  
          width="650px"
          height="450px"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
            padding: "1vw",
            backgroundColor: "white",
          }} src="
https://app.powerbi.com/reportEmbed?reportId=46b96cbd-16ff-443d-ba3a-937a64160216&autoAuth=true&ctid=e25b7a25-9cae-4302-a16e-1fa1d5211fae"
frameborder="0" allowFullScreen="true"></iframe>
          
         )}

          
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReportMap;
