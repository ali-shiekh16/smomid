import { Canvas } from '@react-three/fiber';
import React, { useRef } from 'react';
import Nblock from '@/app/components/Nblock';
import ParticleSystem from '../_components/ParticleSystem';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useHomeStore } from '../_store';
import * as THREE from 'three';
import { Loader } from '@react-three/drei';

gsap.registerPlugin(useGSAP);

const LogoAnimation = () => {
  const setActiveIndex = useHomeStore(state => state.setActiveIndex);
  const meshRef = useRef<THREE.Points>(null);
  const container = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: container });

  const handleParticleInit = contextSafe(
    (_: THREE.Points, material: THREE.ShaderMaterial) => {
      gsap.to(material.uniforms.dispersion, {
        value: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: 'bottom 75%',
          scrub: true,
          onEnter: () => setActiveIndex(0),
          onEnterBack: () => setActiveIndex(0),
        },
      });
    }
  );

  return (
    <Nblock>
      <div ref={container} className='h-screen w-full'>
        <Canvas>
          <ParticleSystem
            ref={meshRef}
            texturePath='/images/logo.png'
            onInit={handleParticleInit}
          />
          <Loader />
        </Canvas>
      </div>
    </Nblock>
  );
};

export default LogoAnimation;
