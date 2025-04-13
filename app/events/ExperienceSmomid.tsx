import React from 'react';
import Section from '../components/Section';
import HeadingGradient from '../components/HeadingGradient';
import ButtonOutline from '../components/ButtonOutline';
import Link from 'next/link';

export default function ExperienceSmomid() {
  return (
    <Section className='py-16 bg-gradient-to-b from-black to-neutral-900'>
      <div className='max-w-4xl mx-auto text-center'>
        <HeadingGradient>Experience Smomid Live</HeadingGradient>

        <p className='mt-6 text-xl'>
          Smomid delivers a unique blend of electronic music and visual art
          through custom-built instruments. Each performance creates an
          immersive audiovisual experience that captivates audiences across
          various venues.
        </p>

        <div className='mt-10 space-y-6'>
          <div className='flex flex-col md:flex-row justify-center items-center gap-6'>
            <Link href='/contact'>
              <ButtonOutline className='min-w-[200px] hover:bg-white hover:text-black'>
                BOOK A SHOW
              </ButtonOutline>
            </Link>

            <Link href='/about'>
              <ButtonOutline className='min-w-[200px] hover:bg-white hover:text-black'>
                LEARN MORE
              </ButtonOutline>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
