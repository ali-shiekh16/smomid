import React from 'react';
import Section from '../components/Section';
import HeadingPill from '../components/HeadingPill';
import ArticleCard from './ArticleCard';
import ButtonOutline from '../components/ButtonOutline';
import { ArrowLeft } from 'lucide-react';

const Articles = () => {
  return (
    <Section>
      <HeadingPill align='center'>Articles</HeadingPill>

      <div className='md:grid md:grid-cols-3 mt-20'>
        <ArticleCard
          title='Future plans of nick demopoulos'
          image='/images/article-1.png'
          text='What do Nick aims to achieve in life after creating Smomid read this article to know more.'
        >
          <div className='grid grid-rows-2 h-full'>
            <div className='flex items-center px-10 py-8'>
              <div className='flex justify-start items-center gap-2'>
                <div className='w-3 h-3 bg-white rounded-full' />
                <div className='w-3 h-3 rounded-full border border-white' />
                <div className='w-3 h-3 rounded-full border border-white' />
              </div>
            </div>

            <div className='border-t-1 border-white px-10 py-5 flex justify-start'>
              <ButtonOutline>
                <ArrowLeft className='inline-block' /> To previous page
              </ButtonOutline>
            </div>
          </div>
        </ArticleCard>

        <ArticleCard
          title='Nick’s journey as an artist'
          image='/images/article-2.jpeg'
          text='From playing with guitars and keyboards to creating his own instrument read about Nick.'
        >
          <div className='flex justify-center items-center h-full'>
            <p className='font-neo-latina text-3xl'>
              Articles we have been featured in
            </p>
          </div>
        </ArticleCard>

        <ArticleCard
          title='Getting into this Smomid thing'
          image='/images/article-3.jpeg'
          text='Understand the tech and science behind Smomid a musical instrument that emits light'
        >
          <div className='grid grid-rows-2 h-full'>
            <div className='border-b-1 border-white py-8'></div>

            <div className='flex justify-end items-center px-10 py-5'>
              <div className='flex justify-start items-center gap-2'>
                <div className='w-3 h-3 bg-white rounded-full' />
                <div className='w-3 h-3 rounded-full border border-white' />
                <div className='w-3 h-3 rounded-full border border-white' />
              </div>
            </div>
          </div>
        </ArticleCard>
      </div>
    </Section>
  );
};

export default Articles;
