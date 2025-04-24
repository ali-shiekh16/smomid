import React from 'react';
import InterviewsAndPodcasts from './InterviewsAndPodcasts';
import Articles from './Articles';
import FeaturesAndRecognitions from './FeaturesAndRecognitions';
import { db, pressItemsTable } from '../../db';
import { desc, eq } from 'drizzle-orm';

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

// Fetch press items from the database
async function getPressItems() {
  try {
    // Only fetch published items and sort by date (newest first)
    const items = await db
      .select()
      .from(pressItemsTable)
      .where(eq(pressItemsTable.published, true))
      .orderBy(desc(pressItemsTable.date));

    return items;
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
