import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import ReportPrint from "./ReportPrint"; // Import the ReportPrint component
import Lottie from "lottie-react";
import report_ani from "./animations/Report_ani.json";

const API_BASE_URL = "https://api.countrystatecity.in/v1/";
const API_KEY = "ZHhIQXNCQ21lTGhub0J4Mk9wRHVNS1FNVWVLNmhkajIyRjdHOWJJSA==";
const DEFAULT_COUNTRY_CODE = "IN"; // India

const GenerateCityReport = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    // Fetch states data on component mount
    fetchStates(DEFAULT_COUNTRY_CODE);
  }, []);

  const fetchStates = async (countryCode) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}countries/${countryCode}/states`,
        {
          headers: { "X-CSCAPI-KEY": API_KEY },
        }
      );
      const data = await response.json();
      setStates(data.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error(`Error fetching states for ${countryCode}:`, error);
    }
  };

  const fetchCities = async (countryCode, stateCode) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}countries/${countryCode}/states/${stateCode}/cities`,
        {
          headers: { "X-CSCAPI-KEY": API_KEY },
        }
      );
      const data = await response.json();
      setCities(data.sort((a, b) => a.name.localeCompare(b.name)));
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
    setSelectedCity(e.value);
  };

  // Check if all fields are selected
  const allFieldsSelected =
    selectedState && selectedCity && startDate && endDate;

  return (
    <div className="p-fluid align-items-center flex justify-content-center flex-column">
      <Lottie
        animationData={report_ani}
        style={{ height: "20rem", width: "20rem" }}
      />
      {/* State and City Dropdowns */}
      <div className="grid w-8 ">
        <div className="col-6">
          <div className="field">
            <Dropdown
              value={selectedState}
              options={states}
              onChange={handleStateChange}
              optionLabel="name"
              placeholder="Select State"
              className="w-full"
            />
          </div>
        </div>
        <div className="col-6">
          <div className="field">
            <Dropdown
              value={selectedCity}
              options={cities}
              onChange={handleCityChange}
              optionLabel="name"
              placeholder="Select City"
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Date Range Selection */}
      <div className="grid w-8 ">
        <div className="col-6">
          <div className="field">
            <Calendar
              value={startDate}
              onChange={(e) => setStartDate(e.value)}
              placeholder="Start Date"
              className="w-full"
              dateFormat="dd/mm/yy"
            />
          </div>
        </div>
        <div className="col-6">
          <div className="field">
            <Calendar
              value={endDate}
              onChange={(e) => setEndDate(e.value)}
              placeholder="End Date"
              className="w-full"
              dateFormat="dd/mm/yy"
            />
          </div>
        </div>
      </div>

      {/* Render ReportPrint Component only if all fields are selected */}
      {allFieldsSelected && (
        <div className="flex justify-content-center">
          <ReportPrint
            show={true}
            selectedState={selectedState}
            selectedCity={selectedCity}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
      )}
      {!allFieldsSelected && (
        <div className="flex justify-content-center">
          <ReportPrint show={false} />
        </div>
      )}
    </div>
  );
};

export default GenerateCityReport;
