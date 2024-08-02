import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import inc from "./images/arrows.svg";
import dec from "./images/arrow.svg";
import { Link } from "react-router-dom";

const SdgCard = ({ sdg }) => {
  useEffect(() => {
    if (sdg.description >= 35) setColor("#Ffaf00");
    if (sdg.description >= 70) setColor("green");
  }, []);

  const [color, setColor] = useState("red");
  const strokeWidth = 9;
  const cx = 50;

  const cy = 50;
  const r = 45;
  const circumference = 2 * 3.14 * r;

  // const animations = {
  //  initial: {
  //      transform: "rotateY(0deg)",
  //  },
  //  animate: {
  //      transform: "rotateY(180deg)",
  //      transition: { repeat: 1, repeatType: "reverse", delay: 1 },
  //  },
  //  final: {
  //      transform: "rotateY(180deg)",
  //      transition: { duration: 1 },
  //  },
  // };

  return (
    <>
      <div>
        <Link to={sdg.link} className="sdg-card">
          <svg width={100} height={100} viewBox="0 0 100 100">
            <circle
              class="bg"
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke="#1a2c34"
              strokeOpacity="20%"
              strokeWidth={strokeWidth}
            />
            <motion.circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              stroke={color}
              transform="rotate(90deg)"
              initial={{
                strokeDashoffset: `calc(${circumference} - (0 / 100 * ${circumference}))`,
              }}
              animate={{
                strokeDashoffset: `calc(${circumference} - (${sdg.description} / 100 * ${circumference}))`,
              }}
              transition={{ duration: 0.8 }}
            />
          </svg>

          <div className="sdg-content">
            <div className="sdg-front">
              <img src={sdg.photo} className="sdg-logo" alt={sdg.title} />
            </div>
            <div className="sdg-back">
              <span className="progress-text bigger">{sdg.description}</span>
              {/* <span className='progress-text'>
                                (0)
                                <span>
                                    <img src={inc} style={{ height: "70%", width: "70", position: "relative", top: "15%" }} alt='' />
                                </span>
                            </span> */}
            </div>
          </div>
        </Link>
        <h3 className="sdg-title">{sdg.title}</h3>
      </div>
    </>
  );
};

export default SdgCard;
