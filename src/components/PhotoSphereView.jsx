import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import PhotoSphere from './PhotoSphere';

const PhotoSphereView = () => {
  return (
    <div style={{ position: 'absolute', width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 0.001] }}>
        <PhotoSphere imageUrl="/ps/ps1.jpg" />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          rotateSpeed={-0.5}
          reverseOrbit={true} 
        />
      </Canvas>
    </div>
  );
};

export default PhotoSphereView;