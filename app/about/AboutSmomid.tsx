import React from 'react';
import Image from 'next/image';
import HeadingPill from '../components/HeadingPill';
import Section from '../components/Section';

const AboutSmomid = () => {
  return (
    <Section>
      <HeadingPill align='right'>About Smomid</HeadingPill>
      <div className='md:flex md:items-stretch md:space-x-3 md:space-y-0 space-y-3'>
        <p className='border-1 rounded-xl p-5 text-lg'>
          Smomid (String Modeling Midi Device) is a unique, custom-built
          electronic instrument created by musician Nick Demopoulos. It
          resembles a futuristic guitar but functions as a MIDI controller,
          allowing users to generate electronic sounds, trigger samples, and
          manipulate effects in real time. Unlike traditional guitars, Smomid
          has touch-sensitive surfaces, LED feedback, and deep integration with
          digital audio workstations (DAWs), making it a powerful tool for live
          performances and experimental music production. Demopoulos designed
          Smomid to push the boundaries of musical expression, blending
          technology with improvisation.
        </p>
        <Image
          className='p-4 rounded-xl object-cover border-1 border-white min-w-1/3'
          src='/images/about-guitar.png'
          alt='Smomid'
          width='500'
          height='500'
          objectFit='cover'
        />
      </div>
    </Section>
  );
};

export default AboutSmomid;
