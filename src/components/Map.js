import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ayodhya from './images/ayodhya.json';
import ayodhya_villages from './images/ayodhya_village.json';

const p1 = [26.764028, 82.133778];
const p2 = [26.777265, 82.185866];
const p3 = [26.767421, 82.09535];
const p4 = [26.774794, 82.134539];
const p5 = [26.735415, 82.140133];

const Map = () => {
	const mapCenter = [26.7532, 82.1225];
	return (
		<div className='d-flex w-100 justify-content-center' style={{ height: 'inherit' }}>
			<MapContainer
				center={mapCenter}
				zoom={11}
				attributionControl={false}
				zoomControl={false}
				doubleClickZoom={false}
				scrollWheelZoom={false}
				dragging={false}
				animate={true}
				easeLinearity={0.35}
				style={{ width: '100%', height: '99%' }}
			>
				<TileLayer url='https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}' />

				<GeoJSON data={ayodhya_villages} fill={false} weight={1} color='black' opacity={0.3} />
				<GeoJSON data={ayodhya} fill={false} color='#f07628' />
			</MapContainer>
		</div>
	);
};

export default Map;
