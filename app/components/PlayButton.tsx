import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';
import { Play } from 'lucide-react';

const PlayButton = ({
  className,
  ...props
}: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={clsx(
        'bg-gradient-to-r from-primary to-secondary text-white font-bold  p-10 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out cursor-pointer',
        className
      )}
      {...props}
    >
      <Play size={50} className='text-white' />
    </button>
  );
};

export default PlayButton;
