import React, { useRef } from 'react';
import * as THREE from 'three';
import FancyHeading from '@/app/components/FancyHeading';
import Section from '@/app/components/Section';
import { useHomeStore } from '../_store';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import ParticleSystem from '../_components/ParticleSystem';
import Text from '../_components/Text';

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
    },
    { scope: container, dependencies: [] }
  );

  const { contextSafe } = useGSAP({ scope: container });

  const handleParticleInit = contextSafe(
    (_points: THREE.Points, material: THREE.ShaderMaterial) => {
      if (!material?.uniforms?.dispersion || !meshRef.current) return;

      meshRef.current.position.x = window.innerWidth < 768 ? 0 : 20;

      material.uniforms.u_opacity.value = 0.0;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: '15% bottom',
            end: 'bottom 75%',
            scrub: 1,
            onEnter: () => setActiveIndex(2),
            onEnterBack: () => setActiveIndex(2),
            invalidateOnRefresh: true,
            preventOverlaps: true,
          },
        })
        .to(material.uniforms.u_opacity, {
          value: 1,
          ease: 'power2.inOut',
          duration: 0.001,
        })
        .to('.canvas-wrapper', {
          opacity: 1,
        })
        .to(material.uniforms.u_density, {
          value: 0.1,
          ease: 'power4.out',
          duration: 0.1,
        })
        .to(
          material.uniforms.u_size,
          {
            value: 1,
            ease: 'power4.out',
          },
          '<'
        )
        .to(material.uniforms.dispersion, {
          value: 1,
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
        )
        .to(material.uniforms.u_opacity, {
          value: 0,
          ease: 'power2.out',
          duration: 0.1,
        });
    }
  );

  return (
    <Section>
      <div
        ref={container}
        className='md:grid md:grid-cols-2 md:items-start md:gap-x-15 relative'
        style={{ minHeight: '300vh' }}
      >
        <div
          ref={artistRef}
          className='w-full backdropk h-[40vh] md:h-screen fixed inset-0 canvas-wrapper opacity-0 md:-z-10 order-1'
        >
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <ParticleSystem
              ref={meshRef}
              texturePath='/images/guitar.png'
              onInit={handleParticleInit}
              particleSize={0.5}
              step={3}
              scale={window.innerWidth < 768 ? 1.5 : 1}
            />
          </Canvas>
        </div>
        <div ref={textContentRef} className=''>
          <div className='h-screen flex flex-col justify-center'>
            <FancyHeading className='py-8 uppercase'>
              What is a SMOMID?
            </FancyHeading>
            <Text>
              <strong> Smomid (String Modeling Midi Device)</strong> is a
              custom-built electronic instrument by musician Nick Demopoulos.
            </Text>
          </div>
          <div className='h-screen flex flex-col justify-center'>
            <Text>
              Unlike traditional guitars, Smomid features touch-sensitive
              surfaces, LED feedback, and enables real time interaction with
              interactive software.
            </Text>
          </div>
          <div className='h-screen flex flex-col justify-center'>
            <Text>
              With Smomid a musicians gestures can be remapped to create sound,
              light, visual animations, control a robotic servo among many other
              applications
            </Text>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default SectionIntro;
