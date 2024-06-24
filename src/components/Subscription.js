import React from 'react';
import { Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook
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

  const history = useNavigate(); // Initialize useHistory hook

  const handleBuyNow = (planName) => {
    alert(`You have chosen the ${planName}`);
    // Implement the actual buy logic here
  };

  const handleStartFreeTrial = () => {
    history('/csi/admin'); // Redirect to "/csi/admin" route
  };

  return (
    <div className="container">
      <h1 className="page-title">Subscription Plans</h1>
      <Grid container spacing={4} className="subscription-grid">
        {plans.map((plan, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <div className="card">
              <div className="card-content">
                <div className="card-title">{plan.name}</div>
                <div className="card-subtitle">Validity: {plan.validity}</div>
                <div className="card-actual-price">
                  Price: ₹{plan.actualPrice}
                </div>
                <div className="card-price">
                  Special Price: ₹{plan.sellingPrice}
                </div>
              </div>
              <div className="card-actions">
                <Button
                  variant="contained"
                  color="primary"
                  className="button"
                  onClick={() => handleBuyNow(plan.name)}
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </Grid>
        ))}
        {/* One-Day Free Trial Card */}
       
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
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
        </Grid>
    </div>
  );
};

export default Subscription;
