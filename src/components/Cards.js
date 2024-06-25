import React from "react";
import "./Card.css";
import Lottie from "lottie-react";

const Card = ({ title, rating, source, animationData,extra1,extra2,extra3 }) => {
  return (
    <div className="know-card">
      {animationData &&(
        <div className="icon">
       <div className="icon">
          <Lottie animationData={animationData} loop={true} style={{width:"5vw",height:"5vw" , background:"white", borderRadius:"100%", border:"2px solid orange", padding:"0.2vw"}} />
        </div>
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
