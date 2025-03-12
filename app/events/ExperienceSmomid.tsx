import React from 'react';
import Section from '../components/Section';
import { ArrowDownLeft } from 'lucide-react';

const ExperienceSmomid = () => {
  return (
    <Section>
      <div className='mx-auto rounded-4xl max-w-[95%]  min-h-80 bg-[url(/images/concert.png)] bg-cover bg-center relative'>
        <ArrowDownLeft
          size={130}
          className='text-white absolute -top-12 right-0'
        />
        <h2 className='font-neo-latina text-[8vw] font-bold text-white -translate-x-15 translate-y-28 leading-none'>
          Experience <br />
          <span className='inline-block text-secondary -translate-y-8 translate-x-[8ch]'>
            smomid
          </span>
          <br />
          <span className='inline-block -translate-y-15 translate-x-[13.5ch]'>
            Live
          </span>
          <br />
        </h2>
      </div>
    </Section>
  );
};

export default ExperienceSmomid;
