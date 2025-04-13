'use client';

import React, { useEffect, useState } from 'react';
import Section from '../components/Section';
import HeadingUnderlined from '../components/HeadingUnderlined';
import ConcertWall from './ConcertWall';

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

export default function RecentConcerts() {
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPastEvents = async () => {
      try {
        setLoading(true);
        // Get events sorted by date in descending order (most recent first)
        const currentDate = new Date().toISOString();
        const response = await fetch(
          '/api/events?orderBy=eventDate&order=desc'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();

        // Filter events to show only past events
        const pastEventsList = data.data
          .filter((event: Event) => {
            return new Date(event.eventDate) < new Date();
          })
          .slice(0, 6); // Limit to 6 recent past events

        setPastEvents(pastEventsList);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching past events:', err);
        setError('Failed to load past events');
        setLoading(false);
      }
    };

    fetchPastEvents();
  }, []);

  if (loading) {
    return (
      <Section className='py-16'>
        <HeadingUnderlined>Recent Concerts</HeadingUnderlined>
        <div className='flex justify-center items-center py-20'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white'></div>
        </div>
      </Section>
    );
  }

  if (error) {
    return (
      <Section className='py-16'>
        <HeadingUnderlined>Recent Concerts</HeadingUnderlined>
        <div className='text-center py-10'>
          <p className='text-red-500'>{error}</p>
        </div>
      </Section>
    );
  }

  if (pastEvents.length === 0) {
    return (
      <Section className='py-16'>
        <HeadingUnderlined>Recent Concerts</HeadingUnderlined>
        <div className='text-center py-10'>
          <p>No past events to display.</p>
        </div>
      </Section>
    );
  }

  return (
    <Section className='py-16'>
      <HeadingUnderlined>Recent Concerts</HeadingUnderlined>
      <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {pastEvents.map(event => (
          <ConcertWall
            key={event.id}
            title={event.title}
            location={event.location}
            date={new Date(event.eventDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
            image={event.flyerImage || '/images/event-placeholder.webp'}
            slug={event.slug}
          />
        ))}
      </div>
    </Section>
  );
}
