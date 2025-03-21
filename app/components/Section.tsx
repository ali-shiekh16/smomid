import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';

type Props = HTMLAttributes<HTMLDivElement>;

const Section = ({ children, className }: Props) => {
  return (
    <section className={clsx('mt-28 mb-10 md:my-36', className)}>
      {children}
    </section>
  );
};

export default Section;
