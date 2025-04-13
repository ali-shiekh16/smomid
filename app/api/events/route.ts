import { NextRequest, NextResponse } from 'next/server';
import { db, eventsTable } from '@/db';
import { eq, desc, asc, and } from 'drizzle-orm';
import slugify from 'slugify';

// GET events
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Get specific event by slug
    const slug = searchParams.get('slug');
    if (slug) {
      const event = await db
        .select()
        .from(eventsTable)
        .where(eq(eventsTable.slug, slug))
        .limit(1);

      if (event.length === 0) {
        return NextResponse.json({ error: 'Event not found' }, { status: 404 });
      }

      return NextResponse.json({ data: event[0] });
    }

    // Get event by ID
    const id = searchParams.get('id');
    if (id && !isNaN(parseInt(id))) {
      const event = await db
        .select()
        .from(eventsTable)
        .where(eq(eventsTable.id, parseInt(id)))
        .limit(1);

      if (event.length === 0) {
        return NextResponse.json({ error: 'Event not found' }, { status: 404 });
      }

      return NextResponse.json({ data: event[0] });
    }

    // List events with optional filters
    const showDrafts = searchParams.get('drafts') === 'true';
    const orderBy = searchParams.get('orderBy') || 'eventDate';
    const order = searchParams.get('order') || 'desc';

    let query = db.select().from(eventsTable);

    // Filter by published status if drafts are not requested
    if (!showDrafts) {
      //  @ts-ignore
      query = query.where(eq(eventsTable.published, true));
    }

    // Sort by the specified field and order
    if (orderBy === 'eventDate') {
      //  @ts-ignore
      query = query.orderBy(
        order === 'desc'
          ? desc(eventsTable.eventDate)
          : asc(eventsTable.eventDate)
      );
    } else if (orderBy === 'title') {
      //  @ts-ignore
      query = query.orderBy(
        order === 'desc' ? desc(eventsTable.title) : asc(eventsTable.title)
      );
    } else if (orderBy === 'createdAt') {
      //  @ts-ignore
      query = query.orderBy(
        order === 'desc'
          ? desc(eventsTable.createdAt)
          : asc(eventsTable.createdAt)
      );
    } else {
      // Default ordering by updatedAt if no valid orderBy parameter is provided
      //  @ts-ignore
      query = query.orderBy(desc(eventsTable.updatedAt));
    }

    const events = await query;
    return NextResponse.json({ data: events });
  } catch (error) {
    console.error('Error getting events:', error);
    return NextResponse.json(
      { error: 'Failed to get events' },
      { status: 500 }
    );
  }
}

// Create or update an event
export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    const {
      id,
      title,
      slug,
      location,
      address,
      description,
      flyerImage,
      eventDate,
      published,
      publishedAt,
      authorId,
    } = body;

    // Validate required fields
    if (!title || !location || !address) {
      return NextResponse.json(
        { error: 'Title, location, and address are required' },
        { status: 400 }
      );
    }

    // Generate slug if not provided
    const finalSlug = slug || slugify(title, { lower: true, strict: true });

    // Check if this is an update (id is provided) or a new event
    if (id) {
      // It's an update
      const updatedEvent = await db
        .update(eventsTable)
        .set({
          title,
          slug: finalSlug,
          location,
          address,
          description,
          flyerImage,
          eventDate: eventDate ? new Date(eventDate) : null,
          published: published || false,
          publishedAt: publishedAt ? new Date(publishedAt) : null,
          updatedAt: new Date(),
          authorId: authorId || null,
        })
        .where(eq(eventsTable.id, id))
        .returning();

      if (updatedEvent.length === 0) {
        return NextResponse.json({ error: 'Event not found' }, { status: 404 });
      }

      return NextResponse.json({
        message: 'Event updated successfully',
        data: updatedEvent[0],
      });
    } else {
      // It's a new event
      const result = await db
        .insert(eventsTable)
        .values({
          title,
          slug: finalSlug,
          location,
          address,
          description,
          flyerImage,
          eventDate: eventDate ? new Date(eventDate) : null,
          published: published || false,
          publishedAt: publishedAt ? new Date(publishedAt) : null,
          createdAt: new Date(),
          updatedAt: new Date(),
          authorId: authorId || null,
        })
        .returning({ id: eventsTable.id });

      return NextResponse.json(
        {
          message: 'Event saved successfully',
          data: result[0],
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error('Error saving event:', error);
    return NextResponse.json(
      { error: 'Failed to save event' },
      { status: 500 }
    );
  }
}

// Delete an event
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid event ID is required' },
        { status: 400 }
      );
    }

    const eventId = parseInt(id);
    const deletedEvent = await db
      .delete(eventsTable)
      .where(eq(eventsTable.id, eventId))
      .returning({ id: eventsTable.id });

    if (deletedEvent.length === 0) {
      return NextResponse.json(
        { error: 'Event not found or already deleted' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Event deleted successfully',
      data: deletedEvent[0],
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    );
  }
}
