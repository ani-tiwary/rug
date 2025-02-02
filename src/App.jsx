// src/App.jsx
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import MapView from './components/MapView';
import PhotoSphereView from './components/PhotoSphereView';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'; // for debugging in intro
import './App.css';
import { locations } from './data/locations';

function App() {
  const [mode, setMode] = useState('intro'); // 'intro' or 'split'
  const [score, setScore] = useState(0); // Add score state
  const [currentLocation, setCurrentLocation] = useState(0); // Index of current location
  const mapContainerRef = useRef(null);
  const photoContainerRef = useRef(null);

  // Calculate score based on distance
  const calculateScore = (guessLat, guessLng) => {
    const actualLat = locations[currentLocation].coordinates.lat;
    const actualLng = locations[currentLocation].coordinates.lng;
    
    // Calculate distance using Haversine formula (in meters)
    const R = 6371e3; // Earth's radius in meters
    const φ1 = guessLat * Math.PI/180;
    const φ2 = actualLat * Math.PI/180;
    const Δφ = (actualLat-guessLat) * Math.PI/180;
    const Δλ = (actualLng-guessLng) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const distance = R * c; // in meters

    // Score calculation
    // Perfect score (5000) if within 10 meters
    // Score decreases linearly until 2000 meters (minimum score: 0)
    const maxDistance = 2000; // meters
    const score = Math.max(0, Math.round(5000 * (1 - distance/maxDistance)));
    
    return score;
  };

  // Handle guess submission
  const handleGuess = (guessCoords) => {
    const newScore = calculateScore(guessCoords.lat, guessCoords.lng);
    setScore(prevScore => prevScore + newScore);
  };

  const handleNext = () => {
    // Optional: Move to next location
    setCurrentLocation(prev => (prev + 1) % locations.length);
  }

  // This handler fires when the user clicks Play.
  const handlePlay = () => {
    // Switch mode; we'll then animate the layout in useEffect.
    setMode('split');
  };

  // When mode changes to split, animate the containers.
  useEffect(() => {
    if (mode === 'split') {
      gsap.fromTo(
        photoContainerRef.current,
        { opacity: 0 },
        { duration: 1, opacity: 1, ease: 'power2.out' }
      );
    }
  }, [mode]);

  const topBarStyle = {
    position: 'fixed',
    top: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '90%',
    height: '60px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 30px',
    zIndex: 2000,
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
  };

  const logoStyle = {
    height: '40px',
    width: '40px',
    borderRadius: '50%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const scoreStyle = {
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold'
  };

  const rightSectionStyle = {
    width: '40px', // Match logo width for symmetry
    height: '40px'
  };

  return (
    <div className="App" style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {mode !== 'intro' && (
        <div style={topBarStyle}>
          <div style={scoreStyle}>
            Score: {score}
          </div>
        </div>
      )}

      {mode === 'intro' ? (
        // Intro mode: a full-screen map (cube) with a Play button overlay.
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }}>
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              {/* For the intro, we use a simple cube. Clicking anywhere on it could also trigger play. */}
              <mesh>
                <boxGeometry args={[2, 2, 2]} />
                <meshStandardMaterial color="orange" />
              </mesh>
              {/* Optional OrbitControls for debugging; disable zoom/pan as desired */}
              <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
          </div>
          <button
            onClick={handlePlay}
            style={{
              position: 'absolute',
              bottom: 20,
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '10px 20px',
              fontSize: '16px',
              zIndex: 1,
            }}
          >
            Play
          </button>
        </div>
      ) : (
        // New layout with full-screen PhotoSphere and overlay map
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <div ref={photoContainerRef} style={{ width: '100%', height: '100%' }}>
            <PhotoSphereView imageUrl={locations[currentLocation].imageUrl} />
          </div>
          <div ref={mapContainerRef} style={{ position: 'absolute', bottom: 20, right: 20 }}>
            <MapView onGuess={handleGuess} onNext={handleNext} currentLocation={currentLocation} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;