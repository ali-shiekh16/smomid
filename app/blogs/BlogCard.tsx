import clsx from 'clsx';
import Image from 'next/image';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  date: string;
  image: string;
  title: string;
  imgStyle?: string;
}

const BlogCard = ({
  date,
  image,
  title,
  className,
  imgStyle,
  ...props
}: Props) => {
  return (
    <div className={className} {...props}>
      <Image
        className={clsx('object-cover w-full rounded-lg', imgStyle)}
        src={image}
        alt={title}
        width={500}
        height={500}
        objectFit='cover'
      />
      <p className='text-sm mt-2'>Posted on: {date}</p>
      <p className='text-xl mt-5'>{title}</p>
    </div>
  );
};

export default BlogCard;
