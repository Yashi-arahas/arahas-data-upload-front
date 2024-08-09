import React from "react";
import Login from "./components/LoginPage/Login";
import SDGPage from "./components/Sdg";
import AdminPage from "./components/CityHeader";
import "./App.css";
import DepartmentPage from "./components/DepartmentPage";
import AqiPage from "./components/Environment/AqiReport";
import ReportMap from "./components/ReportMap";
import { Routes, Route } from "react-router-dom";
import WeatherApi from "./components/WeatherApi";
import OtherIndicator from "./components/OtherIndicator";
import KnowYourCity from "./components/KnowYourCity/knowYourCity";
import Login_VCSI from "./components/Login_VCSI";
import OverallScore from "./components/OverallScore";
import Subscription from "./components/Subscription";
import PaymentForm from "./components/PaymentForm";
import EDash from "./components/EDash";
import "primereact/resources/themes/lara-light-teal/theme.css";
import "primeicons/primeicons.css";
import "/node_modules/primeflex/primeflex.css";
import AqiDashboard from "./components/DashBoards/AqiDashboard";

function App() {
  return (
    <Routes>
      <Route path="/csi" element={<Login />} />
      <Route path="/vcsi" element={<Login_VCSI />} />
      <Route path="/csi/kyc" element={<KnowYourCity />} />
      <Route path="/vcsi/kyc" element={<KnowYourCity />} />

      <Route
        path="/csi/electricity"
        element={
          <DepartmentPage
            departmentName="Electricity"
            apiUrl="http://13.232.104.132:8009/data/electricity"
            uploadUrl="http://13.232.104.132:8009/data/upload/electricity"
          />
        }
      ></Route>
      <Route
        path="/vcsi/electricity"
        element={
          <DepartmentPage
            departmentName="Electricity"
            apiUrl="http://13.232.104.132:8009/data/electricity"
            uploadUrl="http://13.232.104.132:8009/data/upload/electricity"
          />
        }
      ></Route>
      <Route
        path="/csi/education"
        element={
          <DepartmentPage
            departmentName="Education"
            apiUrl="http://13.232.104.132:8009/data/education"
            uploadUrl="http://13.232.104.132:8009/data/upload/education"
          />
        }
      ></Route>
      <Route
        path="/vcsi/education"
        element={
          <DepartmentPage
            departmentName="Education"
            apiUrl="http://13.232.104.132:8009/data/education"
            uploadUrl="http://13.232.104.132:8009/data/upload/education"
          />
        }
      ></Route>
      <Route
        path="/csi/health"
        element={
          <DepartmentPage
            departmentName="Health"
            apiUrl="http://13.232.104.132:8009/data/health"
            uploadUrl="http://13.232.104.132:8009/data/upload/health"
          />
        }
      ></Route>
      <Route
        path="/vcsi/health"
        element={
          <DepartmentPage
            departmentName="Health"
            apiUrl="http://13.232.104.132:8009/data/health"
            uploadUrl="http://13.232.104.132:8009/data/upload/health"
          />
        }
      ></Route>
      <Route
        path="/csi/crime"
        element={
          <DepartmentPage
            departmentName="Crime"
            apiUrl="http://13.232.104.132:8009/data/crime"
            uploadUrl="http://13.232.104.132:8009/data/upload/crime"
          />
        }
      ></Route>
      <Route
        path="/vcsi/crime"
        element={
          <DepartmentPage
            departmentName="Crime"
            apiUrl="http://13.232.104.132:8009/data/crime"
            uploadUrl="http://13.232.104.132:8009/data/upload/crime"
          />
        }
      ></Route>
      <Route
        path="/csi/sex-ratio"
        element={
          <DepartmentPage
            departmentName="Sex-Ratio"
            apiUrl="http://13.232.104.132:8009/data/sex-ratio"
            uploadUrl="http://13.232.104.132:8009/data/upload/sex-ratio"
          />
        }
      ></Route>
      <Route
        path="/vcsi/sex-ratio"
        element={
          <DepartmentPage
            departmentName="Sex-Ratio"
            apiUrl="http://13.232.104.132:8009/data/sex-ratio"
            uploadUrl="http://13.232.104.132:8009/data/upload/sex-ratio"
          />
        }
      ></Route>
      <Route
        path="/csi/socio-culture"
        element={
          <DepartmentPage
            departmentName="Socio-Cultural-Activities"
            apiUrl="http://13.232.104.132:8009/data/socio-cultural-activities"
            uploadUrl="http://13.232.104.132:8009/data/upload/socio-cultural-activities"
          />
        }
      ></Route>
      <Route
        path="/vcsi/socio-culture"
        element={
          <DepartmentPage
            departmentName="Socio-Cultural-Activities"
            apiUrl="http://13.232.104.132:8009/data/socio-cultural-activities"
            uploadUrl="http://13.232.104.132:8009/data/upload/socio-cultural-activities"
          />
        }
      ></Route>
      <Route
        path="/csi/tourism"
        element={
          <DepartmentPage
            departmentName="Tourism"
            apiUrl="http://13.232.104.132:8009/data/tourism"
            uploadUrl="http://13.232.104.132:8009/upload/tourism"
          />
        }
      ></Route>
      <Route
        path="/vcsi/tourism"
        element={
          <DepartmentPage
            departmentName="Tourism"
            apiUrl="http://13.232.104.132:8009/data/tourism"
            uploadUrl="http://13.232.104.132:8009/upload/tourism"
          />
        }
      ></Route>
      <Route
        path="/csi/housing"
        element={
          <DepartmentPage
            departmentName="Housing"
            apiUrl="http://13.232.104.132:8009/data/housing"
            uploadUrl="http://13.232.104.132:8009/upload/housing"
          />
        }
      ></Route>
      <Route
        path="/vcsi/housing"
        element={
          <DepartmentPage
            departmentName="Housing"
            apiUrl="http://13.232.104.132:8009/data/housing"
            uploadUrl="http://13.232.104.132:8009/upload/housing"
          />
        }
      ></Route>
      <Route
        path="/csi/transport"
        element={
          <DepartmentPage
            departmentName="Transport"
            apiUrl="http://13.232.104.132:8009/data/transport"
            uploadUrl="http://13.232.104.132:8009/upload/transport"
          />
        }
      ></Route>
      <Route
        path="/vcsi/transport"
        element={
          <DepartmentPage
            departmentName="Transport"
            apiUrl="http://13.232.104.132:8009/data/transport"
            uploadUrl="http://13.232.104.132:8009/upload/transport"
          />
        }
      ></Route>
      <Route
        path="/csi/environment"
        element={
          <DepartmentPage
            departmentName="Environment"
            apiUrl="http://13.232.104.132:8009/data/environment"
            uploadUrl="http://13.232.104.132:8009/upload/environment"
          />
        }
      ></Route>
      <Route
        path="/vcsi/environment"
        element={
          <DepartmentPage
            departmentName="Environment"
            apiUrl="http://13.232.104.132:8009/data/environment"
            uploadUrl="http://13.232.104.132:8009/upload/environment"
          />
        }
      ></Route>

      <Route path="/csi/sdg" element={<SDGPage />}></Route>
      <Route path="/vcsi/sdg" element={<SDGPage />}></Route>
      <Route path="/csi/admin" element={<AdminPage />}></Route>
      <Route path="/vcsi/admin" element={<AdminPage />}></Route>
      <Route path="/csi/weather" element={<WeatherApi />}></Route>
      <Route path="/vcsi/weather" element={<WeatherApi />}></Route>
      <Route path="/csi/aqi" element={<AqiPage />}></Route>
      <Route path="/vcsi/aqi" element={<AqiPage />}></Route>
      <Route path="/csi/report-map-page" element={<ReportMap />}></Route>
      <Route path="/vcsi/report-map-page" element={<ReportMap />}></Route>
      <Route path="/csi/overall-score" element={<OverallScore />}></Route>
      <Route path="/vcsi/overall-score" element={<OverallScore />}></Route>
      <Route path="/csi/subscription" element={<Subscription />}></Route>
      <Route path="/csi/payment" element={<PaymentForm />}></Route>
      <Route path="/csi/eDash" element={<EDash />}></Route>
      <Route path="/csi/aqi-dashboard" element={<AqiDashboard />}></Route>
    </Routes>
  );
}

export default App;
