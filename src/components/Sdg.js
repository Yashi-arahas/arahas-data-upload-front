import React, { useState } from "react";
import "./sdg.css";
import house from "./images/home.png";
import city from "./images/safe_space.png";
import disaster from "./images/disas.png";
import saveThePlanet from "./images/environment.png";
import group from "./images/tour.png";
import shipped from "./images/transport.png";
import historic from "./images/heri.png";
import cityscape from "./images/urban.png";
import testament from "./images/rescue.png";
import planning from "./images/plan.png";
import sex_ratio from "./images/sex-ratio.png";
import electricity from "./images/electricity.png";
import socio from "./images/diversity.png";
import crime from "./images/crime-scene.png"
import education from "./images/education.png"
import health from "./images/healthcare.png"
import SdgCard from "./SdgCard";
import Header from "./Header";
import OtherCard from "./OtherCards"

const Sdg = () => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const sdgs = [
    {
      title: "Safe and affordable housing",
      link: "/housing",
      photo: house,
      description: 98.35,
    },
    {
      title: "Affordable and sustainable transport systems",
      link: "/transport",
      photo: shipped,
      description: 100,
    },
    {
      title: "Inclusive and sustainable urbanization",
      link: "#",
      photo: cityscape,
      description: 78.57,
    },
    {
      title: "Protect the world's cultural and natural heritage",
      link: "#",
      photo: historic,
      description: 100,
    },
    {
      title: "Reduce the adverse effects of natural disasters",
      link: "#",
      photo: disaster,
      description: 20,
    },
    {
      title: "Reduce the environmental impacts of cities",
      link: "/environment",
      photo: saveThePlanet,
      description: 64.28,
    },
    {
      title: "Provide access to safe and inclusive green and public spaces",
      link: "#",
      photo: city,
      description: 40,
    },
    {
      title: "Strong national and regional development planning",
      link: "#",
      photo: planning,
      description: 100,
    },
    {
      title:
        "Implement policies for inclusion, resource efficiency and disaster risk reduction",
      link: "#",
      photo: testament,
      description: 100,
    },
    {
      title: "Tourist Influx",
      link: "/tourism",
      photo: group,
      description: 71.42,
    },
    {
      title: "Shakti Samriddhi",
      link: "/more-indicators/sex-ratio",
      photo: sex_ratio,
      description: 20,
    },
    {
      title: "Prakriti Urja",
      link: "/more-indicators/electricity",
      photo: electricity,
      description: 70,
    },
    {
      title: "Kala Sanskriti",
      link: "/more-indicators/socio-culture",
      photo: socio,
      description: 90,
    },
    {
      title: "Samajik Samriddhi",
      // "",
      link: "/more-indicators/crime",
      photo: crime,
      description: 90,
    },
    {
      title: "Swasthya Sambhava",
      link: "/more-indicators/health",
      photo: health,
      description: 90,
    },
    {
      title: "Vidya Samavesh",
      link: "/more-indicators/education",
      photo: education,
      description: 90,
    },
  ];

  return (
    <>
      <Header />
      <div className="sdg-main-container">
        {!showMore && (
          <>
            <div className="sdg-container">
              {sdgs.slice(0, 5).map((sdg, index) => (
                <SdgCard sdg={sdg} key={index} />
              ))}
            </div>
            <div className="page-title">
              <h1>
                City<span> Sustainability Index</span>
              </h1>
            </div>
            <div className="sdg-container">
              {sdgs.slice(5, 10).map((sdg, index) => (
                <SdgCard sdg={sdg} key={5 + index} />
              ))}
            </div>
          </>
        )}

        {!showMore && (
          <div className="view-btn">
            <button onClick={toggleShowMore}>View More</button>
          </div>
        )}
        <div className="sdg-container">
          {showMore &&
            sdgs
              .slice(10)
              .map((sdg, index) => <OtherCard sdg={sdg} key={10 + index}/>)}
        </div>
        {showMore && (
          <div className="view-btn">
            <button onClick={toggleShowMore}>Show Less</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Sdg;
