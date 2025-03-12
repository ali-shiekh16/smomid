import React from 'react';
import Section from '../components/Section';
import HeadingUnderlined from '../components/HeadingUnderlined';
import Image from 'next/image';

const Reviews = () => {
  return (
    <Section>
      <HeadingUnderlined className='uppercase'>Reviews</HeadingUnderlined>
      <Image
        className='w-full object-cover my-20'
        src='/images/merchandise-reviews.png'
        width='1920'
        height='1080'
        alt='Reviews Marquee'
        objectFit='contain'
      />
    </Section>
  );
};

export default Reviews;
