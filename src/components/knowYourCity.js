import React from "react";
// import "./KnowYourCity.css";
import "./KnowCity.css";
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
import { useState } from "react";
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
import { PieChart } from "./GraphVisuals"; 
import ram_mandir from "./images/ram.jpg"
import ADA from "./images/ADA.jpg"
import ayo_ghat from "./images/ayo-ghat.jpg"

import water_one from "./images/water1.json"
import water_three from "./images/water3.json"
import cleaning from "./images/clean.json"
import house_ani from "./images/house_ani.json"
import garbage from "./images/garbage.json"
import CT from "./images/PT.json";
const KnowYourCity = () => {
  const [activeTab, setActiveTab] = useState('demographics');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleImageSwap = () => {
    setActiveImageIndex((prevIndex) => (prevIndex + 1) % 3); // Increment the index and loop back to 0 after the last image
  };

  const activeImageSrc = () => {
    switch (activeImageIndex) {
      case 0:
        return ram_mandir;
      case 1:
        return ayo_ghat;
      case 2:
        return ADA;
      default:
        return ram_mandir;
    }
  };

  const data = {
    assets: {
      circle: {
        Zones: {
          value: 4,
        },
        Wards: {
          value: 60,
        },
        
        Ghats: {
          value: 4,
        },
        Nallahs: {
          value: 1,
        },
        "Water bodies": {
          value: 5,
        },
        
        "Landfills & Dumpsite" : {
          value: 0,
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
        // "Wards Population": {
        //   value: "2,97,653",
        // },
        // "Floating Population": {
        //   value: "2,00,000",
        // },
        "New Initiatives": {
          value: "9",
        },
        "Literacy Rate": {
          value: "73.6%",
        },
        "4-lane Expressway": {
          value:1,
        },
        "A.P.M.C. Market": {
          value: "2",
        },
        "Sewage Treatment Plant": {
          value: "1",
        },

      },
      marker: {
        "Major Attractions": 9,
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
    "Ram Mandir",
    "Gulab Bari",
    "Bahu Begum ka Maqbara",
    "Guptar Ghat",
    "Company Gardens",
    "Hanuman Ghari",
    "Kanak Bhawan",
    "Nageshwarnath Mandir",
    "Lakshman Kila"
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
        {obj.key === "Major Attractions" && (
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
              <>
              <h1>Top 4 Hospitals in Ayodhya</h1>
              <ul>
              <li>Government Hospital, Ayodhya</li> 
<li>Anand Multispeciality Hospital</li>
<li>Sewa Hospital and Research Centre</li>
<li>Chiranjeev Hospital</li>
              </ul>
              </>
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
              <>
              
              <h1>Most Popular Festivals of Ayodhya</h1>
              <ul>
                <li>Ram Leela</li>
                <li>Ram Navmi Mela</li>
                <li>Sravan Jhula Mela</li>
                <li>Parikramas</li>
              </ul>
              </>
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
              <>
              <h1>Top 5 Hotels in Ayodhya</h1>
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
              </>
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
              <>
              <h1>Top 4 Dharamshalas in Ayodhya</h1>
              <ul>
                <li>Ayodhya Dharamshala</li>
                <li>Birla Dharamshala</li>
                <li>Hanumat Bhavan Dharamshala</li>
                <li>Baranwal Dharamshala</li>
              </ul>
              </>
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
              <>
              <h1>Top 4 Parks in Ayodhya</h1>
              <ul>
<li>Hemu Kalyani Park near Tehsil </li>
<li>Gandhi Park opp. Senior Police superintendent office </li>
<li>Mukharji park near civil line</li>
<li>Acharya Narendra dev park at civil line </li>
               
              </ul>
              </>
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
              <>
              <h1>Top 5 Slums in Ayodhya</h1>
              <ul>
                <li>Kandhari bazar</li>
                <li>Sahab ganj</li>
                <li>Wazir ganj</li>
                <li>Janaura</li>
                <li>Fateh ganj</li>
              </ul>
              </>
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
        <span style={{
  backgroundColor: "#00A269",
  color: " white",
  padding: "0.5vw 1vw",
  borderRadius: "5px",
  fontWeight: "700",
  width: "7vw",
  margin:'1vw',
  fontSize:"0.8vw",
  textAlign: "center",
  background: "linear-gradient(to right, #00A269,#326c58)",
  backgroundSize: "90% 100%",
  animation: "animate 2s  infinite",
  animationDirection:"normal"
}}>
  {obj.value.value}
</span>

          <span className="circleKey">{formatString(obj.key)}</span>
        </div>
      </div>
    ));
  };

  return (
    <div className="main-know">
      <Header />
      <div className="know-container">
        <div className="assetHeading"><h1><span>ABOUT AYODHYA</span></h1></div>
        
          
          <div className="top-container-row">
            <div className="top-container-col">
            <div className="tab-container">
          <div className={` ${activeTab === 'demographics' ? 'tab-active-know' : ''}`} onClick={() => handleTabClick('demographics')}>
            <h1><span>City Demographics</span></h1>
            </div>
            <div className={` ${activeTab === 'progress' ? 'tab-active-know' : ''}`} onClick={() => handleTabClick('progress')}>
            <h1><span>City Progress</span></h1>
            </div>
            </div>
            <div className="know-tabs">
              {activeTab==="demographics" &&(
                <div className="top-container-left" >
              <div className="circle">
              
                {renderCircles(
                  Object.entries(data.assets.circle).map(([key, value]) => ({
                    key,
                    value,
                  }))
                )}
                <div className="circle-img">
                  <p > Source :SBM (As per May, 2024)</p>
                </div>
              </div>
            </div>
              )}
            {activeTab==="progress" && (
  <div className="cityProgress">
  <div className="city-right">
    <Card
      title="Jal Jeevan Mission Ranking"
      rating="State Rank in category : 21/67"
      source="Ministry of Jal Shakti"
      animationData={water_one}
    />
     <Card
      title="Jal Kal Vibhag"
      rating="Quantity of Water Supply : 39.55 MLD"
      
      source="Jal Kal Vibhag 2020"
      
      animationData={water_three}
    />
    <Card
      title="Garbage Free City"
      rating="Rating : 1 star"
      source="Ministry of Housing and Urban Affairs"
      animationData={garbage}
    />
    <Card
      title="Swachh Survekshan"
      rating="Rank : 389"
      source="Swachh Survekshan Mission"
      animationData={cleaning}
    />
    
    <Card
      title="CT/PT"
      rating="Functional : 62/62"
      source="Swachh Bharat Mission"
      animationData={CT}
    />
     
    
    <Card
      title="Houses Allocated : 362"
      rating="Houses Built : 384"
      source="Pradhan Mantri Awas Yojana"
      animationData={house_ani}
    />
     <Card
      rating=
      {<PieChart
      title="Waste Generation"
      labels={["Residential", "Commercial", "Institutional"]}
      series={[238800,119400,59700]}
      height={120}
     
    />}
      source="Ayodhya Industrial Dept 2020"
      // icon={GFCIcon}
    />
    <Card
      rating=
      {<PieChart
      title="Solid Waste Processed (in TPD)"
      labels={["Domestic", "Dry", "Sanitary", "Wet"]}
      series={[5.43,72.39, 3.62, 99.53]}
      height={120}
      
     
    />}
      source="Swachh Bharat Mission"
      // icon={GFCIcon}
    />
    <Card
      rating=
      {
     <PieChart
      title="Electricity Consumption (KWH)"
      labels={["Residential", "Commercial", "Industrial", "Agricultural" , "Others"]}
      series={[15343985,2541529,144440,4675,2100829]}
      height={120}
     
    />
   }
      source="Vidhut Vibhag Ayodhya"
      // icon={GFCIcon}
    />
    
    {/* <Card
      rating=
      {<PieChart
      title="Industries Statistics"
      labels={["Manufacturing", "Services"]}
      series={[388,648]}
      height={160}
     
    />}
      source="Ayodhya Industrial Dept 2020"
      // icon={GFCIcon}
    /> */}
    
  </div>
</div>
            )}
          
          
            
          
          
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
            <div className="know-right-right">
          <div className="know-map">
              <Map />
            </div>
           <div className="swap-container" onClick={handleImageSwap}>
              <img src={activeImageSrc()} alt="Swapped" />
            </div>
          </div>
            
        
          </div>
      
      <Footer/>
      </div>
    </div>
  );
};

export default KnowYourCity;
