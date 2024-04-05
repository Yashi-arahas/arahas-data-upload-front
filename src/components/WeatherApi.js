import React, { useState } from "react";
import axios from "axios";
const api = {
  key: "f0bd65116832f50201351b648dbb0584",
  base: "https://api.openweathermap.org/data/2.5/",
};

const WeatherApi = () => {
  const [search, setSearch] = useState("");
  // const [data,setData]=useState("");
  const searchPressed=()=>{
        const response =fetch(`${api.base}weather?q=${search}$units=metric&APPID=${api.key}`).then(res=>res.json()).then(result=>{
            console.log(result);
            
        })
  }

  return (
    <>
      <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={searchPressed}>Search</button>
      </div>
      <diV>
        
      </diV>
    </>
  );
};

export default WeatherApi;
