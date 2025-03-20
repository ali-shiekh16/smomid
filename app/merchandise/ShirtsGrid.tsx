import React from 'react';
import Section from '../components/Section';
import ProductCard from './ProductCard';
import ButtonOutline from '../components/ButtonOutline';
import HeadingUnderlined from '../components/HeadingUnderlined';
import Image from 'next/image';
import Link from 'next/link';

const ShirtsGrid = () => {
  return (
    <Section>
      <HeadingUnderlined className='uppercase text-right'>
        Tees
      </HeadingUnderlined>
      <div className='flex flex-col my-20 mx-20'>
        <p className='text-2xl mb-2'>S,M,L,XL,XXL</p>
        <Link href='https://smomid.bandcamp.com/merch/smomid-ssri-crew-shirt-limited-edition'>
          <div className='flex border-1 border-white p-5 space-x-10 cursor-pointer'>
            <Image
              className='object-contain w-full h-full'
              src='/images/shirts/1.png'
              alt='Shirts'
              width={500}
              height={500}
            />
            <Image
              className='object-contain w-full h-full'
              src='/images/shirts/2.png'
              alt='Shirts'
              width={500}
              height={500}
            />
          </div>
        </Link>
        <div className='flex justify-between mt-2'>
          <p className='text-2xl'>Smomid - SSRI Crew Shirt, Limited Edition</p>
          <p className='text-2xl'>$16 USD or more</p>
        </div>
      </div>
    </Section>
  );
};

export default ShirtsGrid;
