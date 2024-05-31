import React from 'react';
import style from './Login.css';
import Map from '../../components/Map';
import Meter from '../../components/Meter';
import area from './images/area.png';
import literacyRate from './images/literacyRate.png';
import population from './images/population.png';
import populationDensity from './images/populationDensity.png';


const KnowYourCity = () => {
	const data = {
		assets: {
			circle: {
				area: {
					value: 0,
					icon: area,
				},
				population: {
					value: 0,
					icon: population,
				},
				populationDensity: {
					value: 0,
					icon: populationDensity,
				},
				literacyRate: {
					value: 0,
					icon: literacyRate,
				},
			},
			bar: [
				{
					sexRatio: {
						male: 1259628,
						female: 1211368,
					},
				},
				{
					urbanRural: {
						urban: 689354,
						rural: 100,
					},
				},
			],
			marker: {
				monuments: 0,
				hospitals: 0,
				ghats: 0,
				dams: 0,
				bridges: 0,
				railwayStations: 0,
				airport: 0,
				temples: 0,
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
				<div className={`${style.markerContainer}`}>
					<div className={`${style.markerText}`}>{formatString(obj.key)}</div>
					<div></div>
					<div className={`${style.markerValue}`}> {obj.value}</div>
				</div>
			);
		});
	};

	const circle = (data) => {
		return data.map((obj) => {
			return (
				<div className='flex flex-row w-full justify-content-start gap-2 '>
					<div className={`${style.iconContainer}`}>
						<img className={style.circleIcon} src={obj.value.icon} />
					</div>
					<div className='flex relative align-items-center w-7 justify-content-evenly'>
						<span className={`${style.circleKey}`}>{formatString(obj.key)}</span>{' '}
						<span className='w-auto'>: {obj.value.value} </span>
					</div>
				</div>
			);
		});
	};

	const bar = (data) => {
		return <Meter data={data} />;
	};

	return (
		<>
			<div className={`${style.container}`}>
				<div className={`${style.assets}`}>
					<div className={`${style.map}`}>
						<Map />
					</div>
					<div className={`${style.assetContainer}`}>
						<div className={`${style.assetHeading}`}>City Assets</div>
						<div className={`${style.marker}`}>
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
						<div className={`${style.bar}`}>
							{bar(
								data.assets.bar &&
									Object.entries(data.assets.bar).map(([key, value]) => {
										return {
											key: key,
											values: value,
										};
									})
							)}
						</div>
						<div className={`${style.circle}`}>
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

				<div className={`${style.cityProgress}`}></div>
			</div>
		</>
	);
};

export default KnowYourCity;