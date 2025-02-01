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
  const mapContainerRef = useRef(null);
  const photoContainerRef = useRef(null);

  // This handler fires when the user clicks Play.
  const handlePlay = () => {
    // Switch mode; we’ll then animate the layout in useEffect.
    setMode('split');
  };

  // When mode changes to split, animate the containers.
  useEffect(() => {
    if (mode === 'split') {
      // Animate the map container (which was full width) to now take 50% of the width.
      gsap.to(mapContainerRef.current, { duration: 1, width: '50%', ease: 'power2.out' });
      // Animate the photo container from 0 width to 50%.
      gsap.fromTo(
        photoContainerRef.current,
        { width: 0, opacity: 0 },
        { duration: 1, width: '50%', opacity: 1, ease: 'power2.out' }
      );
    }
  }, [mode]);

  return (
    <div className="App" style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
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
        // Split mode: two side-by-side views.
        <div style={{ display: 'flex', width: '100%', height: '100%' }}>
          {/* Left side: PhotoSphere view */}
          <div ref={photoContainerRef} style={{ width: '50%', height: '100%' }}>
            <PhotoSphereView />
          </div>
          {/* Right side: Map view in top-down perspective */}
          <div ref={mapContainerRef} style={{ width: '50%', height: '100%' }}>
            <MapView />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;