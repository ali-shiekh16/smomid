import clsx from 'clsx';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  month: string;
  date: string;
  state: string;
  city: string;
}

const EventDate = ({
  month,
  date,
  state,
  city,
  className,
  ...props
}: Props) => {
  return (
    <div className={clsx('flex items-center space-x-5', className)} {...props}>
      <p className='bg-black text-lg text-center leading-5 p-5 rounded-2xl'>
        {month} <br />
        <span className='text-2xl'>{date}</span>
      </p>
      <p className='text-3xl leading-5'>
        {state} <br />
        <span className='text-lg'>{city}</span>
      </p>
    </div>
  );
};

export default EventDate;
