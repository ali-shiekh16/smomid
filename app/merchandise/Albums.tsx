import React from 'react';
import HeadingUnderlined from '../components/HeadingUnderlined';
import Section from '../components/Section';
import ProductCard from './ProductCard';
import ButtonOutline from '../components/ButtonOutline';
import Link from 'next/link';

const data = [
  {
    title: 'Cyber Solstice',
    price: '$8 USD or more',
    image: '/images/albums/1.png',
    link: 'https://smomid.bandcamp.com/album/cyber-solstice',
  },
  {
    title: 'Pyramidi Scheme',
    price: '$7 USD or more',
    image: '/images/albums/2.png',
    link: 'https://smomid.bandcamp.com/album/pyramidi-scheme',
  },
  {
    title: 'Smoment In Time',
    price: '$7 USD or more',
    image: '/images/albums/3.png',
    link: 'https://smomid.bandcamp.com/album/smoment-in-time',
  },
  {
    title: 'Rhythms Of Light',
    price: '$7 USD or more',
    image: '/images/albums/4.png',
    link: 'https://smomid.bandcamp.com/album/rhythms-of-light',
  },
  {
    title: 'Yule Need This',
    price: '$7 USD or more',
    image: '/images/albums/5.png',
    link: 'https://smomid.bandcamp.com/album/yule-need-this',
  },
];

const Albums = () => {
  return (
    <Section>
      <HeadingUnderlined className='uppercase'>Albums</HeadingUnderlined>
      <div className='md:flex md:flex-wrap md:justify-center md:space-x-8 space-y-20 my-20'>
        {data.map(album => (
          <div>
            <Link href={album.link} key={album.link}>
              <ProductCard
                title={album.title}
                price={album.price}
                image={album.image}
              />
            </Link>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Albums;
