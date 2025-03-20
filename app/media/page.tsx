import React from 'react';
import Photos from './Photos';
import Videos from './Videos';
import AudioSection from './AudioSection';

const Page = () => {
  return (
    <>
      <Photos />
      <AudioSection />
      <Videos />
      {/* <Songs /> */}
    </>
  );
};

export default Page;
