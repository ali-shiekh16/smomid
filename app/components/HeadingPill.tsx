import React, { HTMLAttributes } from 'react';
import Nblock from './Nblock';
import clsx from 'clsx';

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  align?: 'left' | 'center' | 'right';
}

const HeadingPill = ({
  children,
  className,
  align = 'left',
  ...props
}: Props) => {
  let flexLeft = '1';
  let flexRight = '8';

  if (align === 'center') {
    flexLeft = '1';
    flexRight = '8';
  }

  if (align === 'right') {
    flexLeft = '8';
    flexRight = '1';
  }

  return (
    <Nblock>
      <div className='mb-8 flex items-center w-full '>
        <div className={`flex-${flexLeft} h-[1px] bg-white `}></div>

        <h2
          className={clsx(
            'px-8 py-2 text-2xl  md:px-12 md:py-3 md:text-4xl font-neo-latina border-1 rounded-full',
            className
          )}
          {...props}
        >
          {children}
        </h2>

        <div className={`flex-${flexRight} h-[1px] bg-white `}></div>
      </div>
    </Nblock>
  );
};

export default HeadingPill;
