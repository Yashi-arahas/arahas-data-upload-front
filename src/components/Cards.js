import React from "react";
import Rainfall from "./images/rainfall.png";
import Aqi from "./images/AQI.png";
import pm25 from "./images/pm2.5.png";
import Temperature from "./images/hot.png";
import style from "./Card.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import CircularProgressBar from './CircularProgressBar';

const Cards = () => {
  const fields = [
    { label: "Cleanliness", icon: Aqi, source: "SBM" },
    { label: "Water", icon: pm25, source: "Amrut 2.0" },
    {
      label: "Natural Resources",
      icon: Rainfall,
      source: "Ministry of renewable energy",
    },
    { label: "Climate", icon: Temperature, source: "" },
  ];

  const header = (field) => {
    return (
      <div className="d-flex flex-column w-100 rounded-sm">
        <div className="d-flex w-100">
          <div className="d-flex w-100">{field}</div>
        </div>
      </div>
    );
  };

  const footer = (source) => {
    return (
      <div className="d-flex w-100 justify-content-between p-0">
        <div className="d-flex w-100 justify-content-flex-start">
          <div className="d-flex text-xl font-weight-bold">Source:</div>
          <div className="d-flex text-xl">{source}</div>
        </div>
      </div>
    );
  };

  const fieldMapping = fields.map((field) => {
    return (
      <div className="card" key={field.label}>
        <div className="card-header">{header(field.label)}</div>
        <div className="card-body d-flex w-100 h-100 flex-row rounded-sm">
          <div className="d-flex w-100 justify-content-center align-items-center">
            <img src={field.icon} className="w-25" alt={field.label} />
          </div>
          <div className="boxShadow d-flex w-50 justify-content-center align-items-center">
           <CircularProgressBar percentage={50} />
          </div>
        </div>
        <div className="card-footer">{footer(field.source)}</div>
      </div>
    );
  });

  return (
    <div className="container">
      <div className="subContainer">{fieldMapping}</div>
    </div>
  );
};

export default Cards;
