import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { pressItemsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items } = body;

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Items array is required' },
        { status: 400 }
      );
    }

    // Update each press item with its new order
    const updatePromises = items.map(async item => {
      const { id, order } = item;

      if (!id) {
        // Skip items without IDs
        return null;
      }

      return await db
        .update(pressItemsTable)
        .set({ order })
        .where(eq(pressItemsTable.id, id))
        .returning();
    });

    // Wait for all updates to complete
    const results = await Promise.all(updatePromises);

    return NextResponse.json({
      message: 'Press items order updated successfully',
      data: results.filter(Boolean).flat(),
    });
  } catch (error) {
    console.error('Error reordering press items:', error);
    return NextResponse.json(
      { error: 'Failed to reorder press items' },
      { status: 500 }
    );
  }
}
