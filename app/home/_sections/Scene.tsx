import { Canvas } from '@react-three/fiber';
import React from 'react';
import { OrbitControls } from '@react-three/drei';
import Nblock from '@/app/components/Nblock';
import ParticleSystem from '../_components/ParticleSystem';

const Scene = () => {
  return (
    <Nblock>
      <div className='h-screen w-full'>
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <ParticleSystem texturePath='/images/guitar.png' />
          <OrbitControls />
        </Canvas>
      </div>
    </Nblock>
  );
};

export default Scene;
