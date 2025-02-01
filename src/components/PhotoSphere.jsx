// src/components/PhotoSphereView.jsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import PhotoSphere from './PhotoSphere';

const PhotoSphereView = () => {
  return (
    <Canvas camera={{ position: [0, 0, 0.1] }}>
      {/* Ambient light isn’t necessary if you want the full brightness of your panorama */}
      <PhotoSphere imageUrl="/path/to/your/panorama.jpg" />
      {/* OrbitControls enables the user to click and drag to look around */}
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
      />
    </Canvas>
  );
};

export default PhotoSphereView;