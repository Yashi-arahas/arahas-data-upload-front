import React, { useState } from "react";
import axios from "axios";
const api = {
  key: "f0bd65116832f50201351b648dbb0584",
  base: "https://api.openweathermap.org/data/3.0/",
};

const WeatherApi = () => {
  const [search, setSearch] = useState("");
  const searchPressed=()=>{
        fetch(`${api.base}weather?q=${search}$units=metric&APPID=${api.key}`).then(res=>res.json()).then(result=>{
            console.log(result);
        })

        
        
  }

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={searchPressed}>Search</button>
      </div>
    </>
  );
};

export default WeatherApi;
