import React from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import ADABoundary from "./ADA_Boundary.json";
import { Icon } from 'leaflet';

const AqiMap = ({ averageAQI , latestDate}) => {
  console.log(averageAQI)
    const markers = [
        {
          location: "Ayodhya - Civil line,Tiny tots school",
          lat: 26.774794,
          lon: 82.134539,
          default_message: "Civil line, Tiny tots school"
        },
        {
          location: "Ayodhya - Shahadat Ganj",
          lat: 26.767421,
          lon: 82.09535,
          default_message: "Shahadat Ganj"
        },
        {
          location: "Ayodhya-Bank colony near Railway station",
          lat: 26.764028,
          lon: 82.133778,
          default_message: "Bank Colony Near Railway Station"
        },
        {
          location: "Ayodhya-near Airport",
          lat: 26.735415,
          lon: 82.140133,
          default_message: "Near Airport"
        },
        {
          location: "Ayodhya-Ranopali near Kila ayodhya",
          lat: 26.777265,
          lon: 82.185866,
          default_message: "Ranopali Near Kila Ayodhya"
        },
        
    ];
    
    const icon= new Icon({
        iconUrl: require("./location.png"),
        iconAnchor: [12, 41],
        popupAnchor: [0, -41],
        iconSize: [30, 30]
    });
  
    const mapCenter = [26.783869, 82.144132];

    return (
        <MapContainer
            attributionControl={false}
            zoomControl={true}
            doubleClickZoom={true}
            scrollWheelZoom={true}
            dragging={true}
            animate={true}
            easeLinearity={0.35}
            center={mapCenter}
            zoom={11}
            minZoom={10}
            style={{ width: "100%", height: "25vw", position: "relative" , borderRadius:"10px"}} // Position relative to contain absolute positioning of text
        >
            <TileLayer url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" />

            <GeoJSON data={ADABoundary} style={{ color: "#fd9d24" }} />

            {markers.map((marker, index) => {
                // Find average AQI value for the current location
                const averageAqiForLocation = averageAQI.find((item) => item.location === marker.location);
                const message = averageAqiForLocation ? `Average AQI: ${averageAqiForLocation.AQI}` : `Average AQI: Not Found`;
                console.log(message);
                return (
                    <Marker key={index} position={[marker.lat, marker.lon]} icon={icon}>
                        <Popup>
                            <>
                                <p>{marker.default_message}</p>
                                <p>{message}</p>
                            </>
                        </Popup>
                    </Marker>
                );
            })}

            {/* Text container positioned absolutely within the map */}
            <div style={{ position: "absolute", top: "1vw", left: "38%", zIndex: 1000, backgroundColor:"White",padding:"0.3vw 0 0 0", borderRadius:"10px", boxShadow:" 0 0 10px -4px rgba(0,0,0,0.7)"
            }}>
                <h1>AQI Level for {latestDate}</h1>
            </div>
        </MapContainer>
    );
};

export default AqiMap;
