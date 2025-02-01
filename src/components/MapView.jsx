// src/components/MapView.jsx
import React, { useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { gsap } from 'gsap';

const MapScene = () => {
  const { camera } = useThree();

  useEffect(() => {
    // Animate the camera from its initial position ([0, 0, 5]) to a top-down view.
    // In a top-down view, we position the camera high on the Y axis and very close to zero on Z.
    gsap.to(camera.position, {
      duration: 1.5,
      x: 0,
      y: 10,
      z: 0.1,
      ease: 'power2.out',
      onUpdate: () => {
        camera.lookAt(0, 0, 0);
      },
    });
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {/* The cube (map placeholder) */}
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </>
  );
};

const MapView = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <MapScene />
    </Canvas>
  );
};

export default MapView;