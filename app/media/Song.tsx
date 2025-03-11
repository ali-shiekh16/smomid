import clsx from 'clsx';
import Image from 'next/image';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  image: string;
  artist: string;
  title: string;
}

const Song = ({
  image,
  artist,
  title,
  children,
  className,
  ...props
}: Props) => {
  return (
    <div className={clsx('flex space-x-5 space-y-5', className)} {...props}>
      <Image
        className='rounded-lg  object-cover w-20 translate-y-3'
        src={image}
        alt={title}
        width='200'
        height='200'
      />
      <div className='self-center'>
        <p className='text-lg'>{title}</p>
        <p className='text-sm'>{artist}</p>
      </div>
    </div>
  );
};

export default Song;
