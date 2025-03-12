import React from 'react';
import HeadingUnderlined from '../components/HeadingUnderlined';
import Nblock from '../components/Nblock';
import Image from 'next/image';
import Section from '../components/Section';

const Merchverse = () => {
  return (
    <Section>
      <HeadingUnderlined className='text-right uppercase'>
        Merch Verse
      </HeadingUnderlined>

      <Nblock>
        <Image
          className='w-full object-cover my-20'
          src='/images/merchandise-masonary.png'
          width='1920'
          height='1080'
          alt='Merch Verse Marquee'
          objectFit='contain'
        />
      </Nblock>
    </Section>
  );
};

export default Merchverse;
