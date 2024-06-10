import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ayodhya from './images/ayodhya.json';
import ayodhya_villages from './images/ayodhya_village.json';
import "./Admin.css"

const ParaHeatMap = ({Parameter}) => {
  console.log(Parameter);
  const [startDate, setStartDate] = useState(new Date('2024-01-08'));
  const [endDate, setEndDate] = useState(new Date('2024-02-28'));
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const startDateFormatted = formatDate(startDate);
        const endDateFormatted = formatDate(endDate);
        const response = await fetch(`https://mapapi-ezzq.onrender.com/map?start_date=${startDateFormatted}&end_date=${endDateFormatted}&param=${Parameter}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setData(data.features);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [startDate, endDate, Parameter]);

  const handleStartDateChange = (event) => {
    setStartDate(new Date(event.target.value));
  };

  const handleEndDateChange = (event) => {
    setEndDate(new Date(event.target.value));
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formattedData = data.map(feature => ({
    AQI: feature.properties.AQI,
    Temperature: feature.properties.Temperature,
    Village: feature.properties.Village,
    Latitude: feature.properties.latitude,
    Longitude: feature.properties.longitude
  }));

  const style = (feature) => {
    const villageName = feature.properties?.VILLAGE_NA;
    const villageData = formattedData.find(item => item.Village === villageName);

    let fillColor = '#808080'; // Default gray color if data is not available
    if (villageData) {
      if (Parameter === "temp") {
        const temperatureValue = villageData.Temperature;
        if (temperatureValue < 10) {
          fillColor = '#F2ECBE';
        } else if (temperatureValue < 20) {
          fillColor = '#FFBB5C';
        } else if (temperatureValue < 30) {
          fillColor = '#F94C10';
        } else if (temperatureValue < 40) {
          fillColor = '#E25E3E';
        } else if (temperatureValue < 50) {
          fillColor = '#C63D2F';
        } else {
          fillColor = 'red';
        }
      } else if (Parameter === "aqi") {
        const aqiValue = villageData.AQI;
        if (aqiValue <= 50) {
          fillColor = '#0A6847'; // Good (Green)
        } else if (aqiValue <= 100) {
          fillColor = '#7ABA78'; // Moderate (Yellow)
        } else if (aqiValue <= 200) {
          fillColor = '#CA8787'; // Unhealthy for Sensitive Groups (Orange)
        } else if (aqiValue <= 300) {
          fillColor = '#FFC100'; // Unhealthy (Red)
        } else if (aqiValue <= 400) {
          fillColor = '#FF6500'; // Very Unhealthy (Purple)
        } else {
          fillColor = '#C40C0C'; // Hazardous (Maroon)
        }
      }
    }

    return {
      fillColor: fillColor,
      weight: 1,
      opacity: 1,
      color: 'black',
      fillOpacity: 0.7
    };
  };

  return (
    <div>
      <div className='date-select'>
        <div>
          <label htmlFor='start-date'>Start Date :&nbsp; </label>
          <input
            type='date'
            id='start-date'
            value={formatDate(startDate)}
            onChange={handleStartDateChange}
          />
        </div>
        <div>
          <label htmlFor='end-date'>End Date :&nbsp;</label>
          <input
            type='date'
            id='end-date'
            value={formatDate(endDate)}
            onChange={handleEndDateChange}
          />
        </div>
      </div>

      <MapContainer
        center={[26.7532, 82.1225]}
        zoom={11}
        attributionControl={false}
        zoomControl={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        dragging={false}
        animate={true}
        easeLinearity={0.35}
        style={{ width: '60vw', height: '30vw' }}
      >
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <GeoJSON data={ayodhya_villages} style={style} />
        <GeoJSON data={ayodhya} fill={false} color='#000000' />
      </MapContainer>
    </div>
  );
};

export default ParaHeatMap;
