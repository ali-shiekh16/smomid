import FancyHeading from '@/app/components/FancyHeading';
import Section from '@/app/components/Section';
import React, { useRef } from 'react';
import { useHomeStore } from '../_store';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import MapSvgDots from '../_components/MapSvgDots';

gsap.registerPlugin(ScrollTrigger);

const Events = () => {
  const setActiveIndex = useHomeStore(state => state.setActiveIndex);

  const container = useRef<HTMLDivElement>(null);
  const artistRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

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

      const getPinDuration = () => {
        const textHeight = textContentRef.current?.offsetHeight || 0;
        const windowHeight = window.innerHeight;
        return Math.max(0, textHeight - windowHeight + 128);
      };

      const pinTrigger = ScrollTrigger.create({
        trigger: artistRef.current,
        start: 'top top',
        end: () => `+=${getPinDuration()}`,
        pin: true,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });

      const svgGroups = gsap.utils.toArray<SVGGElement>(
        svgRef.current?.querySelectorAll('.event-location-group') ?? []
      );

      if (svgGroups.length > 0) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: 'top top',
            end: () => `+=${getPinDuration()}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.set(svgGroups, { y: 200, autoAlpha: 0 });

        tl.to(svgGroups, {
          y: 0,
          autoAlpha: 1,
          stagger: 0.5,
          ease: 'power2.out',
        });
      }

      return () => {
        pinTrigger?.kill();
        ScrollTrigger.getAll().forEach(st => {});
      };
    },
    { scope: container, dependencies: [] }
  );

  return (
    <Section>
      <div
        ref={container}
        className='grid grid-cols-2 items-start gap-x-15 relative'
      >
        <div ref={textContentRef}>
          <div className='h-screen flex flex-col justify-center'>
            <FancyHeading className='py-8 uppercase'>Events</FancyHeading>
            <p className='text-2xl'>
              Get ready, USA! I’m bringing the energy, the music, and the vibes
              to six electrifying cities for an unforgettable concert
              experience!
            </p>
          </div>
          <div className='h-screen flex flex-col justify-center'>
            <p className='text-2xl'>
              From heart-thumping rhythms to soul-stirring melodies, every
              moment is crafted to take you on an emotional journey.
            </p>
          </div>
          <div className='h-screen flex flex-col justify-center'>
            <p className='text-2xl'>
              Let’s make memories that will last a lifetime! Grab your crew and
              get ready to lose yourself in the music.
            </p>
          </div>
        </div>

        <div
          ref={artistRef}
          className='h-screen sticky top-0 self-start flex items-center justify-center px-4'
        >
          <svg
            ref={svgRef}
            className='w-full h-auto max-h-[80vh] object-contain'
            viewBox='0 0 1112 500'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <MapSvgDots />
            <g className='event-location-group'>
              <path
                d='M279.732 123.863H280.93L280.481 198.203H279.732V123.863Z'
                fill='white'
              />
              <rect
                width='125.483'
                height='49'
                transform='translate(220.902 78.4717)'
                fill='white'
              />
            </g>
            <g className='event-location-group'>
              <path
                d='M992.85 170.023H994.047L993.598 244.363H992.85V170.023Z'
                fill='white'
              />
              <rect
                width='125.483'
                height='49'
                transform='translate(934.223 124.099)'
                fill='white'
              />
            </g>
            <g className='event-location-group'>
              <path
                d='M371.768 59.7148H373.264L372.703 184.413H371.768V59.7148Z'
                fill='white'
              />
              <rect
                width='125.483'
                height='49'
                transform='translate(298.123 15.0566)'
                fill='white'
              />
            </g>
            <g className='event-location-group'>
              <path
                d='M732.453 301.317H733.95L733.388 426.016H732.453V301.317Z'
                fill='white'
              />
              <rect
                width='126.448'
                height='49'
                transform='translate(667.812 254.792)'
                fill='white'
              />
            </g>
            <g className='event-location-group'>
              <path
                d='M803.535 112.47H805.032L804.471 232.372H803.535V112.47Z'
                fill='white'
              />
              <rect
                width='125.483'
                height='49'
                transform='translate(729.592 67.6455)'
                fill='white'
              />
            </g>
            <g className='event-location-group'>
              <path
                d='M485.506 190.408H487.002L486.441 315.107H485.506V190.408Z'
                fill='white'
              />
              <rect
                width='125.483'
                height='49'
                transform='translate(422.641 141.887)'
                fill='white'
              />
            </g>
          </svg>
        </div>
      </div>
    </Section>
  );
};

export default Events;
