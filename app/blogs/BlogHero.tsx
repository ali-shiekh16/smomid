import React from 'react';
import Section from '../components/Section';
import ButtonOutline from '../components/ButtonOutline';

const BlogHero = () => {
  return (
    <Section>
      <div className='md:grid md:grid-cols-2'>
        <div className='space-y-5 text-center md:text-left'>
          <h1 className='text-7xl font-bold font-neo-latina'>Blogs</h1>
          <p className='text-xl'>
            Welcome to Nick’s music blog! Get behind-the-scenes stories, music
            tips, and updates on his latest tracks and shows.
          </p>
        </div>
        <div className='flex space-x-5 items-end justify-end'>
          {/* <ButtonOutline>Insights</ButtonOutline>
        <ButtonOutline>BTS</ButtonOutline>
        <ButtonOutline>Updates</ButtonOutline>
        <ButtonOutline>Reviews</ButtonOutline> */}
        </div>
      </div>

      <p className='my-20 text-center text-3xl'>To be release soon...</p>
    </Section>
  );
};

export default BlogHero;
