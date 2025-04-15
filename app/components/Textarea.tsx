import React, { HTMLAttributes, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface Props extends HTMLAttributes<HTMLTextAreaElement> {
  label: string;
  htmlFor: string;
  error?: FieldError;
  register?: any;
}

const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, htmlFor, error, register, ...props }: Props, ref) => {
    const textareaProps = register ? register(htmlFor) : {};

    return (
      <div className='space-y-1'>
        <div className='border-1 px-5 py-2 rounded-2xl w-full h-full'>
          <label
            className='font-neo-latina text-2xl font-bold'
            htmlFor={htmlFor}
          >
            {label}
          </label>
          <textarea
            className='outline-0 w-full h-full text-gray-900'
            name={htmlFor}
            id={htmlFor}
            ref={ref}
            {...textareaProps}
            {...props}
          />
        </div>
        {error && <p className='text-red-500 text-xs px-2'>{error.message}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
