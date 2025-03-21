import React from 'react';
import Section from '../components/Section';
import { ArrowRight } from 'lucide-react';

const BlogFooter = () => {
  return (
    <Section>
      <div className='w-full h-[1px] bg-white mb-20'></div>
      <div className='md:flex md:items-center md:justify-between space-y-5 md:space-y-0'>
        <h2 className='text-4xl md:text-7xl font-neo-latina font-semibold'>
          Get the latest <br />
          blogs into your inbox
        </h2>

        <div className='flex justify-between border-1 border-white md:w-1/4'>
          <input
            type='text'
            placeholder='Enter your email'
            className='text-xl bg-transparent text-white outline-none border-none p-2'
          />
          <button className='bg-white text-black px-4'>
            <ArrowRight size={25} />
          </button>
        </div>
      </div>
    </Section>
  );
};

export default BlogFooter;
