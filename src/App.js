import React from 'react';
import Login from "./components/Login";
import SDGPage from "./components/Sdg";
import AdminPage from "./components/Admin";
import "./App.css";
import DepartmentPage from './components/DepartmentPage';
import AqiPage from "./components/Environment/AqiReport"
import ReportMap from './components/ReportMap';
import { Routes, Route } from "react-router-dom";
import WeatherApi from './components/WeatherApi';
import OtherIndicator from './components/OtherIndicator';
import KnowYourCity from './components/knowYourCity';

function App() {
  return (
			
	
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/kyc" element={<KnowYourCity />} />

        <Route path='/electricity' element={
          <DepartmentPage
          departmentName="Electricity"
          apiUrl="https://arahas-data-upload-back.onrender.com/data/electricity"
          uploadUrl="https://arahas-data-upload-back.onrender.com/data/upload/electricity"
        />
        }></Route>
        <Route path='/education' element={
          <DepartmentPage
          departmentName="Education"
          apiUrl="https://arahas-data-upload-back.onrender.com/data/education"
          uploadUrl="https://arahas-data-upload-back.onrender.com/data/upload/education"
        />
        }></Route>
         <Route path='/health' element={
          <DepartmentPage
          departmentName="Health"
          apiUrl="https://arahas-data-upload-back.onrender.com/data/health"
          uploadUrl="https://arahas-data-upload-back.onrender.com/data/upload/health"
        />
        }></Route>
         <Route path='/crime' element={
          <DepartmentPage
          departmentName="Crime"
          apiUrl="https://arahas-data-upload-back.onrender.com/data/crime"
          uploadUrl="https://arahas-data-upload-back.onrender.com/data/upload/crime"
        />
        }></Route>
        <Route path='/sex-ratio' element={
          <DepartmentPage
          departmentName="Sex-Ratio"
          apiUrl="https://arahas-data-upload-back.onrender.com/data/sex-ratio"
          uploadUrl="https://arahas-data-upload-back.onrender.com/data/upload/sex-ratio"
        />
        }></Route>
        <Route path='/socio-culture' element={
          <DepartmentPage
          departmentName="Socio-Cultural-Activities"
          apiUrl="https://arahas-data-upload-back.onrender.com/data/socio-cultural-activities"
          uploadUrl="https://arahas-data-upload-back.onrender.com/data/upload/socio-cultural-activities"
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
        <Route path="/admin" element={<AdminPage/>}></Route>
        <Route path="/weather" element={<WeatherApi/>}></Route>
        <Route path="/aqi" element={<AqiPage/>}></Route>
        <Route path="/report-map-page" element={<ReportMap/>}></Route>
      </Routes>
     
  );
}

export default App;

