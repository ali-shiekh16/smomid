import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import Nblock from '@/app/components/Nblock';
import { useHomeStore } from '../_store';
import ParticleSystem from '../_components/ParticleSystem';

import * as THREE from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP);

const LogoAnimation = () => {
  const setActiveIndex = useHomeStore(state => state.setActiveIndex);
  const meshRef = useRef<THREE.Points>(null);
  const container = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: container });

  const handleParticleInit = contextSafe(
    (_: THREE.Points, material: THREE.ShaderMaterial) => {
      gsap.to(material.uniforms.dispersion, {
        value: 3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: 'bottom 75%',
          scrub: 1,
          onEnter: () => setActiveIndex(0),
          onEnterBack: () => {
            setActiveIndex(0);
          },
        },
      });

      gsap.to(material.uniforms.u_opacity, {
        value: 0,
        scrollTrigger: {
          trigger: container.current,
          start: '70% top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });
    }
  );

  return (
    <Nblock>
      <div ref={container} className='h-[300vh] w-full relative'>
        <div className='fixed h-screen w-full canvas-wrapper'>
          <Canvas>
            <ParticleSystem
              ref={meshRef}
              texturePath='/images/logo.png'
              onInit={handleParticleInit}
            />
          </Canvas>
        </div>
      </div>
    </Nblock>
  );
};

export default LogoAnimation;
