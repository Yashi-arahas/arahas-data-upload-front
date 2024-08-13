import React, { useState, useEffect } from 'react';
import { Calendar } from 'primereact/calendar';
import axios from 'axios';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressSpinner } from 'primereact/progressspinner';
import "./Dash.css";
import good from "./DashImages/good.png";
import moderate from "./DashImages/moderate.png";
import poor from "./DashImages/poor.png";
import very_poor from "./DashImages/very_poor.png";
import severe from "./DashImages/severe.png";
import AqiReport from "../Environment/AqiReport"
import AQIChart from '../Environment/AQIChart';
import PollutantChart from './PollutantChart';
import { CustomBarChart, DonutChart } from '../GraphVisuals';

// Define the helper functions here
const formatDate = (date) => date.toISOString().split('T')[0]; // Format date to 'YYYY-MM-DD'
const formatTimeToHHMMSS = (time) => time.toISOString().split('T')[1].split('.')[0]; // Format time to 'HH:MM:SS'

const AqiDashboard = ({ onDataChange, show, pSelectedLocation, pSelectedStartDate, pSelectedEndDate }) => {
  
  const [startDate, setStartDate] = useState(new Date("2024-01-01"));
  const [endDate, setEndDate] = useState(new Date("2024-08-13"));
  const [aqiData, setAqiData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("Ayodhya - Civil line,Tiny tots ");
  const [aqiValue, setAqiValue] = useState(null);
  const [pm25Value, setPM25value] = useState(null);
  const [pm10Value, setPM10value] = useState(null);
  const [aqiStatus, setAqiStatus] = useState({ status: '', color: '', textColor: '', image: null });
  const [dataTableData, setDataTableData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [envirolocation, setEnviroLocation] = useState([]);
  const [envirotime, setEnviroTime] = useState([]);
  const [envirodate, setEnviroDate] = useState([]);
  const [enviropm25, setEnviroPM25] = useState([]);
  const [enviropm10, setEnviroPM10] = useState([]);
  const [enviroso2, setEnviroSO2] = useState([]);
  const [enviroAQI, setEnviroAQI] = useState([]);
  const [enviroNO2, setEnviroNO2] = useState([]);
  const [enviroco2, setEnviroco2] = useState([]);
  const [loading, setLoading] = useState(true); 
  
  const handleLocationChange = (e) => {
    if (show) {
      setSelectedLocation(e.value.code); 
    }
  };


  useEffect(() => {
    setLoading(true); // Start loading
    const fetchData = async () => {
      try {
          const startDateFormatted = formatDate(startDate);
          const endDateFormatted = formatDate(endDate);
          const response = await axios.get("https://api-csi.arahas.com/data/environment");
          const data = response.data.data;
          
          // Extract unique locations
          const uniqueLocations = Array.from(new Set(data.map(item => item.location)))
            .map(location => ({ name: location, code: location }));
          setLocations(uniqueLocations);
  
          // Filter and sort the data based on selected location and date range
          const filteredData = data.filter(item => {
              const itemDate = new Date(item.time);
              return (
                  item.location === selectedLocation &&
                  itemDate >= new Date(startDateFormatted) &&
                  itemDate <= new Date(endDateFormatted)
              );
          }).sort((a, b) => new Date(a.time) - new Date(b.time)); // Sort by time field
          
          const location = [];
          const time = [];
          const formattedDate = [];
          const formattedTime = [];
          const pm25 = [];
          const pm10 = [];
          const so2 = [];
          const AQI = [];
          const NO2 = [];
          const co2 = [];
  
          filteredData.forEach((item) => {
              location.push(item.location);
  
              // Convert date to 'YYYY-MM-DD' format from time
              const dateObj = new Date(item.time);
              const year = dateObj.getFullYear();
              const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
              const day = dateObj.getDate().toString().padStart(2, '0');
              const formattedDateStr = `${year}-${month}-${day}`;
              formattedDate.push(formattedDateStr);
  
              // Convert time to 'HH:MM:SS' format
              const timeObj = new Date(item.time);
              const hours = timeObj.getUTCHours().toString().padStart(2, '0');
              const minutes = timeObj.getUTCMinutes().toString().padStart(2, '0');
              const seconds = timeObj.getUTCSeconds().toString().padStart(2, '0');
              const formattedTimeStr = `${hours}:${minutes}:${seconds}`;
              formattedTime.push(formattedTimeStr);
  
              pm25.push(item.pm25);
              pm10.push(item.pm10);
              so2.push(item.so2);
              AQI.push(item.AQI);
              NO2.push(item.NO2);
              co2.push(item.co2);
          });
  
          setEnviroTime(formattedTime);
          setEnviroLocation(location);
          setEnviroDate(formattedDate);
          setEnviroPM25(pm25);
          setEnviroPM10(pm10);
          setEnviroSO2(so2);
          setEnviroAQI(AQI);
          setEnviroNO2(NO2);
          setEnviroco2(co2);
  
          // Calculate the average AQI
          if (filteredData.length > 0) {
              const averageAqi = (filteredData.reduce((sum, item) => sum + item.AQI, 0) / filteredData.length).toFixed(2);
              const averagepm25 = (filteredData.reduce((sum, item) => sum + item.pm25, 0) / filteredData.length).toFixed(2);
              const averagepm10 = (filteredData.reduce((sum, item) => sum + item.pm10, 0) / filteredData.length).toFixed(2);
              setPM25value(averagepm25);
              setPM10value(averagepm10);
              setAqiValue(averageAqi);
  
              if (onDataChange) {
                  onDataChange({ aqiValue: averageAqi, pm25Value: averagepm25, pm10Value: averagepm10 });
              }
              setAqiStatus(getAqiStatus(averageAqi));
          } else {
              setAqiValue(null);
              setAqiStatus({ status: '', color: '', textColor: '', image: null });
          }
  
          // Calculate deviations and filter outliers
          const filteredDataWithDeviation = filteredData
              .filter(item => item.AQI > 400)
              .map(item => ({
                  date: formatDate(new Date(item.time)),
                  time: formatTimeToHHMMSS(new Date(item.time)),
                  aqi: item.AQI,
                  deviationPercentage: ((item.AQI - 400) / 400 * 100).toFixed(2) + "%"
              }));
  
          // Ensure unique entries in the data table
          const uniqueDataTableData = Array.from(new Set(filteredDataWithDeviation.map(JSON.stringify)))
              .map(JSON.parse);
  
          setDataTableData(uniqueDataTableData);
  
      } catch (error) {
          console.error("Error fetching data:", error);
      } finally {
          setLoading(false); // End loading
      }
  };
  

    fetchData();
  }, [startDate, endDate, selectedLocation]);

  useEffect(() => {
    if (!show && pSelectedLocation) {
      setSelectedLocation(pSelectedLocation);
    }
  }, [show, pSelectedLocation]);

  useEffect(() => {
    if (!show && pSelectedStartDate) {
      setStartDate(pSelectedStartDate);
    }
  }, [show, pSelectedStartDate]);

  useEffect(() => {
    if (!show && pSelectedEndDate) {
      setEndDate(pSelectedEndDate);
    }
  }, [show, pSelectedEndDate]);

  function formatTimeToHHMMSS(isoDateString) {
    const dateObj = new Date(isoDateString);
    const hours = dateObj.getUTCHours().toString().padStart(2, '0');
    const minutes = dateObj.getUTCMinutes().toString().padStart(2, '0');
    const seconds = dateObj.getUTCSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatDateNew = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}-${month}-${year}`;
  };

  const getAqiStatus = (aqi) => {
    if (aqi >0 && aqi <=100) {
      return { status: 'Good', color: 'green', textColor: 'white', image: good };
    } else if (aqi >100 && aqi <=200) {
      return { status: 'Moderate', color: 'yellow', textColor: 'black', image: moderate };
    } else if (aqi>200 && aqi <= 300) {
      return { status: 'Poor', color: 'orange', textColor: 'black', image: poor };
    } else if (aqi>300 && aqi <=400) {
      return { status: 'Very Poor', color: 'red', textColor: 'white', image: very_poor };
    } else if(aqi>400){
      return { status: 'Severe', color: 'purple', textColor: 'white', image: severe };
    }
  };
  const handleStartDateChange = (e) => {
    setStartDate(e.value);
  };
  
  const handleEndDateChange = (e) => {
    setEndDate(e.value);
  };

  const { status: aqiStatusText, color, textColor, image: aqiImage } = aqiStatus;
  console.log(aqiStatus);
 

  const rowClassName = (data) => {
    return parseFloat(data.deviationPercentage) > 10 ? 'red-row' : '';
  };
  const categories = ["0-17", "18-65", "65+"];
  const series = [
      { female: 25, male: 30 },  // 0-17
      { female: 55, male: 60 },  // 18-65
      { female: 35, male: 40 }   // 65+
  ];
  const NO2impactlabels = [
    "Breathing Problems",
    "Cardiovascular Issues",
    "CNS Impact",
    "Liver/Spleen/Blood Impact",
  ];
  const NO2Impactseries = [1090, 815, 345, 245];
  return (
    <div className="aqi-dashboard">
    {loading ? (
      <div className="flex align-items-center justify-content-center h-100">
        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration="1s" />
      </div>
    ) : (
    <>
    {show && (
      <>
      <div className="flex align-items-center justify-content-between flex-row m-1">
        <div className="p-field text-sm">
          <label htmlFor="location">Location : </label>
          <Dropdown
            id="location"
            value={locations.find(loc => loc.code === selectedLocation)}
            options={locations}
            onChange={handleLocationChange}
            optionLabel="name"
            placeholder="Select a location"
          />
        </div>
        <div className="flex align-items-center justify-content-center flex-row gap-2">
  <div className="text-sm p-1">
    <div className="p-field text-sm">
      <label htmlFor="start-date">Start Date :</label>
      <Calendar
        id="start-date"
        value={startDate}
        onChange={handleStartDateChange}
        showIcon
        dateFormat="dd-mm-yy"
        placeholder="Select a start date"
        minDate={new Date("2024-01-01")}  // Set the minimum selectable date
        maxDate={endDate} // Ensure the start date does not go beyond the end date
      />
    </div>
  </div>
  <div className="text-sm p-1">
    <div className="p-field text-sm">
      <label htmlFor="end-date">End Date :</label>
      <Calendar
        id="end-date"
        value={endDate}
        onChange={handleEndDateChange}
        showIcon
        dateFormat="dd-mm-yy"
        placeholder="Select an end date"
        minDate={startDate} // Ensure the end date does not go before the start date
        maxDate={new Date("2024-08-13")}  // Set the maximum selectable date
      />
    </div>
  </div>
</div>

      </div>
      </>
    )}
      
      <div className='flex align-items-start justify-content-start mt-2'>
        {selectedLocation && (
          <div >
           <Card title="Air Quality Index" className='text-xs h-17rem'>
  <div className='flex align-items-center justify-content-around flex-row'>
    <div>
      <div className='flex align-items-center justify-content-center flex-column'>
        <h1 className='text-3xl'>{aqiValue !== null ? `${aqiValue}` : 'Loading...'}</h1>

        {aqiImage && <img src={aqiImage} alt={aqiStatusText} style={{ width: '4rem', height: '6rem' }} />}
        <h1
  className={`border-round-xs p-1 text-xs text-white w-6rem`}
  style={{ backgroundColor: aqiStatus.color }}
>
  {aqiStatus.status || 'No Status'}
</h1>

      </div>
    </div>
  </div>
</Card>

          </div>
        )}
        <div className='ml-1 mr-1'>
          <Card>
            <DataTable value={dataTableData} rowClassName={rowClassName} scrollable scrollHeight="15rem" style={{ width: '22rem', textAlign: "center",  }}  emptyMessage="No Outliear Days Found.">
              <Column field="date" header="Date" className='text-xs' headerStyle={{ fontSize: "0.9rem", backgroundColor: "#00a269", color: "white" }}></Column>
              <Column field="time" header="Time" className='text-xs' headerStyle={{ fontSize: "0.9rem", backgroundColor: "#00a269", color: "white" }}/>
              <Column field="aqi" header="AQI" className='text-xs' headerStyle={{ fontSize: "0.9rem", backgroundColor: "#00a269", color: "white" }}></Column>
              <Column field="deviationPercentage" header="Outlier %" className='text-xs' headerStyle={{ fontSize: "0.9rem", backgroundColor: "#00a269", color: "white" }}></Column>
            </DataTable>
          
          </Card>
        </div>
        <Card>
          <AqiReport/>
        </Card>
        
      </div>
      <div className="flex align-items-center justify-content-between flex-row mt-2">
      <Card>
          <AQIChart
            envirolocation={envirolocation}
            enviroDate={envirodate}
            envirotime={envirotime}
            enviroPM25={enviropm25}
            enviroPM10={enviropm10}
            enviroSO2={enviropm25}
            enviroNO2={enviroNO2}
            enviroco2={enviroco2}
            enviroAQI={enviroAQI}
            selectedLocation={selectedLocation}
          />
        </Card>
        <div className='w-7  m-2 bg-green-100 flex align-items-center justify-content-center flex-row'>
          
      </div>
      </div>
      <div className="flex align-items-center justify-content-between flex-row mt-2">
      
      <div className='w-100 flex align-items-center justify-content-center flex-row'>
      <Card className='h-15rem w-4 mr-1'>
        <PollutantChart
        envirolocation={envirolocation}
        envirodate={envirodate}
        envirotime={envirotime}
        pollutantData={enviropm25}
        selectedLocation={selectedLocation}
        pollutantName="PM2.5"
        baseChartColor='#FF5722'
        drilldownChartColor='#FFC107'
        height={200}
        width={250}
        safeLimit={60}
      /></Card>
       <Card className='h-15rem w-4  m-1'>
      <PollutantChart
        envirolocation={envirolocation}
        envirodate={envirodate}
        envirotime={envirotime}
        pollutantData={enviropm10}
        selectedLocation={selectedLocation}
        pollutantName="PM10"
        baseChartColor='#4DB6AC'
        drilldownChartColor='#80CBC4'
        height={200}
        width={250}
        safeLimit={100}
      />
      </Card>
      <Card className='h-15rem w-4 m-1 '>
      <PollutantChart
        envirolocation={envirolocation}
        envirodate={envirodate}
        envirotime={envirotime}
        pollutantData={enviroNO2}
        selectedLocation={selectedLocation}
        pollutantName="NO2"
        baseChartColor='#F44336'
        drilldownChartColor='#E57373'
        height={200}
        width={250}
        safeLimit={80}
      />
      </Card>
      <Card className='h-15rem w-4 ml-1 '>
      <PollutantChart
        envirolocation={envirolocation}
        envirodate={envirodate}
        envirotime={envirotime}
        pollutantData={enviroso2}
        selectedLocation={selectedLocation}
        pollutantName="SO2"
        baseChartColor='#FFEB3B'
        drilldownChartColor='#FFF176'
        height={200}
        width={250}
        safeLimit={80}
      />
        </Card>
        </div>
      </div>
      {show && (
        <>
<div className='flex align-items-center justify-content-start flex-row mt-2'>
        <Card  className='h-15rem w-6'>
        <CustomBarChart
                    title="Human Loss by Age Group and Gender"
                    categories={categories}
                    series={series}
                    height={200}
                    width={500}
                    xtitle="Age Group"
                    ytitle="Number of Losses"
                />

        </Card>
        <Card  className='h-15rem w-6 ml-1 '>
        <DonutChart title={"Health Impact of NO2"} labels={NO2impactlabels} series={NO2Impactseries} height={200} width={300}/>
        </Card>
        {/* <Card>
          <DecompositionTree/>
        </Card>
       */}
      </div>
      </>)}
      
      
      
    </>)}
    </div>
  );
};

export default AqiDashboard;
