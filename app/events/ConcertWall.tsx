import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ConcertWallProps {
  title: string;
  location: string;
  date: string;
  image: string;
  slug: string;
}

const ConcertWall: React.FC<ConcertWallProps> = ({
  title,
  location,
  date,
  image,
  slug,
}) => {
  return (
    <Link href={`/events/${slug}`} className='block group'>
      <div className='relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300'>
        <div className='relative h-64 w-full'>
          <Image
            src={image}
            alt={title}
            fill
            className='object-cover transition-transform duration-500 group-hover:scale-105'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            priority={false}
          />
          <div className='absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300'></div>
        </div>

        <div className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent'>
          <h3 className='text-xl font-bold text-white group-hover:text-white/90'>
            {title}
          </h3>
          <p className='text-white/80'>{location}</p>
          <p className='text-white/70 text-sm'>{date}</p>
        </div>
      </div>
    </Link>
  );
};

export default ConcertWall;
