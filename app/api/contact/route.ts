import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, whatsapp, message } = body;

    // Validate required fields
    if (!name || !email || !whatsapp || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'data');
    try {
      await fs.mkdir(dataDir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }

    // Create contact entry
    const contactEntry = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      whatsapp: whatsapp.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
      read: false
    };

    // Read existing contacts
    const contactsFile = path.join(dataDir, 'contacts.json');
    let contacts = [];
    
    try {
      const data = await fs.readFile(contactsFile, 'utf8');
      contacts = JSON.parse(data);
    } catch (error) {
      // File doesn't exist yet, start with empty array
      contacts = [];
    }

    // Add new contact
    contacts.push(contactEntry);

    // Save contacts with proper error handling
    try {
      await fs.writeFile(contactsFile, JSON.stringify(contacts, null, 2), 'utf8');
    } catch (writeError) {
      console.error('Error writing contacts file:', writeError);
      return NextResponse.json(
        { error: 'Failed to save contact information' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Contact form submitted successfully',
      id: contactEntry.id 
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}