import React from 'react';
import Block from '../components/Block';
import Nblock from '../components/Nblock';

const EventCover = () => {
  return (
    <Nblock>
      <header className='bg-[url(/images/events-cover.webp)] bg-cover bg-center h-screen text-center'>
        <Block className='relative z-20 h-full flex flex-col justify-center '>
          <h1 className='text-7xl md:text-9xl font-bold font-neo-latina mb-0 text-shadow'>
            Events
          </h1>
        </Block>
      </header>
    </Nblock>
  );
};

export default EventCover;
