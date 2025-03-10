import React from 'react';
import Image from 'next/image';
import Section from '../components/Section';

const SocialMedia = () => {
  const socials = [
    'instagram',
    'youtube',
    'tiktok',
    'twitter',
    'spotify',
    'sound-cloud',
  ];

  return (
    <Section>
      <Image
        src='/icons/line.svg'
        width='500'
        height='500'
        alt='line'
        className='w-full'
      />
      <div className='md:flex md:justify-between md:items-center my-15'>
        <h2 className='text-4xl md:text-5xl font-neo-latina font-bold'>
          Connect with <br /> us on <br /> Social media
        </h2>
        <div className='grid place-content-center grid-cols-3 grid-rows-2 gap-5'>
          {socials.map(icon => (
            <div className='bg-[#0a2a7e] rounded-2xl p-3'>
              <Image
                src={`/icons/${icon}.svg`}
                alt='Logo.'
                width='60'
                height='60'
              />
            </div>
          ))}
        </div>
      </div>
      <Image
        src='/icons/line.svg'
        width='500'
        height='500'
        alt='line'
        className='w-full'
      />
    </Section>
  );
};

export default SocialMedia;
