import React from 'react';
import Section from '../components/Section';
import HeadingPill from '../components/HeadingPill';
import { PressItem } from './page';

interface FeaturesAndRecognitionsProps {
  pressItems: PressItem[];
}

const FeaturesAndRecognitions = ({
  pressItems,
}: FeaturesAndRecognitionsProps) => {
  // If there are no features, show a message
  if (pressItems.length === 0) {
    return (
      <Section>
        <HeadingPill align='center'>Features and Recognitions</HeadingPill>
        <p className='text-center text-gray-400 mt-20'>
          No features or recognitions available at this time.
        </p>
      </Section>
    );
  }

  return (
    <Section>
      <HeadingPill align='center'>Features and Recognitions</HeadingPill>

      <div className='flex gap-10 flex-wrap justify-center items-center mt-20'>
        {pressItems.map(feature => (
          <a
            key={feature.id}
            href={feature.link || '#'}
            target='_blank'
            rel='noopener noreferrer'
            className='border-1 px-15 py-5 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors duration-300'
          >
            <p className='font-neo-latina text-3xl'>{feature.title}</p>
          </a>
        ))}
        {pressItems.length > 5 && (
          <p className='font-neo-latina text-2xl font-bold'>and many more...</p>
        )}
      </div>
    </Section>
  );
};

export default FeaturesAndRecognitions;
