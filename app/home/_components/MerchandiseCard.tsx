import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Props {
  title: string;
  image: string;
  link: string;
}

const MerchandiseCard = ({ title, image, link }: Props) => {
  return (
    <div className='relative w-full h-full'>
      <Image
        src={image}
        alt={title}
        className='object-cover w-full h-full'
        width={300}
        height={300}
      />
      <div className='flex absolute bottom-0 justify-between  bg-black/30 self-end w-full'>
        <div className='text-xl  text-white outline-none border-none p-3  '>
          <Link href={link}>{title}</Link>
        </div>
        <button className='bg-white text-black px-4'>
          <Link href={link}>
            <ArrowRight size={25} />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default MerchandiseCard;
