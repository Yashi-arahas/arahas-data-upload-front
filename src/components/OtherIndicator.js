import Header from "./Header";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, PieChart, LineChart } from "./GraphVisuals";
import "./OtherIndicators.css";
import renewable from "./images/renewable-energy.png";

const OtherIndicator = ({ departmentName }) => {
  const [electricity, setElectricity] = useState("");
  const [sexRatio, setSexRatio] = useState("");
  const [socioCulture, setSocioCulture] = useState("");
  const [crimeData, setCrimeData] = useState("");
  const [educationData, setEducationData] = useState("");
  const [healthData, setHealthData] = useState("");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (departmentName === "Electricity") {
        const response = await axios.get(
          "https://arahas-data-upload-back.onrender.com/data/electricity"
        );
        const data = response.data.data;
        console.log(data);
        setElectricity(data);
      } else if (departmentName === "Sex-Ratio") {
        const sex_ratio_response = await axios.get(
          "https://arahas-data-upload-back.onrender.com/data/sex-ratio"
        );
        setSexRatio(sex_ratio_response.data.data);
      } else if (departmentName === "Socio-Cultural-Activities") {
        const socio_culture_response = await axios.get(
          "https://arahas-data-upload-back.onrender.com/data/socio-cultural-activities"
        );
        setSocioCulture(socio_culture_response.data.data);
      } else if (departmentName === "Health") {
        const health_response = await axios.get(
          "https://arahas-data-upload-back.onrender.com/data/health"
        );
        setHealthData(health_response.data.data);
      } else if (departmentName === "Education") {
        const education_response = await axios.get(
          "https://arahas-data-upload-back.onrender.com/data/education"
        );
        setEducationData(education_response.data.data);
      } else if (departmentName === "Crime") {
        const crime_response = await axios.get(
          "https://arahas-data-upload-back.onrender.com/data/crime"
        );
        setCrimeData(crime_response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="other-conatiner">
        {departmentName === "Electricity" && electricity.length > 0 && (
          <div className="other-main-container">
            <div className="other-title">
              <h1>Affordable & Clean Energy</h1>
            </div>
            <div className="other-mini-card">
              <img src={renewable}></img>
              <h1>Renewable share of installed generating capacity</h1>
              <div className="sub-mini">
                <h2>Target : 40%</h2>
                <h2>Ayodhya : 10%</h2>
              </div>
            </div>
            <div className="other-graphs">
              <div className="other-mini-graph">
                <BarChart
                  title={"Number of Connections"}
                  categories={electricity.map((item) => item.Type)}
                  series={electricity.map((item) => ({
                    name: item.Type,
                    data: [item.No_of_Connections],
                  }))}
                  height={350}
                  width={600}
                  xtitle=""
                />
              </div>
              <div className="other-mini-graph">
                <BarChart
                  title={"Electricity Consumption in KWH"}
                  categories={electricity.map((item) => item.Type)}
                  series={electricity.map((item) => ({
                    name: item.Type,
                    data: [item.Electric_Consumption],
                  }))}
                  height={350}
                  width={600}
                  xtitle=""
                />
              </div>
            </div>
          </div>
        )}
        {departmentName === "Sex-Ratio" && sexRatio.length > 0 && (
          <div className="other-main-container">
            <div className="other-title">
              <h1>Sex Ratio</h1>
            </div>
            <div className="other-graphs">
              <div className="other-mini-graph">
                <>
                  <BarChart
                    title={"Sex Ratio"}
                    categories={sexRatio.map((item) => item.Region)}
                    series={[
                      {
                        name: "Male",
                        data: sexRatio.map((item) => item.Male),
                      },
                      {
                        name: "Female",
                        data: sexRatio.map((item) => item.Female),
                      },
                    ]}
                    height={400}
                    width={500}
                    xtitle=""
                  />
                  
                </>
              </div>
            </div>
          </div>
        )}
        {departmentName === "Socio-Cultural-Activities" &&
          socioCulture.length > 0 && (
            <div className="other-main-container">
              <div className="other-title">
                <h1>Socio Cultural Activities</h1>
              </div>
              <div className="other-graphs">
                <div className="other-mini-graph">
                  <BarChart
                    title={"Socio Cultural Activities"}
                    categories={socioCulture.map((item) => item.Category)}
                    series={socioCulture.map((item) => ({
                      name: item.Category,
                      data: [item.Population],
                    }))}
                    height={400}
                    width={700}
                    xtitle=""
                  />
                </div>
              </div>
            </div>
          )}
        {departmentName === "Crime" && crimeData.length > 0 && (
          <div className="other-main-container">
            <div className="other-title">
              <h1>Crime Report</h1>
            </div>
            <div className="other-graphs">
              <div className="other-mini-graph">
                <BarChart
                  title={crimeData.map((item) => item.Title)}
                  categories={["Value"]}
                  series={[
                    {
                      name: "Target Value",
                      data: crimeData.map((item) => item.Target_Value),
                    },
                    {
                      name: "Current Value",
                      data: crimeData.map((item) => item.Current_Value),
                    },
                  ]}
                  height={400}
                  width={700}
                  xtitle=""
                />
              </div>
            </div>
          </div>
        )}
        {departmentName === "Health" && healthData.length > 0 && (
          <div className="other-main-container">
            <div className="other-title">
              <h1>Healthcare</h1>
            </div>
            <div className="other-graphs">
              <div className="other-mini-graph">
                <BarChart
                  title={healthData.map((item) => item.Title)}
                  categories={["Value"]}
                  series={[
                    {
                      name: "Target Value",
                      data: healthData.map((item) => item.Target_Value),
                    },
                    {
                      name: "Current Value",
                      data: healthData.map((item) => item.Current_Value),
                    },
                  ]}
                  height={400}
                  width={850}
                  xtitle=""
                />
              </div>
            </div>
          </div>
        )}
        {departmentName === "Education" && educationData.length > 0 && (
          <div className="other-main-container">
            <div className="other-title">
              <h1>Education</h1>
            </div>
            <div className="other-graphs">
              <div className="other-mini-graph">
                <BarChart
                  title={educationData.map((item) => item.Title)}
                  categories={["Value"]}
                  series={[
                    {
                      name: "Target Value",
                      data: educationData.map((item) => item.Target_Value),
                    },
                    {
                      name: "Current Value",
                      data: educationData.map((item) => item.Current_Value),
                    },
                  ]}
                  height={400}
                  width={900}
                  xtitle=""
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OtherIndicator;
