import React from 'react';
import HeadingUnderlined from '../components/HeadingUnderlined';
import Photos from './Photos';
import Videos from './Videos';
import Songs from './Songs';

const Page = () => {
  return (
    <>
      <Photos />
      <Videos />
      <Songs />
    </>
  );
};

export default Page;
