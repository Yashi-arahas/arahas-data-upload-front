import React from 'react';
import Login from "./components/Login";
import SDGPage from "./components/Sdg";
import "./App.css";
import DepartmentPage from './components/DepartmentPage';

import { Routes, Route } from "react-router-dom";
import WeatherApi from './components/WeatherApi';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/electricity' element={
          <DepartmentPage
          departmentName="Electricity"
          apiUrl="https://arahas-data-upload-back.onrender.com/data/electricity"
          uploadUrl="https://arahas-data-upload-back.onrender.com/upload/electricity"
        />
        }></Route>
        <Route path='/tourism' element={
          <DepartmentPage
          departmentName="Tourism"
        apiUrl="https://arahas-data-upload-back.onrender.com/data/tourism"
        uploadUrl="https://arahas-data-upload-back.onrender.com/upload/tourism"
        />
        }></Route>
        <Route path='/housing' element={
          <DepartmentPage
          departmentName="Housing"
        apiUrl="https://arahas-data-upload-back.onrender.com/data/housing"
        uploadUrl="https://arahas-data-upload-back.onrender.com/upload/housing"
        />
        }></Route>
        <Route path='/transport' element={
          <DepartmentPage
          departmentName="Transport"
        apiUrl="https://arahas-data-upload-back.onrender.com/data/transport"
        uploadUrl="https://arahas-data-upload-back.onrender.com/upload/transport"
        />
        }></Route>
        <Route path='/environment' element={
          <DepartmentPage
          departmentName="Environment"
        apiUrl="https://arahas-data-upload-back.onrender.com/data/environment"
        uploadUrl="https://arahas-data-upload-back.onrender.com/upload/environment"
        />
        }></Route>
        <Route path="/sdg" element={<SDGPage/>}></Route>
        <Route path="/weather" element={<WeatherApi/>}></Route>
      </Routes>

  );
}

export default App;

