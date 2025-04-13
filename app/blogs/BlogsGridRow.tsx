import React, { HTMLAttributes, Suspense } from 'react';
import BlogCard from './BlogCard';
import clsx from 'clsx';

interface Row {
  date: string;
  image: string;
  title: string;
  slug: string;
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  items: Row[];
}

// Creating a separate component to be wrapped in Suspense
const BlogsRowContent = ({ items, className, ...props }: Props) => {
  return (
    <div className={clsx('grid grid-cols-3 p-5', className)} {...props}>
      <BlogCard
        className='pr-8'
        imgStyle='h-[250px]'
        date={items[0].date}
        image={items[0].image}
        title={items[0].title}
        slug={items[0].slug}
      />

      <div className='flex flex-1'>
        <div className='h-[250px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-white to-transparent opacity-50'></div>
        <BlogCard
          className='px-8'
          imgStyle='h-[250px]'
          date={items[1].date}
          image={items[1].image}
          title={items[1].title}
          slug={items[1].slug}
        />
        <div className='h-[250px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-white to-transparent opacity-50'></div>
      </div>

      <BlogCard
        className='pl-8'
        imgStyle='h-[250px]'
        date={items[2].date}
        image={items[2].image}
        title={items[2].title}
        slug={items[2].slug}
      />
    </div>
  );
};

// Main component with Suspense boundary
const BlogsGridRow = (props: Props) => {
  return (
    <Suspense
      fallback={
        <div className='animate-pulse h-[250px] bg-gray-700/20 rounded-lg'></div>
      }
    >
      <BlogsRowContent {...props} />
    </Suspense>
  );
};

export default BlogsGridRow;
