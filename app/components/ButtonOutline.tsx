import clsx from 'clsx';
import React, { HTMLAttributes, ReactNode } from 'react';

type Props = HTMLAttributes<HTMLButtonElement>;

const ButtonOutline = ({ children, className }: Props) => {
  return (
    <button
      className={clsx(
        'px-4 py-2 text-white border-1  rounded-2xl font-neo-latina font-semibold text-md md:text-xl cursor-pointer hover:bg-white hover:text-black',
        className
      )}
    >
      {children}
    </button>
  );
};

export default ButtonOutline;
