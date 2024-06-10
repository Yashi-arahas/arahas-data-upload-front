import React from "react";
import "./KnowYourCity.css";
import Map from "./Map";
import area from "./images/area.png";
import literacyRate from "./images/literacyRate.png";
import population from "./images/population.png";
import populationDensity from "./images/populationDensity.png";
import Card from "./Cards";
import s from "./images/letter-s.png";
import Header from "./Header";
import monuments from "./images/monuments.png";
import hospital from "./images/hospital.png";
import ghat from "./images/ghat.png";
import temples from "./images/temple.png";
import river from "./images/river.png";
import festivals from "./images/tent.png";
import hotels from "./images/hotel.png";
import dharamshala from "./images/shelter.png";
import CustomTooltip from "./CustomTooltip";
import JJMIcon from "./images/drop.png";
import GFCIcon from "./images/garbage-truck.png";

const KnowYourCity = () => {
  const data = {
    assets: {
      circle: {
        area: {
          value: "120.8 km2",
          icon: area,
        },
        population: {
          value: 221118,
          icon: population,
        },
        populationDensity: {
          value: "139 persons/hectare",
          icon: populationDensity,
        },
        literacyRate: {
          value: "73.6%",
          icon: literacyRate,
        },
      },
      marker: {
        monuments: 8,
        hospitals: 6,
        rivers: 1, // suryu
        "Fairs & Festivals": 4,
        Hotels: 17,
        Dharamshala: 70,
        "Sevege Treatment Plant": 1,
        "Park & Open Spaces": "1311.60 Ha",
        "Nursing Homes": 188,
        Slums: 41,
      },
    },
  };

  const monumentsList = [
    "Gulabvadi",
    "Bahu Begam ka Makbara",
    "Kuber Parvat",
    "Sugriv Parvat",
    "Mani Parvat",
    "Haji Iqbal Tomb",
  ];

  const formatString = (string) => {
    // Capitalize first letter
    const formattedString = string.charAt(0).toUpperCase() + string.slice(1);
    // Insert space before each capital letter (excluding the first one)
    return formattedString.replace(/[A-Z]/g, (match) => " " + match).trim();
  };

  const renderMarkers = (data) => {
    return data.map((obj) => (
      <div className="markerContainer" key={obj.key}>
        {obj.key === "monuments" && (
          <CustomTooltip content={<ul>{monumentsList.map((monument, index) => <li key={index}>{monument}</li>)}</ul>}>
            <div className="marker-icon">
              <img src={monuments} alt={`${obj.key} icon`} />
            </div>
          </CustomTooltip>
        )}
        {obj.key === "hospitals" && (
          <CustomTooltip content={
            <ul>
              <li>Ram Leela</li>
              <li>Ram Navmi Mela</li>
              <li>Sravan Jhula Mela</li>
              <li>Parikramas</li>
            </ul>
          }>
            <div className="marker-icon">
              <img src={hospital} alt={`${obj.key} icon`} />
            </div>
          </CustomTooltip>
        )}
        {obj.key === "ghats" && (
          <div className="marker-icon">
            <img src={ghat} alt={`${obj.key} icon`} />
          </div>
        )}
        {obj.key === "temples" && (
          <div className="marker-icon">
            <img src={temples} alt={`${obj.key} icon`} />
          </div>
        )}
        {obj.key === "rivers" && (
          <CustomTooltip content="Sarayu River">
            <div className="marker-icon">
              <img src={river} alt={`${obj.key} icon`} />
            </div>
          </CustomTooltip>
        )}
        {obj.key === "Fairs & Festivals" && (
          <CustomTooltip content={
            <ul>
              <li>Ram Leela</li>
              <li>Ram Navmi Mela</li>
              <li>Sravan Jhula Mela</li>
              <li>Parikramas</li>
            </ul>
          }>
            <div className="marker-icon">
              <img src={festivals} alt={`${obj.key} icon`} />
            </div>
          </CustomTooltip>
        )}
        {obj.key === "Hotels" && (
          <CustomTooltip content={
            <ul>
              <li>Hotel A</li>
              <li>Hotel B</li>
              <li>Hotel C</li>
              <li>Hotel D</li>
            </ul>
          }>
            <div className="marker-icon">
              <img src={hotels} alt={`${obj.key} icon`} />
            </div>
          </CustomTooltip>
        )}
        {obj.key === "Dharamshala" && (
          <CustomTooltip content={
            <ul>
              <li>Dharamshala A</li>
              <li>Dharamshala B</li>
              <li>Dharamshala C</li>
              <li>Dharamshala D</li>
            </ul>
          }>
            <div className="marker-icon">
              <img src={dharamshala} alt={`${obj.key} icon`} />
            </div>
          </CustomTooltip>
        )}
        {obj.key === "Sevege Treatment Plant" && (
          <CustomTooltip content="Capacity: 12 MLD">
            <div className="marker-icon">
              <img src={dharamshala} alt={`${obj.key} icon`} />
            </div>
          </CustomTooltip>
        )}
        {obj.key === "Park & Open Spaces" && (
            
                <CustomTooltip content={
                  <ul>
                    <li>Park A</li>
                    <li>Park B</li>
                    <li>Park C</li>
                    <li>Park D</li>
                  </ul>
                }>
                  <div className="marker-icon">
                    <img src={dharamshala} alt={`${obj.key} icon`} />
                  </div>
                </CustomTooltip>
              
    
        )}
        {obj.key === "Nursing Homes" && (
            <CustomTooltip content={
              <ul>
                <li> A</li>
                <li> B</li>
                <li> C</li>
                <li> D</li>
              </ul>
            }>
              <div className="marker-icon">
                <img src={dharamshala} alt={`${obj.key} icon`} />
              </div>
            </CustomTooltip>
          
        )}
        {obj.key === "Slums" && (
            <CustomTooltip content={
              <ul>
                <li> A</li>
                <li>B</li>
                <li>C</li>
                <li>D</li>
              </ul>
            }>
              <div className="marker-icon">
                <img src={dharamshala} alt={`${obj.key} icon`} />
              </div>
            </CustomTooltip>
          )}
        
        <span className="markerText">
            {formatString(obj.key)}: {obj.value}
          </span>
      </div>
    ));
  };
  

  const renderCircles = (data) => {
    return data.map((obj) => (
      <div className="circle-container" key={obj.key}>
        <div className="iconContainer">
          <img
            className="circleIcon"
            src={obj.value.icon}
            alt={`${obj.key} icon`}
          />
        </div>
        <div className="circle-text">
          <span className="circleKey">{formatString(obj.key)}</span>
          <span>&nbsp;:&nbsp;{obj.value.value}</span>
        </div>
      </div>
    ));
  };

  return (
    <>
      <Header />
      <div className="know-container">
        <div className="assetHeading">Ayodhya City Assets</div>
        <div className="top-container">
          <div className="top-container-left">
            <div className="circle">
              {renderCircles(
                Object.entries(data.assets.circle).map(([key, value]) => ({
                  key,
                  value,
                }))
              )}
              <div className="circle-img">
                <img src={s} alt="Source" />
                <p className="hide">Source: Ayodhya Master Plan 2031</p>
              </div>
            </div>
            <div className="cityProgress">
              <div style={{fontSize:"1.5vw", fontWeight:"700", textAlign:"center"}}>City Progress</div>
              <div className="bar">
                <div className="barSubcontainers">
                  <Card
                    title="Jal Jeevan Mission Ranking"
                    rating="State Rank in category : 21/67"
                    source="Ministry of Water Resources"
                    icon={JJMIcon}
                  />
                  <Card
                    title="Garbage Free City"
                    rating="GFC 2023 Star Rating Ayodhya 1"
                    source="Ministry of Environment"
                    icon={GFCIcon}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="map">
            <Map />
          </div>
        </div>

        <div className="asset">
          <div className="assetContainer">
            <div className="marker">
              {renderMarkers(
                Object.entries(data.assets.marker).map(([key, value]) => ({
                  key,
                  value,
                }))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KnowYourCity;
