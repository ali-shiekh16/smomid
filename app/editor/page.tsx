'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AdvancedTipTap from '../components/AdvancedTipTap';
import CloudinaryUploader from '../components/CloudinaryUploader';
import slugify from 'slugify';

// Interface for blog post type
interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  readTime: number;
}

// Interface for event type
interface Event {
  id: number;
  title: string;
  slug: string;
  location: string;
  address: string;
  description: string | null;
  flyerImage: string | null;
  eventDate: string | null;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// Create a separate client component that uses useSearchParams
function EditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editSlug = searchParams.get('slug');
  const type = searchParams.get('type') || 'blog'; // Default to blog if not specified
  const [mode, setMode] = useState<'create' | 'edit' | 'manage'>('create');
  const [editorType, setEditorType] = useState<'blog' | 'event'>(
    type === 'event' ? 'event' : 'blog'
  );

  // Blog post form state
  const [title, setTitle] = useState<string>('');
  const [excerpt, setExcerpt] = useState<string>('');
  const [content, setContent] = useState<string>(`
    <h2>Start writing your blog post...</h2>
    <p>This is a full-featured editor with rich text formatting options.</p>
  `);
  const [featuredImage, setFeaturedImage] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [readTime, setReadTime] = useState<number>(5);
  const [currentPostId, setCurrentPostId] = useState<number | null>(null);

  // Event form state
  const [eventTitle, setEventTitle] = useState<string>('');
  const [eventLocation, setEventLocation] = useState<string>('');
  const [eventAddress, setEventAddress] = useState<string>('');
  const [eventDescription, setEventDescription] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('');
  const [eventFlyerImage, setEventFlyerImage] = useState<string>('');
  const [currentEventId, setCurrentEventId] = useState<number | null>(null);

  // Management state
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [showDrafts, setShowDrafts] = useState<boolean>(true);
  const [showPublished, setShowPublished] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<{
    message: string;
    type: 'success' | 'error' | '';
  }>({ message: '', type: '' });

  // Fetch all items on initial load
  useEffect(() => {
    if (mode === 'manage') {
      if (editorType === 'blog') {
        fetchBlogPosts();
      } else {
        fetchEvents();
      }
    }
  }, [mode, showDrafts, editorType]);

  // Fetch a specific blog post to edit if slug is provided in URL
  useEffect(() => {
    if (editSlug) {
      setMode('edit');
      if (type === 'event') {
        fetchEventBySlug(editSlug);
      } else {
        fetchBlogPostBySlug(editSlug);
      }
    }
  }, [editSlug, type]);

