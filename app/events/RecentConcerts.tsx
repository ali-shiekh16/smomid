import React from 'react';
import Image from 'next/image';
import Section from '../components/Section';

const RecentConcerts = () => {
  return (
    <Section className='font-neo-latina'>
      <Image
        className='w-full  mb-20'
        src='/icons/line.svg'
        alt='Upcoming Concerts'
        width={1024}
        height={50}
      />

      <h2 className='text-6xl font-bold text-center mb-20'>
        Recent <br /> Concerts
      </h2>

      <div className='grid grid-cols-3 grid-rows-2 gap-x-5 gap-y-28 mx-20'>
        <Image
          className='object-contain w-full h-full'
          src='/images/concerts/1.png'
          alt='Concerts'
          width={500}
          height={500}
        />

        <Image
          className='object-contain w-full h-full translate-y-20'
          src='/images/concerts/2.png'
          alt='Concerts'
          width={500}
          height={500}
        />

        <Image
          className='object-contain w-full h-full'
          src='/images/concerts/3.png'
          alt='Concerts'
          width={500}
          height={500}
        />

        <Image
          className='object-contain w-full h-full'
          src='/images/concerts/4.png'
          alt='Concerts'
          width={500}
          height={500}
        />

        <Image
          className='object-contain w-full h-full translate-y-28'
          src='/images/concerts/5.png'
          alt='Concerts'
          width={500}
          height={500}
        />

        <Image
          className='object-contain w-full h-full'
          src='/images/concerts/6.png'
          alt='Concerts'
          width={500}
          height={500}
        />
      </div>

      <Image
        className='w-full  mt-48'
        src='/icons/line.svg'
        alt='Upcoming Concerts'
        width={1024}
        height={50}
      />
    </Section>
  );
};

export default RecentConcerts;
