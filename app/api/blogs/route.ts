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
      id, // Include id for updates
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

    // Check if this is an update (id is provided) or a new post
    if (id) {
      // It's an update
      const updatedPost = await db
        .update(blogPostsTable)
        .set({
          title,
          slug: finalSlug,
          excerpt,
          content,
          featuredImage,
          published: published || false,
          publishedAt: publishedAt ? new Date(publishedAt) : null,
          updatedAt: new Date(),
          authorId: authorId || null,
          tags,
          readTime: readTime || 5,
        })
        .where(eq(blogPostsTable.id, id))
        .returning();

      if (updatedPost.length === 0) {
        return NextResponse.json(
          { error: 'Blog post not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        message: 'Blog post updated successfully',
        data: updatedPost[0],
      });
    } else {
      // It's a new post
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
    }
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

    // Fix for incompatible types - ensure proper query chaining
    if (!showDrafts) {
      // Using a more explicit assignment to fix type issues
      const filteredQuery = query.where(eq(blogPostsTable.published, true));
      // @ts-ignore
      query = filteredQuery;
    }

    // Order by updatedAt in descending order (newest first)
    const posts = await query.orderBy(desc(blogPostsTable.updatedAt));

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

// Delete a blog post
export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Blog post ID is required' },
        { status: 400 }
      );
    }

    const deletedPost = await db
      .delete(blogPostsTable)
      .where(eq(blogPostsTable.id, parseInt(id)))
      .returning({ id: blogPostsTable.id });

    if (deletedPost.length === 0) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Blog post deleted successfully',
      data: deletedPost[0],
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
