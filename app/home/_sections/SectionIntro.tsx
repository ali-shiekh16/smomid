'use client';
import FancyHeading from '@/app/components/FancyHeading';
import Section from '@/app/components/Section';
import { Canvas } from '@react-three/fiber';
import React, { useRef } from 'react';
import ParticleSystem from '../_components/ParticleSystem';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useHomeStore } from '../_store';

gsap.registerPlugin(ScrollTrigger);

const SectionIntro = () => {
  const setActiveIndex = useHomeStore(state => state.setActiveIndex);

  const container = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      // ScrollTrigger.getAll().forEach(trigger => trigger.kill());

      gsap.fromTo(
        container.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          // duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container.current,
            start: 'top 75%', // Animation starts when section enters viewport
            end: 'top 30%',
            scrub: true,
            onEnter: () => setActiveIndex(2),
            onEnterBack: () => setActiveIndex(2),
            // markers: true, // Debugging
          },
        }
      );
      // ScrollTrigger.refresh();
      // gsap code here...
      // gsap.to('.box', { x: 100 }); // <-- automatically reverted
    },
    { scope: container }
  ); // <-- easily add a scope fo

  return (
    <Section>
      <div className='grid grid-cols-2 h-screen items-center' ref={container}>
        <div>
          <div>
            <FancyHeading className='py-8 uppercase'>
              What is Smomid?
            </FancyHeading>
            <p className='text-2xl'>
              <strong>Smomid (String Modeling Midi Device)</strong> is a
              custom-built electronic instrument by musician Nick Demopoulos.
            </p>
          </div>
        </div>
        <div className='h-full w-full right'>
          <Canvas>
            <ParticleSystem texturePath='/images/guitar.png' />
          </Canvas>
        </div>
      </div>
    </Section>
  );
};

export default SectionIntro;
