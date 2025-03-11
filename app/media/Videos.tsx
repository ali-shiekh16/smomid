import React from 'react';
import Section from '../components/Section';
import HeadingUnderlined from '../components/HeadingUnderlined';
import VideoCard from './VideoCard';

const data = [
  {
    title:
      'Travis Scott’s surprise entry at Cannes 2025 leaves everyone surprised',
    image: '/images/media/1.png',
    date: '8th February 2025',
  },
  {
    title: 'Billie Eilish seems upset after Beyonce’s Grammy win',
    image: '/images/media/2.png',
    date: '4th February 2025',
  },

  {
    title: 'Have a look at dadaa personality Justin freakin Beiber ',
    image: '/images/media/3.png',
    date: '16th May 2025',
  },
  {
    title:
      'Drake’s reaction on Kendrick winning 5 grammys one for a diss-track on him',
    image: '/images/media/4.png',
    date: '24th April 2025',
  },
  {
    title:
      'Travis Scott’s surprise entry at Cannes 2025 leaves everyone surprised',
    image: '/images/media/1.png',
    date: '8th February 2025',
  },
  {
    title: 'Billie Eilish seems upset after Beyonce’s Grammy win',
    image: '/images/media/2.png',
    date: '4th February 2025',
  },

  {
    title: 'Have a look at dadaa personality Justin freakin Beiber ',
    image: '/images/media/3.png',
    date: '16th May 2025',
  },
  {
    title:
      'Drake’s reaction on Kendrick winning 5 grammys one for a diss-track on him',
    image: '/images/media/4.png',
    date: '24th April 2025',
  },
];

const Videos = () => {
  return (
    <Section>
      <HeadingUnderlined>Videos</HeadingUnderlined>
      <div className='mt-20 space-y-48'>
        <div className='md:grid md:grid-cols-2 md:grid-rows-4 md:gap-x-24 space-y-20 md:space-y-48 '>
          {data.map((video, index) => (
            <VideoCard
              key={index}
              title={video.title}
              image={video.image}
              date={video.date}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Videos;
