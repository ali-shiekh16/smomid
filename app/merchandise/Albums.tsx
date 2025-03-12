import React from 'react';
import Block from '../components/Block';
import HeadingUnderlined from '../components/HeadingUnderlined';
import Image from 'next/image';
import Section from '../components/Section';

const Albums = () => {
  return (
    <Section>
      <HeadingUnderlined className='text-right uppercase'>
        Albums
      </HeadingUnderlined>
      <Image
        className='w-full object-cover my-20 '
        src='/images/merchandise-albums.png'
        width='1920'
        height='1080'
        alt='Albums Marquee'
        objectFit='contain'
      />

      <Image
        className='w-full mt-10'
        src='/icons/line.svg'
        width='1920'
        height='10'
        alt='Line'
        objectFit='cover'
      />
    </Section>
  );
};

export default Albums;
