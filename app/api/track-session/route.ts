import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

interface SessionData {
  sessionId: string;
  eventType: string;
  country: string;
  city: string;
  region: string;
  district: string;
  neighborhood: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  timezone: string;
  isp: string;
  sessionDuration: number;
  pageViews: number;
  sections: { [key: string]: number };
  scrollDepth: number;
  timeSinceLastActivity: number;
  timestamp: string;
  userAgent: string;
  referrer: string;
  url: string;
  screenResolution: string;
  viewportSize: string;
}

export async function POST(request: NextRequest) {
  console.log('📊 Ultra-precise session tracking API called');
  
  try {
    const sessionData: SessionData = await request.json();
    console.log('📥 Received ultra-precise session data:', {
      sessionId: sessionData.sessionId,
      eventType: sessionData.eventType,
      duration: sessionData.sessionDuration,
      location: `${sessionData.country} > ${sessionData.region} > ${sessionData.city} > ${sessionData.district} > ${sessionData.neighborhood}`,
      coordinates: `${sessionData.latitude}, ${sessionData.longitude}`,
      timezone: sessionData.timezone,
      isp: sessionData.isp
    });

    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'data');
    try {
      await fs.mkdir(dataDir, { recursive: true });
    } catch (error) {
      // Directory already exists
    }

    // Save to sessions file
    const sessionsFile = path.join(dataDir, 'sessions.json');
    let sessions = [];
    
    try {
      const data = await fs.readFile(sessionsFile, 'utf8');
      sessions = JSON.parse(data);
    } catch (error) {
      sessions = [];
    }

    // Get client IP safely without using headers()
    const clientIP = getClientIPSafe(request);

    // Add new session data with ultra-precise location
    const sessionEntry = {
      ...sessionData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      ip: clientIP || 'Unknown',
      // Enhanced location data
      fullLocation: `${sessionData.country}, ${sessionData.region}, ${sessionData.city}${sessionData.district !== 'Unknown' ? ', ' + sessionData.district : ''}${sessionData.neighborhood !== 'Unknown' ? ', ' + sessionData.neighborhood : ''}`,
      coordinates: sessionData.latitude && sessionData.longitude ? `${sessionData.latitude}, ${sessionData.longitude}` : null,
      precisionLevel: getPrecisionLevel(sessionData)
    };

    sessions.push(sessionEntry);

    // Keep only last 10000 session events
    if (sessions.length > 10000) {
      sessions = sessions.slice(-10000);
    }

    // Save sessions with error handling
    try {
      await fs.writeFile(sessionsFile, JSON.stringify(sessions, null, 2), 'utf8');
    } catch (writeError) {
      console.error('❌ Error writing sessions file:', writeError);
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to save session data' 
      }, { status: 500 });
    }

    // Also maintain the simple visits file for backward compatibility
    if (sessionData.eventType === 'session_start') {
      const visitsFile = path.join(dataDir, 'visits.json');
      let visits = [];
      
      try {
        const data = await fs.readFile(visitsFile, 'utf8');
        visits = JSON.parse(data);
      } catch (error) {
        visits = [];
      }

      const visitEntry = {
        id: sessionEntry.id,
        country: sessionData.country,
        countryCode: getCountryCode(sessionData.country),
        region: sessionData.region,
        city: sessionData.city,
        district: sessionData.district,
        neighborhood: sessionData.neighborhood,
        postalCode: sessionData.postalCode,
        coordinates: sessionEntry.coordinates,
        timezone: sessionData.timezone,
        isp: sessionData.isp,
        fullLocation: sessionEntry.fullLocation,
        precisionLevel: sessionEntry.precisionLevel,
        timestamp: sessionData.timestamp,
        userAgent: sessionData.userAgent,
        referrer: sessionData.referrer,
        ip: sessionEntry.ip
      };

      visits.push(visitEntry);

      if (visits.length > 5000) {
        visits = visits.slice(-5000);
      }

      try {
        await fs.writeFile(visitsFile, JSON.stringify(visits, null, 2), 'utf8');
      } catch (writeError) {
        console.error('❌ Error writing visits file:', writeError);
      }
    }

    console.log('✅ Ultra-precise session data saved successfully');
    return NextResponse.json({ 
      success: true, 
      sessionId: sessionData.sessionId,
      eventType: sessionData.eventType,
      location: sessionEntry.fullLocation,
      precisionLevel: sessionEntry.precisionLevel
    });
    
  } catch (error) {
    console.error('❌ Error in ultra-precise session tracking API:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error',
      details: error.message 
    }, { status: 500 });
  }
}

function getClientIPSafe(request: NextRequest): string | null {
  try {
    // Try to get IP from various sources without using headers()
    const forwarded = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    const cfConnectingIP = request.headers.get('cf-connecting-ip');
    
    if (forwarded) {
      return forwarded.split(',')[0].trim();
    }
    
    if (realIP) {
      return realIP;
    }
    
    if (cfConnectingIP) {
      return cfConnectingIP;
    }
    
    // Fallback to request.ip if available
    return request.ip || 'Unknown';
  } catch (error) {
    console.log('⚠️ Could not get client IP:', error.message);
    return 'Unknown';
  }
}

function getPrecisionLevel(sessionData: SessionData): string {
  let level = 'Basic';
  
  if (sessionData.country !== 'Unknown') level = 'Country';
  if (sessionData.region !== 'Unknown') level = 'Region';
  if (sessionData.city !== 'Unknown') level = 'City';
  if (sessionData.district !== 'Unknown') level = 'District';
  if (sessionData.neighborhood !== 'Unknown') level = 'Neighborhood';
  if (sessionData.latitude && sessionData.longitude) level = 'Coordinates';
  if (sessionData.postalCode !== 'Unknown') level = 'Ultra-Precise';
  
  return level;
}

function getCountryCode(countryName: string): string {
  const countryMap: { [key: string]: string } = {
    'Egypt': 'EG',
    'Saudi Arabia': 'SA',
    'United Arab Emirates': 'AE',
    'United States': 'US',
    'United Kingdom': 'GB',
    'Germany': 'DE',
    'France': 'FR',
    'Canada': 'CA',
    'Australia': 'AU',
    'India': 'IN',
    'China': 'CN',
    'Japan': 'JP',
    'Brazil': 'BR',
    'Russia': 'RU',
    'Italy': 'IT',
    'Spain': 'ES',
    'Netherlands': 'NL',
    'Turkey': 'TR',
    'Kuwait': 'KW',
    'Qatar': 'QA',
    'Bahrain': 'BH',
    'Oman': 'OM',
    'Jordan': 'JO',
    'Lebanon': 'LB',
    'Morocco': 'MA',
    'Algeria': 'DZ',
    'Tunisia': 'TN',
    'Libya': 'LY',
    'Sudan': 'SD',
    'Iraq': 'IQ',
    'Syria': 'SY',
    'Yemen': 'YE',
    'Palestine': 'PS'
  };
  
  return countryMap[countryName] || 'UN';
}