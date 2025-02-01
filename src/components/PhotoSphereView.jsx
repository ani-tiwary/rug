// src/components/PhotoSphereView.jsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import PhotoSphere from './PhotoSphere';

const PhotoSphereView = () => {
  return (
    <Canvas camera={{ position: [0, 0, 0.1] }}>
      <PhotoSphere imageUrl="/panorama.jpg" />
      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.4} />
    </Canvas>
  );
};

export default PhotoSphereView;