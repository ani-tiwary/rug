// src/App.jsx
// Example snippet in App.jsx for a GSAP transition
import { gsap } from 'gsap';

// Inside handlePlay or a useEffect hook, you can animate camera or other properties.
// This is just a conceptual example:
// gsap.to(cameraRef.current.position, {
//   duration: 1.5,
//   x: newX,
//   y: newY,
//   z: newZ,
//   onComplete: () => setMode('split'),
// });

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import SpinningMap from './components/SpinningMap';
import SplitScreen from './components/SplitScreen';
import './App.css';

function App() {
  // Modes: "intro" shows the spinning map; "split" shows the split-screen view.
  const [mode, setMode] = useState('intro');

  const handlePlay = () => {
    // You can add a GSAP transition here before switching modes.
    setMode('split');
  };

  return (
    <div className="App">
      {mode === 'intro' ? (
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <SpinningMap onPlay={handlePlay} />
        </Canvas>
      ) : (
        <SplitScreen />
      )}
    </div>
  );
}

export default App;