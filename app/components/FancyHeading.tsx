import clsx from 'clsx';
import React, { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement>;

const FancyHeading = ({ children, className, ...props }: Props) => {
  return (
    <div
      {...props}
      className={clsx(
        'font-neo-latina fancy-text-shadow text-6xl md:text-7xl font-extrabold  text-primary uppercase ',
        className
      )}
    >
      {children}
    </div>
  );
};

export default FancyHeading;
