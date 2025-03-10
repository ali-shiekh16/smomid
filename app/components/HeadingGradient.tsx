import clsx from 'clsx';
import React, { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLHeadingElement>;

const HeadingGradient = ({ children, className, ...props }: Props) => {
  return (
    <h1
      className={clsx(
        ' font-neo-latina text-6xl md:text-9xl font-bold bg-gradient-to-br from-secondary  to-primary bg-clip-text text-transparent',
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
};

export default HeadingGradient;
