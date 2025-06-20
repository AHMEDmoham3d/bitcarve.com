import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  console.log('📊 Admin visits API called');
  
  try {
    const dataDir = path.join(process.cwd(), 'data');
    const visitsFile = path.join(dataDir, 'visits.json');
    
    let visits = [];
    
    try {
      const data = await fs.readFile(visitsFile, 'utf8');
      visits = JSON.parse(data);
      console.log('📖 Loaded visits for admin:', visits.length);
    } catch (error) {
      console.log('📄 No visits file found, returning empty data');
      visits = [];
    }

    // Group visits by country
    const visitsByCountry = visits.reduce((acc: any, visit: any) => {
      const country = visit.country || 'Unknown';
      if (!acc[country]) {
        acc[country] = {
          country,
          countryCode: visit.countryCode || 'UN',
          count: 0,
          cities: {},
          recentVisits: []
        };
      }
      acc[country].count++;
      
      // Track cities
      const city = visit.city || 'Unknown';
      if (!acc[country].cities[city]) {
        acc[country].cities[city] = 0;
      }
      acc[country].cities[city]++;
      
      // Keep recent visits (last 10 per country)
      if (acc[country].recentVisits.length < 10) {
        acc[country].recentVisits.push({
          timestamp: visit.timestamp,
          city: visit.city,
          referrer: visit.referrer
        });
      }
      
      return acc;
    }, {});

    // Convert to array and sort by count
    const countryStats = Object.values(visitsByCountry).sort((a: any, b: any) => b.count - a.count);

    // Calculate total visits
    const totalVisits = visits.length;

    // Get visits from last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentVisits = visits.filter((visit: any) => 
      new Date(visit.timestamp) > thirtyDaysAgo
    ).length;

    // Get visits from last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const weeklyVisits = visits.filter((visit: any) => 
      new Date(visit.timestamp) > sevenDaysAgo
    ).length;

    const result = {
      totalVisits,
      recentVisits,
      weeklyVisits,
      countryStats,
      rawVisits: visits.slice(-100).reverse() // Last 100 visits for detailed view, newest first
    };

    console.log('📊 Admin visits stats:', {
      totalVisits: result.totalVisits,
      countries: result.countryStats.length,
      recentVisits: result.recentVisits
    });

    return NextResponse.json(result);
    
  } catch (error) {
    console.error('❌ Error fetching admin visits:', error);
    return NextResponse.json({
      error: 'Internal server error',
      totalVisits: 0,
      recentVisits: 0,
      weeklyVisits: 0,
      countryStats: [],
      rawVisits: []
    }, { status: 500 });
  }
}