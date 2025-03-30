import FancyHeading from '@/app/components/FancyHeading';
import Section from '@/app/components/Section';
import React, { useRef } from 'react';
import { useHomeStore } from '../_store';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

const SectionNick = () => {
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
          onEnter: () => setActiveIndex(1),
          onEnterBack: () => setActiveIndex(1),
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
              NICK DEMOPOULOS
            </FancyHeading>
            <p className='text-2xl'>
              Nick Demopoulos is a visionary musician, composer, and inventor of
              the Smomid (String Modeling Midi Device), redefining live music
              through technology.
            </p>
          </div>

          <div className='h-screen  flex flex-col justify-center'>
            <p className='text-2xl'>
              His custom-built instruments enable interactive audiovisual
              performances, generating sound, LED light displays, and video
              animations.
            </p>
          </div>
          <div className='h-screen  flex flex-col justify-center'>
            <p className='text-2xl'>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Obcaecati consequuntur dolor nulla error. Cupiditate, recusandae.
            </p>
          </div>
        </div>

        <div ref={artistRef} className=' self-start px-4 pt-32'>
          <img
            src='/images/artist.png'
            alt='Nick Demopoulos'
            className='w-full h-auto object-contain max-w-[30rem]'
          />
        </div>
      </div>
    </Section>
  );
};

export default SectionNick;
