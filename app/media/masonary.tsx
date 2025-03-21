import React from 'react';
import Nblock from '../components/Nblock';
import Section from '../components/Section';
import HeadingUnderlined from '../components/HeadingUnderlined';
import Image from 'next/image';

const images = [
  '/images/media/1.jpg',
  '/images/media/2.jpeg',
  '/images/media/3.jpg',
  '/images/media/4.jpg',
  '/images/media/5.jpg',
  '/images/media/6.jpg',
  '/images/media/7.jpg',
  '/images/media/8.jpg',
  '/images/media/9.jpg',
  '/images/media/10.jpg',
  '/images/media/11.jpg',
  '/images/media/12.jpg',
  '/images/media/13.jpg',
  '/images/media/14.jpg',
  '/images/media/15.jpg',
  '/images/media/16.jpg',
  '/images/media/17.jpg',
  '/images/media/18.jpg',
  '/images/media/19.jpeg',
  '/images/media/20.jpg',
  '/images/media/21.jpg',
  '/images/media/22.jpg',
  '/images/media/23.jpg',
  '/images/media/24.jpg',
  '/images/media/25.jpg',
  '/images/media/26.jpg',
  '/images/media/27.jpg',
  '/images/media/28.jpg',
  '/images/media/29.jpg',
  '/images/media/30.jpg',
  '/images/media/31.jpg',
  '/images/media/32.jpg',
  '/images/media/33.jpg',
  '/images/media/34.jpg',
  '/images/media/35.jpg',
  '/images/media/36.jpeg',
  '/images/media/37.jpg',
];

const Masonary = () => {
  return (
    <Section>
      <HeadingUnderlined className='text-right'>Photos</HeadingUnderlined>
      <Nblock>
        <div className='columns-1 sm:columns-2 lg:columns-4 py-10 md:py-20'>
          {images.map((image, index) => (
            <div className='mb-4 break-inside-avoid ' key={index}>
              <Image
                className='w-full object-cover rounded-lg mx-auto'
                src={image}
                alt='photo'
                width='500'
                height='500'
              />
            </div>
          ))}
        </div>
      </Nblock>
    </Section>
  );
};

export default Masonary;
