'use client';

import { useState, useEffect } from 'react';
import { Users, Globe, Mail, Phone, MessageSquare, Calendar, Eye, EyeOff, BarChart3, TrendingUp, RefreshCw, Clock, MousePointer, Smartphone, Monitor, Tablet, MapPin, Wifi, Navigation } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface Analytics {
  totalSessions: number;
  uniqueVisitors: number;
  avgSessionDuration: number;
  bounceRate: number;
  topCountries: Array<{
    country: string;
    count: number;
    countryCode: string;
    percentage: number;
  }>;
  topRegions: Array<{
    region: string;
    count: number;
    percentage: number;
  }>;
  topCities: Array<{
    city: string;
    count: number;
    percentage: number;
  }>;
  topDistricts: Array<{
    district: string;
    count: number;
    percentage: number;
  }>;
  topISPs: Array<{
    isp: string;
    count: number;
  }>;
  topTimezones: Array<{
    timezone: string;
    count: number;
  }>;
  topSections: Array<{
    section: string;
    views: number;
  }>;
  recentSessions: Array<{
    sessionId: string;
    country: string;
    city: string;
    region: string;
    district: string;
    neighborhood: string;
    fullLocation: string;
    coordinates: string;
    precisionLevel: string;
    timestamp: string;
    duration: number;
    isActive: boolean;
    scrollDepth: number;
    referrer: string;
    timezone: string;
    isp: string;
  }>;
  hourlyStats: Array<{
    hour: number;
    sessions: number;
    label: string;
  }>;
  deviceStats: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  precisionStats: {
    [key: string]: number;
  };
  totalPageViews: number;
  avgScrollDepth: number;
  coordinateData: Array<{
    lat: number;
    lng: number;
    location: string;
    timestamp: string;
  }>;
}

