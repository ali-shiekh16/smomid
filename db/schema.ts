import {
  integer,
  pgTable,
  varchar,
  text,
  boolean,
  timestamp,
  serial,
} from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

// Test table for tasks
export const tasksTable = pgTable('tasks', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
  completed: boolean().default(false).notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  userId: integer().references(() => usersTable.id),
});

// Blog posts table
export const blogPostsTable = pgTable('blog_posts', {
  id: serial('id').primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).notNull().unique(),
  excerpt: text(),
  content: text().notNull(),
  featuredImage: varchar({ length: 255 }),
  published: boolean().default(false).notNull(),
  publishedAt: timestamp(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
  authorId: integer().references(() => usersTable.id),
  tags: text().array(),
  readTime: integer(),
});

// Events table
export const eventsTable = pgTable('events', {
  id: serial('id').primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).notNull().unique(),
  location: text().notNull(),
  address: text().notNull(),
  description: text(),
  flyerImage: varchar({ length: 255 }),
  eventDate: timestamp(),
  published: boolean().default(false).notNull(),
  publishedAt: timestamp(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
  authorId: integer().references(() => usersTable.id),
});

// Press items table
export const pressItemsTable = pgTable('press_items', {
  id: serial('id').primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  subtitle: varchar({ length: 255 }).notNull(),
  text: text(),
  image: varchar({ length: 255 }).notNull(),
  date: varchar({ length: 50 }),
  btnText: varchar({ length: 100 }).default('Link').notNull(),
  link: varchar({ length: 255 }),
  itemType: varchar({ length: 50 }).default('podcast').notNull(), // 'podcast', 'article', 'feature', etc.
  published: boolean().default(false).notNull(),
  publishedAt: timestamp(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
  authorId: integer().references(() => usersTable.id),
});

// Form submissions table
export const formSubmissionsTable = pgTable('form_submissions', {
  id: serial('id').primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  subject: varchar({ length: 255 }),
  message: text().notNull(),
  phone: varchar({ length: 20 }),
  formType: varchar({ length: 50 }).default('contact').notNull(), // 'contact', 'fan', 'corporate', etc.
  status: varchar({ length: 20 }).default('unread').notNull(), // 'unread', 'read', 'responded'
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

// Inquiries table
export const inquiriesTable = pgTable('inquiries', {
  id: serial('id').primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 20 }),
  subject: varchar({ length: 255 }),
  message: text().notNull(),
  inquiryType: varchar({ length: 50 }).default('general').notNull(), // 'general', 'corporate', 'performance', etc.
  status: varchar({ length: 20 }).default('pending').notNull(), // 'pending', 'in-progress', 'completed'
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

// Email list subscribers table
export const emailListTable = pgTable('email_list', {
  id: serial('id').primaryKey(),
  email: varchar({ length: 255 }).notNull().unique(),
  name: varchar({ length: 255 }),
  source: varchar({ length: 100 }), // Where they subscribed from
  preferences: text().array(), // Array of content preferences
  isActive: boolean().default(true).notNull(),
  subscribedAt: timestamp().defaultNow().notNull(),
  unsubscribedAt: timestamp(),
  lastEmailSentAt: timestamp(),
});
