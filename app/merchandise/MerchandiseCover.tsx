import React from 'react';
import Section from '../components/Section';

const MerchandiseCover = () => {
  return (
    <Section>
      <h1 className='text-5xl text-center md:text-left md:text-9xl my-15 md:my-20 font-bold uppercase font-neo-latina'>
        Merchandise
      </h1>
    </Section>
    // <Nblock>
    //   <header className='relative bg-[url(/images/merchandise-cover.png)] bg-contain bg-bottom bg-no-repeat h-screen'>
    //     <Block>
    //       <h1 className='absolute top-[20%] text-[10vw] font-bold text-white uppercase font-neo-latina'>
    //         Merchandise
    //       </h1>
    //     </Block>
    //   </header>
    //   <Image
    //     className='w-full object-contain mt-10'
    //     src='/images/merchandise-marquee.png'
    //     width='1920'
    //     height='400'
    //     alt='Merchandise Marquee'
    //     objectFit='contain'
    //   />
    // </Nblock>
  );
};

export default MerchandiseCover;
