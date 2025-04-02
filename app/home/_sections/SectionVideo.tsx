import React, { useRef } from 'react';
import Link from 'next/link';
import Section from '@/app/components/Section';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useHomeStore } from '../_store';

gsap.registerPlugin(ScrollTrigger);

const SectionVideo = () => {
  const setActiveIndex = useHomeStore(state => state.setActiveIndex);

  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: container.current,
        start: 'top 75%',
        end: 'top 30%',
        onEnter: () => setActiveIndex(3),
        onEnterBack: () => setActiveIndex(3),
      });
    },
    { scope: container }
  );

  return (
    <Section>
      <div
        ref={container}
        className='w-full min-h-screen  flex flex-col items-center justify-center gap-10'
      >
        <div className='flex justify-between border-1 border-white self-end w-1/3'>
          <div className='text-xl bg-transparent text-white outline-none border-none p-2 '>
            <Link href='/media'>Show All Videos</Link>
          </div>
          <button className='bg-white text-black px-4'>
            <Link href='/media'>
              <ArrowRight size={25} />
            </Link>
          </button>
        </div>

        <div className='w-full  h-[70vh] flex justify-center'>
          <iframe
            className='w-full h-full'
            src={`https://www.youtube.com/embed/IHJ9l7iVdnw?si=R7baQkXJze4PsUEz`}
            title='YouTube video player'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          ></iframe>
        </div>
      </div>
    </Section>
  );
};

export default SectionVideo;
