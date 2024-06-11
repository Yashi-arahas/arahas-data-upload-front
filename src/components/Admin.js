import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import Header from "./Header";
import framework_img from "./images/framework_img.png";
import score from "./images/score.png";
import e_img from "./images/letter-e.png";
import g_img from "./images/letter-g.png";
import s_img from "./images/s.png";
import sum_img from "./images/plus.png";
import equal_img from "./images/equal.png";
import esg from "./images/ESG_ESG.png";
import { ParetoChart } from "./GraphVisuals";
import { Select, MenuItem } from "@mui/material";
import sample from "./images/bg_video.mp4"; // Ensure the correct path to the video file
import Footer from "./Footer";

const Admin = () => {
  const [selectedCategory, setSelectedCategory] = useState("Environment");
  const navigate = useNavigate(); // Changed from history to navigate
  const videoRef = useRef(null);

  const categories = {
    Environment: {
      title: "Environment Metrics",
      data: [10, 80, 30, 3, 50, 78, 70, 60, 90, 80, 110, 90],
    },
    Social: {
      title: "Social Metrics",
      data: [15, 5, 25, 45, 55, 95, 75, 85, 105, 87, 115, 65],
    },
    Governance: {
      title: "Governance Metrics",
      data: [20, 10, 80, 50, 60, 70, 76, 40, 10, 110, 180, 130],
    },
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Set the playback rate to 0.5 for half speed
    }
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleTotalScoreClick = () => {
    navigate("/csi/sdg"); // Changed from history to navigate
  };
  const handleEClick = () => {
    navigate("/csi/report-map-page"); // Changed from history to navigate
  };

  return (
    <>
      <Header />
      <div className="admin-main">
       
        <div className="admin-title">
          <h1>Ayodhya City Report Card</h1>
        </div>
        <div className="admin-sub-container">
          <div className="admin-left">
            <div className="row-1">
              
              <div className="row-1-cols">
                <div className="indicator "  >
                  <div className="indicator-name">
                    <h1>E</h1>
                    <p>Environment</p>
                  </div>
                  <div className="content"onClick={handleEClick}>
                    <div className="content-text">
                      <div className="recommendation">
                        <h1>Recommendations</h1>
                        <ul>
                          <li>first</li>
                          <li>second</li>
                          
                        </ul>
                        <p style={{fontSize:"0.8vw" , marginBottom:"0.5vw"}}>Click to View Report and Map.</p>
                      </div>
                     
                      <div className="score">
                        <h1>Score</h1>
                        <p>80</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="indicator">
                  <div className="indicator-name">
                    <h1>S</h1>
                    <p>Social</p>
                  </div>
                  <div className="content">
                    <div className="content-text">
                      <div className="recommendation">
                        <h1>Recommendations</h1>
                        <ul>
                          <li>first</li>
                          <li>second</li>
                        </ul>
                      </div>
                      <div className="score">
                        <h1>Score</h1>
                        <p>80</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="indicator">
                  <div className="indicator-name">
                    <h1>G</h1>
                    <p>Governance</p>
                  </div>
                  <div className="content">
                    <div className="content-text">
                      <div className="recommendation">
                        <h1>Recommendations</h1>
                        <ul>
                          <li>first</li>
                          <li>second</li>
                        </ul>
                      </div>
                      <div className="score">
                        <h1>Score</h1>
                        <p>80</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row-2">
              <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                style={{ width: "100%", height: "3vw", margin: "1vw" }}
              >
                <MenuItem value="Environment">Environment</MenuItem>
                <MenuItem value="Social">Social</MenuItem>
                <MenuItem value="Governance">Governance</MenuItem>
              </Select>
              <ParetoChart
                title={categories[selectedCategory].title}
                categories={[
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ]}
                data={categories[selectedCategory].data}
                height="350"
                width="900"
                xtitle=""
                ytitle="Score"
              />
            </div>
          </div>
          <div className="admin-right">
            <div className="total-score" onClick={()=>handleTotalScoreClick}>
              <div className="Summary">
                <img src={e_img} className="letter" alt="E" style={{height:'1.5vw',width:"1.5vw"}}/>
                <img src={sum_img} className="operator" alt="+" />
                <img src={s_img} className="letter" alt="S" style={{height:'1.5vw',width:"1.5vw"}}/>
                <img src={sum_img} className="operator" alt="+" />
                <img src={g_img} className="letter" alt="G" style={{height:'1.5vw',width:"1.5vw"}}/>
                <img src={equal_img} className="operator" alt="=" />
                <img src={esg} className="letter" alt="ESG"
                style={{height:'1.5vw',width:"1.5vw"}}/>
                </div>
                <h1>Overall Score</h1>
                <h2>90</h2>
                <p>Click to View Individual Scores</p>
              </div>
              <div className="improvement">
                <h1>Summary : </h1>
                <ul>
                  <li>The score 68 is combined output of all the indicators falling under SDG 11. This score indicates the actual picture of City Ayodhya and also the areas where improvements are required. </li> 
                   <li>CSI serves as a benchmarking tool, allowing cities to compare their sustainability performance with peers regionally and globally, fostering healthy competition and knowledge exchange.</li> 
                   <li>CSI promotes integrated and balanced urban development strategies.</li> 
                </ul>
                <h1>Areas of Improvement</h1>
                <ul>
                  <li>Air Quality</li>
                  <li>Green space</li>
                  <li>Land Use</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </>
    );
  };
  
  export default Admin;
  