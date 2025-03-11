import React from 'react';
import Section from '../components/Section';
import HeadingPill from '../components/HeadingPill';

const FeaturesAndRecognitions = () => {
  const features = [
    'Discovery Science',
    'Bomb Magazine',
    'Creative Digital Music',
    'Guitar World',
    'Mental Injection',
  ];

  return (
    <Section>
      <HeadingPill align='center'>Features and Recognitions</HeadingPill>

      <div className='flex gap-10 flex-wrap justify-center items-center mt-20'>
        {features.map((feature, index) => (
          <div key={index} className='border-1 px-15 py-5 rounded-full'>
            <p className='font-neo-latina text-3xl'>{feature}</p>
          </div>
        ))}
        <p className='font-neo-latina text-2xl font-bold'>and many more...</p>
      </div>
    </Section>
  );
};

export default FeaturesAndRecognitions;
