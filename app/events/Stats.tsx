import React from 'react';
import Section from '../components/Section';

const Stats = () => {
  return (
    <Section>
      <div className='grid grid-cols-2 font-neo-latina'>
        <div className='flex   space-x-28'>
          <div className='flex flex-col justify-center'>
            <h1 className='text-5xl font-bold'>IOO+</h1>
            <p className='text-2xl'>Shows</p>
          </div>
          <div className='flex flex-col justify-center'>
            <h1 className='text-5xl font-bold'>IOK+</h1>
            <p className='text-2xl'>Listeners</p>
          </div>
        </div>

        <p className='text-xl'>
          SMOMID Concert is a breathtaking experience. It is something you would
          have never seen before. Come and feel the beats and dive into an
          immersive experience of beats and visuals.
        </p>
      </div>
    </Section>
  );
};

export default Stats;
