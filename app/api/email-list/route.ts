import { NextResponse } from 'next/server';
import { db } from '@/db';
import { emailListTable } from '@/db/schema';
import { eq } from 'drizzle-orm/expressions';

export async function GET() {
  try {
    const subscribers = await db
      .select()
      .from(emailListTable)
      .orderBy(emailListTable.subscribedAt);

    return NextResponse.json({
      success: true,
      data: subscribers,
    });
  } catch (error) {
    console.error('Error fetching email list:', error);
    return NextResponse.json(
      { error: 'Failed to fetch email list' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Check if email already exists - using proper db query syntax
    const existingSubscribers = await db
      .select()
      .from(emailListTable)
      .where(eq(emailListTable.email, email));

    const existingSubscriber =
      existingSubscribers.length > 0 ? existingSubscribers[0] : null;

    if (existingSubscriber) {
      // Update the existing subscriber's info
      const result = await db
        .update(emailListTable)
        .set({
          name,
          isActive: true,
          unsubscribedAt: null,
        })
        .where(eq(emailListTable.email, email))
        .returning();

      return NextResponse.json({
        success: true,
        message: 'Email subscription updated successfully',
        data: result[0],
      });
    }

    // Insert new subscriber with fields that match the schema
    const result = await db
      .insert(emailListTable)
      .values({
        name,
        email,
        source: 'contact_page',
        isActive: true,
      })
      .returning();

    return NextResponse.json(
      {
        success: true,
        message: 'Email subscription added successfully',
        data: result[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding to email list:', error);
    return NextResponse.json(
      { error: 'Failed to add to email list' },
      { status: 500 }
    );
  }
}