  const fetchBlogPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/blogs?drafts=true`);
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      const data = await response.json();
      setBlogPosts(data.data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setSaveStatus({
        message: 'Error fetching blog posts. Please try again.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/events?drafts=true`);
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      setSaveStatus({
        message: 'Error fetching events. Please try again.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBlogPostBySlug = async (slug: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/blogs?slug=${slug}`);
      if (!response.ok) {
        throw new Error('Failed to fetch blog post');
      }
      const data = await response.json();
      const post = data.data;

      // Populate the form with the post data
      setCurrentPostId(post.id);
      setTitle(post.title);
      setExcerpt(post.excerpt || '');
      setContent(post.content);
      setFeaturedImage(post.featuredImage || '');
      setTags(post.tags ? post.tags.join(', ') : '');
      setReadTime(post.readTime || 5);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      setSaveStatus({
        message: 'Error fetching blog post. Please try again.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEventBySlug = async (slug: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/events?slug=${slug}`);
      if (!response.ok) {
        throw new Error('Failed to fetch event');
      }
      const data = await response.json();
      const event = data.data;

      // Populate the form with the event data
      setCurrentEventId(event.id);
      setEventTitle(event.title);
      setEventLocation(event.location || '');
      setEventAddress(event.address || '');
      setEventDescription(event.description || '');
      setEventFlyerImage(event.flyerImage || '');

      // Format date for input element
      if (event.eventDate) {
        const date = new Date(event.eventDate);
        const formattedDate = date.toISOString().split('T')[0];
        setEventDate(formattedDate);
      } else {
        setEventDate('');
      }
    } catch (error) {
      console.error('Error fetching event:', error);
      setSaveStatus({
        message: 'Error fetching event. Please try again.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

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
          id: currentPostId, // Include ID if editing an existing post
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

      // Redirect to management view after a successful save
      if (mode === 'edit') {
        setTimeout(() => {
          setMode('manage');
          fetchBlogPosts();
        }, 1500);
      }

      // Redirect to the blogs page after a successful publish from create mode
      if (publish && mode === 'create') {
        setTimeout(() => {
          router.push('/blogs');
        }, 1500);
      }

      // Reset form if we just created a new post
      if (mode === 'create') {
        setTitle('');
        setExcerpt('');
        setContent(`
          <h2>Start writing your blog post...</h2>
          <p>This is a full-featured editor with rich text formatting options.</p>
        `);
        setFeaturedImage('');
        setTags('');
        setReadTime(5);
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

  const saveEvent = async (publish = false) => {
    if (!eventTitle.trim()) {
      setSaveStatus({
        message: 'Please enter a title for your event',
        type: 'error',
      });
      return;
    }

    if (!eventLocation.trim()) {
      setSaveStatus({
        message: 'Please enter a location for your event',
        type: 'error',
      });
      return;
    }

    if (!eventAddress.trim()) {
      setSaveStatus({
        message: 'Please enter an address for your event',
        type: 'error',
      });
      return;
    }

    setIsSaving(true);
    setSaveStatus({ message: '', type: '' });

    try {
      const slug = slugify(eventTitle, { lower: true, strict: true });

      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: currentEventId, // Include ID if editing an existing event
          title: eventTitle,
          slug,
          location: eventLocation,
          address: eventAddress,
          description: eventDescription,
          flyerImage: eventFlyerImage,
          eventDate: eventDate || null,
          published: publish,
          publishedAt: publish ? new Date().toISOString() : null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save event');
      }

      const data = await response.json();
      setSaveStatus({
        message: publish
          ? 'Event published successfully!'
          : 'Event saved as draft!',
        type: 'success',
      });

      // Redirect to management view after a successful save
      if (mode === 'edit') {
        setTimeout(() => {
          setMode('manage');
          fetchEvents();
        }, 1500);
      }

      // Redirect to the events page after a successful publish from create mode
      if (publish && mode === 'create') {
        setTimeout(() => {
          router.push('/events');
        }, 1500);
      }

      // Reset form if we just created a new event
      if (mode === 'create') {
        setEventTitle('');
        setEventLocation('');
        setEventAddress('');
        setEventDescription('');
        setEventFlyerImage('');
        setEventDate('');
      }
    } catch (error) {
      console.error('Error saving event:', error);
      setSaveStatus({
        message: 'Error saving event. Please try again.',
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

  const deleteBlogPost = async (id: number) => {
    if (
      !confirm(
        'Are you sure you want to delete this blog post? This action cannot be undone.'
      )
    ) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/blogs?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete blog post');
      }

      setSaveStatus({
        message: 'Blog post deleted successfully!',
        type: 'success',
      });

      // Refresh the list of blog posts
      fetchBlogPosts();
    } catch (error) {
      console.error('Error deleting blog post:', error);
      setSaveStatus({
        message: 'Error deleting blog post. Please try again.',
        type: 'error',
      });
    } finally {
      setIsDeleting(false);

      // Auto-hide the status message after 3 seconds
      setTimeout(() => {
        setSaveStatus({ message: '', type: '' });
      }, 3000);
    }
  };

  const deleteEvent = async (id: number) => {
    if (
      !confirm(
        'Are you sure you want to delete this event? This action cannot be undone.'
      )
    ) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/events?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      setSaveStatus({
        message: 'Event deleted successfully!',
        type: 'success',
      });

      // Refresh the list of events
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      setSaveStatus({
        message: 'Error deleting event. Please try again.',
        type: 'error',
      });
    } finally {
      setIsDeleting(false);

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

  // Filter items based on published status
  const filteredBlogPosts = blogPosts.filter(
    post => (showDrafts && !post.published) || (showPublished && post.published)
  );

  const filteredEvents = events.filter(
    event =>
      (showDrafts && !event.published) || (showPublished && event.published)
  );

  return (
    <div className='container mx-auto px-4 py-12'>
      <div className='max-w-4xl mx-auto'>
        {/* Content Type Tabs */}
        <div className='flex justify-between items-center mb-8'>
          <div className='flex space-x-2'>
            <button
              onClick={() => setEditorType('blog')}
              className={`px-4 py-2 rounded-md ${
                editorType === 'blog'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Blog Posts
            </button>
            <button
              onClick={() => setEditorType('event')}
              className={`px-4 py-2 rounded-md ${
                editorType === 'event'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Events
            </button>
          </div>

          {/* Navigation tabs */}
          <div className='flex space-x-2'>
            <button
              onClick={() => setMode('create')}
              className={`px-4 py-2 rounded-md ${
                mode === 'create'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {editorType === 'blog' ? 'New Post' : 'New Event'}
            </button>
            <button
              onClick={() => {
                setMode('manage');
                if (editorType === 'blog') {
                  fetchBlogPosts();
                } else {
                  fetchEvents();
                }
              }}
              className={`px-4 py-2 rounded-md ${
                mode === 'manage'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Manage {editorType === 'blog' ? 'Posts' : 'Events'}
            </button>
          </div>
        </div>

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

        {/* Blog Post Management View */}
        {mode === 'manage' && editorType === 'blog' && (
          <div className='bg-white rounded-lg shadow-md overflow-hidden p-6 mb-6'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold'>Your Blog Posts</h2>
              <div className='flex space-x-4'>
                <label className='inline-flex items-center'>
                  <input
                    type='checkbox'
                    checked={showDrafts}
                    onChange={() => setShowDrafts(!showDrafts)}
                    className='h-4 w-4 text-indigo-600'
                  />
                  <span className='ml-2 text-sm'>Show Drafts</span>
                </label>
                <label className='inline-flex items-center'>
                  <input
                    type='checkbox'
                    checked={showPublished}
                    onChange={() => setShowPublished(!showPublished)}
                    className='h-4 w-4 text-indigo-600'
                  />
                  <span className='ml-2 text-sm'>Show Published</span>
                </label>
              </div>
            </div>

            {isLoading ? (
              <div className='text-center py-10'>
                <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent'></div>
                <p className='mt-3'>Loading blog posts...</p>
              </div>
            ) : filteredBlogPosts.length === 0 ? (
              <div className='text-center py-10 text-gray-500'>
                No blog posts found.
              </div>
            ) : (
              <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Title
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Status
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Last Updated
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {filteredBlogPosts.map(post => (
                      <tr key={post.id}>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                          {post.title}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm'>
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              post.published
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {post.published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                          {new Date(post.updatedAt).toLocaleDateString()}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                          <div className='flex space-x-3'>
                            <button
                              onClick={() => {
                                router.push(
                                  `/editor?slug=${post.slug}&type=blog`
                                );
                              }}
                              className='text-indigo-600 hover:text-indigo-900'
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteBlogPost(post.id)}
                              disabled={isDeleting}
                              className='text-red-600 hover:text-red-900'
                            >
                              Delete
                            </button>
                            {!post.published && (
                              <button
                                onClick={() => {
                                  fetchBlogPostBySlug(post.slug);
                                  setTimeout(() => {
                                    setMode('edit');
                                    saveBlogPost(true);
                                  }, 500);
                                }}
                                className='text-green-600 hover:text-green-900'
                              >
                                Publish
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Event Management View */}
        {mode === 'manage' && editorType === 'event' && (
          <div className='bg-white rounded-lg shadow-md overflow-hidden p-6 mb-6'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold'>Your Events</h2>
              <div className='flex space-x-4'>
                <label className='inline-flex items-center'>
                  <input
                    type='checkbox'
                    checked={showDrafts}
                    onChange={() => setShowDrafts(!showDrafts)}
                    className='h-4 w-4 text-indigo-600'
                  />
                  <span className='ml-2 text-sm'>Show Drafts</span>
                </label>
                <label className='inline-flex items-center'>
                  <input
                    type='checkbox'
                    checked={showPublished}
                    onChange={() => setShowPublished(!showPublished)}
                    className='h-4 w-4 text-indigo-600'
                  />
                  <span className='ml-2 text-sm'>Show Published</span>
                </label>
              </div>
            </div>

            {isLoading ? (
              <div className='text-center py-10'>
                <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent'></div>
                <p className='mt-3'>Loading events...</p>
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className='text-center py-10 text-gray-500'>
                No events found.
              </div>
            ) : (
              <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Title
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Location
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Event Date
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Status
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {filteredEvents.map(event => (
                      <tr key={event.id}>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                          {event.title}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                          {event.location}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                          {event.eventDate
                            ? new Date(event.eventDate).toLocaleDateString()
                            : 'No date set'}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm'>
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              event.published
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {event.published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                          <div className='flex space-x-3'>
                            <button
                              onClick={() => {
                                router.push(
                                  `/editor?slug=${event.slug}&type=event`
                                );
                              }}
                              className='text-indigo-600 hover:text-indigo-900'
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteEvent(event.id)}
                              disabled={isDeleting}
                              className='text-red-600 hover:text-red-900'
                            >
                              Delete
                            </button>
                            {!event.published && (
                              <button
                                onClick={() => {
                                  fetchEventBySlug(event.slug);
                                  setTimeout(() => {
                                    setMode('edit');
                                    saveEvent(true);
                                  }, 500);
                                }}
                                className='text-green-600 hover:text-green-900'
                              >
                                Publish
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Blog Post Editor Form */}
        {(mode === 'create' || mode === 'edit') && editorType === 'blog' && (
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
                className='border border-gray-400 py-2 px-4 rounded-md block w-full focus:border-gray-500 text-black placeholder:text-gray-400'
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
                className='border border-gray-400 py-2 px-4 rounded-md block w-full focus:border-gray-500 text-black placeholder:text-gray-400'
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
                className='border border-gray-400 py-2 px-4 rounded-md block w-full focus:border-gray-500 text-black placeholder:text-gray-400'
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
                className='border border-gray-400 py-2 px-4 rounded-md block w-full focus:border-gray-500 text-black placeholder:text-gray-400'
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
                className='border border-gray-400 py-2 px-4 rounded-md block w-full focus:border-gray-500 text-black placeholder:text-gray-400'
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
                onClick={() => setMode('manage')}
                className='inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'
              >
                Cancel
              </button>
              <button
                onClick={() => saveBlogPost(false)}
                disabled={isSaving}
                className='inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'
              >
                {isSaving
                  ? 'Saving...'
                  : mode === 'edit'
                  ? 'Update Draft'
                  : 'Save as Draft'}
              </button>
              <button
                onClick={() => saveBlogPost(true)}
                disabled={isSaving}
                className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'
              >
                {isSaving
                  ? 'Publishing...'
                  : mode === 'edit'
                  ? 'Update & Publish'
                  : 'Publish Post'}
              </button>
            </div>
          </div>
        )}

        {/* Event Editor Form */}
        {(mode === 'create' || mode === 'edit') && editorType === 'event' && (
          <div className='bg-white rounded-lg shadow-md overflow-hidden p-6 mb-6'>
            <div className='mb-4'>
              <label
                htmlFor='eventTitle'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Event Title
              </label>
              <input
                type='text'
                id='eventTitle'
                value={eventTitle}
                onChange={e => setEventTitle(e.target.value)}
                className='border border-gray-400 py-2 px-4 rounded-md block w-full focus:border-gray-500 text-black placeholder:text-gray-400'
                placeholder='Enter a descriptive event title'
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor='eventLocation'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Event Location (Venue Name)
              </label>
              <input
                type='text'
                id='eventLocation'
                value={eventLocation}
                onChange={e => setEventLocation(e.target.value)}
                className='border border-gray-400 py-2 px-4 rounded-md block w-full focus:border-gray-500 text-black placeholder:text-gray-400'
                placeholder='e.g. Tradesman Bar'
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor='eventAddress'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Complete Address
              </label>
              <textarea
                id='eventAddress'
                value={eventAddress}
                onChange={e => setEventAddress(e.target.value)}
                rows={2}
                className='border border-gray-400 py-2 px-4 rounded-md block w-full focus:border-gray-500 text-black placeholder:text-gray-400'
                placeholder='e.g. 222 Bushwick Ave, Brooklyn, NY 11206'
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor='eventDate'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Event Date
              </label>
              <input
                type='date'
                id='eventDate'
                value={eventDate}
                onChange={e => setEventDate(e.target.value)}
                className='border border-gray-400 py-2 px-4 rounded-md block w-full focus:border-gray-500 text-black'
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor='eventDescription'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Description (optional)
              </label>
              <textarea
                id='eventDescription'
                value={eventDescription}
                onChange={e => setEventDescription(e.target.value)}
                rows={4}
                className='border border-gray-400 py-2 px-4 rounded-md block w-full focus:border-gray-500 text-black placeholder:text-gray-400'
                placeholder='Details about the event such as time, lineup, etc.'
              />
            </div>

            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Event Flyer
              </label>
              <CloudinaryUploader
                currentImage={eventFlyerImage}
                onImageUploaded={url => setEventFlyerImage(url)}
              />
              <p className='text-xs text-gray-500 mt-2'>
                <span className='font-semibold'>Note:</span> You will need to
                configure the Cloudinary cloud name and upload preset in the
                CloudinaryUploader component before this works.
              </p>
            </div>

            <div className='flex justify-end space-x-3 mt-6'>
              <button
                onClick={() => setMode('manage')}
                className='inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'
              >
                Cancel
              </button>
              <button
                onClick={() => saveEvent(false)}
                disabled={isSaving}
                className='inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'
              >
                {isSaving
                  ? 'Saving...'
                  : mode === 'edit'
                  ? 'Update Draft'
                  : 'Save as Draft'}
              </button>
              <button
                onClick={() => saveEvent(true)}
                disabled={isSaving}
                className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'
              >
                {isSaving
                  ? 'Publishing...'
                  : mode === 'edit'
                  ? 'Update & Publish'
                  : 'Publish Event'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Main component that wraps the EditorContent in a Suspense boundary
export default function EditorPage() {
  return (
    <Suspense
      fallback={
        <div className='container mx-auto px-4 py-12 flex justify-center items-center'>
          <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent'></div>
          <p className='ml-3 text-white'>Loading editor...</p>
        </div>
      }
    >
      <EditorContent />
    </Suspense>
  );
}
