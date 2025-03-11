import React from 'react';
import Section from '../components/Section';
import HeadingUnderlined from '../components/HeadingUnderlined';
import Image from 'next/image';
import Nblock from '../components/Nblock';

const Photos = () => {
  return (
    <Section>
      <HeadingUnderlined className='text-right'>Photos</HeadingUnderlined>

      <Nblock>
        <Image
          className='w-full mt-20'
          src='/images/masonary.png'
          alt='photo'
          width='1000'
          height='1000'
        />
      </Nblock>
    </Section>
  );
};

export default Photos;
