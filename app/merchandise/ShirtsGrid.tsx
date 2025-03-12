import React from 'react';
import Section from '../components/Section';
import ProductCard from './ProductCard';
import ButtonOutline from '../components/ButtonOutline';

const data = [
  {
    name: 'Metro Boomin',
    price: '$49',
    image: '/images/shirts/1.png',
  },
  {
    name: 'Weekend',
    price: '$69',
    image: '/images/shirts/2.png',
  },
  {
    name: 'Travis Scott',
    price: '$39',
    image: '/images/shirts/3.png',
  },
  {
    name: 'Travis Scott',
    price: '$39',
    image: '/images/shirts/3.png',
  },
  {
    name: 'Metro Boomin',
    price: '$49',
    image: '/images/shirts/1.png',
  },
  {
    name: 'Weekend',
    price: '$79',
    image: '/images/shirts/2.png',
  },
];

const ShirtsGrid = () => {
  return (
    <Section>
      <div className='grid grid-cols-3 grid-rows-2 gap-y-38 gap-x-20'>
        {data.map((shirt, index) => (
          <ProductCard
            key={index}
            title={shirt.name}
            price={shirt.price}
            image={shirt.image}
          />
        ))}
      </div>

      <div className='flex justify-center mt-28'>
        <ButtonOutline className='w-fit rounded-none px-6 py-3 bg-black/15'>
          <span className='text-2xl'>Show More</span>
        </ButtonOutline>
      </div>
    </Section>
  );
};

export default ShirtsGrid;
