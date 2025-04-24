import React from 'react';
import Section from '../components/Section';
import PodcastCard from './PodcastCard';
import HeadingPill from '../components/HeadingPill';
import { PressItem } from './page';

// Use the PressItem type from our page component
interface InterviewsAndPodcastsProps {
  pressItems: PressItem[];
}

const InterviewsAndPodcasts = ({ pressItems }: InterviewsAndPodcastsProps) => {
  // If there are no items, show a fallback message or return null
  if (pressItems.length === 0) {
    return (
      <Section>
        <div className='space-y-20'>
          <HeadingPill align='center'>Interviews & Podcasts</HeadingPill>
          <p className='text-center text-gray-400'>
            No interviews or podcasts available at this time.
          </p>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <div className='space-y-20'>
        <HeadingPill align='center'>Interviews & Podcasts</HeadingPill>
        <div className='md:grid md:grid-cols-3 md:gap-5'>
          {pressItems.map(item => (
            <PodcastCard
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              text={item.text || ''}
              image={item.image}
              date={item.date || ''}
              btnText={item.btnText}
              link={item.link || '#'}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default InterviewsAndPodcasts;
