import React from 'react';
import Section from '../components/Section';
import HeadingPill from '../components/HeadingPill';
import ArticleCard from './ArticleCard';
import { PressItem } from './page';

interface ArticlesProps {
  pressItems: PressItem[];
}

const Articles = ({ pressItems }: ArticlesProps) => {
  // If there are no articles, show a message
  if (pressItems.length === 0) {
    return (
      <Section>
        <HeadingPill align='center'>Articles</HeadingPill>
        <p className='text-center text-gray-400 mt-20'>
          No articles available at this time.
        </p>
      </Section>
    );
  }

  return (
    <Section>
      <HeadingPill align='center'>Articles</HeadingPill>

      <div className='md:grid md:grid-cols-3 gap-5 mt-20'>
        {pressItems.map(article => (
          <ArticleCard
            key={article.id}
            title={article.title}
            image={article.image}
            text={article.subtitle}
            date={article.date || ''}
            link={article.link || '#'}
            btnText={article.btnText}
          />
        ))}
      </div>
    </Section>
  );
};

export default Articles;
