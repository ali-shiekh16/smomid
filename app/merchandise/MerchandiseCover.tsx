import React from 'react';
import Image from 'next/image';
import Block from '../components/Block';
import Nblock from '../components/Nblock';

const MerchandiseCover = () => {
  return (
    <Block>
      <h1 className='text-9xl my-20 font-bold uppercase font-neo-latina'>
        Merchandise
      </h1>
    </Block>
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
