import React, { HTMLAttributes } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

const HeadingUnderlined = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <div>
      <h2
        className={clsx(
          'px-8 py-2 text-5xl md:px-12 md:py-3 md:text-7xl font-bold font-neo-latina ',
          className
        )}
        {...props}
      >
        {children}
      </h2>

      <Image
        className='w-full object-contain'
        src='/icons/line.svg'
        alt='line'
        height={500}
        width={500}
        objectFit='contain'
      />
    </div>
  );
};

export default HeadingUnderlined;
