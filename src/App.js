import React from 'react';
import Login from "./components/Login";
import SDGPage from "./components/Sdg";
import "./App.css";
import DepartmentPage from './components/DepartmentPage';

import { Routes, Route } from "react-router-dom";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/electricity' element={
          <DepartmentPage
          departmentName="Electricity"
          apiUrl="http://localhost:8009/data/electricity"
          uploadUrl="http://localhost:8009/upload/electricity"
        />
        }></Route>
        <Route path='/tourism' element={
          <DepartmentPage
          departmentName="Tourism"
        apiUrl="http://localhost:8009/data/tourism"
        uploadUrl="http://localhost:8009/upload/tourism"
        />
        }></Route>
        <Route path='/housing' element={
          <DepartmentPage
          departmentName="Housing"
        apiUrl="http://localhost:8009/data/housing"
        uploadUrl="http://localhost:8009/upload/housing"
        />
        }></Route>
        <Route path='/transport' element={
          <DepartmentPage
          departmentName="Transport"
        apiUrl="http://localhost:8009/data/transport"
        uploadUrl="http://localhost:8009/upload/transport"
        />
        }></Route>
        <Route path='/environment' element={
          <DepartmentPage
          departmentName="Environment"
        apiUrl="http://localhost:8009/data/environment"
        uploadUrl="http://localhost:8009/upload/environment"
        />
        }></Route>
        <Route path="/sdg" element={<SDGPage/>}></Route>
      </Routes>

  );
}

export default App;

