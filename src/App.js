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
import Login_VCSI from './components/Login_VCSI';
import OverallScore from './components/OverallScore';
import Subscription from './components/Subscription';

function App() {
  return (
			
	
      <Routes>
        <Route path="/csi" element={<Login />} />
        <Route path="/vcsi" element={<Login_VCSI />} />
        <Route path="/csi/kyc" element={<KnowYourCity />} />
        <Route path="/vcsi/kyc" element={<KnowYourCity />} />

        <Route path='/csi/electricity' element={
          <DepartmentPage
          departmentName="Electricity"
          apiUrl="https://arahas-data-upload-back.onrender.com/data/electricity"
          uploadUrl="https://arahas-data-upload-back.onrender.com/data/upload/electricity"
        />
        }></Route>
        <Route path='/vcsi/electricity' element={
          <DepartmentPage
          departmentName="Electricity"
          apiUrl="https://arahas-data-upload-back.onrender.com/data/electricity"
          uploadUrl="https://arahas-data-upload-back.onrender.com/data/upload/electricity"
        />
        }></Route>
        <Route path='/csi/education' element={
          <DepartmentPage
          departmentName="Education"
          apiUrl="https://arahas-data-upload-back.onrender.com/data/education"
          uploadUrl="https://arahas-data-upload-back.onrender.com/data/upload/education"
        />
        }></Route>
        <Route path='/vcsi/education' element={
          <DepartmentPage
          departmentName="Education"
          apiUrl="https://arahas-data-upload-back.onrender.com/data/education"
          uploadUrl="https://arahas-data-upload-back.onrender.com/data/upload/education"
        />
        }></Route>
         <Route path='/csi/health' element={
          <DepartmentPage
          departmentName="Health"
          apiUrl="https://arahas-data-upload-back.onrender.com/data/health"
          uploadUrl="https://arahas-data-upload-back.onrender.com/data/upload/health"
        />
        }></Route>
        <Route path='/vcsi/health' element={
          <DepartmentPage
          departmentName="Health"
          apiUrl="https://arahas-data-upload-back.onrender.com/data/health"
          uploadUrl="https://arahas-data-upload-back.onrender.com/data/upload/health"
        />
        }></Route>
         <Route path='/csi/crime' element={
          <DepartmentPage
          departmentName="Crime"
          apiUrl="https://arahas-data-upload-back.onrender.com/data/crime"
          uploadUrl="https://arahas-data-upload-back.onrender.com/data/upload/crime"
        />
        }></Route>
         <Route path='/vcsi/crime' element={
          <DepartmentPage
          departmentName="Crime"
          apiUrl="https://arahas-data-upload-back.onrender.com/data/crime"
          uploadUrl="https://arahas-data-upload-back.onrender.com/data/upload/crime"
        />
        }></Route>
        <Route path='/csi/sex-ratio' element={
          <DepartmentPage
          departmentName="Sex-Ratio"
          apiUrl="https://arahas-data-upload-back.onrender.com/data/sex-ratio"
          uploadUrl="https://arahas-data-upload-back.onrender.com/data/upload/sex-ratio"
        />
        }></Route>
        <Route path='/vcsi/sex-ratio' element={
          <DepartmentPage
          departmentName="Sex-Ratio"
          apiUrl="https://arahas-data-upload-back.onrender.com/data/sex-ratio"
          uploadUrl="https://arahas-data-upload-back.onrender.com/data/upload/sex-ratio"
        />
        }></Route>
        <Route path='/csi/socio-culture' element={
          <DepartmentPage
          departmentName="Socio-Cultural-Activities"
          apiUrl="https://arahas-data-upload-back.onrender.com/data/socio-cultural-activities"
          uploadUrl="https://arahas-data-upload-back.onrender.com/data/upload/socio-cultural-activities"
        />
        }></Route>
        <Route path='/vcsi/socio-culture' element={
          <DepartmentPage
          departmentName="Socio-Cultural-Activities"
          apiUrl="https://arahas-data-upload-back.onrender.com/data/socio-cultural-activities"
          uploadUrl="https://arahas-data-upload-back.onrender.com/data/upload/socio-cultural-activities"
        />
        }></Route>
        <Route path='/csi/tourism' element={
          <DepartmentPage
          departmentName="Tourism"
        apiUrl="https://arahas-data-upload-back.onrender.com/data/tourism"
        uploadUrl="https://arahas-data-upload-back.onrender.com/upload/tourism"
        />
        }></Route>
        <Route path='/vcsi/tourism' element={
          <DepartmentPage
          departmentName="Tourism"
        apiUrl="https://arahas-data-upload-back.onrender.com/data/tourism"
        uploadUrl="https://arahas-data-upload-back.onrender.com/upload/tourism"
        />
        }></Route>
        <Route path='/csi/housing' element={
          <DepartmentPage
          departmentName="Housing"
        apiUrl="https://arahas-data-upload-back.onrender.com/data/housing"
        uploadUrl="https://arahas-data-upload-back.onrender.com/upload/housing"
        />
        }></Route>
        <Route path='/vcsi/housing' element={
          <DepartmentPage
          departmentName="Housing"
        apiUrl="https://arahas-data-upload-back.onrender.com/data/housing"
        uploadUrl="https://arahas-data-upload-back.onrender.com/upload/housing"
        />
        }></Route>
        <Route path='/csi/transport' element={
          <DepartmentPage
          departmentName="Transport"
        apiUrl="https://arahas-data-upload-back.onrender.com/data/transport"
        uploadUrl="https://arahas-data-upload-back.onrender.com/upload/transport"
        />
        }></Route>
        <Route path='/vcsi/transport' element={
          <DepartmentPage
          departmentName="Transport"
        apiUrl="https://arahas-data-upload-back.onrender.com/data/transport"
        uploadUrl="https://arahas-data-upload-back.onrender.com/upload/transport"
        />
        }></Route>
        <Route path='/csi/environment' element={
          <DepartmentPage
          departmentName="Environment"
        apiUrl="https://arahas-data-upload-back.onrender.com/data/environment"
        uploadUrl="https://arahas-data-upload-back.onrender.com/upload/environment"
        />
        }></Route>
        <Route path='/vcsi/environment' element={
          <DepartmentPage
          departmentName="Environment"
        apiUrl="https://arahas-data-upload-back.onrender.com/data/environment"
        uploadUrl="https://arahas-data-upload-back.onrender.com/upload/environment"
        />
        }></Route>
        
        <Route path="/csi/sdg" element={<SDGPage/>}></Route>
        <Route path="/vcsi/sdg" element={<SDGPage/>}></Route>
        <Route path="/csi/admin" element={<AdminPage/>}></Route>
        <Route path="/vcsi/admin" element={<AdminPage/>}></Route>
        <Route path="/csi/weather" element={<WeatherApi/>}></Route>
        <Route path="/vcsi/weather" element={<WeatherApi/>}></Route>
        <Route path="/csi/aqi" element={<AqiPage/>}></Route>
        <Route path="/vcsi/aqi" element={<AqiPage/>}></Route>
        <Route path="/csi/report-map-page" element={<ReportMap/>}></Route>
        <Route path="/vcsi/report-map-page" element={<ReportMap/>}></Route>
        <Route path="/csi/overall-score" element={<OverallScore/>}></Route>
        <Route path="/vcsi/overall-score" element={<OverallScore/>}></Route>
        <Route path="/csi/subscription" element={<Subscription/>}></Route>
      </Routes>
     
  );
}

export default App;

