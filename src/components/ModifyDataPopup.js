import React, { useState } from 'react';
import axios from 'axios';
import { Select, MenuItem, TextField, Button, InputLabel } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'; // Import Material-UI components
import "./ModifyData.css";

const ModifyDataPopup = ({ onClose, modifiedData, handleChange }) => {
  // State variables
  const [selectedCategory, setSelectedCategory] = useState('');
  const [modifiedValues, setModifiedValues] = useState(modifiedData);
  const [modifySuccess, setModifySuccess] = useState(false); // State variable for modification success

  // Handler for input field changes
  const handleInputChange = (index, field, e) => {
    const newValue = e.target.value;
    handleChange(index, field, newValue);

    // Update the modifiedValues state with the new value
    const updatedValues = [...modifiedValues];
    updatedValues[index][field] = newValue;
    setModifiedValues(updatedValues);
  };

  // Handler for category dropdown change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Handler for form submission
  const handleSubmit = async () => {
    try {
      // Send modified data to the server
      await axios.post('http://localhost:8009/modify', modifiedValues);
      console.log("Data modified successfully!");
      setModifySuccess(true); // Set modifySuccess to true on successful modification
      setTimeout(() => {
        onClose(); // Close the popup after 2 seconds
      }, 2000);
    } catch (error) {
      console.error('Error modifying data:', error);
    }
  };

  return (
    <div className='modify-data-popup-container'>
      <div className="modify-data-popup">
        <CloseIcon className="close-icon" onClick={onClose} />
        <h2>Modify Data</h2>
        
        {/* Dropdown menu for selecting category */}
        <div className="category-dropdown">
          <Select
            labelId="select-category-label"
            value={selectedCategory}
            onChange={handleCategoryChange}
            variant="outlined"
            displayEmpty // Show the placeholder when no item is selected
            style={{width: '30vw', height:"4vw" }}
          >
            <MenuItem value="">Select Category</MenuItem>
            {modifiedValues.map((data, index) => (
              <MenuItem key={index} value={data.category}>{data.category}</MenuItem>
            ))}
          </Select>
        </div>

        {/* Form fields for modifying data */}
        {selectedCategory && (
          <div className="data-item">
            <TextField
              style={{margin:"0.5vw"}}
              label="Past Consumption"
              type="number"
              value={modifiedValues.find(data => data.category === selectedCategory).past_consumption}
              onChange={(e) => handleInputChange(modifiedValues.findIndex(data => data.category === selectedCategory), 'past_consumption', e)}
            />
            <TextField
              style={{margin:"0.5vw"}}
              label="Present Consumption"
              type="number"
              value={modifiedValues.find(data => data.category === selectedCategory).present_consumption}
              onChange={(e) => handleInputChange(modifiedValues.findIndex(data => data.category === selectedCategory), 'present_consumption', e)}
            />
            <TextField
              style={{margin:"0.5vw"}}
              label="SDG 11 Target"
              type="number"
              value={modifiedValues.find(data => data.category === selectedCategory).SDG_11_target}
              onChange={(e) => handleInputChange(modifiedValues.findIndex(data => data.category === selectedCategory), 'SDG_11_target', e)}
            />
            
          </div>
        )}

        {/* Display success message when modifySuccess is true */}
        {modifySuccess && (
          <div className="success-message">Data modified successfully!</div>
        )}

        {/* Button for submitting the form */}
        <div className="btn-container">
          <Button variant="contained" color="primary" onClick={handleSubmit} className='submit-button'>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default ModifyDataPopup;
