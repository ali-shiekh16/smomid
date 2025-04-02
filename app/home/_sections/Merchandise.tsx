import Section from '@/app/components/Section';
import React, { useRef } from 'react';
import MerchandiseCard from '../_components/MerchandiseCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useHomeStore } from '../_store';

gsap.registerPlugin(ScrollTrigger);

const data = [
  {
    title: 'Shirts',
    image: '/images/shirts/1.png',
    link: '/merchandise',
  },
  {
    title: 'Albums',
    image: '/images/albums/1.png',
    link: '/merchandise',
  },
];

const Merchandise = () => {
  const setActiveIndex = useHomeStore(state => state.setActiveIndex);

  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: container.current,
        start: 'top 75%',
        end: 'top 30%',
        onEnter: () => setActiveIndex(5),
        onEnterBack: () => setActiveIndex(5),
      });
    },
    { scope: container }
  );

  return (
    <Section>
      <div ref={container}>
        <div className='flex ml-auto mb-10 justify-between border-1 border-white self-end w-1/3'>
          <div className='text-xl bg-transparent text-white outline-none border-none p-2 '>
            <Link href='/merchandise' className='cursor-pointer'>
              Show All Merchandise
            </Link>
          </div>
          <button className='bg-white text-black px-4 cursor-pointer'>
            <Link href='/merchandise'>
              <ArrowRight size={25} />
            </Link>
          </button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {data.map((item, index) => (
            <div key={index}>
              <MerchandiseCard
                title={item.title}
                image={item.image}
                link={item.link}
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Merchandise;
