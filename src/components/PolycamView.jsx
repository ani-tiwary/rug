// src/components/PolycamView.jsx
import React from 'react';

const PolycamView = () => {
  return (
    <mesh>
      {/* Replace this sphere with your actual Polycam scan model */}
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
};

export default PolycamView;