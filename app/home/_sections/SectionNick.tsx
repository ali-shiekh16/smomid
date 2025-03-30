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
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      gsap.to(container.current, {
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 75%',
          end: 'bottom bottom',
          onEnter: () => setActiveIndex(1),
          onEnterBack: () => setActiveIndex(1),
        },
      });

      if (!artistRef.current || !textContentRef.current) return;

      const pinTrigger = ScrollTrigger.create({
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

      if (imageRef.current && container.current && pinTrigger) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: container.current,
              start: 'top top',
              end: () => `+=${pinTrigger.end - pinTrigger.start}`,
              scrub: true,
            },
          })
          .to(imageRef.current, {
            rotate: -Math.PI * 3,
            ease: 'none',
          })
          .to(imageRef.current, {
            rotate: Math.PI * 3,
            ease: 'none',
          });
      }

      return () => {
        pinTrigger?.kill();
      };
    },
    { scope: container }
  );

  return (
    <Section>
      <div
        ref={container}
        className='grid grid-cols-2 items-start gap-x-15 relative'
        style={{ minHeight: '300vh' }}
      >
        <div ref={textContentRef}>
          <div className='h-screen flex flex-col justify-center'>
            <FancyHeading className='py-8 uppercase'>
              NICK DEMOPOULOS
            </FancyHeading>
            <p className='text-2xl'>
              Nick Demopoulos is a visionary musician, composer, and inventor of
              the Smomid (String Modeling Midi Device), redefining live music
              through technology.
            </p>
          </div>

          <div className='h-screen flex flex-col justify-center'>
            <p className='text-2xl'>
              His custom-built instruments enable interactive audiovisual
              performances, generating sound, LED light displays, and video
              animations.
            </p>
          </div>
          <div className='h-screen flex flex-col justify-center'>
            <p className='text-2xl'>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Obcaecati consequuntur dolor nulla error. Cupiditate, recusandae.
            </p>
          </div>
        </div>

        <div
          ref={artistRef}
          className='w-full h-screen sticky top-0 flex items-center justify-center px-4'
        >
          <img
            ref={imageRef}
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
