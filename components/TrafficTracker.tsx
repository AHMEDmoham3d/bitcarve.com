'use client';

import { useEffect, useRef } from 'react';

export default function TrafficTracker() {
  const hasTracked = useRef(false);

  useEffect(() => {
    // Prevent multiple tracking calls
    if (hasTracked.current) return;
    hasTracked.current = true;

    const trackVisit = async () => {
      try {
        console.log('🔍 Starting visit tracking...');
        
        // Get user's location information with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

        let locationData = {
          country_name: 'Unknown',
          country_code: 'UN',
          city: 'Unknown'
        };

        try {
          console.log('📍 Fetching location data...');
          const response = await fetch('https://ipapi.co/json/', {
            signal: controller.signal
          });
          clearTimeout(timeoutId);

          if (response.ok) {
            locationData = await response.json();
            console.log('✅ Location data received:', locationData);
          } else {
            console.log('⚠️ Location API returned error status:', response.status);
          }
        } catch (locationError) {
          console.log('⚠️ Location API failed, using fallback data');
          clearTimeout(timeoutId);
        }
        
        // Prepare tracking data
        const trackingData = {
          country: locationData.country_name || 'Unknown',
          countryCode: locationData.country_code || 'UN',
          city: locationData.city || 'Unknown',
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer || 'Direct',
        };

        console.log('📊 Sending tracking data:', trackingData);

        // Send tracking data to our API
        const trackResponse = await fetch('/api/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(trackingData),
        });

        const trackResult = await trackResponse.json();
        
        if (trackResponse.ok && trackResult.success) {
          console.log('✅ Visit tracked successfully:', trackResult);
        } else {
          console.error('❌ Failed to track visit:', trackResult);
        }

      } catch (error) {
        console.error('❌ Visit tracking error:', error);
        
        // Try to track with minimal data if everything fails
        try {
          console.log('🔄 Attempting fallback tracking...');
          const fallbackResponse = await fetch('/api/track', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              country: 'Unknown',
              countryCode: 'UN',
              city: 'Unknown',
              timestamp: new Date().toISOString(),
              userAgent: navigator.userAgent || 'Unknown',
              referrer: document.referrer || 'Direct',
            }),
          });

          const fallbackResult = await fallbackResponse.json();
          if (fallbackResponse.ok && fallbackResult.success) {
            console.log('✅ Fallback tracking successful');
          } else {
            console.error('❌ Fallback tracking failed:', fallbackResult);
          }
        } catch (fallbackError) {
          console.error('❌ Even fallback tracking failed:', fallbackError);
        }
      }
    };

    // Start tracking after a short delay to not block page load
    const timer = setTimeout(trackVisit, 2000);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return null; // This component doesn't render anything
}