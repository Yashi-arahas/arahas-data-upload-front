import React, { useRef, useEffect } from 'react';
import "./Admin.css";
import sample from "./images/bg_video.mp4";
import Header from './Header';
import report from "./images/img_report.png";
import map from "./images/map.png";

const ReportMap = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Set the playback rate to 0.5 for half speed
    }
  }, []);

  return (
    <div>
      <Header />
      <div className='report'>
        <video
          className="video-background"
          autoPlay
          loop
          muted
          ref={videoRef} // Attach the ref to the video element
        >
          <source src={sample} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className='report-map-btn'>
          <a href="https://app.powerbi.com/groups/me/reports/4d6e245d-cf20-44e7-8b05-c6241bf7ebc6/3f76fa52298544041400?experience=power-bi" className='report-button'>
            <img src={report} alt="Report" />
            <h1>Report</h1>
          </a>
          <div className='report-button'>
            <img src={map} alt="Map" />
            <h1>Map</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportMap;
