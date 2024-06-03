import React from 'react';
import style from './KnowYourCity.css';
import Map from './Map';
import Meter from './Meter';
import area from './images/area.png';
import literacyRate from './images/literacyRate.png';
import population from './images/population.png';
import populationDensity from './images/populationDensity.png';
// import Environment from '../Environment/Environment';
import Card from './Cards';
import Header from './Header';

const KnowYourCity = () => {
	const data = {
		assets: {
			circle: {
				area: {
					value: '120.8 km2',
					icon: area,
				},
				population: {
					value: 0,
					icon: population,
				},
				populationDensity: {
					value: '460/km2',
					icon: populationDensity,
				},
				literacyRate: {
					value: '69.57%',
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
				dams: 0,
				bridges: 0,
				railwayStations: 2,
				airport: 1,
				temples: 7000,
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
				<div className="markerContainer" key={obj.key}>
					<div className="markerText">{formatString(obj.key)}</div>
					<div></div>
					<div className="markerValue"> {obj.value}</div>
				</div>
			);
		});
	};

	const circle = (data) => {
		return data.map((obj) => {
			return (
				<div className='d-flex flex-row  justify-content-start' key={obj.key}>
					<div className="iconContainer" >
						<img className="circleIcon" src={obj.value.icon} alt={`${obj.key} icon`} />
					</div>
					<div className='d-flex align-items-center w-75 justify-content-between'>
						<span className="circleKey">{formatString(obj.key)}</span>
						<span>:{obj.value.value}</span>
					</div>
				</div>
			);
		});
	};

	const bar = (data) => {
		return data.map((obj) => {
			return (
				<div className="barSubcontainer" key={obj.key}>
					<div className="barText">{formatString(obj.key)}</div>
					<div className='d-flex justify-content-start'>
						<Meter data={obj.value} />
					</div>
				</div>
			);
		});
	};

	return (
		<>
        <Header/>
			<div className="know-container">
				<div className="asset">
					<div className="map">
						<Map />
					</div>
					<div className="assetContainer">
						<div className="assetHeading">City Assets</div>
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
						<div className="bar">
							{bar(
								data.assets.bar &&
									Object.entries(data.assets.bar).map(([key, value]) => {
										return {
											key: key,
											value: value,
										};
									})
							)}
						</div>
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
						</div>
					</div>
				</div>

				<div className="cityProgress">
					<div className='d-flex w-100 font-weight-bold h2 pl-5'>City Progress</div>
					<Card />
				</div>
			</div>
		</>
	);
};

export default KnowYourCity;
