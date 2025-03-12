import React from 'react';
import Section from '../components/Section';
import HeadingUnderlined from '../components/HeadingUnderlined';
import Nblock from '../components/Nblock';
import Image from 'next/image';

const ConcertWall = () => {
  return (
    <Section>
      <HeadingUnderlined className='text-right'>Concert Wall</HeadingUnderlined>

      <Nblock>
        <Image
          className='object-cover w-full mt-30'
          src='/images/masonary.png'
          alt='Concerts'
          width={1024}
          height={1000}
          objectFit='cover'
        />
      </Nblock>
    </Section>
  );
};

export default ConcertWall;
