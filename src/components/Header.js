import React from "react";
import { Link, useLocation } from "react-router-dom"; // Import Link and useLocation from react-router-dom
import "./Header.css";
import CompanyLogo from "./images/arahas-logo.webp";
import HomeIcon from "@mui/icons-material/Home";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "primereact/button";

function Header({ pageName }) {
  const location = useLocation(); // Get current location using useLocation hook

  // Function to determine if a link is active
  const isActive = (path) => {
    return location.pathname === path; // Compare current pathname with link path
  };

  return (
    <>
      <header className="sticky">
        <img
          src={CompanyLogo}
          alt="Arhas Technologies Logo"
          className="company-logo"
        />
        <nav className="nav-ul">
          <div className={`home-btn ${isActive("/csi") ? "city-active" : ""}`}>
            <Link to="/csi" className="header-link">
              <Button
                icon="pi pi-home"
                size="small"
                label="
                Home"
                
                
              />
            </Link>
          </div>
          {/* <div
            className={`home-btn ${isActive("/csi/kyc") ? "city-active" : ""}`}
          >
            <Link to="/csi/kyc">
              <Button
                icon="pi pi-building"
                size="small"
                label="About&nbsp;City"
                text
                outlined
              />
            </Link>
          </div> */}
          {!pageName && (
            <div
              className={`home-btn ${isActive("/csi/") ? "city-active" : ""}`}
            ></div>
          )}
        </nav>
      </header>
    </>
  );
}

export default Header;
