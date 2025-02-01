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
  const [marker, setMarker] = useState(null);
  const [savedCoords, setSavedCoords] = useState(null);

  function MapEvents() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarker({ position: [lat, lng] });
      }
    });
    return null;
  }

  const handleGuess = () => {
    if (marker) {
      setSavedCoords({
        lat: marker.position[0],
        lng: marker.position[1]
      });
      // Here you could also send the coordinates to a parent component
      // or trigger other actions with the exact coordinates
    }
  };

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
        {marker && (
          <Marker position={marker.position}>
            <Popup>
              Selected Location
            </Popup>
          </Marker>
        )}
      </MapContainer>
      <button
        onClick={handleGuess}
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          zIndex: 1000
        }}
      >
        Guess
      </button>
    </div>
  );
};

export default MapView;
