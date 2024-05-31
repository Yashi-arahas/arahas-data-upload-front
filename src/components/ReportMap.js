import React, { useRef, useEffect } from 'react';
import "./Admin.css";
import sample from "./images/bg_video.mp4";
import Header from './Header';

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
        
        <button className='report-button'>Report</button>
        <button className='report-button'>Map</button>
      </div>
    </div>
  );
}

export default ReportMap;
