import Header from "./Header";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, PieChart, LineChart } from "./GraphVisuals";
import "./OtherIndicators.css";
import renewable from "./images/renewable-energy.png";
import genderimg from "./images/gender.png";
import arrowpos from "./images/arrow.svg";

const OtherIndicator = ({ departmentName }) => {
  const [electricity, setElectricity] = useState("");
  const [sexRatio, setSexRatio] = useState("");
  const [socioCulture, setSocioCulture] = useState("");
  const [crimeData, setCrimeData] = useState("");
  const [educationData, setEducationData] = useState("");
  const [healthData, setHealthData] = useState("");
  const [doctorData, setDoctorData] = useState("");
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
        const doctor_response = await axios.get(
          "https://arahas-data-upload-back.onrender.com/data/health/doctors"
        );
        setDoctorData(doctor_response.data.data);
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
            <div className="other-heading">
              <div className="other-title">
                <img src={genderimg}></img>
                <h1>Clean & Affordable Energy</h1>
              </div>
              <h2>
                Ensure access to affordable, reliable, sustainable and modern
                energy for all
              </h2>
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
                  series={[
                    {
                      name: "Number of Connections",
                      data: electricity.map(
                        (item) => item.Electric_Consumption
                      ),
                    },
                  ]}
                  height={350}
                  width={600}
                  xtitle=""
                />
              </div>
              <div className="other-mini-graph">
                <BarChart
                  title={"Electricity Consumption in KWH"}
                  categories={electricity.map((item) => item.Type)}
                  series={[
                    {
                      name: "Electricity Consumption",
                      data: electricity.map(
                        (item) => item.Electric_Consumption
                      ),
                    },
                  ]}
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
            <div className="other-heading">
              <div className="other-title">
                <img src={genderimg}></img>
                <h1>Gender Equality</h1>
              </div>
              <h2>Achieve gender equality and empower all women and girls</h2>
            </div>
            <div className="other-graphs">
              {sexRatio.map((item, index) => (
                <div key={index} className="other-mini-graph">
                  <div className="other-graph-container">
                    <BarChart
                      title={item.Title}
                      group={"one"}
                      categories={["Ayodhya", "India"]}
                      series={[
                        {
                          name: item.Title,
                          data: [item.Ayodhya, item.India],
                        },
                      ]}
                      height={400}
                      width={500}
                      xtitle="Location"
                      ytitle={
                        item.Title === "Number of Females /1000 males"
                          ? "Number of Females"
                          : "Female Participation Rate"
                      }
                    />
                    <div className="extra">
                      <div className="Percentage">
                        <img src={arrowpos}></img>
                        <h1>
                          {" "}
                          Gap:{" "}
                          {(
                            ((item.India - item.Ayodhya) / item.India) *
                            100
                          ).toFixed(2)}
                          %
                        </h1>
                      </div>

                      <div className="Insights">
                        <h1>{item.Insights}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {departmentName === "Socio-Cultural-Activities" &&
          socioCulture.length > 0 && (
            <div className="other-main-container">
              <div className="other-heading">
                <div className="other-title">
                  <img src={genderimg}></img>
                  <h1>Socio Cultural Activities</h1>
                </div>
              </div>
              <div className="other-graphs">
                <div className="other-mini-graph">
                  <BarChart
                    title={"Population served/unit area"}
                    categories={socioCulture.map((item) => item.Category)}
                    series={[
                      {
                        name: "Population served/unit area",
                        data: socioCulture.map((item) => item.Population),
                      },
                    ]}
                    height={400}
                    width={700}
                    xtitle=""
                    ytitle="Population served/unit area "
                  />
                </div>
              </div>
            </div>
          )}
        {departmentName === "Crime" && crimeData.length > 0 && (
          <div className="other-main-container">
            <div className="other-heading">
              <div className="other-title">
                <img src={genderimg}></img>
                <h1>Crime Report</h1>
              </div>
              <h2>
                Promote peaceful and inclusive societies for sustainable
                development, provide access to justice for all and build
                effective, accountable and inclusive institutions at all levels
              </h2>
            </div>
            <div className="other-graphs">
              <div className="other-mini-graph">
                <BarChart
                  title={crimeData.map((item) => item.Title)}
                  categories={["Value"]}
                  series={[
                    {
                      name: "Current Value",
                      data: crimeData.map((item) => item.Current_Value),
                    },
                    {
                      name: "Target Value",
                      data: crimeData.map((item) => item.Target_Value),
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
            <div className="other-heading">
              <div className="other-title">
                <img src={genderimg} alt="Gender Icon" />
                <h1>HealthCare</h1>
              </div>
              <h2>
                Ensure healthy lives and promote well-being for all at all
                stages
              </h2>
            </div>
            <div className="other-graphs">
              {healthData.map((item, index) => (
                <div key={index} className="other-mini-graph">
                  <div className="other-graph-container">
                    <BarChart
                      title={item.Title}
                      group={"one"}
                      categories={["Current Value", "Target Value"]}
                      series={[
                        {
                          name: item.Title,
                          data: [item.Current_Value, item.Target_Value],
                        },
                      ]}
                      height={400}
                      width={700}
                      xtitle="Value"
                      ytitle={
                        item.Title === "Number of Patients/doctor"
                          ? "Number of Patients"
                          : "No. of physicians, nurses and midwives/1 lakh population"
                      }
                    />
                    <div className="extra">
                      <div className="Percentage">
                        <img src={arrowpos} alt="Arrow Icon" />
                        <h1>
                          Gap:{" "}
                          {(
                            ((item.Current_Value - item.Target_Value) / item.Target_Value) *
                            100
                          ).toFixed(2)}
                          %
                        </h1>
                      </div>
                      <div className="Insights">
                        <h1>The data indicates a significant shortfall with only  35 physicians, nurses, and midwives per 1 lakh population against the target of 550, highlighting a pressing need for intervention to improve healthcare accessibility and outcomes</h1>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Separate Graphs for Birth and Death Rate */}
              {doctorData.length > 0 && (
                <>
                  <div className="other-mini-graph">
                    <div className="other-graph-container">
                      <BarChart
                        title={"Birth and Death Rate"}
                        categories={doctorData.map((item) => item.Year)}
                        series={[
                          {
                            name: "Birth",
                            data: doctorData.map((item) => item.Birth),
                          },
                          {
                            name: "Death",
                            data: doctorData.map((item) => item.Death),
                          },
                        ]}
                        height={400}
                        width={700}
                        xtitle=""
                        ytitle="Number of Birth/Death"
                      />
                      <div className="extra">
                        
                      <div className="Insights">
                        <h1>A healthy birth and death rate for a city is about achieving a balance that allows for manageable population growth. Data indicates a natural increase in the city's population, as evidenced by a higher birth rate compared to the death rate.</h1>
                      </div>
                    </div>
                    </div>
                  </div>
                  <div className="other-mini-graph">
                    <div className="other-graph-container">
                      <LineChart
                        title={"Number of cases of various diseases"}
                        categories={doctorData.map((item) => item.Year)}
                        series={[
                          {
                            name: "Malaria",
                            data: doctorData.map((item) => item.Malaria),
                          },
                          {
                            name: "J.E.",
                            data: doctorData.map((item) => item.JE),
                          },
                          {
                            name: "A.E.S.",
                            data: doctorData.map((item) => item.AES),
                          },
                          {
                            name: "Dengue",
                            data: doctorData.map((item) => item.Dengue),
                          },
                          {
                            name: "Chikengunia",
                            data: doctorData.map((item) => item.Chikengunia),
                          },
                        ]}
                        height={400}
                        width={700}
                        xtitle=""
                        ytitle="Number of Cases"
                      />
                       <div className="extra">
                        
                        <div className="Insights">
                          <h1>This chart shows the trend of diseases in Ayodhya.There has been alrming increase in Malaria and Dengue. Malaria and dengue are both mosquito-borne diseases, so the most effective prevention method focuses on stopping mosquito bites.</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
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
                      name: "Current Value",
                      data: educationData.map((item) => item.Current_Value),
                    },
                    {
                      name: "Target Value",
                      data: educationData.map((item) => item.Target_Value),
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
      </div>
    </>
  );
};

export default OtherIndicator;
