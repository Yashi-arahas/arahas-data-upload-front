import React from "react";
import "./sdg.css";
import house from "./images/home.png";
import city from './images/safe_space.png';
import disaster from "./images/disas.png";
import saveThePlanet from "./images/environment.png";
import group from "./images/tour.png";
import shipped from "./images/transport.png";
import historic from "./images/heri.png";
import cityscape from "./images/urban.png";
import testament from "./images/rescue.png";
import planning from "./images/plan.png";
import SdgCard from "./SdgCard";
import Header from "./Header"
 
const Sdg = () => {
    const sdgs = [
        {
            title: "Safe and affordable housing",
            link: "/housing",
            photo: house,
            description: 20,
        },
        {
            title: "Affordable and sustainable transport systems",
            link: "/transport",
            photo: shipped,
            description: 30,
        },
        {
            title: "Inclusive and sustainable urbanization",
            link: "#",
            photo: cityscape,
            description: 50,
        },
        {
            title: "Protect the world's cultural and natural heritage",
            link: "#",
            photo: historic,
            description: 70,
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
            description: 90,
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
            description: 60,
        },
        {
            title: "Implement policies for inclusion, resource efficiency and disaster risk reduction",
            link: "#",
            photo: testament,
            description: 85,
        },
        {
            title: "Tourist Influx",
            link: "/tourism",
            photo: group,
            description: 10,
        },
    ];
 
    return (
        <>
        <Header/>
            <div className='sdg-main-container'>
              
                <div className='sdg-container'>
                    {sdgs.slice(0, 5).map((sdg, index) => (
                        <SdgCard sdg={sdg} key={index} />
                    ))}
                </div>
                <div className='page-title'>
                    <h1>
                        City<span> Sustainability Index</span>
                    </h1>
                </div>
                <div className='sdg-container'>
                    {sdgs.slice(5).map((sdg, index) => (
                        <SdgCard sdg={sdg} key={5 + index} />
                    ))}
                </div>
            </div>
        </>
    );
};
 
export default Sdg;