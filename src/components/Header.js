import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Header.css";
import CompanyLogo from "./images/arahas-logo.webp";

function Header() {
  return (
    <>
      <header className="sticky">
        <nav className="nav-ul">
          <img
            src={CompanyLogo}
            alt="Arhas Technologies Logo"
            className="company-logo"
          />
          <Link to="/csi" className="home-btn"><i class="bi bi-house-door-fill"></i></Link> {/* Text-based home button */}
        </nav>
      </header>
    </>
  );
}

export default Header;
