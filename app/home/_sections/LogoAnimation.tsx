import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import Nblock from '@/app/components/Nblock';
import { useHomeStore } from '../_store';
import ParticleSystem from '../_components/ParticleSystem';

import * as THREE from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const LogoAnimation = () => {
  const setActiveIndex = useHomeStore(state => state.setActiveIndex);
  const meshRef = useRef<THREE.Points>(null);
  const container = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };

      handleResize(); // Set initial value
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  const { contextSafe } = useGSAP({ scope: container });

  const handleParticleInit = contextSafe(
    (_: THREE.Points, material: THREE.ShaderMaterial) => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: 'top top',
            end: 'bottom 75%',
            scrub: 1,
            onEnter: () => setActiveIndex(0),
            onEnterBack: () => {
              setActiveIndex(0);
            },
            invalidateOnRefresh: true,
            preventOverlaps: true,
          },
        })
        .to(material.uniforms.u_density, {
          value: 0.1,
          ease: 'power4.out',
          duration: 0.1,
        })
        .to(material.uniforms.dispersion, {
          value: 3,
          ease: 'power2.out',
          duration: 1,
        })
        .to(
          material.uniforms.u_density,
          {
            value: 0.01,
            ease: 'power4.out',
          },
          '<'
        );

      gsap.to(material.uniforms.u_opacity, {
        value: 0,
        scrollTrigger: {
          trigger: container.current,
          start: '75% top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });
    }
  );

  return (
    <Nblock>
      <div ref={container} className='h-[200vh] w-full relative'>
        <div className='fixed h-screen w-full canvas-wrapper -z-10'>
          <Canvas>
            <ParticleSystem
              ref={meshRef}
              texturePath='/images/logo.png'
              onInit={handleParticleInit}
              step={3}
              scale={isMobile ? 0.85 : 1}
            />
          </Canvas>
        </div>
      </div>
    </Nblock>
  );
};

export default LogoAnimation;
