import React, { useState } from "react";
import {
  ExitToApp,
  Dashboard,
  Assessment,
  EmojiObjects,
  Apartment,
  People,
  AccountBalance,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  Spa
} from "@mui/icons-material";
import "./CityHeader.css";
import CompanyLogo from "./images/arahas-logo.webp";
import SidebarDivider from "./SidebarDivider";
import Admin from "./Admin"; // Import the Admin component
import ReportMap from "./ReportMap"; // Import the ReportMap component
import bg_video from "./images/bg_video_csi.mp4";

function CityHeader({ pageName }) {
  const [expandedSection, setExpandedSection] = useState(null); // State to track expanded section
  const [activeSubTab, setActiveSubTab] = useState(""); // State to track active sub-tab
  const [showAdminComponent, setShowAdminComponent] = useState(false); // State to control Admin component visibility
  const [showReportMap, setShowReportMap] = useState(false); // State to control ReportMap visibility
  const [showNDash, setShowNDash] = useState(false); // State to control dashboard visibility

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null); // Collapse if clicked again on the same section
    } else {
      setExpandedSection(section); // Expand the clicked section
      setActiveSubTab(""); // Reset activeSubTab to null when toggling sections
    }
  };

  const handleTabClick = (tab) => {
    // Reset activeSubTab whenever a new nav-section is clicked
    if (expandedSection !== null) {
      setActiveSubTab("");
    }
  
    setActiveSubTab(tab); // Set active sub-tab when clicked
  
    // Toggle Admin component visibility based on tab selection
    if (expandedSection === "cityReportCard" && tab === "dashboard") {
      setShowAdminComponent(true); // Show Admin component when dashboard tab is clicked
    } else {
      setShowAdminComponent(false); // Hide Admin component for other tabs
    }
  
    // Toggle ReportMap visibility based on tab selection
    if (expandedSection === "environment" && tab === "report") {
      setShowReportMap(true); // Show ReportMap component when report tab is clicked
    } else {
      setShowReportMap(false); // Hide ReportMap component for other tabs
    }
  
    // Toggle dashboard iframe visibility based on tab selection
    if (expandedSection === "environment" && tab === "dashboard") {
      setShowNDash(true); // Show dashboard iframe when dashboard tab is clicked
    } else {
      setShowNDash(false); // Hide dashboard iframe for other tabs
    }
  
    // Collapse the sidebar after selecting a sub-item
    setExpandedSection(null);
  };
  
  // Render Admin component or ReportMap component based on conditions
  const renderTabContent = () => {
    if (showNDash) {
      return (
        <iframe
          title="ESG_Dashboard 2"
          width="1100"
          height="541.25"
          src="https://app.powerbi.com/reportEmbed?reportId=4530c0e8-4075-4655-a28b-2efb47389b0a&autoAuth=true&ctid=e25b7a25-9cae-4302-a16e-1fa1d5211fae"
          frameBorder="1"
          allowFullScreen="true"
          style={{ boxShadow:"rgba(0, 0, 0, 0.05) 0px 0px 0px 1px" , margin:"1% 1% 1% 12%", }}
        ></iframe>
      );
    } else if (showReportMap) {
      return <ReportMap />;
    } else if (!expandedSection && !activeSubTab){
      // Show the video when no subcategory is selected
      return (
        <div className="video-container">
          <video
            src={bg_video}
            className="video-bg"
            autoPlay
            loop
            muted
          />
        </div>
      );
    }
  };

  // Render Admin component only when expandedSection is "cityReportCard" and activeSubTab is "dashboard"
  const renderAdminComponent = () => {
    if (showAdminComponent) {
      return <Admin />;
    }
    return null;
  };

  return (
    <>
      <div className={`head-sidebar ${expandedSection ? "expanded" : ""}`}>
        <img
          src={CompanyLogo}
          alt="Arhas Technologies Logo"
          className="company-logo"
        />
        <div className="nav-container">
          <nav className="nav-ul">
            {/* First part of the sidebar */}
            <div
              className={`nav-section ${
                expandedSection === "cityReportCard" ? "city-active" : ""
              }`}
            >
              <div
                className="nav-section-header"
                onClick={() => toggleSection("cityReportCard")}
              >
                <Apartment className="icon-section" />
                <span>City Report Card</span>
              </div>
            </div>

            <div
              className={`nav-section ${
                expandedSection === "environment" ? "city-active" : ""
              }`}
            >
              <div
                className="nav-section-header"
                onClick={() => toggleSection("environment")}
              >
                <Spa className="icon-section" />
                <span>Nature</span>
              </div>
            </div>

            <div
              className={`nav-section ${
                expandedSection === "social" ? "city-active" : ""
              }`}
            >
              <div
                className="nav-section-header"
                onClick={() => toggleSection("social")}
              >
                <People className="icon-section" />
                <span>Social</span>
              </div>
            </div>

            <div
              className={`nav-section ${
                expandedSection === "administration" ? "city-active" : ""
              }`}
            >
              <div
                className="nav-section-header"
                onClick={() => toggleSection("administration")}
              >
                <AccountBalance className="icon-section" />
                <span>Administration</span>
              </div>
            </div>

            {/* Logout or Login section based on pageName */}
            {!pageName && (
              <div className="nav-section">
                <div
                  className="nav-section-header"
                  onClick={() => handleTabClick("logout")}
                >
                  <ExitToApp className="icon-section" />
                  <span>Logout</span>
                </div>
              </div>
            )}

            {pageName === "Login" && (
              <div className="nav-item">
                <div className="link" onClick={() => handleTabClick("login")}>
                  <ExitToApp className="icon-section" />
                  <span>Login</span>
                </div>
              </div>
            )}
          </nav>
          {expandedSection &&(<SidebarDivider/>)}
          
          {/* Second part of the sidebar */}
          <nav className="second-nav">
            {expandedSection === "cityReportCard" && (
              <div className="sub-items">
                <div
                  className={`link ${
                    activeSubTab === "dashboard" ? "sub-active" : ""
                  }`}
                  onClick={() => handleTabClick("dashboard")}
                >
                  <Dashboard className="icon-sub" />
                  <span>Dashboard</span>
                </div>
                <div
                  className={`link ${
                    activeSubTab === "recommendations" ? "sub-active" : ""
                  }`}
                  onClick={() => handleTabClick("recommendations")}
                >
                  <EmojiObjects className="icon-sub" />
                  <span>Recommendations</span>
                </div>
              </div>
            )}
            {expandedSection === "environment" && (
              <div className="sub-items">
                <div
                  className={`link ${
                    activeSubTab === "dashboard" ? "sub-active" : ""
                  }`}
                  onClick={() => handleTabClick("dashboard")}
                >
                  <Dashboard className="icon-sub" />
                  <span>Dashboard</span>
                </div>
                <div
                  className={`link ${
                    activeSubTab === "report" ? "sub-active" : ""
                  }`}
                  onClick={() => handleTabClick("report")}
                >
                  <Assessment className="icon-sub" />
                  <span>Report</span>
                </div>
                <div
                  className={`link ${
                    activeSubTab === "recommendations" ? "sub-active" : ""
                  }`}
                  onClick={() => handleTabClick("recommendations")}
                >
                  <EmojiObjects className="icon-sub" />
                  <span>Recommendations</span>
                </div>
              </div>
            )}
            {expandedSection === "social" && (
              <div className="sub-items">
                <div
                  className={`link ${
                    activeSubTab === "dashboard" ? "sub-active" : ""
                  }`}
                  onClick={() => handleTabClick("dashboard")}
                >
                  <Dashboard className="icon-sub" />
                  <span>Dashboard</span>
                </div>
                <div
                  className={`link ${
                    activeSubTab === "report" ? "sub-active" : ""
                  }`}
                  onClick={() => handleTabClick("report")}
                >
                  <Assessment className="icon-sub" />
                  <span>Report</span>
                </div>
                <div
                  className={`link ${
                    activeSubTab === "recommendations" ? "sub-active" : ""
                  }`}
                  onClick={() => handleTabClick("recommendations")}
                >
                  <EmojiObjects className="icon-sub" />
                  <span>Recommendations</span>
                </div>
              </div>
            )}
            {expandedSection === "administration" && (
              <div className="sub-items">
                <div
                  className={`link ${
                    activeSubTab === "dashboard" ? "sub-active" : ""
                  }`}
                  onClick={() => handleTabClick("dashboard")}
                >
                  <Dashboard className="icon-sub" />
                  <span>Dashboard</span>
                </div>
                <div
                  className={`link ${
                    activeSubTab === "report" ? "sub-active" : ""
                  }`}
                  onClick={() => handleTabClick("report")}
                >
                  <Assessment className="icon-sub" />
                  <span>Report</span>
                </div>
                <div
                  className={`link ${
                    activeSubTab === "recommendations" ? "sub-active" : ""
                  }`}
                  onClick={() => handleTabClick("recommendations")}
                >
                  <EmojiObjects className="icon-sub" />
                  <span>Recommendations</span>
                </div>
              </div>
            )}
          </nav>
        </div>
        {/* Collapse arrow */}
        <div className="collapse-arrow">
          {expandedSection ? (
            <KeyboardDoubleArrowLeft
              onClick={() => {
                setExpandedSection(null);
                // Retain the active tab and do not reset showReportMap
              }}
              style={{ backgroundColor: "#A9F3E0", borderRadius: "5px" }}
            />
          ) : (
            <KeyboardDoubleArrowRight
              onClick={() => {
                setShowReportMap(false); // Hide ReportMap when expanding sidebar
              }}
              style={{ backgroundColor: "#A9F3E0", borderRadius: "5px" }}
            />
          )}
        </div>
      </div>
      {/* Render Admin component or ReportMap component based on conditions */}
      {renderAdminComponent()}
      {renderTabContent()}
    </>
  );
}

export default CityHeader;
