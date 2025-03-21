import React from 'react';
import ButtonOutline from '../components/ButtonOutline';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

interface Props {
  title: string;
  subtitle: string;
  text: string;
  image: string;
  date: string;
  btnText: string;
}

const PodcastCard = ({
  title,
  subtitle,
  text,
  image,
  date,
  btnText,
}: Props) => {
  return (
    <div className='border-1 border-white relative'>
      <h2 className='font-semibold font-neo-latina text-3xl border-b-1 border-white smd:text-right px-10 md:px-20 py-5'>
        {title}
      </h2>
      <div className='smd:flex smd:items-center smd:space-x-5 px-5 md:px-15 py-10 '>
        <Image
          className='object-contain smd:absolute smd:top-10 smd:left-15 mb-5 '
          src={image}
          alt='Nick Podcast'
          width='400'
          height='400'
          objectFit='contain'
        />
        <div className='smd:h-80 smd:min-w-[400px]'></div>
        <div className='flex flex-col items-end'>
          <h3 className='font-neo-latina  text-2xl mb-5 text-right'>
            {subtitle}
          </h3>
          {/* <p>{text}</p> */}
          <ButtonOutline className='bg-white '>
            <span className='text-black'>
              {btnText} <ArrowUpRight className='inline-block' />
            </span>
          </ButtonOutline>
          <p className='mt-10'>Posted on Youtube on: {date}</p>
        </div>
      </div>

      {/* <div className='flex justify-between items-center px-10 py-2 border-t-1 border-white'>
        <p>Posted on Youtube on: {date}</p>
        <ButtonOutline className='bg-white '>
          <span className='text-black'>
            {btnText} <ArrowUpRight className='inline-block' />
          </span>
        </ButtonOutline>
      </div> */}
    </div>
  );
};

export default PodcastCard;
