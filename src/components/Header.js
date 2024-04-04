import React from "react";
import "./Header.css";
import ComapanyLogo from "./images/arahas-logo.webp";
function Header() {
  return (
    <>
      <header className="sticky">
        <nav className="nav-ul">
          <img
            src={ComapanyLogo}
            alt="Arhas Technologies Logo"
            className="company-logo"
          />

        </nav>
      </header>
    </>
  );
}

export default Header;
