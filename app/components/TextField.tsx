import React, { HTMLAttributes, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface Props extends HTMLAttributes<HTMLInputElement> {
  label: string;
  htmlFor: string;
  error?: FieldError;
  register?: any;
}

const TextField = forwardRef<HTMLInputElement, Props>(
  ({ label, htmlFor, error, register, ...props }: Props, ref) => {
    const inputProps = register ? register(htmlFor) : {};

    return (
      <div className='space-y-1'>
        <div className='border-1 px-5 py-2 rounded-full flex space-x-2'>
          <label
            className='font-neo-latina text-2xl font-bold'
            htmlFor={htmlFor}
          >
            {label}
          </label>
          <input
            className='flex-1 outline-0 text-gray-900'
            name={htmlFor}
            id={htmlFor}
            ref={ref}
            {...inputProps}
            {...props}
          />
        </div>
        {error && <p className='text-red-500 text-xs px-2'>{error.message}</p>}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
