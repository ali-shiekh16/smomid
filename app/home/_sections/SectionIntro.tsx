import React, { useRef } from 'react';
import * as THREE from 'three';
import FancyHeading from '@/app/components/FancyHeading';
import Section from '@/app/components/Section';
import { useHomeStore } from '../_store';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { Canvas } from '@react-three/fiber';
import ParticleSystem from '../_components/ParticleSystem';

gsap.registerPlugin(ScrollTrigger);

const SectionIntro = () => {
  const setActiveIndex = useHomeStore(state => state.setActiveIndex);

  const container = useRef<HTMLDivElement>(null);
  const meshRef = useRef<THREE.Points>(null);
  const artistRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (!artistRef.current || !textContentRef.current) return;

      ScrollTrigger.create({
        trigger: artistRef.current,
        start: 'top top',
        end: () =>
          `+=${
            (textContentRef.current?.offsetHeight || 0) -
            window.innerHeight +
            128
          }`,
        pin: artistRef.current,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });
    },
    { scope: container, dependencies: [] }
  );

  const { contextSafe } = useGSAP({ scope: container });

  const handleParticleInit = contextSafe(
    (_points: THREE.Points, material: THREE.ShaderMaterial) => {
      if (!material?.uniforms?.dispersion) {
        console.error('Dispersion uniform not found on material');
        return;
      }

      gsap.to(material.uniforms.dispersion, {
        value: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: 'bottom 75%',
          scrub: true,
          onEnter: () => setActiveIndex(2),
          onEnterBack: () => setActiveIndex(2),
        },
      });
    }
  );

  return (
    <Section>
      <div
        ref={container}
        className='grid grid-cols-2 items-start gap-x-15 relative'
        style={{ minHeight: '300vh' }}
      >
        <div ref={textContentRef} className=''>
          <div className='h-screen flex flex-col justify-center'>
            <FancyHeading className='py-8 uppercase'>
              What is a SMOMID?
            </FancyHeading>
            <p className='text-2xl'>
              <strong> Smomid (String Modeling Midi Device)</strong> is a
              custom-built electronic instrument by musician Nick Demopoulos.
            </p>
          </div>
          <div className='h-screen flex flex-col justify-center'>
            <p className='text-2xl'>
              Unlike traditional guitars, Smomid features touch-sensitive
              surfaces, LED feedback, and deep integration with digital audio
              workstations (DAWs).
            </p>
          </div>
          <div className='h-screen flex flex-col justify-center'>
            <p className='text-2xl'>
              Designed to push musical boundaries and offer a unique platform
              for creative expression.
            </p>
          </div>
        </div>

        <div ref={artistRef} className='w-full h-screen sticky top-0'>
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <ParticleSystem
              ref={meshRef}
              texturePath='/images/guitar.png'
              onInit={handleParticleInit}
            />
          </Canvas>
        </div>
      </div>
    </Section>
  );
};

export default SectionIntro;
