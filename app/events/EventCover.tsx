import React from 'react';
import Block from '../components/Block';
import Nblock from '../components/Nblock';

const EventCover = () => {
  return (
    <Nblock>
      <header className='bg-[url(/images/events-cover.png)] bg-cover bg-center  h-screen  text-center'>
        <Block className='h-full flex flex-col justify-center '>
          {/* <div className='flex flex-col items-center space-y-10'>
            <div className='flex justify-end  w-full'>
              <ButtonOutline className='w-fit rounded-4xl  px-6 py-3 text-5xld'>
                <div className='flex items-center space-x-5'>
                  <span className='text-xl text-left'>
                    Upcoming <br /> Tours
                  </span>
                  <ArrowUpRight size={50} />
                </div>
              </ButtonOutline>
            </div> */}

          <h1 className='text-9xl font-bold font-neo-latina mb-0'>Events</h1>

          {/* <div className='flex space-x-15 my-15'>
              <ButtonOutline>
                <span className='text-3xl'>Shows</span>
              </ButtonOutline>
              <ButtonOutline>
                <span className='text-3xl'>March Onwards</span>
              </ButtonOutline>
              <ButtonOutline>
                <span className='text-3xl'>Cities</span>
              </ButtonOutline>
            </div> */}

          {/* <ButtonOutline className='w-fit rounded-full px-6 py-3 text-5xl bg-gradient-to-b from-secondary to-primary border-none'>
              <span className='text-3xl'>Book Tickets now</span>
            </ButtonOutline> */}
          {/* </div> */}
        </Block>
      </header>
    </Nblock>
  );
};

export default EventCover;
