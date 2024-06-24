// Subscription.js
import React from 'react';
import { Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Subscription.css';

const Subscription = () => {
  const dailyPrice = 400;

  const plans = [
    {
      name: 'Silver Plan',
      validity: '1 Month',
      actualPrice: dailyPrice * 30,
      sellingPrice: dailyPrice * 30 * 0.9, // 10% discount
    },
    {
      name: 'Gold Plan',
      validity: '6 Months',
      actualPrice: dailyPrice * 180,
      sellingPrice: dailyPrice * 180 * 0.85, // 15% discount
    },
    {
      name: 'Platinum Plan',
      validity: '1 Year',
      actualPrice: dailyPrice * 365,
      sellingPrice: dailyPrice * 365 * 0.8, // 20% discount
    },
  ];

  const navigate = useNavigate();

  const handleBuyNow = (price) => {
    navigate('/csi/payment', { state: { price } });
  };

  const handleStartFreeTrial = () => {
    navigate('/csi/payment', { state: { price: 0 } });
  };

  return (
    <div className="container">
      <h1 className="page-title">Subscription Plans</h1>
      <div className="subscription-grid">
        {plans.map((plan, index) => (
          <div className="card" key={index}>
            <div className="card-content">
              <div className="card-title">{plan.name}</div>
              <div className="card-subtitle">Validity: {plan.validity}</div>
              <div className="card-actual-price">
                Price: ₹{plan.actualPrice}
              </div>
              <div className="card-price">
                Special Price: ₹{plan.sellingPrice.toFixed(2)}
              </div>
            </div>
            <div className="card-actions">
              <Button
                variant="contained"
                style={{
                  color: "white",
                  backgroundColor: "#ef7401"
                }}
                className="button"
                onClick={() => handleBuyNow(plan.sellingPrice)}
              >
                Buy Now
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="one-card">
        <div className="one-card-content">
          <div className="one-card-title">One-Day Free Trial</div>
        </div>
        <div className="one-card-actions">
          <Button
            variant="contained"
            color="primary"
            className="button"
            onClick={handleStartFreeTrial}
          >
            Start Free Trial
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
