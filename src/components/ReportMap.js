import React from "react";
import ParaHeatMap from "../components/DashBoards/ParaHeatMap";
import Footer from "../components/KnowYourCity/Footer";

const ReportMap = ({ parameter }) => {
  console.log(parameter);
  return (
    <div className="report-main">
      <div className="report">
        <div className="report-container">
          {parameter !== "waste" &&
            parameter !== "water" &&
            parameter !== "land" && (
              <div className="map-container">
                <ParaHeatMap Parameter={parameter} />
              </div>
            )}
          {parameter === "waste" && (
            <iframe
              title="Waste Management"
              width="730px"
              height="450px"
              src="https://app.powerbi.com/reportEmbed?reportId=c77055df-e77f-4bb6-af0b-070b6435bb7a&autoAuth=true&ctid=e25b7a25-9cae-4302-a16e-1fa1d5211fae"
              frameBorder="0"
              allowFullScreen="true"
              style={{
                margin: "1vw",
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                padding: "1vw",
                backgroundColor: "white",
              }}
            ></iframe>
          )}
          {parameter === "water" && (
            <iframe
              title="Water Conservation and Prevention"
              width="730px"
              height="450px"
              src="https://app.powerbi.com/reportEmbed?reportId=30f563e0-18d2-46ec-888a-ad4eeba6a58e&autoAuth=true&ctid=e25b7a25-9cae-4302-a16e-1fa1d5211fae"
              frameBorder="0"
              allowFullScreen="true"
              style={{
                margin: "1vw",
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                padding: "1vw",
                backgroundColor: "white",
              }}
            ></iframe>
          )}
          {parameter === "land" && (
            <iframe
              title="Land_Dashboard"
              width="730px"
              height="450px"
              src="https://app.powerbi.com/reportEmbed?reportId=50afd8ec-664b-42c6-8493-c7cee9cdb39b&autoAuth=true&ctid=e25b7a25-9cae-4302-a16e-1fa1d5211fae"
              frameBorder="0"
              allowFullScreen="true"
              style={{
                margin: "1vw",
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                padding: "1vw",
                backgroundColor: "white",
              }}
            ></iframe>
          )}
          {parameter === "aqi" && (
            <iframe
              title="Ayodhya_AQI and Health Impacts"
              width="650px"
              height="450px"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                padding: "1vw",
                backgroundColor: "white",
              }}
              src="https://app.powerbi.com/reportEmbed?reportId=4864d779-5853-4521-b6da-3f94bd730c06&autoAuth=true&ctid=e25b7a25-9cae-4302-a16e-1fa1d5211fae"
              frameBorder="0"
              allowFullScreen="true"
            ></iframe>
          )}
          {parameter === "temp" && (
            <iframe
              title="Temp. Dashboard"
              width="650px"
              height="450px"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                padding: "1vw",
                backgroundColor: "white",
              }}
              src="https://app.powerbi.com/reportEmbed?reportId=c681af69-5780-4ecc-af1f-48049fb683cb&autoAuth=true&ctid=e25b7a25-9cae-4302-a16e-1fa1d5211fae"
              frameBorder="0"
              allowFullScreen="true"
            ></iframe>
          )}
          {parameter === "rainfall" && (
            <iframe
              title="Rainfall Dashboard"
              width="650px"
              height="450px"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                padding: "1vw",
                backgroundColor: "white",
              }}
              src="https://app.powerbi.com/reportEmbed?reportId=46b96cbd-16ff-443d-ba3a-937a64160216&autoAuth=true&ctid=e25b7a25-9cae-4302-a16e-1fa1d5211fae"
              frameBorder="0"
              allowFullScreen="true"
            ></iframe>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReportMap;
