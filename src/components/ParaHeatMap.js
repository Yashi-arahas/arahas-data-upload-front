import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Fill, Stroke, Icon } from 'ol/style';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import Overlay from 'ol/Overlay';
import ayodhya_villages from './images/ayodhya_village.json';
import ayodhya from './images/ayodhya.json';
import './Admin.css';

const ParaHeatMap = ({ Parameter }) => {
  const mapRef = useRef();
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
        data.features.map((a)=>{
          console.log(a.properties.Village)
        }
         
        )
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [startDate, endDate, Parameter]);

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([82.1225, 26.7532]),
        zoom: 11,
      }),
    });

    const villageSource = new VectorSource({
      features: new GeoJSON().readFeatures(ayodhya_villages, {
        featureProjection: 'EPSG:3857',
      }),
    });

    const boundarySource = new VectorSource({
      features: new GeoJSON().readFeatures(ayodhya, {
        featureProjection: 'EPSG:3857',
      }),
    });
    

    const villageLayer = new VectorLayer({
      source: villageSource,
      style: (feature) => {
        const villageName = feature.get('VILLAGE_NA');
        const villageData = formattedData.find(item => item.Village === villageName);

        let fillColor = '#A7E6FF';
        if (villageData) {
          if (Parameter === 'temp') {
            const temperatureValue = villageData.Temperature;
            if (temperatureValue < 10) fillColor = '#F2ECBE';
            else if (temperatureValue < 20) fillColor = '#FFBB5C';
            else if (temperatureValue < 30) fillColor = '#F94C10';
            else if (temperatureValue < 40) fillColor = '#E25E3E';
            else if (temperatureValue < 50) fillColor = '#C63D2F';
            else fillColor = 'red';
          } else if (Parameter === 'aqi') {
            const aqiValue = villageData.AQI;
            if (aqiValue <= 50) fillColor = '#0A6847';
            else if (aqiValue <= 100) fillColor = '#7ABA78';
            else if (aqiValue <= 200) fillColor = '#CA8787';
            else if (aqiValue <= 300) fillColor = '#FFC100';
            else if (aqiValue <= 400) fillColor = '#FF6500';
            else fillColor = '#C40C0C';
          }
        }

        return new Style({
          fill: new Fill({
            color: fillColor,
          }),
          stroke: new Stroke({
            color: 'black',
            width: 1,
          }),
        });
      },
    });

    const boundaryLayer = new VectorLayer({
      source: boundarySource,
      style: new Style({
        stroke: new Stroke({
          color: '#000000',
          width: 2,
        }),
      }),
    });

    const formattedData = data.map(feature => ({
      AQI: feature.properties.AQI,
      Temperature: feature.properties.Temperature,
      Village: feature.properties.Village,
      Latitude: feature.properties.latitude,
      Longitude: feature.properties.longitude,
    }));

    const markers = [
      { lat: 26.774794, lon: 82.134539, village: "Faizabad", location: "Civil Lines, Tiny Tots School" },
      { lat: 26.767421, lon: 82.09535, village: "Shahadat Ganj", location: "Ayodhya-Shahadat Ganj" },
      { lat: 26.764028, lon: 82.133778, village: "Jiyan Pur", location: "Ayodhya-Bank colony near Railway station" },
      { lat: 26.735415, lon: 82.140133, village: "nakka", location: "Ayodhya-near Airport" },
      { lat: 26.777265, lon: 82.185866, village: "Ranopali", location: "Ayodhya-Ranopali near Kila ayodhya" }
    ];

    const markerSource = new VectorSource();
    markers.forEach(marker => {
      const villageData = formattedData.find(item => item.Village === marker.village);
      const parameterValue = villageData ? (Parameter === 'temp' ? villageData.Temperature : villageData.AQI) : 'No data';

      const feature = new Feature({
        geometry: new Point(fromLonLat([marker.lon, marker.lat])),
        name: marker.location,
        parameterValue,
        village: marker.village,
      });

      feature.setStyle(new Style({
        image: new Icon({
          src: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
          scale: 0.5,
        }),
      }));


      markerSource.addFeature(feature);
    });

    const markerLayer = new VectorLayer({
      source: markerSource,
    });

    const overlayContainer = document.createElement('div');
    overlayContainer.className = 'popup-overlay';
    document.body.appendChild(overlayContainer);

    const overlay = new Overlay({
      element: overlayContainer,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, -10],
    });

    map.addOverlay(overlay);

    map.on('pointermove', (event) => {
      const feature = map.getFeaturesAtPixel(event.pixel)[0];
      if (feature) {
        const coordinates = feature.getGeometry().getCoordinates();
        overlay.setPosition(coordinates);

        const location = feature.get('name');
        const parameterValue = feature.get('parameterValue');
        
        overlayContainer.innerHTML = `<div class='popup-content'>${location}: ${parameterValue} ${Parameter === 'temp' ? '°C' : 'AQI'}</div>`;
        overlayContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        overlayContainer.style.border = '1px solid black';
        overlayContainer.style.padding = '5px';
        overlayContainer.style.borderRadius = '5px';
      } else {
        overlay.setPosition(undefined);
      }
    });

    map.addLayer(villageLayer);
    map.addLayer(boundaryLayer);
    map.addLayer(markerLayer);

    return () => {
      map.setTarget(null);
      if (overlayContainer && overlayContainer.parentNode) {
        overlayContainer.parentNode.removeChild(overlayContainer);
      }
    };
  }, [data, Parameter]);

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
      <div ref={mapRef} className='map' style={{width:"60vw", height:"30vw"}}></div>
    </div>
  );
};

export default ParaHeatMap;
