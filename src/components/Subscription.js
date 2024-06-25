import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import './Subscription.css';
import Lottie from "lottie-react";
import gold from "./images/gold.json";
import bronze from "./images/bronze.json";
import silver from "./images/silver.json";
import free from "./images/free.json";
import Header from './Header';
import payLoading from './images/payLoad.mp4';

const Subscription = () => {
  const dailyPrice = 400;
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      name: 'Bronze Plan',
      validity: '1 Month',
      actualPrice: dailyPrice * 30,
      sellingPrice: dailyPrice * 30 * 0.9, // 10% discount
      benefits: [true, true, false, false], // Benefits array: true means benefit included, false means benefit not included
      animation: bronze,
    },
    {
      name: 'Silver Plan',
      validity: '6 Months',
      actualPrice: dailyPrice * 180,
      sellingPrice: dailyPrice * 180 * 0.85, // 15% discount
      benefits: [true, true, true, false], // Benefits array
      animation: silver,
    },
    {
      name: 'Gold Plan',
      validity: '1 Year',
      actualPrice: dailyPrice * 365,
      sellingPrice: dailyPrice * 365 * 0.8, // 20% discount
      benefits: [true, true, true, true], // Benefits array
      animation: gold,
    },
  ];

  const navigate = useNavigate();

  const handleBuyNow = (price) => {
    setLoading(true);
    setTimeout(() => {
      navigate('/csi/payment', { state: { price } });
    }, 10000); // Show loading animation for 3 seconds before navigating
  };

  const handleStartFreeTrial = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/csi/payment', { state: { price: 0 } });
    }, 10000); // Show loading animation for 3 seconds before navigating
  };

  return (
    <>
      <Header />
      {loading ? (
        <div className="loading-container">
          <video className="loading-video" src={payLoading} autoPlay loop />
        </div>
      ) : (
        <div className="container">
          <div className="one-card">
            <div className="one-card-content">
              <div className="one-card-title" >
                <h1>1-Day Free Trail Available</h1>
              </div>
            </div>
            <div className="one-card-actions">
              <Button
                variant="contained"
                color="primary"
                className="button"
                onClick={handleStartFreeTrial}
              >
                Start Now
              </Button>
            </div>
          </div>
          <div className="subscription-grid">
            {plans.map((plan, index) => (
              <div className="card" key={index}>
                <div className="card-content">
                  <div className="card-title">
                    <h1>{plan.name}</h1>
                    <Lottie animationData={plan.animation} style={{ width: "6vw" ,  backgroundColor:"rgba(255,255,255,0.5)", margin:"0.5vw" ,borderRadius:"100%" }} />
                  </div>
                  <div className="card-subtitle">Validity: {plan.validity}</div>
                  <div className="card-actual-price">
                    Price: ₹{plan.actualPrice}
                  </div>
                  <div className="card-price">
                    Special Price: ₹{plan.sellingPrice.toFixed(2)}
                  </div>
                  <div className="card-benefits">
                    <div className="benefit">
                      {plan.benefits[0] ? <CheckCircleIcon className="icon" /> : <RadioButtonUncheckedIcon className="icon" />}
                      Benefit 1
                    </div>
                    <div className="benefit">
                      {plan.benefits[1] ? <CheckCircleIcon className="icon" /> : <RadioButtonUncheckedIcon className="icon" />}
                      Benefit 2
                    </div>
                    <div className="benefit">
                      {plan.benefits[2] ? <CheckCircleIcon className="icon" /> : <RadioButtonUncheckedIcon className="icon" />}
                      Benefit 3
                    </div>
                    <div className="benefit">
                      {plan.benefits[3] ? <CheckCircleIcon className="icon" /> : <RadioButtonUncheckedIcon className="icon" />}
                      Benefit 4
                    </div>
                  </div>
                </div>
                <div className="card-actions">
                  <Button
                    variant="contained"
                    className="button"
                    style={{ backgroundColor: "white", color: "black", padding: "0.2vw 2vw", fontWeight: "bold" }}
                    onClick={() => handleBuyNow(plan.sellingPrice)}
                  >
                    Choose
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Subscription;
