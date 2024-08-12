import React, { useState, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import Temperature from './Environment/Temperature';
import axios from 'axios';
import './EDash.css';
import { color } from 'framer-motion';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const EDash = () => {
    const [templocation, setTempLocation] = useState([]);
    const [temptime, setTempTime] = useState([]);
    const [tempdate, setTempDate] = useState([]);
    const [temptimeStamp, setTempTimeStamp] = useState([]);
    const [temperature, setTemperature] = useState([]);
    const [humidity, setHumidity] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const temp = await axios.get("https://api-csi.arahas.com/data/environment/temperature");
            const tlocation = [];
            const ttimeStamp = [];
            const ttime = [];
            const tformattedDate = [];
            const tformattedTime = [];
            const tTemperature = [];
            const tHumidity = [];
            temp.data.data.forEach((item) => {
                tlocation.push(item.location);
                ttimeStamp.push(item.timeStamp);
                ttime.push(item.time);
                const dateObj = new Date(item.date);
                const year = dateObj.getFullYear();
                const month = dateObj.getMonth() + 1;
                const day = dateObj.getDate();
                const formatted = `${day}-${month < 10 ? "0" + month : month}-${year}`;
                tformattedDate.push(formatted);
                const localDateObj = new Date(
                    dateObj.getTime() + dateObj.getTimezoneOffset() * 60000
                );
                const hours = localDateObj.getHours();
                const minutes = localDateObj.getMinutes();
                const formattedTimeStr = `${hours < 10 ? "0" + hours : hours}:${minutes}`;
                tformattedTime.push(formattedTimeStr);
                tTemperature.push(item.temperature);
                tHumidity.push(item.humidity);
            });
            setTempLocation(tlocation);
            setTempTimeStamp(ttimeStamp);
            setTempTime(tformattedTime);
            setTempDate(tformattedDate);
            setTemperature(tTemperature);
            setHumidity(tHumidity);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const averageAQI = 372;
    const severeAQIDays = 196;
    const heatwaveDays = 42;
    const averageTemperature = 41.7;
    const maxTemperature = 44.5;
    const minTemperature = 40.0;

    const temperatureData = [
        { label: 'Jan 2024', y: 30 },
        { label: 'Feb 2024', y: 32 },
        { label: 'Mar 2024', y: 35 },
        { label: 'Apr 2024', y: 38 },
        // Add more months as needed
    ];

    const rainfallData = [
        { label: 'Monsoon', y: 3762 , color: "#00A269"},
        { label: 'Winter', y: 176 ,color: "rgb(184, 184, 184)"},
        { label: 'Summer', y: 786 , color: "#A9F3E0"},
        { label: 'Spring', y: 150,color: "grey" },
    ];

    const greenAreaData = [
        { label: 'Agriculture', y: 35.96, color: "#00A269" }, // Green
        { label: 'Open Land', y: 33.84, color: "rgb(184, 184, 184)" }, // Rich Purple
        { label: 'Fallow Land', y: 32.61, color: "#A9F3E0" }, // Orange
        { label: 'Settlement', y: 16.11, color: "grey" }, // Grey
        { label: 'Vegetation', y: 10.45, color: "#00A269" }, // Green
    ];

    const gfcData = [
        { label: 'GFC Star 1', y: 426 },
        { label: 'GFC Star 2', y: 229 },
        { label: 'GFC Star 5', y: 15 },
        { label: 'GFC Star 7', y: 3 },
    ];

    const odfData = [
        { label: 'ODF Certified', y: 4575 },
        { label: 'ODF+ Certified', y: 3912 },
        { label: 'ODF++ Certified', y: 1428 },
        { label: 'Water+ Certified', y: 64 },
    ];


    const optionsRainfallChart = {
        animationEnabled: true,
        title: {
            text: 'Rainfall Distribution',
            fontSize: 10,
            fontFamily: "Inter",
            fontWeight: 600,
            padding: 10,
        },
        height: 230,
        data: [{
            type: 'pie',
            toolTipContent: '{label}: <strong>{y} mm</strong>',
            indexLabel: '{label} - {y} mm',
            dataPoints: rainfallData,
            indexLabelFontColor: "#00A269", // Use the green color for labels
        }],
    };

    const optionsGreenAreaChart = {
        animationEnabled: true,
        title: {
            text: 'Green Area Cover Distribution',
            fontSize: 10,
            fontFamily: "Inter",
            fontWeight: 600,
            padding: 10,
        },
        height: 200,
        data: [{
            type: 'doughnut',
            indexLabel: '{label} - {y} sq km',
            dataPoints: greenAreaData,
            indexLabelFontColor: "grey", // Use the grey color for labels
        }],
    };

    const optionsGFCChart = {
        animationEnabled: true,
        title: {
            text: 'Garbage Free City (GFC) Distribution',
            fontSize: 10,
            fontFamily: "Inter",
            fontWeight: 600,
            padding: 10,
        },
        height: 200,
        axisX: {
            title: '',
            gridThickness: 0,
        },
        axisY: {
            title: 'Number of Cities',
            fontSize: 5,
            gridThickness: 0,
        },
        data: [{
            type: 'bar',
            indexLabel: '{y}',
            dataPoints: gfcData,
            color: "#00A269", // Use the orange color
            indexLabelFontColor: "grey", // Use the orange color for labels
        }],
    };

    const optionsODFChart = {
        animationEnabled: true,
        title: {
            text: 'Open Defecation Free (ODF) Certification',
            fontSize: 10,
            fontFamily: "Inter",
            fontWeight: 600,
            padding: 10,
        },
        height: 200,
        axisX: {
            title: '',
            gridThickness: 0,
        },
        axisY: {
            title: 'Number of Cities',
            gridThickness: 0,
        },
        data: [{
            type: 'column',
            indexLabel: '{y}',
            dataPoints: odfData,
            color: "#00A269", // Use the grey color
            indexLabelFontColor: "grey", // Use the grey color for labels
        }],
    };

    return (
        <div className="dashboard-container">
            <div className="row-cards">
                <div className="card-mini">
                    <h3>Average AQI: {averageAQI}</h3>
                </div>
                <div className="card-mini">
                    <h3>Severe AQI Days: {severeAQIDays}</h3>
                </div>
                <div className="card-mini">
                    <h3>Heatwave Days: {heatwaveDays}</h3>
                </div>
                <div className="card-mini">
                    <h3>Avg Temperature  {averageTemperature}°C</h3>
                    <h3>Max Temperature  {maxTemperature}°C</h3>
                    <h3>Min Temperature  {minTemperature}°C</h3>
                </div>
            </div>
            <div className="row-cards">
                <div className="dashboard-chart">
                    {templocation.length > 0 && (
                        <Temperature
                            templocation={templocation}
                            tempdate={tempdate}
                            temptime={temptime}
                            temptimeStamp={temptimeStamp}
                            temperature={temperature}
                            humidity={humidity}
                        />
                    )}
                </div>
                <div className="dashboard-chart">
                    <CanvasJSChart options={optionsRainfallChart} />
                </div>
            </div>
            <div className="row-cards">
                <div className="dashboard-chart">
                    <CanvasJSChart options={optionsGreenAreaChart} />
                </div>
                <div className="dashboard-chart">
                    <CanvasJSChart options={optionsGFCChart} />
                </div>
                <div className="dashboard-chart">
                    <CanvasJSChart options={optionsODFChart} />
                </div>
            </div>
        </div>
    );
};

export default EDash;
