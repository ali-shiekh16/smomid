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
