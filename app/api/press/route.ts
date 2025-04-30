import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { pressItemsTable } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

// GET handler - get all press items or a specific one
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const drafts = searchParams.get('drafts') === 'true';

    if (id) {
      // Get a specific press item by id
      const pressItem = await db
        .select()
        .from(pressItemsTable)
        .where(eq(pressItemsTable.id, parseInt(id)))
        .limit(1);

      if (pressItem.length === 0) {
        return NextResponse.json(
          { error: 'Press item not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        data: pressItem[0],
      });
    }

    let query = db.select().from(pressItemsTable);

    // If drafts param is not true, only show published items
    if (!drafts) {
      query = query.where(eq(pressItemsTable.published, true));
    }

    // Order by order field first, then by date DESC and createdAt DESC as fallbacks
    query = query.orderBy(
      pressItemsTable.order,
      desc(pressItemsTable.date),
      desc(pressItemsTable.createdAt)
    );

    const pressItems = await query;

    return NextResponse.json({
      data: pressItems,
    });
  } catch (error) {
    console.error('Error fetching press items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch press items' },
      { status: 500 }
    );
  }
}

// POST handler - create or update a press item
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      id,
      title,
      subtitle,
      text,
      image,
      date,
      btnText,
      link,
      itemType,
      published,
      publishedAt,
      authorId,
      order,
    } = body;

    // Validate required fields
    if (!title || !subtitle || !image) {
      return NextResponse.json(
        { error: 'Title, subtitle, and image are required' },
        { status: 400 }
      );
    }

    // Check if this is an update (id is provided) or a new item
    if (id) {
      // It's an update
      const updatedItem = await db
        .update(pressItemsTable)
        .set({
          title,
          subtitle,
          text: text || null,
          image,
          date: date || null,
          btnText: btnText || 'Link',
          link: link || '#',
          itemType: itemType || 'podcast',
          published: published || false,
          publishedAt: publishedAt ? new Date(publishedAt) : null,
          updatedAt: new Date(),
          order: order !== undefined ? order : 0,
        })
        .where(eq(pressItemsTable.id, id))
        .returning();

      if (updatedItem.length === 0) {
        return NextResponse.json(
          { error: 'Press item not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        message: 'Press item updated successfully',
        data: updatedItem[0],
      });
    } else {
      // It's a new item
      // Get the highest order value to place new items at the end
      const highestOrderItem = await db
        .select({ maxOrder: pressItemsTable.order })
        .from(pressItemsTable)
        .orderBy(desc(pressItemsTable.order))
        .limit(1);

      const nextOrder =
        highestOrderItem.length > 0
          ? (highestOrderItem[0].maxOrder || 0) + 1
          : 0;

      const result = await db
        .insert(pressItemsTable)
        .values({
          title,
          subtitle,
          text: text || null,
          image,
          date: date || null,
          btnText: btnText || 'Link',
          link: link || '#',
          itemType: itemType || 'podcast',
          published: published || false,
          publishedAt: publishedAt ? new Date(publishedAt) : null,
          createdAt: new Date(),
          updatedAt: new Date(),
          authorId: authorId || null,
          order: nextOrder,
        })
        .returning();

      return NextResponse.json(
        {
          message: 'Press item saved successfully',
          data: result[0],
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error('Error saving press item:', error);
    return NextResponse.json(
      { error: 'Failed to save press item' },
      { status: 500 }
    );
  }
}

// DELETE handler - delete a press item
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Press item ID is required' },
        { status: 400 }
      );
    }

    const pressItemId = parseInt(id);
    const deletedItem = await db
      .delete(pressItemsTable)
      .where(eq(pressItemsTable.id, pressItemId))
      .returning({ id: pressItemsTable.id });

    if (deletedItem.length === 0) {
      return NextResponse.json(
        { error: 'Press item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Press item deleted successfully',
      data: { id: pressItemId },
    });
  } catch (error) {
    console.error('Error deleting press item:', error);
    return NextResponse.json(
      { error: 'Failed to delete press item' },
      { status: 500 }
    );
  }
}

// PATCH handler - update the order of multiple press items
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { items } = body;

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Items array is required' },
        { status: 400 }
      );
    }

    // Update each item's order in a transaction
    const result = await db.transaction(async tx => {
      const updates = [];

      for (const item of items) {
        if (!item.id || typeof item.order !== 'number') {
          throw new Error('Each item must have id and order properties');
        }

        const update = await tx
          .update(pressItemsTable)
          .set({
            order: item.order,
            updatedAt: new Date(),
          })
          .where(eq(pressItemsTable.id, item.id))
          .returning({ id: pressItemsTable.id, order: pressItemsTable.order });

        updates.push(update[0]);
      }

      return updates;
    });

    return NextResponse.json({
      message: 'Press items order updated successfully',
      data: result,
    });
  } catch (error) {
    console.error('Error updating press items order:', error);
    return NextResponse.json(
      { error: 'Failed to update press items order' },
      { status: 500 }
    );
  }
}
