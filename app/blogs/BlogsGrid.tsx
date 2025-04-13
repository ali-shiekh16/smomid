'use client';

import React, { useEffect, useState } from 'react';
import Section from '../components/Section';
import BlogCard from './BlogCard';
import ButtonOutline from '../components/ButtonOutline';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: string | null;
  publishedAt: string | null;
  createdAt: string;
  tags: string[] | null;
  readTime: number | null;
}

const BlogsGrid = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const postsPerPage = 9;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/blogs');

      if (!res.ok) {
        throw new Error('Failed to fetch blog posts');
      }

      const data = await res.json();
      setPosts(data.data || []);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setError('Unable to load blog posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const loadMorePosts = () => {
    setPage(prev => prev + 1);
    // In a real implementation with pagination API, you would fetch more posts here
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  if (loading && posts.length === 0) {
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
          <p className='text-red-500'>{error}</p>
          <button
            onClick={fetchPosts}
            className='mt-4 bg-white text-black px-6 py-2 rounded hover:bg-gray-200'
          >
            Try Again
          </button>
        </div>
      </Section>
    );
  }

  if (posts.length === 0) {
    return (
      <Section>
        <div className='text-center py-20'>
          <h3 className='text-2xl font-medium'>No blog posts yet</h3>
          <p className='mt-2 text-gray-600'>Check back later for updates!</p>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <div className='w-full h-[1px] bg-white mb-20'></div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {posts.map(post => (
          <BlogCard
            key={post.id}
            title={post.title}
            date={formatDate(post.publishedAt || post.createdAt)}
            image={post.featuredImage || '/images/blogs/placeholder.jpg'}
            slug={post.slug}
            excerpt={post.excerpt || ''}
            readTime={post.readTime || 5}
            tags={post.tags || []}
            className='h-full'
            imgStyle='h-64'
          />
        ))}
      </div>

      {/* {hasMore && (
        <div className='flex justify-center mt-16'>
          <ButtonOutline
            className='w-fit rounded-none px-6 py-3 bg-black/15'
            onClick={loadMorePosts}
          >
            <span className='text-2xl'>
              {loading ? 'Loading...' : 'Show More'}
            </span>
          </ButtonOutline>
        </div>
      )} */}
    </Section>
  );
};

export default BlogsGrid;
