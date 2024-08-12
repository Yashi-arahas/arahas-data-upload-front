import React from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Tooltip,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ayodhya from "./images/ayodhya.json";
import ayodhya_villages from "./images/ayodhya_village.json";

const p1 = [26.764028, 82.133778];
const p2 = [26.777265, 82.185866];
const p3 = [26.767421, 82.09535];
const p4 = [26.774794, 82.134539];
const p5 = [26.735415, 82.140133];

const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png",
  iconSize: [10, 15],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Map = () => {
  const mapCenter = [26.7532, 82.1225];
  return (
    <div className="flex w-full ">
      <MapContainer
        center={mapCenter}
        zoom={10}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <GeoJSON
          data={ayodhya_villages}
          fill={false}
          weight={1}
          color="#00A269"
          opacity={0.3}
        />
        <GeoJSON data={ayodhya} fill={"#A9F3E0"} color="#00A269" />

        <Marker position={p1} icon={greenIcon}>
          <Tooltip>
            <h1 style={{ fontSize: "0.6vw", fontWeight: "800" }}>
              Bank colony near Railway station
            </h1>
            <h1 style={{ fontSize: "0.6vw", fontWeight: "600" }}>
              Lat: {p1[0].toFixed(2)} &nbsp; Long: {p1[1].toFixed(2)}
            </h1>
          
          </Tooltip>
        </Marker>
        <Marker position={p2} icon={greenIcon}>
          <Tooltip>
            <h1 style={{ fontSize: "0.6vw", fontWeight: "800" }}>
              Ranopali near Kila ayodhya
            </h1>
            <h1 style={{ fontSize: "0.6vw", fontWeight: "600" }}>
              Lat: {p2[0].toFixed(2)} &nbsp; Long: {p2[1].toFixed(2)}
            </h1>
          </Tooltip>
        </Marker>
        <Marker position={p3} icon={greenIcon}>
          <Tooltip>
            <h1 style={{ fontSize: "0.6vw", fontWeight: "800" }}>
              Shahadat Ganj
            </h1>
            <h1 style={{ fontSize: "0.6vw", fontWeight: "600" }}>
              Lat: {p3[0].toFixed(2)} &nbsp; Long: {p3[1].toFixed(2)}
            </h1>
          </Tooltip>
        </Marker>
        <Marker position={p4} icon={greenIcon}>
          <Tooltip>
            <h1 style={{ fontSize: "0.6vw", fontWeight: "800" }}>
              Civil Lines, Tiny Tots School
            </h1>
            <h1 style={{ fontSize: "0.6vw", fontWeight: "600" }}>
              Lat: {p4[0].toFixed(2)} &nbsp; Long: {p4[1].toFixed(2)}
            </h1>
          </Tooltip>
        </Marker>
        <Marker position={p5} icon={greenIcon}>
          <Tooltip>
            <h1 style={{ fontSize: "0.6vw", fontWeight: "800" }}>
              Ayodhya near Airport
            </h1>
            <h1 style={{ fontSize: "0.6vw", fontWeight: "600" }}>
              Lat: {p5[0].toFixed(2)} &nbsp; Long: {p5[1].toFixed(2)}
            </h1>
          </Tooltip>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
