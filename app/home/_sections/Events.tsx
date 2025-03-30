import FancyHeading from '@/app/components/FancyHeading';
import Section from '@/app/components/Section';
import React, { useRef } from 'react';
import { useHomeStore } from '../_store';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

const Events = () => {
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
          onEnter: () => setActiveIndex(4),
          onEnterBack: () => setActiveIndex(4),
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
            <FancyHeading className='py-8 uppercase'>Events</FancyHeading>
            <p className='text-2xl'>
              Get ready, USA! I’m bringing the energy, the music, and the vibes
              to six electrifying cities for an unforgettable concert
              experience!
            </p>
          </div>

          <div className='h-screen  flex flex-col justify-center'>
            <p className='text-2xl'>
              From heart-thumping rhythms to soul-stirring melodies, every
              moment is crafted to take you on an emotional journey.
            </p>
          </div>
          <div className='h-screen  flex flex-col justify-center'>
            <p className='text-2xl'>
              Let’s make memories that will last a lifetime! Grab your crew and
              get ready to lose yourself in the music.
            </p>
          </div>
        </div>

        <div ref={artistRef} className=' self-start px-4 pt-96'>
          <img
            src='/icons/map.svg'
            alt='Nick Demopoulos'
            className='w-full h-full object-contain scale-125'
          />
        </div>
      </div>
    </Section>
  );
};

export default Events;
