import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLSelectElement> {
  label: string;
  htmlFor: string;
}

const Select = ({ label, htmlFor }: Props) => {
  return (
    <select
      className='border-1 px-5 py-2 rounded-full font-neo-latina text-2xl font-bold outline-0'
      name={htmlFor}
      id={htmlFor}
    >
      <option value='#'>{label}</option>
    </select>
  );
};

export default Select;
