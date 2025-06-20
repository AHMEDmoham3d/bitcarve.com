'use client';

import { useEffect, useRef, useState } from 'react';

interface SessionData {
  sessionId: string;
  startTime: number;
  lastActivity: number;
  pageViews: number;
  sections: { [key: string]: number };
  scrollDepth: number;
  country?: string;
  city?: string;
  region?: string;
  district?: string;
  neighborhood?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  isp?: string;
}

interface LocationData {
  country_name?: string;
  country_code?: string;
  region?: string;
  region_code?: string;
  city?: string;
  district?: string;
  postal?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  org?: string;
  asn?: string;
  // Additional fields from different APIs
  subdivision?: string;
  subdivision_2?: string;
  county?: string;
  neighbourhood?: string;
  state?: string;
  state_district?: string;
}

export default function AdvancedTracker() {
  const sessionRef = useRef<SessionData | null>(null);
  const hasInitialized = useRef(false);
  const activityTimer = useRef<NodeJS.Timeout | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    initializeSession();
    setupEventListeners();
    startPeriodicUpdates();

    return () => {
      if (activityTimer.current) {
        clearInterval(activityTimer.current);
      }
      endSession();
    };
  }, []);

  const generateSessionId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const getUltraPreciseLocation = async (): Promise<LocationData> => {
    console.log('🎯 Starting ultra-precise location detection...');
    
    const locationAPIs = [
      {
        name: 'ipapi.co',
        url: 'https://ipapi.co/json/',
        timeout: 8000,
        parser: (data: any) => ({
          country_name: data.country_name,
          country_code: data.country_code,
          region: data.region,
          region_code: data.region_code,
          city: data.city,
          district: data.district,
          postal: data.postal,
          latitude: data.latitude,
          longitude: data.longitude,
          timezone: data.timezone,
          org: data.org,
          asn: data.asn
        })
      },
      {
        name: 'ip-api.com',
        url: 'http://ip-api.com/json/?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,isp,org,as,query',
        timeout: 8000,
        parser: (data: any) => ({
          country_name: data.country,
          country_code: data.countryCode,
          region: data.regionName,
          region_code: data.region,
          city: data.city,
          district: data.district,
          postal: data.zip,
          latitude: data.lat,
          longitude: data.lon,
          timezone: data.timezone,
          org: data.org,
          asn: data.as
        })
      },
      {
        name: 'ipgeolocation.io',
        url: 'https://api.ipgeolocation.io/ipgeo?apiKey=free',
        timeout: 8000,
        parser: (data: any) => ({
          country_name: data.country_name,
          country_code: data.country_code2,
          region: data.state_prov,
          city: data.city,
          district: data.district,
          postal: data.zipcode,
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude),
          timezone: data.time_zone?.name,
          org: data.organization,
          asn: data.asn
        })
      }
    ];

    let bestLocationData: LocationData = {
      country_name: 'Unknown',
      country_code: 'UN',
      city: 'Unknown'
    };

    // Try multiple APIs for maximum precision
    for (const api of locationAPIs) {
      try {
        console.log(`🌍 Trying ${api.name} for location data...`);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), api.timeout);

        const response = await fetch(api.url, {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (compatible; LocationTracker/1.0)'
          }
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          const parsedData = api.parser(data);
          
          console.log(`✅ ${api.name} response:`, parsedData);
          
          // Merge data, preferring more detailed information
          if (parsedData.country_name && parsedData.country_name !== 'Unknown') {
            bestLocationData.country_name = parsedData.country_name;
          }
          if (parsedData.country_code && parsedData.country_code !== 'UN') {
            bestLocationData.country_code = parsedData.country_code;
          }
          if (parsedData.region) {
            bestLocationData.region = parsedData.region;
          }
          if (parsedData.city && parsedData.city !== 'Unknown') {
            bestLocationData.city = parsedData.city;
          }
          if (parsedData.district) {
            bestLocationData.district = parsedData.district;
          }
          if (parsedData.postal) {
            bestLocationData.postal = parsedData.postal;
          }
          if (parsedData.latitude) {
            bestLocationData.latitude = parsedData.latitude;
          }
          if (parsedData.longitude) {
            bestLocationData.longitude = parsedData.longitude;
          }
          if (parsedData.timezone) {
            bestLocationData.timezone = parsedData.timezone;
          }
          if (parsedData.org) {
            bestLocationData.org = parsedData.org;
          }

          // If we got detailed location data, try reverse geocoding for even more precision
          if (parsedData.latitude && parsedData.longitude) {
            try {
              console.log('🎯 Attempting reverse geocoding for ultra-precision...');
              const reverseGeoUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${parsedData.latitude}&longitude=${parsedData.longitude}&localityLanguage=en`;
              
              const geoController = new AbortController();
              const geoTimeoutId = setTimeout(() => geoController.abort(), 5000);
              
              const geoResponse = await fetch(reverseGeoUrl, {
                signal: geoController.signal
              });
              
              clearTimeout(geoTimeoutId);
              
              if (geoResponse.ok) {
                const geoData = await geoResponse.json();
                console.log('🎯 Reverse geocoding data:', geoData);
                
                if (geoData.locality) bestLocationData.city = geoData.locality;
                if (geoData.principalSubdivision) bestLocationData.region = geoData.principalSubdivision;
                if (geoData.principalSubdivisionCode) bestLocationData.region_code = geoData.principalSubdivisionCode;
                if (geoData.city) bestLocationData.city = geoData.city;
                if (geoData.countryName) bestLocationData.country_name = geoData.countryName;
                if (geoData.countryCode) bestLocationData.country_code = geoData.countryCode;
                if (geoData.postcode) bestLocationData.postal = geoData.postcode;
                
                // Ultra-precise location details
                if (geoData.localityInfo) {
                  const info = geoData.localityInfo;
                  if (info.administrative) {
                    bestLocationData.subdivision = info.administrative[0]?.name;
                    bestLocationData.subdivision_2 = info.administrative[1]?.name;
                  }
                }
              }
            } catch (geoError) {
              console.log('⚠️ Reverse geocoding failed, continuing with IP data');
            }
          }

          break; // Use the first successful API
        }
      } catch (error) {
        console.log(`⚠️ ${api.name} failed:`, error.message);
        continue;
      }
    }

    // Try one more ultra-precise API if we have coordinates
    if (bestLocationData.latitude && bestLocationData.longitude) {
      try {
        console.log('🎯 Final precision attempt with OpenStreetMap...');
        const osmUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${bestLocationData.latitude}&lon=${bestLocationData.longitude}&zoom=18&addressdetails=1`;
        
        const osmController = new AbortController();
        const osmTimeoutId = setTimeout(() => osmController.abort(), 5000);
        
        const osmResponse = await fetch(osmUrl, {
          signal: osmController.signal,
          headers: {
            'User-Agent': 'LocationTracker/1.0'
          }
        });
        
        clearTimeout(osmTimeoutId);
        
        if (osmResponse.ok) {
          const osmData = await osmResponse.json();
          console.log('🎯 OpenStreetMap ultra-precise data:', osmData);
          
          if (osmData.address) {
            const addr = osmData.address;
            if (addr.neighbourhood) bestLocationData.neighbourhood = addr.neighbourhood;
            if (addr.suburb) bestLocationData.district = addr.suburb;
            if (addr.city_district) bestLocationData.district = addr.city_district;
            if (addr.county) bestLocationData.county = addr.county;
            if (addr.state) bestLocationData.region = addr.state;
            if (addr.state_district) bestLocationData.state_district = addr.state_district;
            if (addr.postcode) bestLocationData.postal = addr.postcode;
          }
        }
      } catch (osmError) {
        console.log('⚠️ OpenStreetMap failed, using existing data');
      }
    }

    console.log('🎯 Final ultra-precise location data:', bestLocationData);
    return bestLocationData;
  };

  const initializeSession = async () => {
    console.log('🚀 Initializing ultra-precise session tracking...');
    
    const sessionId = generateSessionId();
    const startTime = Date.now();
    
    sessionRef.current = {
      sessionId,
      startTime,
      lastActivity: startTime,
      pageViews: 1,
      sections: {},
      scrollDepth: 0
    };

    // Get ultra-precise location data
    try {
      const locationData = await getUltraPreciseLocation();
      
      if (sessionRef.current) {
        sessionRef.current.country = locationData.country_name;
        sessionRef.current.city = locationData.city;
        sessionRef.current.region = locationData.region;
        sessionRef.current.district = locationData.district || locationData.neighbourhood || locationData.county;
        sessionRef.current.neighborhood = locationData.neighbourhood;
        sessionRef.current.postalCode = locationData.postal;
        sessionRef.current.latitude = locationData.latitude;
        sessionRef.current.longitude = locationData.longitude;
        sessionRef.current.timezone = locationData.timezone;
        sessionRef.current.isp = locationData.org;
      }
      
      console.log('📍 Ultra-precise location set:', {
        country: locationData.country_name,
        region: locationData.region,
        city: locationData.city,
        district: locationData.district,
        neighborhood: locationData.neighbourhood,
        coordinates: `${locationData.latitude}, ${locationData.longitude}`
      });
    } catch (error) {
      console.log('⚠️ Location detection failed, using fallback');
    }

    // Send initial session data
    await sendSessionData('session_start');
  };

  const setupEventListeners = () => {
    // Track scroll depth
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      if (sessionRef.current && scrollPercent > sessionRef.current.scrollDepth) {
        sessionRef.current.scrollDepth = scrollPercent;
        updateActivity();
      }

      // Track which sections are in view
      trackVisibleSections();
    };

    // Track mouse movement and clicks
    const handleActivity = () => {
      updateActivity();
    };

    // Track page visibility
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
      if (!document.hidden) {
        updateActivity();
      }
    };

    // Track page unload
    const handleBeforeUnload = () => {
      endSession();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleActivity, { passive: true });
    window.addEventListener('click', handleActivity);
    window.addEventListener('keydown', handleActivity);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Initial section tracking
    setTimeout(trackVisibleSections, 1000);
  };

  const trackVisibleSections = () => {
    if (!sessionRef.current) return;

    const sections = ['hero', 'services', 'about', 'contact'];
    const viewportHeight = window.innerHeight;
    
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < viewportHeight && rect.bottom > 0;
        
        if (isVisible) {
          if (!sessionRef.current!.sections[sectionId]) {
            sessionRef.current!.sections[sectionId] = 0;
          }
          sessionRef.current!.sections[sectionId] += 1;
        }
      }
    });
  };

  const updateActivity = () => {
    if (sessionRef.current) {
      sessionRef.current.lastActivity = Date.now();
    }
  };

  const startPeriodicUpdates = () => {
    activityTimer.current = setInterval(async () => {
      if (sessionRef.current && isVisible) {
        await sendSessionData('session_update');
      }
    }, 10000); // Update every 10 seconds
  };

  const sendSessionData = async (eventType: string) => {
    if (!sessionRef.current) return;

    const sessionDuration = Date.now() - sessionRef.current.startTime;
    const timeSinceLastActivity = Date.now() - sessionRef.current.lastActivity;

    const data = {
      sessionId: sessionRef.current.sessionId,
      eventType,
      country: sessionRef.current.country || 'Unknown',
      city: sessionRef.current.city || 'Unknown',
      region: sessionRef.current.region || 'Unknown',
      district: sessionRef.current.district || 'Unknown',
      neighborhood: sessionRef.current.neighborhood || 'Unknown',
      postalCode: sessionRef.current.postalCode || 'Unknown',
      latitude: sessionRef.current.latitude || 0,
      longitude: sessionRef.current.longitude || 0,
      timezone: sessionRef.current.timezone || 'Unknown',
      isp: sessionRef.current.isp || 'Unknown',
      sessionDuration: Math.round(sessionDuration / 1000), // in seconds
      pageViews: sessionRef.current.pageViews,
      sections: sessionRef.current.sections,
      scrollDepth: sessionRef.current.scrollDepth,
      timeSinceLastActivity: Math.round(timeSinceLastActivity / 1000),
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer || 'Direct',
      url: window.location.href,
      screenResolution: `${screen.width}x${screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`
    };

    try {
      const response = await fetch('/api/track-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          console.log(`✅ ${eventType} tracked successfully with ultra-precise location`);
        } else {
          console.error(`❌ Failed to track ${eventType}:`, result.error);
        }
      } else {
        console.error(`❌ Failed to track ${eventType}: HTTP ${response.status}`);
      }
    } catch (error) {
      console.error(`❌ Error tracking ${eventType}:`, error);
    }
  };

  const endSession = async () => {
    if (sessionRef.current) {
      await sendSessionData('session_end');
      sessionRef.current = null;
    }
  };

  return null;
}