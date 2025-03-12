import React from 'react';
import Section from '../components/Section';
import BlogCard from './BlogCard';

const FeaturedBlogs = () => {
  return (
    <Section>
      <div className='w-full h-[1px] bg-white mb-20'></div>

      <div className='grid grid-cols-2'>
        <BlogCard
          className='pr-8'
          imgStyle='h-[400px] w-full'
          date='22-02-25'
          image='/images/blogs/1.png'
          title='A Day in My Life: What It’s Like to Be a Music Artist in United States Of America'
        />

        <div className='flex'>
          <div className='h-[400px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-white to-transparent opacity-50'></div>
          <BlogCard
            className='pl-8 flex-1'
            imgStyle='h-[400px] w-full'
            date='22-02-25'
            image='/images/blogs/2.png'
            title='The Best Ways to Promote Your Music as an Independent Artist'
          />
        </div>
      </div>
    </Section>
  );
};

export default FeaturedBlogs;
