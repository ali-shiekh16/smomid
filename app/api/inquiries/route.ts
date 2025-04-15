import { NextResponse } from 'next/server';
import { db } from '@/db';
import { inquiriesTable } from '@/db/schema';

export async function GET() {
  try {
    const inquiries = await db
      .select()
      .from(inquiriesTable)
      .orderBy(inquiriesTable.createdAt);

    return NextResponse.json({
      success: true,
      data: inquiries,
    });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, contact, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Insert data into inquiries table with proper field names
    const result = await db
      .insert(inquiriesTable)
      .values({
        name,
        email,
        phone: contact, // Map 'contact' from form to 'phone' in the database
        message,
        inquiryType: 'corporate', // Default to corporate since this is from the corporate form
        subject: 'Website Inquiry', // Default subject
      })
      .returning();

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry submitted successfully',
        data: result[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}
