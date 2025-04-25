import React from 'react';
import ButtonOutline from '../components/ButtonOutline';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  title: string;
  subtitle: string;
  text: string;
  image: string;
  date?: string;
  btnText: string;
  link?: string;
}

const PodcastCard = ({
  title,
  subtitle,
  image,
  date,
  btnText,
  link = '#',
}: Props) => {
  return (
    <div className='border-1 border-white relative'>
      <h2 className='font-semibold font-neo-latina text-3xl border-b-1 border-white text-center  px-10 md:px-5 py-5 md:min-h-[120px]'>
        {title}
      </h2>
      <div className='px-5 md:px-15 py-10 '>
        <img
          className='object-cover aspect-square mb-5  w-full'
          src={image}
          alt='Nick Podcast'
          width='500'
          height='500'
          // objectFit='cover'
        />
        {/* <div className='smd:h-80 smd:min-w-[400px]'></div> */}
        <div className='flex flex-col  items-center text-center'>
          <h3 className='font-neo-latina  text-2xl mb-5'>{subtitle}</h3>
          {/* <p>{text}</p> */}
          <ButtonOutline className='bg-white '>
            <Link href={link} target='_blank'>
              <span className='text-black'>
                {btnText} <ArrowUpRight className='inline-block' />
              </span>
            </Link>
          </ButtonOutline>
          {date && <p className='mt-10'>Posted on: {date}</p>}
        </div>
      </div>
    </div>
  );
};

export default PodcastCard;
