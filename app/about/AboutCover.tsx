import React from 'react';
import Block from '../components/Block';
import ButtonOutline from '../components/ButtonOutline';
import HeadingGradient from '../components/HeadingGradient';
import Nblock from '../components/Nblock';

const AboutCover = () => {
  return (
    <Nblock>
      <header className='bg-[url(/images/about-cover.png)] bg-cover bg-center h-screen'>
        <Block className='h-full flex flex-col justify-center'>
          <HeadingGradient>
            Nick <br /> Demopoulos
          </HeadingGradient>
          <div className='flex space-x-5'>
            <ButtonOutline> Singer </ButtonOutline>
            <ButtonOutline> Composer</ButtonOutline>
            <ButtonOutline> Producer</ButtonOutline>
          </div>
        </Block>
      </header>
    </Nblock>
  );
};

export default AboutCover;
