import React from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ayodhya from './images/ayodhya.json';
import ayodhya_villages from './images/ayodhya_village.json';

const p1 = [26.764028, 82.133778];
const p2 = [26.777265, 82.185866];
const p3 = [26.767421, 82.09535];
const p4 = [26.774794, 82.134539];
const p5 = [26.735415, 82.140133];

const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  iconSize: [16, 20],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Map = () => {
	const mapCenter = [26.7532, 82.1225];
	return (
		<div className='d-flex w-100 justify-content-center'>
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
				style={{ width: '100%', height: '100%' }}
			>
				<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

				<GeoJSON data={ayodhya_villages} fill={false} weight={1} color='black' opacity={0.3} />
				<GeoJSON data={ayodhya} fill={false} color='#f07628' />

				<Marker position={p1} icon={greenIcon}>
					<Tooltip>Bank colony near Railway station</Tooltip>
				</Marker>
				<Marker position={p2} icon={greenIcon}>
					<Tooltip>Ranopali near Kila ayodhya</Tooltip>
				</Marker>
				<Marker position={p3} icon={greenIcon}>
					<Tooltip>Shahadat Ganj</Tooltip>
				</Marker>
				<Marker position={p4} icon={greenIcon}>
					<Tooltip>Civil Lines, Tiny Tots School</Tooltip>
				</Marker>
				<Marker position={p5} icon={greenIcon}>
					<Tooltip>near Airport</Tooltip>
				</Marker>
			</MapContainer>
		</div>
	);
};

export default Map;
