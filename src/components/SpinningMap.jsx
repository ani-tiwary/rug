// src/components/SpinningMap.jsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';
// Import GSAP if you plan to animate things on play:
// import { gsap } from 'gsap';

const SpinningMap = ({ onPlay }) => {
  const meshRef = useRef();

  // Rotate the mesh every frame.
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5; // Adjust speed as needed
    }
  });

  return (
    <>
      {/* Outer space skybox – you can adjust parameters or use a custom texture */}
      <Sky
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
      />
      <mesh ref={meshRef} onClick={onPlay} position={[0, 0, 0]}>
        {/* Replace this BoxGeometry with your Rutgers campus model */}
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      {/* Optional: use orbit controls for debugging (disable zoom/pan in production) */}
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  );
};

export default SpinningMap;