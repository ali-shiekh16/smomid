import React from 'react';
import Section from '../components/Section';
import PodcastCard from './PodcastCard';
import HeadingPill from '../components/HeadingPill';

const InterviewsAndPodcasts = () => {
  return (
    <Section>
      <div className='space-y-20'>
        <HeadingPill align='center'>Interviews and Podcasts</HeadingPill>
        <PodcastCard
          title='NICK’S PODCAST WITH JOE'
          subtitle='How Nick and his team of extraordinary musicians are creating a futuristic genre of music'
          text='Watch our insightful podcast with Nick Demopoulos an american based  musician and creator of a unique musical instrument called SMOMID.'
          image='/images/nick-podcast.png'
          date='22-02-25'
          btnText='Podcast Link'
        />

        <PodcastCard
          title='NICK’S Soundcloud Interview'
          subtitle='Listen to nick and his amazing musicalInstrument Smomid on Soundcloud'
          text='Under Soundcloud’s underrrated artists show today we have Nick Demopoulos with us who has created all together a new world of music and instruments.'
          image='/images/nick-interview.png'
          date='22-02-25'
          btnText='Interview Link'
        />

        <div className='flex justify-center'>
          <button className=' border-1 border-white p-2 font-neo-latina text-2xl cursor-pointer'>
            Show more
          </button>
        </div>
      </div>
    </Section>
  );
};

export default InterviewsAndPodcasts;
