// src/components/SplitScreen.jsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import PolycamView from './PolycamView';

const SplitScreen = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      {/* Left side: Polycam 3D scan view */}
      <div style={{ flex: 1, borderRight: '2px solid #444' }}>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <PolycamView />
        </Canvas>
      </div>

      {/* Right side: Map view for guessing */}
      <div style={{ flex: 1 }}>
        <Canvas camera={{ position: [0, 10, 10], rotation: [-0.8, 0, 0] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          {/* For now, a simple placeholder geometry */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="blue" />
          </mesh>
        </Canvas>
      </div>
    </div>
  );
};

export default SplitScreen;