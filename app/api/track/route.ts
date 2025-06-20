import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  console.log('🎯 Track API called');
  
  try {
    const body = await request.json();
    console.log('📥 Received tracking data:', body);
    
    const { country, countryCode, city, timestamp, userAgent, referrer } = body;

    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'data');
    console.log('📁 Data directory path:', dataDir);
    
    try {
      await fs.mkdir(dataDir, { recursive: true });
      console.log('✅ Data directory ensured');
    } catch (dirError) {
      console.log('📁 Directory already exists or created');
    }

    // Create visit entry with unique ID
    const visitEntry = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      country: country || 'Unknown',
      countryCode: countryCode || 'UN',
      city: city || 'Unknown',
      timestamp: timestamp || new Date().toISOString(),
      userAgent: userAgent || 'Unknown',
      referrer: referrer || 'Direct',
      ip: request.ip || 'Unknown'
    };

    console.log('📝 Created visit entry:', visitEntry);

    // Read existing visits
    const visitsFile = path.join(dataDir, 'visits.json');
    console.log('📄 Visits file path:', visitsFile);
    
    let visits = [];
    
    try {
      const data = await fs.readFile(visitsFile, 'utf8');
      visits = JSON.parse(data);
      console.log('📖 Loaded existing visits:', visits.length);
    } catch (error) {
      console.log('📄 No existing visits file, starting fresh');
      visits = [];
    }

    // Add new visit
    visits.push(visitEntry);
    console.log('➕ Added new visit, total visits:', visits.length);

    // Keep only last 5000 visits to prevent file from growing too large
    if (visits.length > 5000) {
      visits = visits.slice(-5000);
      console.log('✂️ Trimmed visits to last 5000');
    }

    // Save visits with proper error handling
    try {
      await fs.writeFile(visitsFile, JSON.stringify(visits, null, 2), 'utf8');
      console.log('💾 Successfully saved visits to file');
    } catch (writeError) {
      console.error('❌ Error writing visits file:', writeError);
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to save visit data',
        details: writeError.message 
      }, { status: 500 });
    }

    console.log('✅ Visit tracking completed successfully');
    return NextResponse.json({ 
      success: true, 
      id: visitEntry.id,
      totalVisits: visits.length 
    });
    
  } catch (error) {
    console.error('❌ Error in track API:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error',
      details: error.message 
    }, { status: 500 });
  }
}