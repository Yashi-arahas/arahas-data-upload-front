import React, { useEffect, useRef } from 'react';
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
import airport from "../../images/airport.webp"
import railway from "../../images/railway.avif"
import school from "../../images/tiny-school.jpg"
import temple from "../../images/ram-mandir.jpg"
import Shahadat from "../../images/shahadat.jpeg"
import AQI from "../../images/AQI.png"

import ADABoundary from './ADA_Boundary.json';

const AqiMap = ({ averageAQI, latestDate }) => {
  const mapRef = useRef();

  const getAqiIconColor = (aqi) => {
    if (aqi <= 50) return 'green';
    if (aqi <= 100) return 'yellow';
    if (aqi <= 200) return 'orange';
    if (aqi <= 300) return 'pink';
    if (aqi <= 400) return 'violet';
    if (aqi > 400) return 'deepred';
    return 'black';
  };

  const getAqiBackgroundColor = (aqi) => {
    if (aqi <= 50) return 'rgba(149, 226, 18, 0.8)'; // Green
    if (aqi <= 100) return 'rgba(255, 216, 26, 0.8)'; // Yellow
    if (aqi <= 200) return 'rgba(252, 123, 40,, 0.8)'; // Orange
    if (aqi <= 300) return 'rgba(253, 93, 165, 0.8)'; // Pink
    if (aqi <= 400) return 'rgba(102, 0, 153, 0.8)'; // Violet
    if (aqi > 400) return 'rgba(199, 5, 5, 0.8)'; // Deep red
    return 'white';
  };

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([82.144132, 26.783869]),
        zoom: 11,
      }),
    });

    const geojsonSource = new VectorSource({
      features: new GeoJSON().readFeatures(ADABoundary, {
        featureProjection: 'EPSG:3857',
      }),
    });

    const geojsonLayer = new VectorLayer({
      source: geojsonSource,
      style: new Style({
        stroke: new Stroke({
          color: '#fd9d24',
          width: 3,
        }),
        fill: new Fill({
          color: 'rgba(253, 157, 36, 0.3)',
        }),
      }),
    });

    map.addLayer(geojsonLayer);

    const markers = [
      {
        location: "Ayodhya - Civil line,Tiny tots school",
        lat: 26.774794,
        lon: 82.134539,
        default_message: "Civil line, Tiny tots school",
      },
      {
        location: "Ayodhya - Shahadat Ganj",
        lat: 26.767421,
        lon: 82.09535,
        default_message: "Shahadat Ganj",
      },
      {
        location: "Ayodhya-Bank colony near Railway station",
        lat: 26.764028,
        lon: 82.133778,
        default_message: "Bank Colony Near Railway Station",
      },
      {
        location: "Ayodhya-near Airport",
        lat: 26.735415,
        lon: 82.140133,
        default_message: "Near Airport",
      },
      {
        location: "Ayodhya-Ranopali near Kila ayodhya",
        lat: 26.777265,
        lon: 82.185866,
        default_message: "Ranopali Near Kila Ayodhya",
      },
    ];

    const markerSource = new VectorSource();
    markers.forEach((marker) => {
      const averageAqiForLocation = averageAQI.find((item) => item.location === marker.location);
      const aqi = averageAqiForLocation ? averageAqiForLocation.AQI : 'Not Found';
      const iconColor = getAqiIconColor(aqi);
      const backgroundColor = getAqiBackgroundColor(aqi);

      const feature = new Feature({
        geometry: new Point(fromLonLat([marker.lon, marker.lat])),
        name: marker.default_message,
        aqi,
        backgroundColor,
        location: marker.location, // Set the location attribute
      });
      

      feature.setStyle(
        new Style({
          image: new Icon({
            src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="${iconColor}" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9s-1.12 2.5-2.5 2.5z"/></svg>`,
            scale: 1, // Adjust the scale as needed
          }),
        })
      );

      markerSource.addFeature(feature);
    });

    const markerLayer = new VectorLayer({
      source: markerSource,
    });

    map.addLayer(markerLayer);

    const overlayContainerElement = document.createElement('div');
    overlayContainerElement.className = 'popup-overlay';
    document.body.appendChild(overlayContainerElement);

    const popupContent = document.createElement('div');
    popupContent.className = 'custom-popup';

    const popupBody = document.createElement('div');
    popupBody.className = 'popup-body';

    popupContent.appendChild(popupBody);
    

    const overlay = new Overlay({
      element: popupContent,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [200, 20],
    });

    map.addOverlay(overlay);

    popupContent.style.borderRadius = '10px';
    popupContent.style.padding = '0.5vw';
    popupContent.style.fontSize = "0.9vw";

    
    map.on('pointermove', function (event) {
      const feature = map.getFeaturesAtPixel(event.pixel)[0];
      if (feature && feature.get('name')) { // Check if feature is present and has a name (marker)
        const coordinate = feature.getGeometry().getCoordinates();
        overlay.setPosition(coordinate);
    
        const name = feature.get('name') || ''; // Use default value if undefined
        const aqi = feature.get('aqi') || ''; // Use default value if undefined
        const backgroundColor = feature.get('backgroundColor') || ''; // Use default value if undefined
        const location = feature.get('location') || ''; // Use default value if undefined
    
        let popupHTML = `
          <div>
            ${location === 'Ayodhya - Civil line,Tiny tots school' ? `<img src="${school}" alt="School" style="width: 100%; height: 9vw;"/>` : ''}
            ${location === 'Ayodhya - Shahadat Ganj' ? `<img src="${Shahadat}" alt="Shahadat" style="width: 100%; height: 9vw;"/>` : ''}
            ${location === 'Ayodhya-Bank colony near Railway station' ? `<img src="${railway}" alt="Railway" style="width: 100%; height: 9vw;"/>` : ''}
            ${location === 'Ayodhya-near Airport' ? `<img src="${airport}" alt="Airport" style="width: 100%; height: 9vw;"/>` : ''}
            ${location === 'Ayodhya-Ranopali near Kila ayodhya' ? `<img src="${temple}" alt="Temple" style="width: 100%; height: 9vw;"/>` : ''}
            <p><strong>${location}</strong> </p>
            <p>Last Updated on <strong>${latestDate}</strong></p>
          
            <p><strong> AQI Level: </strong>${aqi}</p>
            
          </div>
        `;
    
        popupBody.innerHTML = popupHTML;
        popupContent.style.backgroundColor = backgroundColor;
      } else {
        overlay.setPosition(undefined);
      }
    });
    
    
    
        

    return () => {
      map.setTarget(null);
      if (overlayContainerElement && overlayContainerElement.parentNode) {
        overlayContainerElement.parentNode.removeChild(overlayContainerElement);
      }
    };
  }, [averageAQI]);

  return (
    <div style={{ position: 'relative' }}>
      <div
        ref={mapRef}
        style={{
          width: '100%',
          height: '35vw',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          top: '1vw',
          left: '38%',
          zIndex: 1000,
          backgroundColor: 'white',
          padding: '0.3vw 0 0 0',
          borderRadius: '10px',
          boxShadow: '0 0 10px -4px rgba(0,0,0,0.7)',
        }}
      >
      </div>
    </div>
  );
};

export default AqiMap;
