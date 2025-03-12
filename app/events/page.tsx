import React from 'react';
import EventCover from './EventCover';
import Stats from './Stats';
import ExperienceSmomid from './ExperienceSmomid';
import Tickets from './Tickets';
import UpcomingConcerts from './UpcomingConcerts';
import RecentConcerts from './RecentConcerts';
import ConcertWall from './ConcertWall';

const Page = () => {
  return (
    <>
      <EventCover />
      <Stats />
      <ExperienceSmomid />
      <Tickets />
      <UpcomingConcerts />
      <RecentConcerts />
      <ConcertWall />
    </>
  );
};

export default Page;
