import React from 'react';
import InterviewsAndPodcasts from './InterviewsAndPodcasts';
import Articles from './Articles';
import FeaturesAndRecognitions from './FeaturesAndRecognitions';
import { headers } from 'next/headers';

// Define the PressItem type to match your database schema
export interface PressItem {
  id: number;
  title: string;
  subtitle: string;
  text: string | null;
  image: string;
  date: string | null;
  btnText: string;
  link: string | null;
  itemType: string;
  published: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Fetch press items from the API
async function getPressItems() {
  try {
    // Get the host from headers to construct absolute URL
    const headersList = headers();
    const host = headersList.get('host') || 'localhost:3000';
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';

    // Use absolute URL to ensure API request works in server components
    const res = await fetch(`${protocol}://${host}/api/press`, {
      cache: 'no-store', // Disable cache to always get fresh data
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch press items: ${res.status}`);
    }

    const data = await res.json();
    console.log('Press items fetched:', data.data?.length || 0); // Log for debugging
    return data.data || [];
  } catch (error) {
    console.error('Failed to fetch press items:', error);
    return [];
  }
}

export default async function Press() {
  const pressItems = await getPressItems();

  // Group items by type for different sections
  const podcasts = pressItems.filter(
    item => item.itemType === 'podcast' || item.itemType === 'interview'
  );

  const articles = pressItems.filter(item => item.itemType === 'article');

  const features = pressItems.filter(
    item =>
      item.itemType === 'feature' ||
      item.itemType === 'recognition' ||
      item.itemType === 'review' ||
      item.itemType === 'other'
  );

  return (
    <>
      <InterviewsAndPodcasts pressItems={podcasts} />
      {articles.length > 0 && <Articles pressItems={articles} />}
      {features.length > 0 && <FeaturesAndRecognitions pressItems={features} />}
    </>
  );
}
