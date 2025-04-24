import React, { ReactNode } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import ButtonOutline from '../components/ButtonOutline';

interface Props {
  title: string;
  image: string;
  text: string;
  date?: string;
  link?: string;
  btnText?: string;
  children?: ReactNode;
}

const ArticleCard = ({
  title,
  image,
  text,
  date,
  link = '#',
  btnText = 'Article Link',
  children,
}: Props) => {
  return (
    <div className='flex flex-col justify-between border-1 border-white p-20 text-center space-y-15'>
      <div className='space-y-10'>
        <h2 className='font-neo-latina text-3xl leading-none'>{title}</h2>
        {date && <p className='text-sm text-gray-400'>{date}</p>}
        <Image
          className='object-cover h-96'
          src={image}
          alt={title}
          width='400'
          height='400'
        />
        <p>{text}</p>
        <Link href={link} target='_blank' rel='noopener noreferrer'>
          <ButtonOutline className='bg-white'>
            <span className='text-black'>
              {btnText} <ArrowUpRight className='inline-block' />
            </span>
          </ButtonOutline>
        </Link>
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
