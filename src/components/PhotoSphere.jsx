// src/components/PhotoSphere.jsx
import React from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader, BackSide } from 'three';

const PhotoSphere = ({ imageUrl }) => {
  // Load the panoramic texture
  const texture = useLoader(TextureLoader, imageUrl);
  
  // Flip the texture horizontally
  texture.flipX = true;

  return (
    <mesh>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={BackSide} />
    </mesh>
  );
};

export default PhotoSphere;