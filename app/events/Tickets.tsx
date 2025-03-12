import React from 'react';
import Section from '../components/Section';
import EventDate from './EventDate';
import ButtonOutline from '../components/ButtonOutline';
import Image from 'next/image';

const tickets = [
  {
    month: 'March',
    date: 'IO',
    state: 'Los Angeles',
    city: 'California',
  },
  {
    month: 'March',
    date: 'IO',
    state: 'Las Vegas',
    city: 'Nevada',
  },
  {
    month: 'March',
    date: 'IO',
    state: 'Houston ',
    city: 'Texas',
  },
  {
    month: 'March',
    date: 'IO',
    state: 'Miami',
    city: 'Florida',
  },
  {
    month: 'March',
    date: 'IO',
    state: 'Chicago',
    city: 'California',
  },
  {
    month: 'March',
    date: 'IO',
    state: 'New York City',
    city: 'New York',
  },
];

const Tickets = () => {
  return (
    <Section className='font-neo-latina grid grid-cols-2 items-center'>
      <div>
        {tickets.map((ticket, index) => (
          <div
            className='flex justify-between space-y-5 items-center'
            key={index}
          >
            <EventDate
              month={ticket.month}
              date={ticket.date}
              state={ticket.state}
              city={ticket.city}
            />

            <div>
              <ButtonOutline className='hover:bg-white text-black'>
                Buy now
              </ButtonOutline>
            </div>
          </div>
        ))}
      </div>

      <Image
        className='object-contain w-full h-full'
        src='/icons/map.svg'
        alt='US Map.'
        width={500}
        height={500}
        objectFit='contain'
      />
    </Section>
  );
};

export default Tickets;
