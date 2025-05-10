'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function Map({ markers }: { markers: { lat: number; lng: number }[] }) {
  const center = markers.length ? markers[0] : { lat: 34.185, lng: -86.785 };

  return (
    <MapContainer center={center} zoom={10} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((position, index) => (
        <Marker position={position} icon={markerIcon} key={index}>
          <Popup>
            Tank #{index + 1}<br />Lat: {position.lat}, Lng: {position.lng}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
