import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';

type Props = HTMLAttributes<HTMLDivElement>;

const Section = ({ children, className }: Props) => {
  return <section className={clsx('my-36', className)}>{children}</section>;
};

export default Section;
