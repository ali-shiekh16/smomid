import React from 'react';
import Section from '../components/Section';
import BlogsGridRow from './BlogsGridRow';
import ButtonOutline from '../components/ButtonOutline';

const data = [
  {
    date: '22-02-25',
    image: '/images/blogs/3.png',
    title: 'Underrated Artists You Should Definitely Listen To on Soundcloud',
  },
  {
    date: '22-02-25',
    image: '/images/blogs/4.jpeg',
    title: 'Shoutout to My Biggest Fans: Your Support Means Everything!',
  },
  {
    date: '22-02-25',
    image: '/images/blogs/5.jpeg',
    title: 'My Favorite Cities to Perform In and Why I Love Them',
  },
  {
    date: '22-02-25',
    image: '/images/blogs/6.jpeg',
    title: 'The Pros and Cons of Being an Independent Artist vs. Signed Artist',
  },
  {
    date: '22-02-25',
    image: '/images/blogs/7.jpeg',
    title: 'My Studio Setup: A Look at Where the Magic Happens',
  },
  {
    date: '22-02-25',
    image: '/images/blogs/8.jpeg',
    title: 'How These Iconic Artists Influenced My Music Style',
  },
  {
    date: '22-02-25',
    image: '/images/blogs/9.jpeg',
    title: 'What If I Never Became a Musician? A Parallel Universe',
  },
  {
    date: '22-02-25',
    image: '/images/blogs/10.jpeg',
    title: 'Strangest Fan DMs I’ve Ever Received (And How I Responded)',
  },
  {
    date: '22-02-25',
    image: '/images/blogs/11.jpeg',
    title: 'What If Famous Artists Swapped Genres? My Wild Predictions',
  },
];

const BlogsGrid = () => {
  return (
    <Section>
      <div className='w-full h-[1px] bg-white mb-20'></div>
      <div className='space-y-10'>
        <BlogsGridRow items={data.slice(0, 3)} />
        <BlogsGridRow items={data.slice(3, 6)} />
        <BlogsGridRow items={data.slice(6)} />
      </div>

      <div className='flex justify-center mt-15'>
        <ButtonOutline className='w-fit rounded-none px-6 py-3 bg-black/15'>
          <span className='text-2xl'>Show More</span>
        </ButtonOutline>
      </div>
    </Section>
  );
};

export default BlogsGrid;
