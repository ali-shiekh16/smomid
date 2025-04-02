import React from 'react';
import Section from '../components/Section';
import HeadingUnderlined from '../components/HeadingUnderlined';

const AudioSection = () => {
  return (
    <Section className='space-y-10'>
      <HeadingUnderlined>Audio</HeadingUnderlined>
      <iframe
        width='100%'
        height='300'
        allow='autoplay'
        src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/648941351&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'
      ></iframe>
      <iframe
        width='100%'
        height='300'
        allow='autoplay'
        src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/287146115&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'
      ></iframe>
    </Section>
  );
};

export default AudioSection;
