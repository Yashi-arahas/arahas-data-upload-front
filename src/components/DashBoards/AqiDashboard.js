import React, { useState, useEffect } from 'react';
import { Calendar } from 'primereact/calendar';
import ParaHeatMap from './ParaHeatMap';
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import good from "./DashImages/good.png";
import moderate from "./DashImages/moderate.png";
import poor from "./DashImages/poor.png";
import very_poor from "./DashImages/very_poor.png";
import severe from "./DashImages/severe.png";
import "./Dash.css";
import AQIChart from '../Environment/AQIChart';
import AqiMap from '../Environment/Maps/AqiMap';
import AqiReport from '../Environment/AqiReport';
import PollutantChart from './PollutantChart';
import DecompositionTree, { CustomBarChart, DonutChart} from '../GraphVisuals';
const AqiDashboard = () => {
  const [startDate, setStartDate] = useState(new Date("2024-01-19"));
  const [endDate, setEndDate] = useState(new Date("2024-04-29"));
  const [aqiData, setAqiData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("Ayodhya - Civil line,Tiny tots school");
  const [aqiValue, setAqiValue] = useState(null);
  const [aqiStatus, setAqiStatus] = useState({ status: '', color: '', textColor: '', image: null });
  const [dataTableData, setDataTableData] = useState([]);
  const [envirolocation, setEnviroLocation] = useState([]);
  const [envirotime, setEnviroTime] = useState([]);
  const [envirodate, setEnviroDate] = useState([]);
  const [envirotimeStamp, setEnviroTimeStamp] = useState([]);
  const [enviropm25, setEnviroPM25] = useState([]);
  const [enviropm10, setEnviroPM10] = useState([]);
  const [enviroso2, setEnviroSO2] = useState([]);
  const [enviroAQI, setEnviroAQI] = useState([]);
  const [enviroNO2, setEnviroNO2] = useState([]);
  const [enviroco2, setEnviroco2] = useState([]);

  const locations = [
    { name: 'Civil Lines, Tiny Tots School', code: 'Ayodhya - Civil line,Tiny tots school', village: 'Faizabad' },
    { name: 'Shahadat Ganj', code: 'Ayodhya - Shahadat Ganj', village: 'Haibatpur' },
    { name: 'Bank colony near Railway station', code: 'Ayodhya-Bank colony near Railway station', village: 'Jiyan Pur' },
    { name: 'near Airport', code: 'Ayodhya-near Airport', village: 'Katrauli' },
    { name: 'Ranopali near Kila ayodhya', code: 'Ayodhya-Ranopali near Kila ayodhya', village: 'Ranopali' }
  ];

  const handleLocationChange = (e) => {
    setSelectedLocation(e.value.code);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const startDateFormatted = formatDate(startDate);
        const endDateFormatted = formatDate(endDate);
        const response = await axios.get("http://13.232.104.132:8009/data/environment");
        const data = response.data.data;
  
        // Filter and sort the data based on selected location and date range
        const filteredData = data.filter(item => 
          item.location === selectedLocation &&
          new Date(item.date) >= new Date(startDateFormatted) &&
          new Date(item.date) <= new Date(endDateFormatted)
        ).sort((a, b) => new Date(a.date) - new Date(b.date));
  
        const location = [];
        const timeStamp = [];
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
          timeStamp.push(item.timeStamp);
          time.push(item.time);
          
          const dateObj = new Date(item.date);
          const year = dateObj.getFullYear();
          const month = dateObj.getMonth() + 1;
          const day = dateObj.getDate();
          const formatted = `${day}-${month < 10 ? "0" + month : month}-${year}`;
          formattedDate.push(formatted);
        
          // Convert time string to Date object and extract time components
          const timeObj = new Date(item.time);
          const hours = timeObj.getUTCHours().toString().padStart(2, "0");
          const minutes = timeObj.getUTCMinutes().toString().padStart(2, "0");
          const seconds = timeObj.getUTCSeconds().toString().padStart(2, "0");
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
        setEnviroTimeStamp(timeStamp);
        setEnviroTime(formattedTime);
        setEnviroDate(formattedDate);
        setEnviroPM25(pm25);
        setEnviroPM10(pm10);
        setEnviroSO2(so2);
        setEnviroAQI(AQI);
        setEnviroNO2(NO2);
        setEnviroco2(co2);
  
        // Update the AQI value and status
        if (filteredData.length > 0) {
          const latestData = filteredData[filteredData.length - 1];
          setAqiValue(latestData.AQI);
          setAqiStatus(getAqiStatus(latestData.AQI));
        } else {
          setAqiValue(null);
          setAqiStatus({ status: '', color: '', textColor: '', image: null });
        }
  
        const filteredDataWithDeviation = filteredData
          .filter(item => item.AQI > 400)
          .map(item => ({
            date: formatDateNew(new Date(item.date)),

            time: formatTimeToHHMMSS(item.time),
            aqi: item.AQI,
            deviationPercentage: ((item.AQI - 400) / 400 * 100).toFixed(2) + "%"
          }));
        
        setDataTableData(filteredDataWithDeviation);
  
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [startDate, endDate, selectedLocation]);
  
  function formatTimeToHHMMSS(isoDateString) {
    const dateObj = new Date(isoDateString);
    
    // Extract hours, minutes, and seconds, and pad with leading zeros if necessary
    const hours = dateObj.getUTCHours().toString().padStart(2, '0');
    const minutes = dateObj.getUTCMinutes().toString().padStart(2, '0');
    const seconds = dateObj.getUTCSeconds().toString().padStart(2, '0');

    // Return the formatted time
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
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const getAqiStatus = (aqi) => {
    if (aqi > 400) return { status: 'Severe', color: 'bg-red-700', textColor: 'white', image: severe };
    if (aqi > 300) return { status: 'Very Poor', color: 'bg-red-500', textColor: 'white', image: very_poor };
    if (aqi > 200) return { status: 'Poor', color: 'bg-orange-600', textColor: 'white', image: poor };
    if (aqi > 100) return { status: 'Moderate', color: 'bg-yellow-400', textColor: 'black', image: moderate };
    return { status: 'Good', color: 'bg-green-500', textColor: 'white', image: good };
  };

  const { status: aqiStatusText, color, textColor, image: aqiImage } = aqiStatus;
 

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
              <label htmlFor="start-date">Start Date : </label>
              <Calendar
                id="start-date"
                value={startDate}
                onChange={handleStartDateChange}
                showIcon
                dateFormat="yy-mm-dd"
                placeholder="Select a start date"
              />
            </div>
          </div>
          <div className="text-sm p-1">
            <div className="p-field text-sm">
              <label htmlFor="end-date">End Date : </label>
              <Calendar
                id="end-date"
                value={endDate}
                onChange={handleEndDateChange}
                showIcon
                dateFormat="yy-mm-dd"
                placeholder="Select an end date"
              />
            </div>
          </div>
        </div>
      </div>
      <div className='flex align-items-start justify-content-start mt-2'>
        {selectedLocation && (
          <div >
            <Card title="Air Quality Index" className='text-xs h-17rem'>
              <div className='flex align-items-center justify-content-around flex-row'>
                <div>
                  <div className='flex align-items-center justify-content-center flex-column'>
                  <h1 className='text-4xl'>{aqiValue !== null ? `${aqiValue}` : 'Loading...'}</h1>
                    {aqiImage && <img src={aqiImage} alt={aqiStatusText} style={{ width: '4rem', height: '6rem' }} />}
                    <h1 className={`border-round-xs p-1 text-xs text-white w-6rem ${color}`}>{aqiStatusText}</h1>
                    
                    
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
        <div className='ml-1 mr-1'>
          <Card>
            <DataTable value={dataTableData} rowClassName={rowClassName} scrollable scrollHeight="15rem" style={{ width: '22rem', textAlign: "center" }}  emptyMessage="No data found.">
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
      
      
    </>
  );
};

export default AqiDashboard;
