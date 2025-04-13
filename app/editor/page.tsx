'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdvancedTipTap from '../components/AdvancedTipTap';
import slugify from 'slugify';

export default function BlogEditor() {
  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [excerpt, setExcerpt] = useState<string>('');
  const [content, setContent] = useState<string>(`
    <h2>Start writing your blog post...</h2>
    <p>This is a full-featured editor with rich text formatting options.</p>
  `);
  const [featuredImage, setFeaturedImage] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [readTime, setReadTime] = useState<number>(5);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<{
    message: string;
    type: 'success' | 'error' | '';
  }>({ message: '', type: '' });

  const saveBlogPost = async (publish = false) => {
    if (!title.trim()) {
      setSaveStatus({
        message: 'Please enter a title for your blog post',
        type: 'error',
      });
      return;
    }

    if (!content.trim()) {
      setSaveStatus({
        message: 'Blog post content cannot be empty',
        type: 'error',
      });
      return;
    }

    setIsSaving(true);
    setSaveStatus({ message: '', type: '' });

    try {
      const slug = slugify(title, { lower: true, strict: true });
      const tagArray = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag);
      const calculatedReadTime = Math.ceil(content.split(' ').length / 200); // Rough estimate: 200 words per minute

      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          slug,
          excerpt:
            excerpt ||
            content.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
          content,
          featuredImage,
          published: publish,
          publishedAt: publish ? new Date().toISOString() : null,
          tags: tagArray,
          readTime: readTime || calculatedReadTime,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save blog post');
      }

      const data = await response.json();
      setSaveStatus({
        message: publish
          ? 'Blog post published successfully!'
          : 'Blog post saved as draft!',
        type: 'success',
      });

      // Redirect to the blogs page after a successful publish
      if (publish) {
        setTimeout(() => {
          router.push('/blogs');
        }, 1500);
      }
    } catch (error) {
      console.error('Error saving blog post:', error);
      setSaveStatus({
        message: 'Error saving blog post. Please try again.',
        type: 'error',
      });
    } finally {
      setIsSaving(false);

      // Auto-hide the status message after 3 seconds
      setTimeout(() => {
        setSaveStatus({ message: '', type: '' });
      }, 3000);
    }
  };

  const calculateReadTime = (html: string) => {
    const text = html.replace(/<[^>]*>/g, '');
    const words = text.split(/\s+/).length;
    return Math.ceil(words / 200); // 200 words per minute
  };

  return (
    <div className='container mx-auto px-4 py-12'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold mb-8 text-center text-gray-900'>
          Create New Blog Post
        </h1>

        {saveStatus.message && (
          <div
            className={`mb-4 p-4 rounded-md ${
              saveStatus.type === 'success'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {saveStatus.message}
          </div>
        )}

        <div className='bg-white rounded-lg shadow-md overflow-hidden p-6 mb-6'>
          <div className='mb-4'>
            <label
              htmlFor='title'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Blog Post Title
            </label>
            <input
              type='text'
              id='title'
              value={title}
              onChange={e => {
                setTitle(e.target.value);
                // Auto-update read time when title changes
                if (content) {
                  setReadTime(calculateReadTime(content));
                }
              }}
              className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              placeholder='Enter a catchy title'
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='excerpt'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Excerpt (optional)
            </label>
            <textarea
              id='excerpt'
              value={excerpt}
              onChange={e => setExcerpt(e.target.value)}
              rows={2}
              className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              placeholder='A short summary of your post (will be auto-generated if left empty)'
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='featuredImage'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Featured Image URL
            </label>
            <input
              type='text'
              id='featuredImage'
              value={featuredImage}
              onChange={e => setFeaturedImage(e.target.value)}
              className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              placeholder='https://example.com/image.jpg'
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='tags'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Tags (comma separated)
            </label>
            <input
              type='text'
              id='tags'
              value={tags}
              onChange={e => setTags(e.target.value)}
              className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              placeholder='music, performance, event'
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='readTime'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Read Time (minutes)
            </label>
            <input
              type='number'
              id='readTime'
              value={readTime}
              min={1}
              onChange={e => setReadTime(parseInt(e.target.value) || 5)}
              className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Content
            </label>
            <div className='border border-gray-300 rounded-md'>
              <AdvancedTipTap
                content={content}
                onChange={html => {
                  setContent(html);
                  setReadTime(calculateReadTime(html));
                }}
                placeholder='Start writing your blog post here...'
              />
            </div>
          </div>

          <div className='flex justify-end space-x-3'>
            <button
              onClick={() => saveBlogPost(false)}
              disabled={isSaving}
              className='inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'
            >
              {isSaving ? 'Saving...' : 'Save as Draft'}
            </button>
            <button
              onClick={() => saveBlogPost(true)}
              disabled={isSaving}
              className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'
            >
              {isSaving ? 'Publishing...' : 'Publish Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
