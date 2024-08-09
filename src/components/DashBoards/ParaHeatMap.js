import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import CircularProgress from "@mui/material/CircularProgress";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Style, Fill, Stroke, Icon } from "ol/style";
import { Feature } from "ol";
import Point from "ol/geom/Point";
import Overlay from "ol/Overlay";
import ayodhya_villages from "../images/ayodhya_village.json";
import ayodhya from "../images/ayodhya.json";
import waste_map from "../images/waste_map.png";
import axios from "axios";

const ParaHeatMap = ({ Parameter,startDate, endDate} ) => {
  const mapRef = useRef();
  // const [startDate, setStartDate] = useState(new Date("2024-01-08"));
  // const [endDate, setEndDate] = useState(new Date("2024-02-28"));
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading status
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(false); // Set loading to true when fetching data
        const startDateFormatted = formatDate(startDate);
        const endDateFormatted = formatDate(endDate);
        const response = await axios.get(
          `https://mapapi-ezzq.onrender.com/map?start_date=${startDateFormatted}&end_date=${endDateFormatted}&param=${Parameter}`
        );
        setData(response.data.features);
        console.log(response.data.features);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false when data fetching is done
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
        zoom: 10.5,
      }),
    });

    const villageSource = new VectorSource({
      features: new GeoJSON().readFeatures(ayodhya_villages, {
        featureProjection: "EPSG:3857",
      }),
    });

    const boundarySource = new VectorSource({
      features: new GeoJSON().readFeatures(ayodhya, {
        featureProjection: "EPSG:3857",
      }),
    });

    const formattedData = data.map((feature) => ({
      AQI: feature.properties.AQI,
      Temperature: feature.properties.Temperature,
      Village: feature.properties.Village,
      Latitude: feature.properties.latitude,
      Longitude: feature.properties.longitude,
    }));

    const villageLayer = new VectorLayer({
      source: villageSource,
      style: (feature) => {
        const villageName = feature.get("VILLAGE_NA");
        const villageData = formattedData.find(
          (item) => item.Village === villageName
        );

        let fillColor = "grey";
        if (villageData) {
          if (Parameter === "temp") {
            const temperatureValue = villageData.Temperature;
            if (temperatureValue < 10) fillColor = "#F2ECBE";
            else if (temperatureValue < 20) fillColor = "#FFBB5C";
            else if (temperatureValue < 30) fillColor = "#F94C10";
            else if (temperatureValue < 40) fillColor = "#E25E3E";
            else if (temperatureValue < 50) fillColor = "#C63D2F";
            else fillColor = "red";
          } else if (Parameter === "aqi") {
            const aqiValue = villageData.AQI;
            if (aqiValue <= 50) fillColor = "#0A6847";
            else if (aqiValue <= 100) fillColor = "#48bb78";
            else if (aqiValue <= 200) fillColor = "#f6e05e";
            else if (aqiValue <= 300) fillColor = "#ed8936";
            else if (aqiValue <= 400) fillColor = "#f56565";
            else fillColor = "#c53030";
          } else if (Parameter === "rainfall") {
            fillColor = "#A7E6FF";
          }
        }

        return new Style({
          fill: new Fill({
            color: fillColor,
          }),
          stroke: new Stroke({
            color: "#a9f3e0",
            width: 1,
          }),
        });
      },
    });

    const boundaryLayer = new VectorLayer({
      source: boundarySource,
      style: new Style({
        stroke: new Stroke({
          color: "#00a269",
          width: 2,
        }),
      }),
    });

    const markers = [
      {
        lat: 26.774794,
        lon: 82.134539,
        village: "Faizabad",
        location: "Civil Lines, Tiny Tots School",
      },
      {
        lat: 26.767421,
        lon: 82.09535,
        village: "Haibatpur",
        location: "Shahadat Ganj",
      },
      {
        lat: 26.764028,
        lon: 82.133778,
        village: "Jiyan Pur",
        location: "Bank colony near Railway station",
      },
      {
        lat: 26.735415,
        lon: 82.140133,
        village: "Katrauli",
        location: "near Airport",
      },
      {
        lat: 26.777265,
        lon: 82.185866,
        village: "Ranopali",
        location: "Ranopali near Kila ayodhya",
      },
    ];

    const markerSource = new VectorSource();
    markers.forEach((marker) => {
      const villageData = formattedData.find(
        (item) => item.Village === marker.village
      );
      const parameterValue = villageData
        ? Parameter === "temp"
          ? villageData.Temperature
          : Parameter === "rainfall"
          ? "1135"
          : villageData.AQI
        : "No data";

      const feature = new Feature({
        geometry: new Point(fromLonLat([marker.lon, marker.lat])),
        name: marker.location,
        parameterValue,
        village: marker.village,
        isMarker: true, // Add this property to distinguish markers
      });

      feature.setStyle(
        new Style({
          image: new Icon({
            src: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
            scale: 0.5,
          }),
        })
      );

      markerSource.addFeature(feature);
    });

    const markerLayer = new VectorLayer({
      source: markerSource,
    });

    const overlayContainer = document.createElement("div");
    overlayContainer.className = "popup-overlay";
    document.body.appendChild(overlayContainer);

    const overlay = new Overlay({
      element: overlayContainer,
      positioning: "bottom-center",
      stopEvent: false,
      offset: [0, -10],
    });

    map.addOverlay(overlay);

    map.on("pointermove", (event) => {
      const feature = map.getFeaturesAtPixel(event.pixel)[0];
      if (feature && feature.get("isMarker")) {
        // Check if the feature is a marker
        const coordinates = feature.getGeometry().getCoordinates();
        overlay.setPosition(coordinates);

        const location = feature.get("name");
        const parameterValue = feature.get("parameterValue");

        overlayContainer.innerHTML = `<div class='popup-content'>${location}: ${parameterValue} ${
          Parameter === "temp" ? "°C" : Parameter === "rainfall" ? "mm" : "AQI"
        }</div>`;
        overlayContainer.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        overlayContainer.style.border = "1px solid black";
        overlayContainer.style.padding = "0.5vw";
        overlayContainer.style.borderRadius = "5px";
        overlayContainer.style.fontSize = "0.8vw";
        overlayContainer.style.fontWeight = "700";
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


  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const renderLegend = () => {
    if (Parameter === "temp") {
      return (
        <div className="legend">
          <div>
            <span style={{ background: "#F2ECBE" }}></span> {`< 10`}°C
          </div>
          <div>
            <span style={{ background: "#FFBB5C" }}></span> (10 - 20)°C
          </div>
          <div>
            <span style={{ background: "#F94C10" }}></span> (20 - 30)°C
          </div>
          <div>
            <span style={{ background: "#E25E3E" }}></span> (30 - 40)°C
          </div>
          <div>
            <span style={{ background: "#C63D2F" }}></span> (40 - 50)°C
          </div>
          <div>
            <span style={{ background: "brown" }}></span> {`> 50`}°C
          </div>
        </div>
      );
    } else if (Parameter === "aqi") {
      return (
        <div className="legend">
          <div>
            <span style={{ background: "#0A6847" }}></span> 0 - 50
          </div>
          <div>
            <span style={{ background: "#48bb78" }}></span> 51 - 100
          </div>
          <div>
            <span style={{ background: "#f6e05e" }}></span> 101 - 200
          </div>
          <div>
            <span style={{ background: "#ed8936" }}></span> 201 - 300
          </div>
          <div>
            <span style={{ background: "#f56565" }}></span> 301 - 400
          </div>
          <div>
            <span style={{ background: "#c53030" }}></span> 401 - 500
          </div>
        </div>
      );
    } else if (Parameter === "rainfall") {
      return (
        <div className="legend">
          <div>
            <span style={{ background: "blue" }}></span>Expected Rainfall{" "}
          </div>
          <div>
            <span style={{ background: "#A7E6FF" }}></span>Actual Rainfall
          </div>
        </div>
      );
    } else if (Parameter === "waste") {
      return (
        <div className="legend">
          <div>
            <span style={{ background: "blue" }}></span>Uncollected Waste
          </div>
          <div>
            <span style={{ background: "green" }}></span>Collected Waste
          </div>
        </div>
      );
    }
  };

  return (
    <>
      {loading ? ( // Conditional rendering based on loading state
        <CircularProgress />
      ) : (
        <div
        //  className="full-map-container"
         >
         
          {Parameter === "waste" && <img src={waste_map} />}
          {["aqi", "temp", "rainfall"].includes(Parameter) && (
            <div>
            <div ref={mapRef} className="para-map"></div>
            
            </div>
          )}

          {renderLegend()}
          
        </div>
      )}
      <div>{}</div>
    </>
  );
};

export default ParaHeatMap;
