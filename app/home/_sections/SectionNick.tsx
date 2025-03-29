import FancyHeading from '@/app/components/FancyHeading';
import Section from '@/app/components/Section';
import React, { useRef } from 'react';
import { useHomeStore } from '../_store';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

const SectionNick = () => {
  const setActiveIndex = useHomeStore(state => state.setActiveIndex);

  const container = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.fromTo(
        container.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container.current,
            start: 'top 75%',
            end: 'top 30%',
            scrub: true,
            onEnter: () => setActiveIndex(1),
            onEnterBack: () => setActiveIndex(1),
            // markers: true, // Debugging
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <Section>
      <div ref={container}>
        <FancyHeading className='py-8 uppercase'>NICK DEMOPOULUS</FancyHeading>
        <p>
          Nick Demopoulos is a visionary musician, composer, and inventor of the
          Smomid (String Modeling Midi Device), redefining live music through
          technology.
        </p>
      </div>
    </Section>
  );
};

export default SectionNick;