export default function AdminDashboard() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [activeTab, setActiveTab] = useState<'analytics' | 'contacts' | 'locations'>('analytics');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      console.log('🔄 Fetching ultra-precise admin data...');
      
      const [contactsRes, analyticsRes] = await Promise.all([
        fetch('/api/admin/contacts'),
        fetch('/api/admin/analytics')
      ]);

      const contactsData = await contactsRes.json();
      const analyticsData = await analyticsRes.json();

      console.log('📊 Received ultra-precise admin data:', {
        contacts: contactsData.contacts?.length || 0,
        totalSessions: analyticsData.totalSessions || 0,
        precisionLevels: analyticsData.precisionStats
      });

      setContacts(contactsData.contacts || []);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('❌ Error fetching ultra-precise admin data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
  };

  const toggleReadStatus = async (contactId: string, currentStatus: boolean) => {
    try {
      await fetch('/api/admin/contacts', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: contactId,
          read: !currentStatus
        }),
      });

      setContacts(contacts.map(contact => 
        contact.id === contactId 
          ? { ...contact, read: !currentStatus }
          : contact
      ));
    } catch (error) {
      console.error('Error updating contact status:', error);
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getCountryFlag = (countryCode: string) => {
    const flags: { [key: string]: string } = {
      'EG': '🇪🇬', 'SA': '🇸🇦', 'AE': '🇦🇪', 'US': '🇺🇸', 'GB': '🇬🇧',
      'DE': '🇩🇪', 'FR': '🇫🇷', 'CA': '🇨🇦', 'AU': '🇦🇺', 'IN': '🇮🇳',
      'CN': '🇨🇳', 'JP': '🇯🇵', 'BR': '🇧🇷', 'RU': '🇷🇺', 'IT': '🇮🇹',
      'ES': '🇪🇸', 'NL': '🇳🇱', 'TR': '🇹🇷', 'KW': '🇰🇼', 'QA': '🇶🇦',
      'BH': '🇧🇭', 'OM': '🇴🇲', 'JO': '🇯🇴', 'LB': '🇱🇧', 'MA': '🇲🇦',
      'DZ': '🇩🇿', 'TN': '🇹🇳', 'LY': '🇱🇾', 'SD': '🇸🇩', 'IQ': '🇮🇶',
      'SY': '🇸🇾', 'YE': '🇾🇪', 'PS': '🇵🇸'
    };
    return flags[countryCode] || '🌍';
  };

  const getPrecisionColor = (level: string) => {
    const colors: { [key: string]: string } = {
      'Basic': 'bg-gray-100 text-gray-800',
      'Country': 'bg-red-100 text-red-800',
      'Region': 'bg-orange-100 text-orange-800',
      'City': 'bg-yellow-100 text-yellow-800',
      'District': 'bg-blue-100 text-blue-800',
      'Neighborhood': 'bg-green-100 text-green-800',
      'Coordinates': 'bg-purple-100 text-purple-800',
      'Ultra-Precise': 'bg-emerald-100 text-emerald-800'
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading ultra-precise admin dashboard...</p>
        </div>
      </div>
    );
  }

  const unreadCount = contacts.filter(contact => !contact.read).length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Bitcarve Ultra-Precise Analytics</h1>
              <p className="text-slate-600">Advanced location tracking with neighborhood-level precision</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {unreadCount} Unread Messages
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Stats Overview */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-slate-600">Total Visitors</p>
                <p className="text-2xl font-bold text-slate-800">{analytics?.totalSessions || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-slate-600">Unique Visitors</p>
                <p className="text-2xl font-bold text-slate-800">{analytics?.uniqueVisitors || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-slate-600">Avg. Session</p>
                <p className="text-2xl font-bold text-slate-800">
                  {analytics ? formatDuration(analytics.avgSessionDuration) : '0s'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-slate-600">Ultra-Precise</p>
                <p className="text-2xl font-bold text-slate-800">
                  {analytics?.precisionStats?.['Ultra-Precise'] || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-slate-600">Messages</p>
                <p className="text-2xl font-bold text-slate-800">{contacts.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Precision Level Stats */}
        {analytics?.precisionStats && Object.keys(analytics.precisionStats).length > 0 && (
          <div className="bg-white rounded-lg p-6 shadow-sm border mb-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Location Precision Levels</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {Object.entries(analytics.precisionStats).map(([level, count]) => (
                <div key={level} className="text-center">
                  <div className={`px-3 py-2 rounded-lg text-sm font-medium ${getPrecisionColor(level)}`}>
                    {level}
                  </div>
                  <div className="text-lg font-bold text-slate-800 mt-2">{count}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'analytics'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <BarChart3 className="w-4 h-4 inline mr-2" />
                Ultra-Precise Analytics
              </button>
              <button
                onClick={() => setActiveTab('locations')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'locations'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <MapPin className="w-4 h-4 inline mr-2" />
                Location Details
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'contacts'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <Mail className="w-4 h-4 inline mr-2" />
                Contact Messages ({contacts.length})
              </button>
            </nav>
          </div>

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="p-6">
              {!analytics || analytics.totalSessions === 0 ? (
                <div className="text-center py-12">
                  <BarChart3 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-800 mb-2">No analytics data yet</h3>
                  <p className="text-slate-600">Ultra-precise visitor analytics will appear here once people visit your site.</p>
                  <button
                    onClick={handleRefresh}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Refresh Data
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Country Statistics */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Visitors by Country</h3>
                    <div className="grid gap-4">
                      {analytics.topCountries.map((country, index) => (
                        <div key={country.country} className="border rounded-lg p-4 bg-white">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <span className="text-lg">{getCountryFlag(country.countryCode)}</span>
                              </div>
                              <div>
                                <h4 className="font-medium text-slate-800">{country.country}</h4>
                                <p className="text-sm text-slate-600">{country.count} sessions ({country.percentage}%)</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-blue-600">{country.count}</div>
                              <div className="text-xs text-slate-500">sessions</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Sessions with Ultra-Precise Location */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Sessions (Ultra-Precise)</h3>
                    <div className="bg-white border rounded-lg overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ultra-Precise Location</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precision</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ISP</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {analytics.recentSessions.slice(0, 50).map((session, index) => (
                              <tr key={index}>
                                <td className="px-4 py-3 text-sm text-slate-700">
                                  {formatDate(session.timestamp)}
                                </td>
                                <td className="px-4 py-3 text-sm text-slate-700">
                                  <div className="max-w-xs">
                                    <div className="font-medium">{session.fullLocation}</div>
                                    {session.coordinates && (
                                      <div className="text-xs text-slate-500">{session.coordinates}</div>
                                    )}
                                    {session.timezone && (
                                      <div className="text-xs text-slate-500">{session.timezone}</div>
                                    )}
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-sm">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPrecisionColor(session.precisionLevel)}`}>
                                    {session.precisionLevel}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-sm text-slate-700">
                                  {formatDuration(session.duration)}
                                </td>
                                <td className="px-4 py-3 text-sm">
                                  {session.isActive ? (
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                      Active
                                    </span>
                                  ) : (
                                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                                      Ended
                                    </span>
                                  )}
                                </td>
                                <td className="px-4 py-3 text-sm text-slate-700">
                                  <div className="max-w-32 truncate" title={session.isp}>
                                    {session.isp || 'Unknown'}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Location Details Tab */}
          {activeTab === 'locations' && (
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Regions */}
                {analytics?.topRegions && analytics.topRegions.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Top Regions/Governorates</h3>
                    <div className="space-y-3">
                      {analytics.topRegions.map((region, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-slate-700">{region.region}</span>
                          <div className="text-right">
                            <div className="font-bold text-blue-600">{region.count}</div>
                            <div className="text-xs text-slate-500">{region.percentage}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cities */}
                {analytics?.topCities && analytics.topCities.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Top Cities</h3>
                    <div className="space-y-3">
                      {analytics.topCities.map((city, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-slate-700">{city.city}</span>
                          <div className="text-right">
                            <div className="font-bold text-green-600">{city.count}</div>
                            <div className="text-xs text-slate-500">{city.percentage}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Districts */}
                {analytics?.topDistricts && analytics.topDistricts.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Top Districts/Neighborhoods</h3>
                    <div className="space-y-3">
                      {analytics.topDistricts.map((district, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-slate-700">{district.district}</span>
                          <div className="text-right">
                            <div className="font-bold text-purple-600">{district.count}</div>
                            <div className="text-xs text-slate-500">{district.percentage}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ISPs */}
                {analytics?.topISPs && analytics.topISPs.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Top Internet Providers</h3>
                    <div className="space-y-3">
                      {analytics.topISPs.map((isp, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-slate-700">{isp.isp}</span>
                          <div className="font-bold text-orange-600">{isp.count}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Contacts Tab */}
          {activeTab === 'contacts' && (
            <div className="p-6">
              {contacts.length === 0 ? (
                <div className="text-center py-12">
                  <Mail className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-800 mb-2">No messages yet</h3>
                  <p className="text-slate-600">Contact form submissions will appear here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`border rounded-lg p-6 ${
                        contact.read ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold text-slate-800">{contact.name}</h3>
                            {!contact.read && (
                              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                                New
                              </span>
                            )}
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center text-slate-600">
                              <Mail className="w-4 h-4 mr-2" />
                              <a href={`mailto:${contact.email}`} className="hover:text-blue-600">
                                {contact.email}
                              </a>
                            </div>
                            <div className="flex items-center text-slate-600">
                              <Phone className="w-4 h-4 mr-2" />
                              <a href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`} className="hover:text-green-600\" target="_blank\" rel="noopener noreferrer">
                                {contact.whatsapp}
                              </a>
                            </div>
                          </div>
                          
                          <div className="bg-white p-4 rounded-lg border mb-4">
                            <h4 className="font-medium text-slate-800 mb-2">Message:</h4>
                            <p className="text-slate-700 leading-relaxed">{contact.message}</p>
                          </div>
                          
                          <div className="flex items-center text-sm text-slate-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(contact.timestamp)}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => toggleReadStatus(contact.id, contact.read)}
                          className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title={contact.read ? 'Mark as unread' : 'Mark as read'}
                        >
                          {contact.read ? (
                            <EyeOff className="w-5 h-5 text-slate-400" />
                          ) : (
                            <Eye className="w-5 h-5 text-blue-500" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}