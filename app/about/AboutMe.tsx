import React from 'react';
import HeadingPill from '../components/HeadingPill';
import Section from '../components/Section';

const AboutMe = () => {
  return (
    <Section>
      <HeadingPill>About me</HeadingPill>

      <p className='border-1 rounded-xl p-5 text-lg'>
        Nick Demopoulos is a visionary musician, composer, and instrument
        inventor known for pushing the boundaries of sound and technology. As
        the creator of the Smomid ( String Modeling Midi Device), Nick has
        redefined the possibilities of live music performance, blending
        traditional instrumentation with cutting-edge innovation. With a
        background in jazz guitar, sound design and electronic music, Nick’s
        work spans a unique fusion of genres, offering audiences an immersive
        experience that is as visually captivating as it is sonically
        groundbreaking. Smomid music often features glitchy and scattered beats,
        sampling, abstract textures, ambient spaces, and improvisation. Smomid
        music draws on many varied influences and creates bizarre juxtapositions
        with deft sonic versatility, with heavy beats, Gregorian Monks chanting
        and Taiko drum sounds all coexisting comfortably. In listening to Smomid
        one gets the impression that anything is possible and that all sound
        universes can coexist. Nick designed and created his own instruments for
        the purpose of facilitating live interactive, audiovisual performances
        realized by using the gestures one would associate with playing an
        acoustic instrument.These instruments create sound, emit light through
        high powered LED displays  embedded in the instruments and control video
        animations.
      </p>
    </Section>
  );
};

export default AboutMe;
