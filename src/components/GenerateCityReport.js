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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

 


  // Check if all fields are selected
  const allFieldsSelected = startDate && endDate;

  return (
    <div className="p-fluid align-items-center flex justify-content-center flex-column">
      <Lottie
        animationData={report_ani}
        style={{ height: "20rem", width: "20rem" }}
      />
    
      
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
