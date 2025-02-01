// src/components/MapView.jsx
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapView = () => {
  const [markers, setMarkers] = useState([]);

  function MapEvents() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarkers(current => [...current, { position: [lat, lng] }]);
      }
    });
    return null;
  }

  return (
    <div style={{ position: 'absolute', right: 0, width: '50%', height: '100vh' }}>
      <MapContainer
        center={[51.505, -0.09]} // Default to London coordinates - adjust as needed
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <MapEvents />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position}>
            <Popup>
              Marker {index + 1}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
