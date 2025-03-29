import { ArrowRight, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import Section from '@/app/components/Section';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useHomeStore } from '../_store';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  icon: React.ReactNode;
  title: string;
  text: string;
}
const Item = ({ icon, title, text }: Props) => (
  <div className='flex space-x-2'>
    {/* <MapPinIcon size={35} className='text-white' /> */}
    {icon}
    <div>
      <h3 className='text-2xl md:text-4xl font-semibold font-neo-latina'>
        {title}
      </h3>
      <p>
        {text}
        {/* Istanbul
        <br /> 28 Erutgul Street, Vinencia */}
      </p>
    </div>
  </div>
);
const SectionContact = () => {
  const setActiveIndex = useHomeStore(state => state.setActiveIndex);

  const container = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      // ScrollTrigger.getAll().forEach(trigger => trigger.kill());

      gsap.fromTo(
        container.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          // duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container.current,
            start: 'top 75%', // Animation starts when section enters viewport
            end: 'top 30%',
            scrub: true,
            onEnter: () => setActiveIndex(3),
            onEnterBack: () => setActiveIndex(3),
            // markers: true, // Debugging
          },
        }
      );
      // ScrollTrigger.refresh();
      // gsap code here...
      // gsap.to('.box', { x: 100 }); // <-- automatically reverted
    },
    { scope: container }
  ); // <-- easily add a scope fo

  return (
    <Section className='h-screen'>
      <div
        ref={container}
        className='md:flex h-full md:items-center md:justify-between md:space-x-10 space-y-10 md:space-y-0'
      >
        <div className='space-y-10'>
          <h2 className='text-4xl md:text-7xl font-neo-latina font-semibold'>
            Start a <br />
            Conversation.
          </h2>

          <div className='flex justify-between border-1 border-white '>
            <input
              type='text'
              placeholder='Enter your email'
              className='text-xl bg-transparent text-white outline-none border-none p-2'
            />
            <button className='bg-white text-black px-4'>
              <ArrowRight size={25} />
            </button>
          </div>
        </div>

        <div className='md:mr-28'>
          <ul className='space-y-10'>
            <li>
              <Item
                icon={<MapPinIcon size={35} className='text-white' />}
                title='Location'
                text='Istanbul, Turkey'
              />
            </li>
            <li>
              <Item
                icon={<PhoneIcon size={35} className='text-white' />}
                title='Phone'
                text='+90 555 555 55 55'
              />
            </li>
            <li>
              <Item
                icon={<MailIcon size={35} className='text-white' />}
                title='Mail'
                text='stomXdid07x@gmail.com'
              />
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
};

export default SectionContact;
