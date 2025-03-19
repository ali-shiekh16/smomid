import clsx from 'clsx';
import React, { HTMLAttributes } from 'react';

const Nblock = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={clsx('-mx-16 md:-mx-32', className)} {...props}>
      {children}
    </div>
  );
};

export default Nblock;
