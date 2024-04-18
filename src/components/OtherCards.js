// OtherIndicators.js
import React from "react";
import { useNavigate } from "react-router-dom";

const OtherCards = ({ sdg }) => {
  const history = useNavigate();

  const handleClick = () => {
    history(sdg.link);
  };

  return (
    <div className="not-sdg-container" onClick={handleClick}>
      <div className="not-sdg-card" >
        <div className="not-sdg-content">
          <img src={sdg.photo} className="sdg-logo" alt={sdg.title} />
        </div>
      </div>
      <h2 className="sdg-title">{sdg.title}</h2>
    </div>
  );
};

export default OtherCards;
