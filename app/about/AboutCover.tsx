import React from 'react';
import Block from '../components/Block';
import ButtonOutline from '../components/ButtonOutline';
import HeadingGradient from '../components/HeadingGradient';
import Nblock from '../components/Nblock';

const AboutCover = () => {
  return (
    <Nblock>
      <header className='bg-[url(/images/about-cover.jpeg)] bg-cover bg-center h-screen'>
        <Block className='h-full flex flex-col justify-center'>
          <h1 className='text-9xl font-bold font-neo-latina'>
            SMOMID
            <br />- Nick Demoopoulos
          </h1>
          <div className='flex space-x-5'>
            <ButtonOutline>
              <span className='text-4xl'>Musician</span>
            </ButtonOutline>
          </div>
        </Block>
      </header>
    </Nblock>
  );
};

export default AboutCover;
