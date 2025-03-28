import { Canvas } from '@react-three/fiber';
import React from 'react';
import Nblock from '@/app/components/Nblock';
import ParticleSystem from '../_components/ParticleSystem';

const LogoAnimation = () => {
  return (
    <Nblock>
      <div className='h-screen w-full'>
        <Canvas>
          <ParticleSystem texturePath='/images/logo.png' />
        </Canvas>
      </div>
    </Nblock>
  );
};

export default LogoAnimation;
