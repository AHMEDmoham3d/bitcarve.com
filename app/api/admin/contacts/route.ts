import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    const contactsFile = path.join(dataDir, 'contacts.json');
    
    let contacts = [];
    
    try {
      const data = await fs.readFile(contactsFile, 'utf8');
      contacts = JSON.parse(data);
    } catch (error) {
      // File doesn't exist yet, return empty array
      contacts = [];
    }

    // Sort by timestamp (newest first)
    contacts.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return NextResponse.json({ contacts, total: contacts.length });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Internal server error', contacts: [] },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, read } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Contact ID is required' },
        { status: 400 }
      );
    }

    const dataDir = path.join(process.cwd(), 'data');
    const contactsFile = path.join(dataDir, 'contacts.json');
    
    let contacts = [];
    
    try {
      const data = await fs.readFile(contactsFile, 'utf8');
      contacts = JSON.parse(data);
    } catch (error) {
      return NextResponse.json(
        { error: 'Contacts file not found' },
        { status: 404 }
      );
    }

    // Update the contact
    const contactIndex = contacts.findIndex((contact: any) => contact.id === id);
    if (contactIndex !== -1) {
      contacts[contactIndex].read = read;
      
      try {
        await fs.writeFile(contactsFile, JSON.stringify(contacts, null, 2), 'utf8');
        return NextResponse.json({ success: true });
      } catch (writeError) {
        console.error('Error updating contact:', writeError);
        return NextResponse.json(
          { error: 'Failed to update contact' },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}