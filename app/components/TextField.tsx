import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLInputElement> {
  label: string;
  htmlFor: string;
}

const TextField = ({ label, htmlFor, ...props }: Props) => {
  return (
    <div className='border-1 px-5 py-2 rounded-full flex space-x-2'>
      <label className='font-neo-latina text-2xl font-bold' htmlFor={htmlFor}>
        {label}
      </label>
      <input
        className='flex-1 outline-0'
        name={htmlFor}
        id={htmlFor}
        {...props}
      />
    </div>
  );
};

export default TextField;
