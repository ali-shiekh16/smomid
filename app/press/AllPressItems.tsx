import React from 'react';
import Section from '../components/Section';
import HeadingPill from '../components/HeadingPill';
import ArticleCard from './ArticleCard';
import { PressItem } from './page';

interface AllPressItemsProps {
  pressItems: PressItem[];
}

const AllPressItems = ({ pressItems }: AllPressItemsProps) => {
  // If there are no press items, show a message
  if (pressItems.length === 0) {
    return (
      <Section>
        <HeadingPill align='center'>Press</HeadingPill>
        <p className='text-center text-gray-400 mt-20'>
          No press items available at this time.
        </p>
      </Section>
    );
  }

  // Sort by order field if present, otherwise by date
  const sortedItems = [...pressItems].sort((a, b) => {
    // First by order if available
    if (a.order !== null && b.order !== null) {
      return (a.order || 0) - (b.order || 0);
    }

    // Then by date if available
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }

    return 0;
  });

  return (
    <Section>
      <HeadingPill align='center'>Press</HeadingPill>

      <div className='md:grid md:grid-cols-3 gap-5 mt-20'>
        {sortedItems.map(item => {
          // Use ArticleCard for all press items
          return (
            <ArticleCard
              key={item.id}
              title={item.title}
              image={item.image}
              text={item.subtitle || item.text || ''}
              date={item.date || ''}
              link={item.link || '#'}
              btnText={item.btnText}
            />
          );
        })}
      </div>
    </Section>
  );
};

export default AllPressItems;
