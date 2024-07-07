import React from "react";
import { Link, useLocation } from "react-router-dom"; // Import Link and useLocation from react-router-dom
import "./Header.css";
import CompanyLogo from "./images/arahas-logo.webp";
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LogoutIcon from '@mui/icons-material/Logout';

function Header({ pageName }) {
  const location = useLocation(); // Get current location using useLocation hook

  // Function to determine if a link is active
  const isActive = (path) => {
    return location.pathname === path; // Compare current pathname with link path
  };

  return (
    <>
      <header className="sticky">
        <nav className="nav-ul">
          <img
            src={CompanyLogo}
            alt="Arhas Technologies Logo"
            className="company-logo"
          />
          <div className={`home-btn ${isActive("/csi") ? "city-active" : ""}`}>
            <Link to="/csi" className="header-link">
              <HomeIcon className="head-icon" />
            </Link>
            <h1>Home</h1>
          </div>
          <div className={`home-btn ${isActive("/csi/kyc") ? "city-active" : ""}`}>
            <Link to="/csi/kyc" className="header-link">
              <ApartmentIcon className="head-icon" />
            </Link>
            <h1>About City</h1>
          </div>
          {!pageName && (
            <div className={`home-btn ${isActive("/csi/") ? "city-active" : ""}`}>
              <Link to="/csi/" className="header-link">
                <LogoutIcon className="head-icon" />
              </Link>
              <h1>Logout</h1>
            </div>
          )}
          
        </nav>
      </header>
    </>
  );
}

export default Header;
