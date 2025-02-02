import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Create a new component to handle map invalidation
function MapResizer({ isExpanded }) {
  const map = useMap();
  
  useEffect(() => {
    // Force map to recognize full size immediately
    map.invalidateSize();
  }, [map]);  // Only run once when map is mounted

  return null;
}

const MapView = ({ onGuess }) => {
  const [marker, setMarker] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

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
      onGuess({
        lat: marker.position[0],
        lng: marker.position[1]
      });
      setMarker(null);  // Reset marker after guess
    }
  };

  const containerStyle = {
    position: 'relative',
    width: isExpanded ? '45vw' : '300px',
    height: isExpanded ? '80vh' : '200px',
    transition: 'all 0.3s ease-in-out',
    zIndex: 1000,
    overflow: 'hidden'  // Hide overflow during transition
  };

  const mapWrapperStyle = {
    position: 'absolute',
    width: '45vw',     // Always maintain full size
    height: '80vh',    // Always maintain full size
    right: 0,
    bottom: 0,
    transition: 'all 0.3s ease-in-out',
    transform: isExpanded ? 'scale(1)' : 'scale(0.4)',  // Scale down when not expanded
    transformOrigin: 'bottom right'
  };

  return (
    <div 
      style={containerStyle}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div style={mapWrapperStyle}>
        <MapContainer
          center={[40.508051, -74.459165]}
          zoom={15}
          style={{ height: '100%', width: '100%' }}
          preferCanvas={true}
          updateWhenZooming={false}
          updateWhenIdle={true}
          maxBoundsViscosity={1.0}
          minZoom={13}
          maxZoom={18}
        >
          <MapResizer isExpanded={isExpanded} />
          <MapEvents />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            tileSize={256}
            keepBuffer={8}
            updateWhenIdle={true}
            updateWhenZooming={false}
            maxNativeZoom={18}
            minNativeZoom={13}
          />
          {marker && (
            <Marker position={marker.position}>
              <Popup>Your Guess</Popup>
            </Marker>
          )}
        </MapContainer>
        <button
          onClick={handleGuess}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '15px 30px',
            fontSize: '18px',
            fontWeight: 'bold',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '8px 8px 0 0',
            cursor: 'pointer',
            boxShadow: '0 -4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.2s ease',
            zIndex: 1000
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#c82333';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#dc3545';
          }}
        >
          Make Guess
        </button>
      </div>
    </div>
  );
};

export default MapView;
