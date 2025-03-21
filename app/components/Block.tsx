import clsx from 'clsx';
import React, { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement>;
const Block = ({ children, className, ...props }: Props) => {
  return (
    <div className={clsx('px-10 md:px-32', className)} {...props}>
      {children}
    </div>
  );
};

export default Block;
