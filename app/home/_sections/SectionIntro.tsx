import FancyHeading from '@/app/components/FancyHeading';
import Section from '@/app/components/Section';
import React, { useRef } from 'react';
import { useHomeStore } from '../_store';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

const SectionIntro = () => {
  const setActiveIndex = useHomeStore(state => state.setActiveIndex);

  const container = useRef<HTMLDivElement>(null);
  const artistRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(container.current, {
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 75%',
          end: 'bottom bottom',
          onEnter: () => setActiveIndex(2),
          onEnterBack: () => setActiveIndex(2),
        },
      });

      ScrollTrigger.create({
        trigger: artistRef.current,
        start: 'top top',
        end: () =>
          `+=${
            (textContentRef.current?.offsetHeight || 0) -
            window.innerHeight +
            128
          }`,
        pin: true,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });
    },
    { scope: container }
  );

  return (
    <Section>
      <div
        ref={container}
        className='grid grid-cols-2 items-center gap-x-15 min-h-[300vh] relative'
      >
        <div ref={textContentRef}>
          <div className='h-screen  flex flex-col justify-center'>
            <FancyHeading className='py-8 uppercase'>
              What is a SMOMID?
            </FancyHeading>
            <p className='text-2xl'>
              <strong> Smomid (String Modeling Midi Device)</strong> is a
              custom-built electronic instrument by musician Nick Demopoulos.
            </p>
          </div>

          <div className='h-screen  flex flex-col justify-center'>
            <p className='text-2xl'>
              Unlike traditional guitars, Smomid features touch-sensitive
              surfaces, LED feedback, and deep integration with digital audio
              workstations (DAWs).
            </p>
          </div>
          <div className='h-screen  flex flex-col justify-center'>
            <p className='text-2xl'>
              Designed to push musical boundaries and offer a unique platform
              for creative expression.
            </p>
          </div>
        </div>

        <div ref={artistRef} className=' self-start px-4 pt-32'>
          <img
            src='/images/guitar.png'
            alt='Guitar Image'
            className='w-full h-auto object-contain max-w-[30rem]'
          />
        </div>
      </div>
    </Section>
  );
};

export default SectionIntro;
