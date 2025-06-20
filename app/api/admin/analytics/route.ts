import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  console.log('📈 Ultra-precise admin analytics API called');

  try {
    const dataDir = path.join(process.cwd(), 'data');
    const sessionsFile = path.join(dataDir, 'sessions.json');

    let sessions = [];

    try {
      const data = await fs.readFile(sessionsFile, 'utf8');
      sessions = JSON.parse(data);
    } catch (error) {
      console.log('📄 No sessions file found, returning empty data');
      sessions = [];
    }

    const analytics = processUltraPreciseAnalytics(sessions);

    console.log('📊 Ultra-precise analytics processed:', {
      totalSessions: analytics.totalSessions,
      uniqueVisitors: analytics.uniqueVisitors,
      avgSessionDuration: analytics.avgSessionDuration,
      precisionLevels: analytics.precisionStats
    });

    return NextResponse.json(analytics);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Error fetching ultra-precise analytics:', errorMessage);

    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      details: errorMessage,
      totalSessions: 0,
      uniqueVisitors: 0,
      avgSessionDuration: 0,
      topCountries: [],
      topRegions: [],
      topCities: [],
      topDistricts: [],
      topSections: [],
      recentSessions: [],
      hourlyStats: [],
      deviceStats: { desktop: 0, mobile: 0, tablet: 0 },
      precisionStats: {}
    }, { status: 500 });
  }
}

