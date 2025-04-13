'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Section from '../../components/Section';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featuredImage: string | null;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  tags: string[] | null;
  readTime: number | null;
}

export default function BlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const { slug } = params;

  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const res = await fetch(`/api/blogs?slug=${slug}`);

        if (!res.ok) {
          if (res.status === 404) {
            router.push('/blogs');
            return;
          }
          throw new Error('Failed to fetch blog post');
        }

        const data = await res.json();
        setBlogPost(data.data);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Unable to load this blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [slug, router]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <Section>
        <div className='flex justify-center items-center py-20'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white'></div>
        </div>
      </Section>
    );
  }

  if (error || !blogPost) {
    return (
      <Section>
        <div className='text-center py-20'>
          <h2 className='text-2xl font-bold mb-4'>
            Oops! Something went wrong
          </h2>
          <p className='text-red-500 mb-6'>{error || 'Blog post not found'}</p>
          <Link href='/blogs' className='text-white'>
            Back to Blogs
          </Link>
        </div>
      </Section>
    );
  }

  return (
    // <div className='bg-white text-black'>
    <div className=''>
      <div className='container mx-auto px-4 py-12'>
        <div className='mb-6'>
          <Link href='/blogs' className='inline-flex items-center '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 mr-2'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                clipRule='evenodd'
              />
            </svg>
            Back to Blogs
          </Link>
        </div>

        <article className='max-w-4xl mx-auto'>
          <header className='mb-10'>
            <h1 className='text-4xl font-bold mb-4'>{blogPost.title}</h1>
            <div className='flex items-center mb-5'>
              <time>
                {formatDate(blogPost.publishedAt || blogPost.createdAt)}
              </time>
              <span className='mx-2'>•</span>
              <span>{blogPost.readTime || 5} min read</span>
            </div>

            {blogPost.tags && blogPost.tags.length > 0 && (
              <div className='flex flex-wrap gap-2 mb-6'>
                {blogPost.tags.map((tag, index) => (
                  <span
                    key={index}
                    className='bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {blogPost.featuredImage && (
              <div className='aspect-video relative rounded-lg overflow-hidden'>
                <Image
                  // src={blogPost.featuredImage}
                  src='/images/contact-cover.webp'
                  alt={blogPost.title}
                  className='object-cover w-full'
                  priority
                  fill
                  objectFit='cover'
                />
              </div>
            )}
          </header>

          <div
            className='prose prose-lg max-w-none prose-headings:font-bold prose-a:text-blue-600'
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          />

          <div className='mt-16 pt-8 border-t border-gray-200'>
            <Link href='/blogs' className='inline-flex items-center '>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 mr-2'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                  clipRule='evenodd'
                />
              </svg>
              Back to All Blog Posts
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
