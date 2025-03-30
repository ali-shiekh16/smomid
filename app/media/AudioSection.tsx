import React from 'react';
import Section from '../components/Section';
import HeadingUnderlined from '../components/HeadingUnderlined';
import Image from 'next/image';
import Nblock from '../components/Nblock';

const AudioSection = () => {
  return (
    <Section>
      <HeadingUnderlined>Audio</HeadingUnderlined>
      <Nblock className='my-20 space-y-15'>
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
      </Nblock>
    </Section>
  );
};

export default AudioSection;
