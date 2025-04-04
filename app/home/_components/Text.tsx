import clsx from 'clsx';
import React, { HTMLAttributes } from 'react';

const Text = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p
      className={clsx(
        'text-2xl backdrop-blur-2xl py-5 px-2 rounded-md',
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};

export default Text;
