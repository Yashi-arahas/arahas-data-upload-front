import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import "./OverallScore.css";
import Header from './Header';
import Lottie from 'lottie-react';
import n from "./images/Nature.json";
import s from "./images/Society.json";
import a from "./images/Administation.json";

const OverallScore = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/csi/subscription');
  };

  return (
    <div className='over'>
      <Header />
      <div className="nsa">
      
        <div className="overall-ani">
          <div className="ani-container">
            <Lottie animationData={n} className="over-ani" />
            <div className="ani-text">Nature</div>
          </div>
          <div className="line-container">
            <svg width="100" height="10" className="line-svg">
              <line x1="0" y1="5" x2="100" y2="5" stroke="#ef7401" strokeWidth="2" />
              <circle cx="0" cy="5" r="3" fill="#ef7401" className="moving-point" />
            </svg>
          </div>
          <div className="ani-container">
            <Lottie animationData={s} className="over-ani" style={{padding:"2.4vw"}} />
            <div className="ani-text">Society</div>
          </div>
          <div className="line-container">
            <svg width="100" height="10" className="line-svg">
              <line x1="0" y1="5" x2="100" y2="5" stroke="#ef7401" strokeWidth="2" />
              <circle cx="0" cy="5" r="3" fill="#ef7401" className="moving-point" />
            </svg>
          </div>
          <div className="ani-container">
            <Lottie animationData={a} className="over-ani" />
            <div className="ani-text">Administration</div>
          </div>
        </div>
        <h1>CSI Score : 70</h1>
        <div className="more">
          
          <Button
            variant="contained"
            style={{
              color: "#fff",
              backgroundColor: "#ef7401",
              borderRadius: 10,
            }}
            onClick={handleButtonClick}
          >
            Click to View Report Card
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OverallScore;
