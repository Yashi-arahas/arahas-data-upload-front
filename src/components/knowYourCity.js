import React from 'react';
import style from './KnowYourCity.css';
import Map from './Map';
import area from './images/area.png';
import literacyRate from './images/literacyRate.png';
import population from './images/population.png';
import populationDensity from './images/populationDensity.png';
// import Environment from '../Environment/Environment';
import Card from './Cards';
import s from "./images/letter-s.png"
import Header from './Header';
import monuments from "./images/monuments.png"
import hospital from "./images/hospital.png"
import ghat from "./images/ghat.png"
import temples from "./images/temple.png"
import river from "./images/river.png"
import festivals from "./images/tent.png"
import hotels from "./images/hotel.png"
import dharamshala from "./images/shelter.png"

const KnowYourCity = () => {
	const data = {
		assets: {
			circle: {
				area: {
					value: '120.8 km2',
					icon: area,
				},
				population: {
					value: 221118,
					icon: population,
				},
				populationDensity: {
					value: '139 persons/hectare',
					icon: populationDensity,
				},
				literacyRate: {
					value: '73.6%',
					icon: literacyRate,
				},
			},
			bar: {
				sexRatio: {
					Male: 1259628,
					Female: 1211368,
				},
				urbanRural: {
					Urban: 689354,
					Rural: 100,
				},
			},
			marker: {
				monuments: 8,
				hospitals: 6,
				ghats: 51,
				temples: 7000,
				rivers:1,//suryu
				Festivals: 4,
				Hotels:17,
				Dharamshala:70,
				// growth_rate:"59.58%"
			},
		},
	};

	const formatString = (string) => {
		// Capitalize first letter
		const formattedString = string.charAt(0).toUpperCase() + string.slice(1);

		// Insert space before each capital letter (excluding the first one)
		let result = formattedString.replace(/[A-Z]/g, (match) => ' ' + match);

		return result.trim(); // Trim any leading space
	};

	const marker = (data) => {
		return data.map((obj) => {
			return (
				<>
				
				<div className='markerContainer' key={obj.key}>
				{obj.key==="monuments" && (
					<div className="marker-icon" >
					<img  src={monuments} alt={`${obj.key} icon`} />
				</div>
				)}
				{obj.key==="hospitals" && (
					<div className="marker-icon" >
					<img  src={hospital} alt={`${obj.key} icon`} />
				</div>
				)}
				{obj.key==="ghats" && (
					<div className="marker-icon" >
					<img  src={ghat} alt={`${obj.key} icon`} />
				</div>
				)}
				{obj.key==="temples" && (
					<div className="marker-icon" >
					<img  src={temples} alt={`${obj.key} icon`} />
				</div>
				)}
				{obj.key==="rivers" && (
					<div className="marker-icon" >
					<img  src={river} alt={`${obj.key} icon`} />
				</div>
				)}
				{obj.key==="Festivals" && (
					<div className="marker-icon" >
					<img  src={festivals} alt={`${obj.key} icon`} />
				</div>
				)}
				{obj.key==="Hotels" && (
					<div className="marker-icon" >
					<img  src={hotels} alt={`${obj.key} icon`} />
				</div>
				)}
				{obj.key==="Dharamshala" && (
					<div className="marker-icon" >
					<img  src={dharamshala} alt={`${obj.key} icon`} />
				</div>
				)}
				
				<div>
					<span className="markerText">{formatString(obj.key)} :  {obj.value}</span>
					
				</div>
			</div>
			</>
			);
		});
	};

	const circle = (data) => {
		return data.map((obj) => {
			return (
				<div className='circle-container' key={obj.key}>
					<div className="iconContainer" >
						<img className="circleIcon" src={obj.value.icon} alt={`${obj.key} icon`} />
					</div>
					<div className='circle-text'>
						<span className="circleKey">{formatString(obj.key)}</span>
						<span>&nbsp;:&nbsp;{obj.value.value}</span>
					</div>
				</div>
			);
		});
	};



	return (
		<>
			<Header />
			<div className="know-container">
				<div className="assetHeading">City Assets</div>
				<div className='top-container'>
				<div className="circle">
					{circle(
						data.assets.circle &&
						Object.entries(data.assets.circle).map(([key, value]) => {
							return {
								key: key,
								value: value,
							};
						})
					)}
					<div className='circle-img'>
					<img src={s} />
					<p className='hide'>Source: Ayodhya Master Plan 2031</p>
					</div>
					
				</div>
				<div className="map">
						<Map />
					</div>
				</div>
				
				<div className="asset">
					
					<div className="assetContainer">


						<div className="marker">
							{marker(
								data.assets.marker &&
								Object.entries(data.assets.marker).map(([key, value]) => {
									return {
										key: key,
										value: value,
									};
								})
							)}
						</div>
						{/* <div className="circle">
							{circle(
								data.assets.circle &&
									Object.entries(data.assets.circle).map(([key, value]) => {
										return {
											key: key,
											value: value,
										};
									})
							)}
						</div> */}


					</div>
				</div>

				<div className="cityProgress">
					<div className='d-flex w-100 font-weight-bold h1 pl-5'>City Progress</div>
					<Card />
				</div>
			</div>
		</>
	);
};

export default KnowYourCity;
