import React from 'react';
import Section from '../components/Section';
import HeadingUnderlined from '../components/HeadingUnderlined';
import VideoCard from './VideoCard';

// const data = [
//   {
//     title:
//       'Travis Scott’s surprise entry at Cannes 2025 leaves everyone surprised',
//     image: '/images/media/1.png',
//     date: '8th February 2025',
//   },
//   {
//     title: 'Billie Eilish seems upset after Beyonce’s Grammy win',
//     image: '/images/media/2.png',
//     date: '4th February 2025',
//   },

//   {
//     title: 'Have a look at dadaa personality Justin freakin Beiber ',
//     image: '/images/media/3.png',
//     date: '16th May 2025',
//   },
//   {
//     title:
//       'Drake’s reaction on Kendrick winning 5 grammys one for a diss-track on him',
//     image: '/images/media/4.png',
//     date: '24th April 2025',
//   },
//   {
//     title:
//       'Travis Scott’s surprise entry at Cannes 2025 leaves everyone surprised',
//     image: '/images/media/1.png',
//     date: '8th February 2025',
//   },
//   {
//     title: 'Billie Eilish seems upset after Beyonce’s Grammy win',
//     image: '/images/media/2.png',
//     date: '4th February 2025',
//   },

//   {
//     title: 'Have a look at dadaa personality Justin freakin Beiber ',
//     image: '/images/media/3.png',
//     date: '16th May 2025',
//   },
//   {
//     title:
//       'Drake’s reaction on Kendrick winning 5 grammys one for a diss-track on him',
//     image: '/images/media/4.png',
//     date: '24th April 2025',
//   },
// ];

const videoLinks = [
  { platform: 'youtube', link: '47tn4CQc4k8' },
  { platform: 'youtube', link: 'vF_YLC14e2k' },
  {
    platform: 'vimeo',
    link: 'https://player.vimeo.com/video/161913311?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
  },
  { platform: 'youtube', link: 'hnLi8TlByKI' },
  { platform: 'youtube', link: 'yCJQHYarh4M' },
  { platform: 'youtube', link: 'yCJQHYarh4M' },
  { platform: 'youtube', link: 'IHJ9l7iVdnw' },
  { platform: 'youtube', link: 'BWDGMc72-V8' },
  { platform: 'youtube', link: 'wmCLlKnjb-I' },
  { platform: 'youtube', link: '8agRQ6pgo64' },
  { platform: 'youtube', link: '5jNeBbQQw7I' },
  { platform: 'youtube', link: 'yVExP2YKXeQ' },
  { platform: 'youtube', link: 'pn9zXTZQncg' },
];

const Videos = () => {
  return (
    <Section>
      <HeadingUnderlined>Videos</HeadingUnderlined>
      <div className='mt-20 space-y-48'>
        <div className='md:grid md:grid-cols-2 md:grid-rows-7 md:gap-x-24 space-y-20 md:space-y-48'>
          {videoLinks.map((video, index) =>
            video.platform === 'youtube' ? (
              <div className='w-full h-full'>
                <iframe
                  key={index}
                  src={`https://www.youtube.com/embed/${video.link}?si=R7baQkXJze4PsUEz`}
                  title='YouTube video player'
                  width={500}
                  height={300}
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                ></iframe>
              </div>
            ) : (
              <>
                <iframe
                  src='https://player.vimeo.com/video/161913311?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
                  title='Nick Demopoulos - The story of SMOMID'
                  width={500}
                  height={300}
                ></iframe>
                <script src='https://player.vimeo.com/api/player.js'></script>
              </>
            )
          )}
        </div>
      </div>
    </Section>
  );
};

export default Videos;
