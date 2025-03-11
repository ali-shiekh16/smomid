import React, { ReactNode } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

import ButtonOutline from '../components/ButtonOutline';

interface Props {
  title: string;
  image: string;
  text: string;
  children?: ReactNode;
}

const ArticleCard = ({ title, image, text, children }: Props) => {
  return (
    <div className='flex flex-col justify-between border-1 border-white p-20 text-center space-y-15'>
      <div className='space-y-10'>
        <h2 className='font-neo-latina text-3xl leading-none'>{title}</h2>
        <Image
          className='object-cover h-96 '
          src={image}
          alt={title}
          width='400'
          height='400'
          objectFit='cover'
        />
        <p>{text}</p>
        <ButtonOutline className='bg-white '>
          <span className='text-black'>
            Article Link <ArrowUpRight className='inline-block' />
          </span>
        </ButtonOutline>
      </div>

      {children && (
        <footer className='-mx-20 -mb-20 border-t-1 border-white h-44'>
          {children}
        </footer>
      )}
    </div>
  );
};

export default ArticleCard;
