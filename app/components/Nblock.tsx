import React, { ReactNode } from 'react';

const Nblock = ({ children }: { children: ReactNode }) => {
  return <div className='-mx-16 md:-mx-32'>{children}</div>;
};

export default Nblock;
