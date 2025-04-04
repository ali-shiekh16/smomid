import React from 'react';
import Section from '../components/Section';
import PodcastCard from './PodcastCard';
import HeadingPill from '../components/HeadingPill';
import data from './_pressData';

const InterviewsAndPodcasts = () => {
  return (
    <Section>
      <div className='space-y-20'>
        <HeadingPill align='center'>Press</HeadingPill>
        {data.map((podcast, index) => (
          <PodcastCard
            key={index}
            title={podcast.title}
            subtitle={podcast.subtitle}
            text={podcast.text}
            image={podcast.image}
            date={podcast.date}
            btnText={podcast.btnText}
            link={podcast.link}
          />
        ))}
      </div>
    </Section>
  );
};

export default InterviewsAndPodcasts;
