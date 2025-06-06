import React from 'react';
import Block from '../components/Block';
import ButtonOutline from '../components/ButtonOutline';
import Nblock from '../components/Nblock';
import Image from 'next/image';

const ContactCover = () => {
  return (
    <Nblock>
      <header className='bg-[url(/images/media/27.webp)] bg-cover bg-center  h-screen  text-center'>
        <Block className='h-full flex flex-col justify-center '>
          <div className='flex flex-col items-center space-y-10'>
            <h1 className='text-6xl text-center md:text-9xl font-bold font-neo-latina text-shadow'>
              Get in touch
            </h1>
            <ButtonOutline className=' w-fit rounded-full px-6 py-3 text-5xl shadow-sm'>
              <span className='text-2xl md:text-3xl text-shadow'> Contact</span>
            </ButtonOutline>
            <Image
              src='/icons/arrow-down.svg'
              alt='Contact cover'
              width='75'
              height='75'
              className='w-20 h-20 rounded-full border-1 border-white px-3 py-5'
            />
          </div>
        </Block>
      </header>
    </Nblock>
  );
};

export default ContactCover;
