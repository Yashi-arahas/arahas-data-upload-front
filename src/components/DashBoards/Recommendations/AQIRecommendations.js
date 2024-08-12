import React from 'react'
import { Card } from 'primereact/card';
const AQIRecommendations = ({aqi}) => {
    const getRecommendation = (aqi) => {
        if (aqi <= 50) {
          return "Good: Air quality is considered satisfactory, and air pollution poses little or no risk.";
        } else if (aqi <= 100) {
          return "Moderate: Air quality is acceptable; however, some pollutants may be a concern for a small number of people.";
        } else if (aqi <= 150) {
          return "Unhealthy for Sensitive Groups: Members of sensitive groups may experience health effects. The general public is less likely to be affected.";
        } else if (aqi <= 200) {
          return "Unhealthy: Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.";
        } else if (aqi <= 300) {
          return "Very Unhealthy: Health alert; everyone may experience more serious health effects.";
        } else {
          return "Hazardous: Health warnings of emergency conditions. The entire population is more likely to be affected.";
        }
      };
      
  return (
    <div>
        <Card>
        <p>{getRecommendation(aqi)}</p>
        </Card>
      
    </div>
  )
}

export default AQIRecommendations
