'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LogoAnimation from './LogoAnimation';
import SectionContact from './SectionContact';

gsap.registerPlugin(ScrollTrigger);

const sections = [
  <LogoAnimation />,
  <SectionContact />,
  <LogoAnimation />,
  <SectionContact />,
];

export default function PageSlider() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    sectionRefs.current.forEach((section, index) => {
      if (section) {
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
          markers: true, // Enable markers for debugging
        });
      }
    });

    ScrollTrigger.refresh();
  }, [sections]);

  return (
    <div className='relative flex'>
      {/* Sidebar Bullets */}
      <div className='fixed left-5 top-1/2 -translate-y-1/2 flex flex-col gap-4'>
        {sections.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              activeIndex === index ? 'bg-blue-500 scale-125' : 'bg-gray-300'
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
