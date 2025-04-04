import React, { useRef } from 'react';
import Link from 'next/link';
import Section from '@/app/components/Section';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useHomeStore } from '../_store';
import Image from 'next/image';
import PlayButton from '@/app/components/PlayButton';

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
        <div className='flex justify-between border-1 border-white self-end w-full md:w-1/3'>
          <div className='text-xl bg-transparent text-white outline-none border-none p-2 '>
            <Link href='/media'>Show All Videos</Link>
          </div>
          <button className='bg-white text-black px-4'>
            <Link href='/media'>
              <ArrowRight size={25} />
            </Link>
          </button>
        </div>

        <div className='w-full bg-amber-500  h-[70vh] flex justify-center relative'>
          <Link
            href='https://www.youtube.com/watch?v=IHJ9l7iVdnw&ab_channel=Smomid'
            target='_blank'
          >
            <PlayButton className=' absolute top-1/2 left-1/2 -translate-1/2' />
          </Link>
          <Image
            src='/images/media/8.webp'
            alt='Video Thumbnail'
            width={2000}
            height={2000}
            className='object-cover w-full h-full rounded-lg'
          />
        </div>
      </div>
    </Section>
  );
};

export default SectionVideo;
