import React from 'react';
import Section from '../components/Section';
import PodcastCard from './PodcastCard';
import HeadingPill from '../components/HeadingPill';

const data = [
  {
    title: 'NICK’S PODCAST WITH DARWIN',
    subtitle:
      'How Nick and his team of extraordinary musicians are creating a futuristic genre of music.',
    text: '',
    image: '/images/press/1.png',
    date: '22-02-25',
    btnText: 'Podcast Link',
  },
  {
    title: 'SMOMID PERFORMANCE ON WKCR',
    subtitle:
      'How Nick and his team of extraordinary musicians are creating a futuristic genre of music',
    text: '',
    image: '/images/press/2.png',
    date: '22-02-25',
    btnText: 'Podcast Link',
  },
  {
    // title: 'SMOMID - CYBER SOLSTICE',
    // subtitle: 'How Nick got inspired for Cyber Solsticehis new album ',
    // text: '',
    // image: '/images/press/3.png',
    // date: '22-02-25',
    // btnText: 'Podcast Link',

    title: 'SMOMID - CYBER SOLSTICE',
    subtitle:
      'How Nick got inspired for Cyber Solsticehis new album. listen to the podcast to know more',
    text: '',
    image: '/images/press/3.png',
    date: '22-02-25',
    btnText: 'Link',
  },
  {
    title: 'SMOMID: ARTICLE BY BIG TAKEOVER EXCLUSIVES',
    subtitle:
      'the name behind the moniker, which is an acronym for String MOdeling MIdo Device.',
    text: '',
    image: '/images/press/4.png',
    date: '22-02-25',
    btnText: 'Link',
  },
];

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
          />
        ))}

        {/* <PodcastCard
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
        /> */}

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
