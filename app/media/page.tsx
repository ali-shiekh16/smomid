import React from 'react';
import Photos from './Photos';
import Videos from './Videos';
import AudioSection from './AudioSection';
import Masonary from './masonary';

const Page = () => {
  return (
    <>
      <Photos />
      <Masonary />
      <AudioSection />
      <Videos />
      {/* <Songs /> */}
    </>
  );
};

export default Page;
