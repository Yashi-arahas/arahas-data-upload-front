import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TextField, Button, MenuItem, Alert } from '@mui/material';
import Lottie from 'lottie-react';
import paymentSuccessAnimation from './images/paymentSuccess.json';
import payNow from './images/payNow.json';
import axios from 'axios';
import './Subscription.css';
import Header from './Header';

const API_BASE_URL = 'https://api.countrystatecity.in/v1/';
const API_KEY = 'ZHhIQXNCQ21lTGhub0J4Mk9wRHVNS1FNVWVLNmhkajIyRjdHOWJJSA=='; // Replace with your actual API key

const PaymentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { price } = location.state;

  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [formValues, setFormValues] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    district: '',
    state: '',
    country: '',
    pincode: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // Fetch countries data on component mount
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}countries`, {
        headers: { 'X-CSCAPI-KEY': API_KEY }
      });
      setCountries(response.data.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchStates = async (countryCode) => {
    try {
      const response = await axios.get(`${API_BASE_URL}countries/${countryCode}/states`, {
        headers: { 'X-CSCAPI-KEY': API_KEY }
      });
      setStates(response.data.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error(`Error fetching states for ${countryCode}:`, error);
    }
  };

  const fetchCities = async (countryCode, stateCode) => {
    try {
      const response = await axios.get(`${API_BASE_URL}countries/${countryCode}/states/${stateCode}/cities`, {
        headers: { 'X-CSCAPI-KEY': API_KEY }
      });
      setCities(response.data.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error(`Error fetching cities for ${stateCode} in ${countryCode}:`, error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateName = (name) => {
    return /^[a-zA-Z ]+$/.test(name); // Only allows letters and spaces
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Basic email format validation
  };

  const validatePhoneNumber = (phoneNumber) => {
    return /^\d{10}$/.test(phoneNumber); // 10 digits validation
  };

  const validatePincode = (pincode) => {
    return /^\d{6}$/.test(pincode); // 6 digits validation
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!validateName(formValues.fullName)) {
      isValid = false;
      errors.fullName = 'Invalid name format';
    }
    if (!validateEmail(formValues.email)) {
      isValid = false;
      errors.email = 'Invalid email format';
    }
    if (!validatePhoneNumber(formValues.phoneNumber)) {
      isValid = false;
      errors.phoneNumber = 'Invalid phone number';
    }
    if (!formValues.addressLine1) {
      isValid = false;
      errors.addressLine1 = 'Address Line 1 is required';
    }
    if (!formValues.city) {
      isValid = false;
      errors.city = 'City is required';
    }
    if (!formValues.state) {
      isValid = false;
      errors.state = 'State is required';
    }
    if (!formValues.country) {
      isValid = false;
      errors.country = 'Country is required';
    }
    if (!validatePincode(formValues.pincode)) {
      isValid = false;
      errors.pincode = 'Invalid pincode';
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const formDataToSend = { ...formValues, planName }; // Include planName in form data
        const response = await axios.post(`https://arahas-data-upload-back.onrender.com/submitForm`, formDataToSend);
        console.log('Form data saved successfully:', response.data);
        if (price === 0) {
          navigate('/csi/admin');
        } else {
          setTimeout(() => {
            setIsPaymentSuccessful(true);
            setTimeout(() => {
              navigate('/csi/admin');
            }, 1500);
          }, 2000);
        }
      } catch (error) {
        console.error('Error saving form data:', error);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
      }
    } else {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
    }
  };
  
  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    setFormValues({ ...formValues, country: countryCode });
    fetchStates(countryCode);
  };

  const handleStateChange = (e) => {
    const stateCode = e.target.value;
    setFormValues({ ...formValues, state: stateCode });
    fetchCities(formValues.country, stateCode); // Ensure to pass formValues.country here
  };

  const handleCityChange = (e) => {
    const cityName = e.target.value;
    setFormValues({ ...formValues, city: cityName });
  };

  let planName = '';
  switch (price) {
    case 0:
      planName = 'Free Trial';
      break;
    case 10800:
      planName = 'Bronze Plan';
      break;
    case 61200:
      planName = 'Silver Plan';
      break;
    case 116800:
      planName = 'Gold Plan';
      break;
    default:
      planName = 'Custom Plan';
      break;
  }

  if (isPaymentSuccessful) {
    return (
      <div className="payment-container">
        <Lottie animationData={paymentSuccessAnimation} style={{ height: '40vw', width: '40vw' }} />
      </div>
    );
  }

  return (
    <div className='pay'>
      <Header />
      <div className="payment-container">
        {showAlert && <Alert severity="error">Please fill in all required fields correctly.</Alert>}
        <form className="payment-form" onSubmit={handleFormSubmit}>
          <div className="payment-animation" style={{ width: '100%' }}>
            <Lottie animationData={payNow} style={{ width: '8vw' }} />
            <h1>Payment Form</h1>
          </div>
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={formValues.fullName}
            onChange={handleInputChange}
            required
            className="form-field"
            error={!!formErrors.fullName}
            helperText={formErrors.fullName}
          />
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            required
            className="form-field"
            error={!!formErrors.email}
            helperText={formErrors.email}
          />
          <TextField
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            value={formValues.phoneNumber}
            onChange={handleInputChange}
            required
            className="form-field"
            error={!!formErrors.phoneNumber}
            helperText={formErrors.phoneNumber}
          />
          <TextField
            fullWidth
            label="Address Line 1"
            name="addressLine1"
            value={formValues.addressLine1}
            onChange={handleInputChange}
            required
            className="form-field"
            error={!!formErrors.addressLine1}
            helperText={formErrors.addressLine1}
          />
          <TextField
            fullWidth
            label="Address Line 2"
            name="addressLine2"
            value={formValues.addressLine2}
            onChange={handleInputChange}
            className="form-field"
          />
          <TextField
            select
            fullWidth
            label="Country"
            name="country"
            value={formValues.country}
            onChange={handleCountryChange}
            required
            className="form-field"
            error={!!formErrors.country}
            helperText={formErrors.country}
          >
            {countries.map((country) => (
              <MenuItem key={country.iso2} value={country.iso2}>
                {country.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            label="State"
            name="state"
            value={formValues.state}
            onChange={handleStateChange}
            required
            className="form-field"
            error={!!formErrors.state}
            helperText={formErrors.state}
            disabled={!formValues.country}
          >
            {states.map((state) => (
              <MenuItem key={state.iso2} value={state.iso2}>
                {state.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            label="City"
            name="city"
            value={formValues.city}
            onChange={handleCityChange}
            required
            className="form-field"
            error={!!formErrors.city}
            helperText={formErrors.city}
            disabled={!formValues.state} // You might want to disable it until a state is selected
          >
            {cities.map((city) => (
              <MenuItem key={city.id} value={city.name}>
                {city.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Pincode"
            name="pincode"
            value={formValues.pincode}
            onChange={handleInputChange}
            required
            className="form-field"
            error={!!formErrors.pincode}
            helperText={formErrors.pincode}
          />
          <TextField
            fullWidth
            label="Plan Name"
            name="planName"
            value={planName}
            InputProps={{
              readOnly: true,
            }}
            className="form-field"
          />
          <Button
            variant="contained"
            type="submit"
            style={{ color: 'white', backgroundColor: '#ef7401' }}
            className="pay-button"
          >
            {price === 0 ? 'Start Trial' : `Proceed to Pay ₹${price} `}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
