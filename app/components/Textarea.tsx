import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLTextAreaElement> {
  label: string;
  htmlFor: string;
}

const Textarea = ({ label, htmlFor, ...props }: Props) => {
  return (
    <div className='border-1 px-5 py-2 rounded-2xl w-full h-full'>
      <label className='font-neo-latina text-2xl font-bold' htmlFor={htmlFor}>
        {label}
      </label>
      <textarea
        className='outline-0 w-full h-full'
        name={htmlFor}
        id={htmlFor}
        {...props}
      />
    </div>
  );
};

export default Textarea;
