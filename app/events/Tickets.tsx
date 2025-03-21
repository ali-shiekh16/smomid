import React from 'react';
import Section from '../components/Section';
import EventDate from './EventDate';
import ButtonOutline from '../components/ButtonOutline';
import Image from 'next/image';
import Link from 'next/link';

const tickets = [
  {
    month: 'March',
    date: '3rd',
    state: 'Tradesman Bar',
    city: '222 Bushwick Ave, Brooklyn, NY 11206',
    link: 'http://tradesmanbar.com/',
  },
  {
    month: 'March',
    date: '23rd',
    state: 'Ivy House',
    city: '322 Troutman Street Brooklyn, NY Vegas',
    link: 'http://www.ivyhousestudio.com/',
  },
];

const Tickets = () => {
  return (
    <Section className='font-neo-latina md:grid md:grid-cols-2 items-center'>
      <div>
        {tickets.map((ticket, index) => (
          <div
            className='flex flex-col md:flex-row justify-between space-y-5 items-center'
            key={index}
          >
            <EventDate
              month={ticket.month}
              date={ticket.date}
              state={ticket.state}
              city={ticket.city}
            />

            <div className='mb-10 md:mb-0'>
              <Link href={ticket.link} target='_blank'>
                <ButtonOutline className='hover:bg-white hover:text-black'>
                  LINK
                </ButtonOutline>
              </Link>
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
