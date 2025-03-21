'use client';

import React, { useState } from 'react';
import Nblock from '../components/Nblock';
import Section from '../components/Section';
import HeadingUnderlined from '../components/HeadingUnderlined';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const images = [
  '/images/media/1.webp',
  '/images/media/2.webpg',
  '/images/media/3.webp',
  '/images/media/4.webp',
  '/images/media/5.webp',
  '/images/media/6.webp',
  '/images/media/7.webp',
  '/images/media/8.webp',
  '/images/media/9.webp',
  '/images/media/10.webp',
  '/images/media/11.webp',
  '/images/media/12.webp',
  '/images/media/13.webp',
  '/images/media/14.webp',
  '/images/media/15.webp',
  '/images/media/16.webp',
  '/images/media/17.webp',
  '/images/media/18.webp',
  '/images/media/19.webp',
  '/images/media/20.webp',
  '/images/media/21.webp',
  '/images/media/22.webp',
  '/images/media/23.webp',
  '/images/media/24.webp',
  '/images/media/25.webp',
  '/images/media/26.webp',
  '/images/media/27.webp',
  '/images/media/28.webp',
  '/images/media/29.webp',
  '/images/media/30.webp',
  '/images/media/31.webp',
  '/images/media/32.webp',
  '/images/media/33.webp',
  '/images/media/34.webp',
  '/images/media/35.webp',
  '/images/media/36.webp',
  '/images/media/37.webp',
].map(image => ({ src: image }));

const Masonary = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  const handleClick = (index: number) => {
    setOpen(true);
    setIndex(index);
  };

  const handleShowMore = () => {
    setShowMore(true);
  };

  const pictures = showMore ? images : images.slice(0, 10);

  return (
    <Section>
      <HeadingUnderlined className='text-right'>Photos</HeadingUnderlined>
      <Nblock>
        <div className='columns-1 sm:columns-2 lg:columns-4 py-10 md:py-20'>
          {pictures.map((image, index) => (
            <div
              className='mb-4 break-inside-avoid cursor-pointer'
              key={index}
              onClick={() => handleClick(index)}
            >
              <img
                className='w-full object-cover rounded-lg mx-auto'
                src={image.src}
                alt='photo'
              />
            </div>
          ))}
        </div>

        {!showMore && (
          <div className='flex justify-center'>
            <button
              onClick={handleShowMore}
              className='px-8 py-4 text-2xl font-neo-latina border-1 rounded-full cursor-pointer'
            >
              Show More
            </button>
          </div>
        )}

        <Lightbox
          open={open}
          index={index}
          close={() => setOpen(false)}
          slides={images}
        />
      </Nblock>
    </Section>
  );
};

export default Masonary;
