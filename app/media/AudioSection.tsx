import React from 'react';
import Section from '../components/Section';
import HeadingUnderlined from '../components/HeadingUnderlined';
import Image from 'next/image';
import Nblock from '../components/Nblock';

const AudioSection = () => {
  return (
    <Section>
      <HeadingUnderlined>Audio Section</HeadingUnderlined>
      <Nblock className='my-20'>
        <Image
          className='object-contain w-full h-full'
          src='/images/audio-player.png'
          alt='Audio'
          width={1024}
          height={500}
        />
      </Nblock>
    </Section>
  );
};

export default AudioSection;
