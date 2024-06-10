import React from "react";
import "./Card.css";

const Card = ({ title, rating, source, icon }) => {
  return (
    <div className="card">
      <div className="icon">
        <img src={icon} alt="Icon" />
      </div>
      <div className="text-box">
        <div className="heading">{title}</div>
        <div className="rating">{rating}</div>
        <div className="source">Source: {source}</div>
      </div>
    </div>
  );
};

export default Card;