function processUltraPreciseAnalytics(sessions: any[]) {
  const sessionStarts = sessions.filter(s => s.eventType === 'session_start');
  const sessionEnds = sessions.filter(s => s.eventType === 'session_end');
  const sessionUpdates = sessions.filter(s => s.eventType === 'session_update');

  const totalSessions = sessionStarts.length;
  const uniqueVisitors = new Set(sessionStarts.map(s => s.ip)).size;

  const completedSessions = sessionEnds.map(end => {
    const start = sessionStarts.find(s => s.sessionId === end.sessionId);
    return start ? end.sessionDuration : 0;
  }).filter(duration => duration > 0);

  const avgSessionDuration = completedSessions.length > 0 
    ? Math.round(completedSessions.reduce((a, b) => a + b, 0) / completedSessions.length)
    : 0;

  const countryCount: Record<string, number> = {};
  const regionCount: Record<string, number> = {};
  const cityCount: Record<string, number> = {};
  const districtCount: Record<string, number> = {};
  const ispCount: Record<string, number> = {};
  const timezoneCount: Record<string, number> = {};
  const sectionCount: Record<string, number> = {};
  const precisionStats: Record<string, number> = {};

  sessionStarts.forEach(session => {
    const country = session.country || 'Unknown';
    countryCount[country] = (countryCount[country] || 0) + 1;

    if (session.region && session.region !== 'Unknown') {
      const key = `${session.region}, ${session.country}`;
      regionCount[key] = (regionCount[key] || 0) + 1;
    }

    if (session.city && session.city !== 'Unknown') {
      const key = `${session.city}, ${session.region || session.country}`;
      cityCount[key] = (cityCount[key] || 0) + 1;
    }

    if (session.district && session.district !== 'Unknown') {
      const key = `${session.district}, ${session.city}`;
      districtCount[key] = (districtCount[key] || 0) + 1;
    }

    if (session.isp && session.isp !== 'Unknown') {
      ispCount[session.isp] = (ispCount[session.isp] || 0) + 1;
    }

    if (session.timezone && session.timezone !== 'Unknown') {
      timezoneCount[session.timezone] = (timezoneCount[session.timezone] || 0) + 1;
    }

    const level = session.precisionLevel || 'Basic';
    precisionStats[level] = (precisionStats[level] || 0) + 1;
  });

  [...sessionStarts, ...sessionUpdates, ...sessionEnds].forEach(session => {
    if (session.sections && typeof session.sections === 'object') {
      const sections = session.sections as Record<string, number>;
      Object.entries(sections).forEach(([section, views]) => {
        sectionCount[section] = (sectionCount[section] || 0) + views;
      });
    }
  });

  const topCountries = Object.entries(countryCount)
    .map(([country, count]) => ({
      country,
      count,
      countryCode: getCountryCode(country),
      percentage: Math.round((count / totalSessions) * 100),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const topRegions = Object.entries(regionCount)
    .map(([region, count]) => ({ region, count, percentage: Math.round((count / totalSessions) * 100) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const topCities = Object.entries(cityCount)
    .map(([city, count]) => ({ city, count, percentage: Math.round((count / totalSessions) * 100) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const topDistricts = Object.entries(districtCount)
    .map(([district, count]) => ({ district, count, percentage: Math.round((count / totalSessions) * 100) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const topISPs = Object.entries(ispCount)
    .map(([isp, count]) => ({ isp, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const topTimezones = Object.entries(timezoneCount)
    .map(([timezone, count]) => ({ timezone, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const topSections = Object.entries(sectionCount)
    .map(([section, views]) => ({ section, views }))
    .sort((a, b) => b.views - a.views);

  const recentSessions = sessionStarts
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 50)
    .map(session => {
      const endSession = sessionEnds.find(s => s.sessionId === session.sessionId);
      return {
        ...session,
        duration: endSession ? endSession.sessionDuration : 0,
        isActive: !endSession,
        fullLocation: session.fullLocation || `${session.country}, ${session.city}`,
        precisionLevel: session.precisionLevel || 'Basic',
        coordinates: session.coordinates
      };
    });

  const now = new Date();
  const hourlyStats = [];
  for (let i = 23; i >= 0; i--) {
    const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hourStart = new Date(hour.getFullYear(), hour.getMonth(), hour.getDate(), hour.getHours());
    const hourEnd = new Date(hourStart.getTime() + 60 * 60 * 1000);

    const sessionsInHour = sessionStarts.filter(session => {
      const sessionTime = new Date(session.timestamp);
      return sessionTime >= hourStart && sessionTime < hourEnd;
    }).length;

    hourlyStats.push({
      hour: hour.getHours(),
      sessions: sessionsInHour,
      label: `${hour.getHours()}:00`
    });
  }

  const deviceStats = { desktop: 0, mobile: 0, tablet: 0 };
  sessionStarts.forEach(session => {
    const ua = session.userAgent?.toLowerCase() || '';
    if (ua.includes('mobile') && !ua.includes('tablet')) {
      deviceStats.mobile++;
    } else if (ua.includes('tablet') || ua.includes('ipad')) {
      deviceStats.tablet++;
    } else {
      deviceStats.desktop++;
    }
  });

  const shortSessions = completedSessions.filter(duration => duration < 30).length;
  const bounceRate = completedSessions.length > 0 
    ? Math.round((shortSessions / completedSessions.length) * 100)
    : 0;

  return {
    totalSessions,
    uniqueVisitors,
    avgSessionDuration,
    bounceRate,
    topCountries,
    topRegions,
    topCities,
    topDistricts,
    topISPs,
    topTimezones,
    topSections,
    recentSessions,
    hourlyStats,
    deviceStats,
    precisionStats,
    totalPageViews: sessionStarts.reduce((sum, s) => sum + (s.pageViews || 1), 0),
    avgScrollDepth: Math.round(
      sessionStarts.reduce((sum, s) => sum + (s.scrollDepth || 0), 0) / Math.max(sessionStarts.length, 1)
    ),
    coordinateData: sessionStarts
      .filter(s => s.latitude && s.longitude)
      .map(s => ({
        lat: s.latitude,
        lng: s.longitude,
        location: s.fullLocation || `${s.city}, ${s.country}`,
        timestamp: s.timestamp
      }))
  };
}

function getCountryCode(countryName: string): string {
  const countryMap: Record<string, string> = {
    'Egypt': 'EG', 'Saudi Arabia': 'SA', 'United Arab Emirates': 'AE', 'United States': 'US',
    'United Kingdom': 'GB', 'Germany': 'DE', 'France': 'FR', 'Canada': 'CA', 'Australia': 'AU',
    'India': 'IN', 'China': 'CN', 'Japan': 'JP', 'Brazil': 'BR', 'Russia': 'RU', 'Italy': 'IT',
    'Spain': 'ES', 'Netherlands': 'NL', 'Turkey': 'TR', 'Kuwait': 'KW', 'Qatar': 'QA', 'Bahrain': 'BH',
    'Oman': 'OM', 'Jordan': 'JO', 'Lebanon': 'LB', 'Morocco': 'MA', 'Algeria': 'DZ', 'Tunisia': 'TN',
    'Libya': 'LY', 'Sudan': 'SD', 'Iraq': 'IQ', 'Syria': 'SY', 'Yemen': 'YE', 'Palestine': 'PS'
  };
  return countryMap[countryName] || 'UN';
}