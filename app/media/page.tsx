import React from 'react';
import HeadingUnderlined from '../components/HeadingUnderlined';
import Photos from './Photos';
import Videos from './Videos';
import Songs from './Songs';
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
