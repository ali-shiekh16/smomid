import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

interface Props {
  image: string;
  date: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom';
}

const EventCard = ({ date, children, image, position = 'top' }: Props) => {
  return (
    <div className='w-full h-full relative'>
      <div
        className={clsx(
          {
            'top-0 -translate-y-1/2': position === 'top',
            'bottom-0 translate-y-1/2': position === 'bottom',
          },
          'bg-white px-8 py-1 md:py-2 absolute left-[50%] -translate-x-1/2'
        )}
      >
        <p className='text-center text-lg md:text-2xl text-black font-semibold'>
          {date}
        </p>
      </div>

      <div className='bg-black/50 py-2 md:py-6 absolute top-[50%] w-full -translate-y-1/2 backdrop-blur-xl'>
        {children}
      </div>
      <Image
        src={image}
        alt='Event'
        className='object-cover w-full h-full'
        width={300}
        height={300}
      />
    </div>
  );
};

export default EventCard;
