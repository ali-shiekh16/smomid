'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LogoAnimation from './LogoAnimation';
import SectionContact from './SectionContact';
import SectionNick from './SectionNick';
import SectionIntro from './SectionIntro';
import { useHomeStore } from '../_store';
import SectionVideo from './SectionVideo';
import Merchandise from './Merchandise';
import EventSummary from './EventSummary';

gsap.registerPlugin(ScrollTrigger);

const sections = [
  <LogoAnimation />,
  <SectionNick />,
  <SectionIntro />,
  <SectionVideo />,
  <EventSummary />,
  <Merchandise />,
  <SectionContact />,
];

export default function PageSlider() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { activeIndex } = useHomeStore(); // Zustand store

  return (
    <div className='relative flex'>
      {/* Sidebar Bullets */}
      <div className='fixed left-4 md:left-10 top-1/2 -translate-y-1/2 flex flex-col gap-4'>
        {sections.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? 'border-1 bg-blue-500 scale-125'
                : 'bg-gray-300'
            }`}
          ></div>
        ))}
      </div>

      <div className='w-full'>
        {sections.map((section, index) => (
          <div
            key={index}
            // @ts-ignore
            ref={el => (sectionRefs.current[index] = el)}
          >
            {section}
          </div>
        ))}
      </div>
    </div>
  );
}
