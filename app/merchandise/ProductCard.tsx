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
    <div
      className={clsx('uppercase text-2xl w-full h-full', className)}
      {...props}
    >
      <div className='border-2 border-white p-5 w-full h-full'>
        <p>s, m, l, xl, xxl</p>
        <Image
          className='object-contain w-full h-full'
          src={image}
          alt='Shirts'
          width={500}
          height={500}
        />
      </div>
      <div className='flex justify-between mt-2'>
        <p>{title}</p>
        <p>{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
