import Section from '@/app/components/Section';
import React, { useRef } from 'react';
import EventCard from '../_components/EventCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useHomeStore } from '../_store';

gsap.registerPlugin(ScrollTrigger);

const data = [
  {
    image: '/images/media/13.webp',
    date: 'March 3rd, 2025',
    children: (
      <p className='text-center text-lg md:text-2xl text-white '>
        Tradesman Bar
        <br />
        222 bushwick Ave, Brooklyn, <br /> NY 11206
      </p>
    ),
  },
  {
    image: '/images/media/14.webp',
    date: 'March 23rd, 2025',
    children: (
      <p className='text-center text-lg md:text-2xl text-white '>
        Ivy House
        <br />
        322 Troutman Street Brooklyn, <br /> NY Vegas
      </p>
    ),
  },
];

const EventSummary = () => {
  const setActiveIndex = useHomeStore(state => state.setActiveIndex);

  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: container.current,
        start: 'top 75%',
        end: 'top 30%',
        onEnter: () => setActiveIndex(4),
        onEnterBack: () => setActiveIndex(4),
      });
    },
    { scope: container }
  );

  return (
    <Section>
      <div ref={container} className='h-screen'>
        <div className='flex ml-auto mb-20 justify-between border-1 border-white self-end md:w-1/3'>
          <div className='text-xl bg-transparent text-white outline-none border-none p-2 '>
            <Link href='/events'>Show All Events</Link>
          </div>
          <button className='bg-white text-black px-4'>
            <Link href='/events'>
              <ArrowRight size={25} />
            </Link>
          </button>
        </div>
        <div className='md:grid md:grid-cols-2 md:gap-8 space-y-10 md:space-y-0'>
          {data.map((item, index) => (
            <div key={index}>
              <EventCard
                image={item.image}
                date={item.date}
                position={index % 2 === 0 ? 'top' : 'bottom'}
              >
                {item.children}
              </EventCard>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default EventSummary;
