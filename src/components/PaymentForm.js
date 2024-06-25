import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import Lottie from 'lottie-react';
import paymentSuccessAnimation from './images/paymentSuccess.json';
import payNow from './images/payNow.json';
import './Subscription.css';
import Header from './Header';

const PaymentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { price } = location.state;

  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (price === 0) {
      navigate('/csi/admin');
    } else {
      // Simulate payment processing
      setTimeout(() => {
        setIsPaymentSuccessful(true);
        setTimeout(() => {
          navigate('/csi/admin');
        }, 1500); // Redirect after 1.5 seconds
      }, 2000); // Simulate a 2-second payment processing time
    }
  };

  if (isPaymentSuccessful) {
    return (
      <div className="payment-container">
        <Lottie animationData={paymentSuccessAnimation} style={{ height: '30vw', width: '30vw', margin: '10vw' }} />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="payment-container">
       
        <form className="payment-form" onSubmit={handleFormSubmit}>
        <div className="payment-animation" style={{width:"100%"
        }}>
            <Lottie animationData={payNow} style={{ width: "8vw" }} />
            <h1>Payment Form</h1>
          
        </div>
          <TextField fullWidth label="Full Name" required className="form-field"  />
          <TextField fullWidth label="Email Address" required className="form-field" />
          <TextField fullWidth label="Phone Number" required className="form-field" />
          <TextField fullWidth label="Address Line 1" required className="form-field" />
          <TextField fullWidth label="Address Line 2" className="form-field" />
          <TextField fullWidth label="City" required className="form-field" />
          <TextField fullWidth label="District" required className="form-field" />
          <TextField fullWidth label="State" required className="form-field" />
          <TextField fullWidth label="Country" required className="form-field" />
          <TextField fullWidth label="Pincode" required className="form-field" />
          <Button
            variant="contained"
            type="submit"
            style={{ color: 'white', backgroundColor: '#ef7401' }}
            className="pay-button"
          >
            {price === 0 ? 'Start Trial' : `Proceed to Pay ₹${price}`}
          </Button>
        </form>
      </div>
    </>
  );
};

export default PaymentForm;
