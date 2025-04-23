'use client';

import React, { useEffect, useState } from 'react';
import Section from '../components/Section';
import EventDate from './EventDate';

type Event = {
  id: number;
  title: string;
  slug: string;
  location: string;
  address: string;
  description?: string;
  flyerImage?: string;
  eventDate: string;
  published: boolean;
};

export default function EventsList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          '/api/events?orderBy=eventDate&order=desc'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please try again later.');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <Section>
        <div className='flex justify-center items-center py-20'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white'></div>
        </div>
      </Section>
    );
  }

  if (error) {
    return (
      <Section>
        <div className='text-center py-20'>
          <p className='text-xl text-red-500'>{error}</p>
        </div>
      </Section>
    );
  }

  if (events.length === 0) {
    return (
      <Section>
        <div className='text-center py-20'>
          <p className='text-xl'>No upcoming events found.</p>
        </div>
      </Section>
    );
  }

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();

    // Add ordinal suffix to day
    const getOrdinal = (n: number) => {
      const s = ['th', 'st', 'nd', 'rd'];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    return { month, date: getOrdinal(day) };
  };

  return (
    <Section className='font-neo-latina'>
      {events.map(event => {
        const eventDate = formatEventDate(event.eventDate);
        return (
          <div
            className='flex flex-col md:flex-row justify-between items-start mb-16 gap-8'
            key={event.id}
          >
            {/* Event Flyer Column */}
            <div className='w-full md:w-1/3 flex-shrink-0'>
              <div className='relative h-[320px] w-full overflow-hidden rounded-lg shadow-lg'>
                <img
                  src={event.flyerImage || '/images/event-placeholder.webp'}
                  alt={`${event.title} flyer`}
                  className='object-contain w-full h-full'
                />
              </div>
            </div>

            {/* Event Details Column */}
            <div className='w-full md:w-2/3'>
              <div className='flex flex-col gap-4 w-full'>
                <EventDate
                  month={eventDate.month}
                  date={eventDate.date}
                  state={event.location}
                  city={event.address}
                />
                {event.description && (
                  <div
                    className='prose prose-lg prose-invert max-w-prose font-electrolize [&_a]:text-white [&_a:hover]:text-gray-300'
                    dangerouslySetInnerHTML={{ __html: event.description }}
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </Section>
  );
}
