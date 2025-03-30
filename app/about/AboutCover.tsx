import React from 'react';
import Block from '../components/Block';
import ButtonOutline from '../components/ButtonOutline';
import HeadingGradient from '../components/HeadingGradient';
import Nblock from '../components/Nblock';

const AboutCover = () => {
  return (
    <Nblock>
      <header className='relative h-screen'>
        <div className='absolute inset-0 bg-gradient-to-b from-black/30 to-black/30 z-0'></div>
        <div className='absolute inset-0 bg-[url(/images/about-cover.webp)] bg-cover bg-center'></div>
        <Block className='relative z-10 h-full flex flex-col space-y-3 justify-center'>
          <h1 className='text-5xl text-center md:text-left md:text-9xl font-bold font-neo-latina text-shadow'>
            SMOMID
            <br />- Nick Demopoulos
          </h1>
          <div className='flex space-x-5 justify-center md:justify-start shadow-sm'>
            <ButtonOutline>
              <span className='text-3xl md:text-4xl text-shadow'>Musician</span>
            </ButtonOutline>
          </div>
        </Block>
      </header>
    </Nblock>
  );
};

export default AboutCover;
