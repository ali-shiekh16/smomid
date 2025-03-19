import clsx from 'clsx';
import Image from 'next/image';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  image: string;
  title: string;
  price: string;
}

const ProductCard = ({ image, title, price, className, ...props }: Props) => {
  return (
    <div className={clsx('uppercase text-2xl max-w-80', className)} {...props}>
      <div className='border-2 border-white w-full'>
        <Image
          className='object-contain w-full h-full '
          src={image}
          alt='Shirts'
          width={500}
          height={500}
        />
      </div>
      <div className='flex text-lg justify-between space-x-5 mt-2 '>
        <p>{title}</p>
        <p className='text-right'>{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
