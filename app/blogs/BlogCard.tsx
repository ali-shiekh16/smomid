import clsx from 'clsx';
import Image from 'next/image';
import React, { HTMLAttributes } from 'react';
import Link from 'next/link';

interface Props extends HTMLAttributes<HTMLAnchorElement> {
  date: string;
  image: string;
  title: string;
  slug: string;
  excerpt?: string;
  readTime?: number;
  tags?: string[];
  imgStyle?: string;
}

const BlogCard = ({
  date,
  image,
  title,
  slug,
  excerpt,
  readTime,
  tags,
  className,
  imgStyle,
  ...props
}: Props) => {
  return (
    <Link
      href={`/blogs/${slug}`}
      className={clsx('block hover:opacity-90 transition-opacity', className)}
      {...props}
    >
      <div>
        <Image
          className={clsx('object-cover w-full rounded-lg', imgStyle)}
          // src={image || '/images/blogs/placeholder.jpg'}
          src={'/images/contact-cover.webp'}
          alt={title}
          width={500}
          height={500}
          objectFit='cover'
        />
        <div className='mt-3'>
          <div className='flex items-center justify-between mb-2'>
            <p className='text-sm text-gray-300'>Posted on: {date}</p>
            {readTime && (
              <span className='text-sm text-gray-300'>{readTime} min read</span>
            )}
          </div>
          <h3 className='text-xl font-medium mb-2'>{title}</h3>
          {excerpt && (
            <p className='text-gray-200 text-sm line-clamp-2'>{excerpt}</p>
          )}
          {tags && tags.length > 0 && (
            <div className='flex flex-wrap gap-2 mt-2'>
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className='text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded'
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
