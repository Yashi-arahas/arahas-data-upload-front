import React from "react";
import "./Card.css";

const Card = ({ title, rating, source, icon,extra1,extra2,extra3 }) => {
  return (
    <div className="know-card">
      {icon &&(
        <div className="icon">
        <img src={icon} alt="Icon" />
      </div>
      )}
      
      <div className="text-box">
        <div className="heading">{title}</div>
        <div className="rating">{rating}</div>
        <div className="rating">{extra1}</div>
        <div className="rating">{extra2}</div>
        <div className="rating">{extra3}</div>
        <div className="source">Source: {source}</div>
      </div>
    </div>
  );
};

export default Card;
