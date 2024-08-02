import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "primereact/resources/themes/saga-green/theme.css"; // or any other theme you prefer
import "primeicons/primeicons.css";
import "/node_modules/primeflex/primeflex.css";
import { PrimeReactProvider } from "primereact/api";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PrimeReactProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </PrimeReactProvider>
);
