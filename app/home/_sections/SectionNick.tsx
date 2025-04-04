import FancyHeading from '@/app/components/FancyHeading';
import Section from '@/app/components/Section';
import React, { useRef } from 'react';
import { useHomeStore } from '../_store';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import Text from '../_components/Text';

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
    // <Section>
    <div
      ref={container}
      className='flex flex-col md:grid md:grid-cols-2 md:items-start md:gap-x-15 relative'
      style={{ minHeight: '300vh' }}
    >
      <div
        ref={artistRef}
        className='w-full h-[40vh] rounded-lg  md:h-screen flex items-start md:items-center justify-center px-4 md:order-1'
      >
        <img
          ref={imageRef}
          src='/images/artist.png'
          alt='Nick Demopoulos'
          className='w-full h-auto translate-y-10 md:translate-y-0  object-contain max-w-[15rem] md:max-w-[30rem]'
        />
      </div>

      <div ref={textContentRef}>
        <div className='h-screen flex flex-col justify-center'>
          <FancyHeading className='py-8 uppercase'>
            NICK DEMOPOULOS
          </FancyHeading>
          <Text>
            Nick Demopoulos is a visionary musician, composer, and inventor of
            the Smomid (String Modeling Midi Device), redefining live music
            through technology.
          </Text>
        </div>

        <div className='h-screen flex flex-col justify-center'>
          <Text>
            His custom-built instruments enable interactive audiovisual
            performances, generating sound, LED light displays, and video
            animations.
          </Text>
        </div>
        <div className='h-screen flex flex-col justify-center'>
          <Text>
            His innovative approach pushes the boundaries of sound and
            performance, blending digital innovation with analog charm to create
            immersive musical experiences.
          </Text>
        </div>
      </div>
    </div>
    // </Section>
  );
};

export default SectionNick;
