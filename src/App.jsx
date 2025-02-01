// src/App.jsx
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import MapView from './components/MapView';
import PhotoSphereView from './components/PhotoSphereView';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'; // for debugging in intro
import './App.css';

function App() {
  const [mode, setMode] = useState('intro'); // 'intro' or 'split'
  const [score, setScore] = useState(0); // Add score state
  const mapContainerRef = useRef(null);
  const photoContainerRef = useRef(null);

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
            <PhotoSphereView />
          </div>
          <div ref={mapContainerRef} style={{ position: 'absolute', bottom: 20, right: 20 }}>
            <MapView />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;