import React from 'react';
import Image from 'next/image';
import Section from '../components/Section';
import ButtonOutline from '../components/ButtonOutline';
import { ArrowUpRight } from 'lucide-react';

const TourButton = ({ country }: { country: string }) => {
  return (
    <ButtonOutline className='flex space-x-5 items-center'>
      <span className='text-xl font-normal'>
        <span className='text-4xl mr-2 uppercase'>{country}</span>
        Tour
      </span>
      <ArrowUpRight size={30} />
    </ButtonOutline>
  );
};

const UpcomingConcerts = () => {
  return (
    <Section>
      <Image
        className='w-full  mb-20'
        src='/icons/line.svg'
        alt='Upcoming Concerts'
        width={1024}
        height={50}
      />

      <div className='font-neo-latina flex justify-between'>
        <div className='space-y-5'>
          <h2 className='text-6xl font-bold'>
            Upcoming <br /> Concerts
          </h2>
          <p className='text-xl'>Experience the music of Smomid live.</p>
          <ButtonOutline className='flex space-x-5'>
            <span className='text-xl font-normal'>See More</span>
            <ArrowUpRight size={25} />
          </ButtonOutline>
        </div>
        <div className='flex items-center space-x-5'>
          <TourButton country='UK' />
          <TourButton country='Japan' />
          <TourButton country='Arsean' />
        </div>
      </div>
    </Section>
  );
};

export default UpcomingConcerts;
