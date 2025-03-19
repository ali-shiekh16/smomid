import React from 'react';
import HeadingUnderlined from '../components/HeadingUnderlined';
import Section from '../components/Section';
import ProductCard from './ProductCard';
import ButtonOutline from '../components/ButtonOutline';

const data = [
  {
    title: 'Cyber Solstice',
    price: '$8 USD or more',
    image: '/images/albums/1.png',
  },
  {
    title: 'Pyramidi Scheme',
    price: '$7 USD or more',
    image: '/images/albums/2.png',
  },
  {
    title: 'Smoment In Time',
    price: '$7 USD or more',
    image: '/images/albums/3.png',
  },
  {
    title: 'Rhythms Of Light',
    price: '$7 USD or more',
    image: '/images/albums/4.png',
  },
  {
    title: 'Yule Need This',
    price: '$7 USD or more',
    image: '/images/albums/5.png',
  },
];

const Albums = () => {
  return (
    <Section>
      <HeadingUnderlined className='uppercase'>Albums</HeadingUnderlined>
      <div className='flex flex-wrap justify-center space-x-8 space-y-15 my-20'>
        {data.map((album, index) => (
          <ProductCard
            key={index}
            title={album.title}
            price={album.price}
            image={album.image}
          />
        ))}
      </div>

      <div className='flex justify-center mt-28'>
        <ButtonOutline className='w-fit rounded-none px-6 py-3 bg-black/15'>
          <span className='text-2xl'>Show More</span>
        </ButtonOutline>
      </div>
      {/* <Image
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
      /> */}
    </Section>
  );
};

export default Albums;
