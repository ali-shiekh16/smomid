import React from 'react';
import Image from 'next/image';
import Section from '../components/Section';
import Link from 'next/link';

const SocialMedia = () => {
  const socials = [
    { icon: 'instagram', href: 'https://www.instagram.com/smomid/' },
    { icon: 'facebook', href: 'https://www.facebook.com/Smomid' },
    { icon: 'bandcamp', href: 'https://smomid.bandcamp.com/' },
    { icon: 'youtube', href: 'https://www.youtube.com/@Smomid' },
    {
      icon: 'spotify',
      href: 'https://open.spotify.com/artist/34tsz5yU9BVkcSjlZvzP2W',
    },
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
      <div className='md:flex md:justify-between md:items-center my-15 md:space-y-0 space-y-10'>
        <h2 className='text-center md:text-left text-4xl md:text-5xl font-neo-latina font-bold'>
          {/* Connect with <br /> us on <br /> Social media */}
        </h2>
        {/* <div className='grid place-content-center grid-cols-3 grid-rows-2 gap-5'> */}
        <div className='flex space-x-5 justify-center w-full'>
          {socials.map(({ icon, href }) => (
            <Link
              key={icon}
              href={href}
              target='_blank'
              rel='noopener noreferrer'
            >
              <div className='bg-[#0a2a7e] rounded-2xl p-3'>
                <Image
                  src={`/icons/${icon}.svg`}
                  alt={`${icon} Logo`}
                  width='60'
                  height='60'
                />
              </div>
            </Link>
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
