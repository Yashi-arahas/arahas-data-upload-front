import React from "react";
import AQI from "../images/AQI.png";
import tvoc from "../images/tvoc.png";
import no2 from "../images/No-2.png";
import pm25 from "../images/pm2.5.png";
import pm10 from "../images/pm10.png";
import so2 from "../images/SO-2.png";

const AqiSub = (average) => {
  return (
    <>
      <div className="col-lg-4">
        <div className="mini-cards">
          <img src={AQI}></img>
          <h1>{average[0].Avg_AQI}</h1>
          <h3>Avg AQI </h3>
          <div className="card-hover-info">
            <ul>
              <li>0-50 (Good)</li>
              <li>51-100 (Moderate)</li>
              <li>101-150 (Unhealthy for sensitive groups)</li>
              <li>151-200 (Unhealthy)</li>
              <li>201-300 (Very Unhealthy)</li>
              <li>301-500 (Hazardous)</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="mini-cards">
          <img src={pm25}></img>
          <h1>{average[0].Avg_pm25}</h1>
          <h3>Avg PM 2.5 </h3>
          <div className="card-hover-info">
            <ul>
              <li>Safe Exposure Levels: 0-60 micro grams per cubic meter</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="mini-cards">
          <img src={pm10}></img>
          <h1>{average[0].Avg_pm10}</h1>
          <h3>Avg PM 10 </h3>
          <div className="card-hover-info">
            <ul>
              <li>Safe Exposure Levels: 0-100 micro grams per cubic meter</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="mini-cards">
          <img src={so2}></img>
          <h1>{average[0].Avg_so2}</h1>
          <h3>Avg SO2 </h3>
          <div className="card-hover-info">
            <ul>
              <li>Safe Exposure Levels: 0-80 micro grams per cubic meter</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="mini-cards">
          <img src={no2}></img>
          <h1>{average[0].Avg_NO2}</h1>
          <h3>Avg NO2 </h3>
          <div className="card-hover-info">
            <ul>
              <li>Safe Exposure Levels: 0-80 micro grams per cubic meter</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="mini-cards">
          <img src={tvoc}></img>
          <h1>0.68</h1>
          <h3>Avg TVOC</h3>
          <div className="card-hover-info">
            <ul>
              <li>
                Safe Exposure Levels: 0.3 to 0.5 micro grams per cubic meter
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AqiSub;
