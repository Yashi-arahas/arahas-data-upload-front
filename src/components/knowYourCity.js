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
import slum from "./images/slums.png"
import park from "./images/open.png"
import socio from "./images/socio.png"
import Footer from "./Footer";

const KnowYourCity = () => {
  const data = {
    assets: {
      circle: {
        Zones: {
          value: 4,
        },
        Wards: {
          value: 60,
        },
        "Geographical Area": {
          value: "35.56 Sq.km",
        },
        "Census Population": {
          value: "3,31,806",
        },
        "Current Population": {
          value: "4,65,206",
        },
        "Population from Wards": {
          value: "2,97,653",
        },
        "Floating Population": {
          value: "2,00,000",
        },
        "Innovation/New Initiatives": {
          value: "9",
        },
        "Water bodies": {
          value: 5,
        },
        Ghats: {
          value: 4,
        },
        Nallahs: {
          value: 1,
        },
        Landfills: {
          value: 0,
        },
        Dumpsite: {
          value: 0,
        },
        // "Processing Plants":{
        //   value:7
        // },
      },
      marker: {
        monuments: 8,
        "Nursing Homes": 188,
        "Fairs & Festivals": 4,
        Hotels: 17,
        Dharamshala: 70,
        "Park & Open Spaces": "1311.60 Ha",
        Slums: 41,
        "Socio-Cultural Facilities": "7",
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
          <CustomTooltip
            content={
              <ul>
                {monumentsList.map((monument, index) => (
                  <li key={index}>{monument}</li>
                ))}
              </ul>
            }
          >
            <div className="marker-icon">
              <img src={monuments} alt={`${obj.key} icon`} />
            </div>
          </CustomTooltip>
        )}
        {obj.key === "Nursing Homes" && (
          <CustomTooltip
            content={
              <ul>
              <li>Government Hospital, Ayodhya</li> 
<li>Anand Multispeciality Hospital</li>
<li>Sewa Hospital and Research Centre</li>
<li>Chiranjeev Hospital</li>
              </ul>
            }
          >
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
          <CustomTooltip
            content={
              <ul>
                <li>Ram Leela</li>
                <li>Ram Navmi Mela</li>
                <li>Sravan Jhula Mela</li>
                <li>Parikramas</li>
              </ul>
            }
          >
            <div className="marker-icon">
              <img src={festivals} alt={`${obj.key} icon`} />
            </div>
          </CustomTooltip>
        )}
        {obj.key === "Hotels" && (
          <CustomTooltip
            content={
              <ul>
                <li>
                  Hotel Saket, a Unit of Uttar Pradesh State Tourism Development
                  Corporation Ltd.
                </li>
                <li>
                  Rahi Yatri Niwas Ayodhya, a Unit of Uttar Pradesh State
                  Tourism Development Corporation Ltd
                </li>
                <li>Ramprastha Hotel and Resorts</li>
                <li>A P Palace</li>
                <li>Tirupati Hotel</li>
              </ul>
            }
          >
            <div className="marker-icon">
              <img src={hotels} alt={`${obj.key} icon`} />
            </div>
          </CustomTooltip>
        )}
        {obj.key === "Dharamshala" && (
          <CustomTooltip
            content={
              <ul>
                <li>Ayodhya Dharamshala</li>
                <li>Birla Dharamshala</li>
                <li>Hanumat Bhavan Dharamshala</li>
                <li>Baranwal Dharamshala</li>
              </ul>
            }
          >
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
          <CustomTooltip
            content={
              <ul>
<li>Hemu Kalyani Park near Tehsil </li>
<li>Gandhi Park opp. Senior Police superintendent office </li>
<li>Mukharji park near civil line</li>
<li>Acharya Narendra dev park at civil line </li>
               
              </ul>
            }
          >
            <div className="marker-icon">
              <img src={park} alt={`${obj.key} icon`} />
            </div>
          </CustomTooltip>
        )}
        
       
        {obj.key === "Slums" && (
          <CustomTooltip
            content={
              <ul>
                <li>Kandhari bazar</li>
                <li>Sahab ganj</li>
                <li>Wazir ganj</li>
                <li>Janaura</li>
                <li>Fateh ganj</li>
              </ul>
            }
          >
            <div className="marker-icon">
              <img src={slum} alt={`${obj.key} icon`} />
            </div>
          </CustomTooltip>
        )}
        {obj.key === "Socio-Cultural Facilities" && (
          <CustomTooltip
            content={
              <ul>
                <li>Anganwari-Housing Area</li>
<li>Community room</li>
<li>Community hall and library</li>
<li>Recreational club</li>
<li>Music, dance and drama center</li>
<li>Meditation and spiritual center</li>
<li>Old-age home</li>
              </ul>
            }
          >
            <div className="marker-icon">
              <img src={socio} alt={`${obj.key} icon`} />
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
        <div className="circle-text">
          <span>{obj.value.value}</span>
          <span className="circleKey">{formatString(obj.key)}</span>
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
          <h1 style={{ fontSize: "1.2vw", fontWeight: "700" }}>
            Ayodhya (M. Corp.) Demographics
          </h1>
          <div className="top-container-row">
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
                  <p className="hide">SBM (As per May, 2024)</p>
                </div>
              </div>
            </div>
            <div className="know-map">
              <Map />
            </div>
          </div>
          <h1 style={{ fontSize: "1.2vw", fontWeight: "700" }}>
            City Progress
          </h1>
          <div className="cityProgress">
            <div className="city-left">
              <div className="sub-left">
                <p>Solid Waste Processed (in TPD)</p>
                <div className="list-container">
                  <ul>
                    <li>Domestic Hazardous : 5.43</li>
                    <li>Dry : 72.39</li>
                  </ul>
                  <ul>
                    <li>Sanitary : 3.62</li>
                    <li>Wet : 99.53</li>
                  </ul>
                </div>
              </div>

              <div className="sub-left">
                <p>Sewage Waste (in MLD)</p>
                <div className="list-container">
                  <ul>
                    <li>Collected Waste : 20.97</li>
                    <li>Treated Waste : 20.97</li>
                  </ul>
                </div>
              </div>
              <div className="sub-left">
                <p>CT/PT</p>
                <div className="list-container">
                  <ul>
                    <li>Functional: 62</li>
                    <li>Non-Functional: 0</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="city-right">
              <Card
                title="Jal Jeevan Mission Ranking"
                rating="State Rank in category : 21/67"
                source="Ministry of Jal Shakti"
                icon={JJMIcon}
              />
              <Card
                title="Garbage Free City"
                rating="Rating : 1 star"
                source="Ministry of Housing and Urban Affairs"
                icon={GFCIcon}
              />
              <Card
                title="Swachh Survekshan"
                rating="Rank : 389"
                source="Swachh Survekshan Mission"
                icon={GFCIcon}
              />
            </div>
          </div>
        </div>
        <div className="asset">
         
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
      <Footer/>
    </>
  );
};

export default KnowYourCity;
