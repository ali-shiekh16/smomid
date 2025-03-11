import React from 'react';
import Image from 'next/image';
import Section from '../components/Section';
import HeadingUnderlined from '../components/HeadingUnderlined';
import Song from './Song';

const songs = [
  {
    image: '/images/songs/1.png',
    title: 'Wildest Dreams',
    artist: 'Taylor Swift',
  },
  {
    image: '/images/songs/2.jpeg',
    title: 'Steal my Girl',
    artist: 'One Direction',
  },
  {
    image: '/images/songs/3.jpeg',
    title: 'Espresso',
    artist: 'Sabrina Carpenter',
  },
  {
    image: '/images/songs/4.png',
    title: 'Birds of a Feather',
    artist: 'Billie Eillish',
  },
  {
    image: '/images/songs/5.jpeg',
    title: 'They not Like Us',
    artist: 'Kendrick Lamar',
  },
];

const Songs = () => {
  return (
    <Section>
      <HeadingUnderlined>Songs</HeadingUnderlined>

      <div className='md:grid md:grid-cols-2 my-42'>
        <div className='flex flex-col justify-center items-center space-y-5'>
          <p className='font-neo-latina text-6xl'>
            Perfect
            <span className='text-3xl'> - One Direction</span>
          </p>

          <Image
            className='object-cover'
            src='/images/songs/2.jpeg'
            alt='Perfect - One Direction song cover.'
            width='400'
            height='400'
            objectFit='cover'
          />
        </div>

        <div className='flex items-center space-x-20'>
          <div className='h-4/5 w-0.5 bg-white'></div>
          <div>
            {songs.map((song, i) => (
              <Song
                key={i}
                image={song.image}
                title={song.title}
                artist={song.artist}
              />
            ))}
          </div>
        </div>
      </div>

      <Image
        className='w-full object-contain'
        src='/icons/line.svg'
        alt='line'
        height={500}
        width={500}
        objectFit='contain'
      />
    </Section>
  );
};

export default Songs;
