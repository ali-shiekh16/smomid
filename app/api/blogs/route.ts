import { NextRequest, NextResponse } from 'next/server';
import { db, blogPostsTable } from '../../../db';
import { eq, desc } from 'drizzle-orm';
import slugify from 'slugify';

// Create or update a blog post
export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    const {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      published,
      publishedAt,
      tags,
      readTime,
      authorId,
    } = body;

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Generate slug if not provided
    const finalSlug = slug || slugify(title, { lower: true, strict: true });

    // Insert the blog post into the database
    const result = await db
      .insert(blogPostsTable)
      .values({
        title,
        slug: finalSlug,
        excerpt,
        content,
        featuredImage,
        published: published || false,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
        createdAt: new Date(),
        updatedAt: new Date(),
        authorId: authorId || null,
        tags,
        readTime: readTime || 5,
      })
      .returning({ id: blogPostsTable.id });

    return NextResponse.json(
      {
        message: 'Blog post saved successfully',
        data: result[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving blog post:', error);
    return NextResponse.json(
      { error: 'Failed to save blog post' },
      { status: 500 }
    );
  }
}

// Get all published blog posts or drafts if specified
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const showDrafts = url.searchParams.get('drafts') === 'true';
    const slug = url.searchParams.get('slug');

    // If slug is provided, return a single blog post
    if (slug) {
      const post = await db
        .select()
        .from(blogPostsTable)
        .where(eq(blogPostsTable.slug, slug))
        .limit(1);

      if (post.length === 0) {
        return NextResponse.json(
          { error: 'Blog post not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        data: post[0],
      });
    }

    // Otherwise, return all blog posts (published only, unless drafts=true)
    let query = db.select().from(blogPostsTable);

    if (!showDrafts) {
      query = query.where(eq(blogPostsTable.published, true));
    }

    const posts = await query.orderBy(
      desc(blogPostsTable.publishedAt || blogPostsTable.createdAt)
    );

    return NextResponse.json({
      data: posts,
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}
