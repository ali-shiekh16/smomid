import clsx from 'clsx';
import Image from 'next/image';
import React, { HTMLAttributes } from 'react';
import Section from '../components/Section';
import Block from '../components/Block';

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  align?: 'left' | 'right';
}

const ContactSecHeading = ({
  children,
  className,
  align = 'left',
  ...props
}: Props) => {
  const src = align === 'left' ? '/icons/line-r.svg' : '/icons/line-l.svg';
  const order = align === 'left' ? 'order-0' : 'order-1';

  return (
    <Section>
      <div className='flex justify-between'>
        <h2
          className={clsx(
            `font-neo-latina text-4xl md:text-6xl font-bold ${order}`,
            className
          )}
          {...props}
        >
          {children}
        </h2>
        <Image src={src} width='500' height='500' alt='line' />
      </div>
    </Section>
  );
};

export default ContactSecHeading;
