import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import axios from "axios";

const API_BASE_URL = "https://api.countrystatecity.in/v1/";
const API_KEY = "ZHhIQXNCQ21lTGhub0J4Mk9wRHVNS1FNVWVLNmhkajIyRjdHOWJJSA==";
const DEFAULT_COUNTRY_CODE = "IN"; // India

const NewRegistrationDialogBox = ({
  visible,
  onHide,
  number,
  setNumber,
  name,
  setName,
  email,
  setEmail,
  location,
  setLocation,
}) => {
  const history = useNavigate();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const handlePhoneNumberChange = (value) => {
    setNumber(value);
    console.log(value);
  };

  const headerElement = (
    <div className="flex align-items-center justify-content-center gap-2">
      <span className="font-bold white-space-nowrap">
        New User Registration
      </span>
    </div>
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      name: name,
      email: email,
      phone: number,
      state: selectedState.name, // Ensure correct state value
      city: selectedCity.name, // Ensure correct city value
    };

    try {
      const response = await fetch(
        "https://arahas-data-upload-back.onrender.com/new/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("User registered:", data);
        // Redirect to /csi/kyc or handle success
        history("/csi/kyc");
      } else {
        console.error("Error registering user:", data.msg);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const footerContent = (
    <div className="flex justify-content-center ">
      <Button
        label="Submit"
        icon="pi pi-check"
        onClick={handleSubmit}
        autoFocus
        style={{ backgroundColor: "#00a269", color: "white" }}
      />
    </div>
  );

  useEffect(() => {
    // Fetch countries data on component mount
    fetchCountries();
    // Fetch states for the default country (India)
    fetchStates(DEFAULT_COUNTRY_CODE);
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}countries`, {
        headers: { "X-CSCAPI-KEY": API_KEY },
      });
      setCountries(response.data.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchStates = async (countryCode) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}countries/${countryCode}/states`,
        {
          headers: { "X-CSCAPI-KEY": API_KEY },
        }
      );
      setStates(response.data.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error(`Error fetching states for ${countryCode}:`, error);
    }
  };

  const fetchCities = async (countryCode, stateCode) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}countries/${countryCode}/states/${stateCode}/cities`,
        {
          headers: { "X-CSCAPI-KEY": API_KEY },
        }
      );
      setCities(response.data.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error(
        `Error fetching cities for ${stateCode} in ${countryCode}:`,
        error
      );
    }
  };

  const handleStateChange = (e) => {
    const state = e.value;
    setSelectedState(state);
    fetchCities(DEFAULT_COUNTRY_CODE, state.iso2);
  };

  const handleCityChange = (e) => {
    const city = e.value;
    setSelectedCity(city);
  };

  return (
    <Dialog
      visible={visible}
      modal
      header={headerElement}
      footer={footerContent}
      style={{ width: "50rem" }}
      className="flex w-4"
      onHide={onHide}
    >
      <div className="p-fluid mt-4">
        <div className="field">
          <FloatLabel>
            <InputText
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="name">Name</label>
          </FloatLabel>
        </div>
        <div className="field">
          <FloatLabel>
            <InputText
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email Address</label>
          </FloatLabel>
        </div>
        <div className="field">
          <PhoneInput
            name="number"
            placeholder="Enter Phone Number"
            value={number}
            onChange={handlePhoneNumberChange}
            country="in"
            className="phone-input"
          />
        </div>
        <div className="field">
          <Dropdown
            value={selectedState}
            options={states}
            onChange={handleStateChange}
            optionLabel="name"
            placeholder="Select a State"
          />
        </div>
        <div className="field">
          <Dropdown
            value={selectedCity}
            options={cities}
            onChange={handleCityChange}
            optionLabel="name"
            placeholder="Select a City"
          />
        </div>
      </div>
    </Dialog>
  );
};

export default NewRegistrationDialogBox;
