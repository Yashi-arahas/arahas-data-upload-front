import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import "./OverallScore.css"
import Header from './Header';

const OverallScore = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/csi/subscription');
  };

  return (
    <>
    <Header/>
      <div className='nsa'>
       <h1> Overall Score</h1>
       <div className="more">
      <Button
                variant= "contained"
                style={{
                  color: "#fff",
                  backgroundColor: "#ef7401", 
                  borderRadius: 10, 
                }}
                onClick={handleButtonClick}
              > Click to View Report Card
                </Button>
      </div>
      </div>
      
    </>
  );
}

export default OverallScore;
