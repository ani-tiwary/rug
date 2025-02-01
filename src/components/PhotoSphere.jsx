import React from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader, BackSide } from 'three';

const PhotoSphere = ({ imageUrl }) => {
  const texture = useLoader(TextureLoader, imageUrl);
  texture.flipX = true;

  return (
    <mesh>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={BackSide} />
    </mesh>
  );
};

export default PhotoSphere;