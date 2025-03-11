import clsx from 'clsx';
import Image from 'next/image';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  image: string;
  title: string;
  date: string;
}

const VideoCard = ({ image, title, date, className, ...props }: Props) => {
  return (
    <article className={clsx('space-y-2', className)} {...props}>
      <Image
        className='rounded-xl w-full h-full object-cover mb-5 '
        src={image}
        alt='video'
        width='400'
        height='400'
      />
      <p className='text-2xl'>{title}</p>
      <p className='w-fit text-md bg-black/20 py-1 px-2 rounded-lg '>{date}</p>
    </article>
  );
};

export default VideoCard;
