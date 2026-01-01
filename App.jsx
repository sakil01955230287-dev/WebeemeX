import React, { useState, useMemo, useEffect } from 'react';
import { Search, Star, Download, ArrowLeft, Home, Gamepad, Film, Music, Book, Menu, X, Plus, Edit2, Trash2, Settings, LogOut, Upload, User, Package, BarChart, Users, Shield, Bell, ShoppingBag, Cloud, Cpu, Battery, Wifi, Globe, TrendingUp } from 'lucide-react';

const PlayStoreClone = () => {
  // Authentication & Admin State
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminId, setAdminId] = useState('');
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    profilePic: null
  });

  // App State
  const [currentView, setCurrentView] = useState('home');
  const [selectedApp, setSelectedApp] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [installedApps, setInstalledApps] = useState(new Set());
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [wishlist, setWishlist] = useState(new Set());
  
  // Admin Management State
  const [showAddApp, setShowAddApp] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [appStatistics, setAppStatistics] = useState({
    totalDownloads: 0,
    totalApps: 0,
    activeUsers: 0,
    totalRevenue: 0
  });
  
  // Apps Data with enhanced structure
  const [apps, setApps] = useState([
    {
      id: 1,
      name: 'Instagram',
      developer: 'Meta Platforms',
      category: 'social',
      rating: 4.5,
      downloads: '5B+',
      size: '45 MB',
      icon: '📷',
      bannerColor: '#E4405F',
      price: 'Free',
      inAppPurchases: true,
      ads: true,
      description: 'Create and share photos, stories, and videos with the people you love.',
      screenshots: ['📱', '📱', '📱'],
      version: '285.0.0.21.98',
      updated: 'Dec 15, 2024',
      ageRating: '12+',
      permissions: ['Camera', 'Storage', 'Location', 'Microphone'],
      reviews: [
        { user: 'Alex', rating: 5, comment: 'Great for staying connected!' },
        { user: 'Sam', rating: 4, comment: 'Needs more features' }
      ],
      apkFile: null,
      apkFileName: '',
      uploadDate: '2024-12-15',
      featured: true,
      trending: true
    },
    {
      id: 2,
      name: 'Spotify',
      developer: 'Spotify AB',
      category: 'music',
      rating: 4.4,
      downloads: '1B+',
      size: '98 MB',
      icon: '🎵',
      bannerColor: '#1DB954',
      price: 'Free',
      inAppPurchases: true,
      ads: true,
      description: 'Play millions of songs and podcasts on your device.',
      screenshots: ['📱', '📱', '📱'],
      version: '8.8.52.488',
      updated: 'Dec 20, 2024',
      ageRating: 'E',
      permissions: ['Storage', 'Media'],
      reviews: [
        { user: 'Taylor', rating: 5, comment: 'Best music app!' },
        { user: 'Jordan', rating: 4, comment: 'Great selection' }
      ],
      apkFile: null,
      apkFileName: '',
      uploadDate: '2024-12-20',
      featured: true,
      trending: false
    },
    {
      id: 3,
      name: 'Call of Duty Mobile',
      developer: 'Activision',
      category: 'games',
      rating: 4.3,
      downloads: '500M+',
      size: '1.8 GB',
      icon: '🎮',
      bannerColor: '#000000',
      price: 'Free',
      inAppPurchases: true,
      ads: false,
      description: 'Experience the thrill of Call of Duty in this all-new mobile FPS game.',
      screenshots: ['📱', '📱', '📱'],
      version: '1.0.44',
      updated: 'Dec 18, 2024',
      ageRating: '16+',
      permissions: ['Storage', 'Microphone', 'Camera'],
      reviews: [
        { user: 'Mike', rating: 5, comment: 'Amazing graphics!' },
        { user: 'Chris', rating: 4, comment: 'Addictive gameplay' }
      ],
      apkFile: null,
      apkFileName: '',
      uploadDate: '2024-12-18',
      featured: true,
      trending: true
    },
    {
      id: 4,
      name: 'Netflix',
      developer: 'Netflix, Inc.',
      category: 'entertainment',
      rating: 4.2,
      downloads: '1B+',
      size: '125 MB',
      icon: '🎬',
      bannerColor: '#E50914',
      price: 'Free to Install',
      inAppPurchases: true,
      ads: false,
      description: 'Watch TV shows and movies recommended just for you.',
      screenshots: ['📱', '📱', '📱'],
      version: '8.88.0',
      updated: 'Dec 22, 2024',
      ageRating: '16+',
      permissions: ['Storage', 'Network'],
      reviews: [
        { user: 'Emma', rating: 5, comment: 'Best streaming service!' },
        { user: 'David', rating: 4, comment: 'Great content' }
      ],
      apkFile: null,
      apkFileName: '',
      uploadDate: '2024-12-22',
      featured: true,
      trending: false
    },
    {
      id: 5,
      name: 'Minecraft',
      developer: 'Mojang Studios',
      category: 'games',
      rating: 4.6,
      downloads: '300M+',
      size: '650 MB',
      icon: '⛏️',
      bannerColor: '#5C913B',
      price: '$6.99',
      inAppPurchases: true,
      ads: false,
      description: 'Explore infinite worlds and build everything from simple homes to grand castles.',
      screenshots: ['📱', '📱', '📱'],
      version: '1.20.50',
      updated: 'Dec 10, 2024',
      ageRating: 'E10+',
      permissions: ['Storage'],
      reviews: [
        { user: 'Liam', rating: 5, comment: 'Classic game!' },
        { user: 'Sophia', rating: 5, comment: 'Creative and fun' }
      ],
      apkFile: null,
      apkFileName: '',
      uploadDate: '2024-12-10',
      featured: false,
      trending: true
    },
    {
      id: 6,
      name: 'YouTube Music',
      developer: 'Google LLC',
      category: 'music',
      rating: 4.1,
      downloads: '500M+',
      size: '42 MB',
      icon: '🎼',
      bannerColor: '#FF0000',
      price: 'Free',
      inAppPurchases: true,
      ads: true,
      description: 'A new music streaming service from YouTube.',
      screenshots: ['📱', '📱', '📱'],
      version: '6.33.52',
      updated: 'Dec 19, 2024',
      ageRating: 'E',
      permissions: ['Storage', 'Media'],
      reviews: [
        { user: 'Olivia', rating: 4, comment: 'Good music selection' },
        { user: 'Noah', rating: 3, comment: 'Needs improvements' }
      ],
      apkFile: null,
      apkFileName: '',
      uploadDate: '2024-12-19',
      featured: false,
      trending: false
    },
    {
      id: 7,
      name: 'Kindle',
      developer: 'Amazon Mobile LLC',
      category: 'books',
      rating: 4.5,
      downloads: '100M+',
      size: '85 MB',
      icon: '📚',
      bannerColor: '#F4CA64',
      price: 'Free',
      inAppPurchases: true,
      ads: false,
      description: 'Read books, magazines, newspapers, textbooks and more.',
      screenshots: ['📱', '📱', '📱'],
      version: '8.79.1.0',
      updated: 'Dec 12, 2024',
      ageRating: 'E',
      permissions: ['Storage'],
      reviews: [
        { user: 'Ava', rating: 5, comment: 'Perfect for book lovers!' },
        { user: 'James', rating: 4, comment: 'Great reading app' }
      ],
      apkFile: null,
      apkFileName: '',
      uploadDate: '2024-12-12',
      featured: false,
      trending: false
    },
    {
      id: 8,
      name: 'PUBG Mobile',
      developer: 'Krafton',
      category: 'games',
      rating: 4.1,
      downloads: '1B+',
      size: '2.1 GB',
      icon: '🔫',
      bannerColor: '#FF9900',
      price: 'Free',
      inAppPurchases: true,
      ads: false,
      description: 'The official PUBG designed exclusively for mobile.',
      screenshots: ['📱', '📱', '📱'],
      version: '2.9.0',
      updated: 'Dec 21, 2024',
      ageRating: '16+',
      permissions: ['Storage', 'Microphone', 'Camera', 'Location'],
      reviews: [
        { user: 'Logan', rating: 5, comment: 'Best battle royale!' },
        { user: 'Mia', rating: 4, comment: 'Addictive gameplay' }
      ],
      apkFile: null,
      apkFileName: '',
      uploadDate: '2024-12-21',
      featured: true,
      trending: true
    },
  ]);

  // New App Form State
  const [newApp, setNewApp] = useState({
    name: '',
    developer: '',
    category: 'games',
    rating: 4.0,
    downloads: '0',
    size: '',
    icon: '',
    bannerColor: '#3B82F6',
    price: 'Free',
    inAppPurchases: false,
    ads: false,
    description: '',
    screenshots: ['', '', ''],
    version: '',
    updated: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    ageRating: 'E',
    permissions: [],
    reviews: [],
    apkFile: null,
    apkFileName: '',
    uploadDate: new Date().toISOString().split('T')[0],
    featured: false,
    trending: false
  });

  // Enhanced Categories
  const categories = [
    { id: 'all', name: 'For You', icon: Home, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { id: 'games', name: 'Games', icon: Gamepad, color: 'bg-gradient-to-r from-green-500 to-teal-500' },
    { id: 'social', name: 'Social', icon: Users, color: 'bg-gradient-to-r from-blue-500 to-indigo-500' },
    { id: 'entertainment', name: 'Entertainment', icon: Film, color: 'bg-gradient-to-r from-red-500 to-orange-500' },
    { id: 'music', name: 'Music', icon: Music, color: 'bg-gradient-to-r from-yellow-500 to-red-500' },
    { id: 'books', name: 'Books', icon: Book, color: 'bg-gradient-to-r from-indigo-500 to-purple-500' },
    { id: 'tools', name: 'Tools', icon: Settings, color: 'bg-gradient-to-r from-gray-700 to-gray-900' },
    { id: 'shopping', name: 'Shopping', icon: ShoppingBag, color: 'bg-gradient-to-r from-pink-500 to-rose-500' }
  ];

  // Filter Apps with enhanced filtering
  const filteredApps = useMemo(() => {
    let result = apps;
    
    if (selectedCategory !== 'all') {
      result = result.filter(app => app.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(app => 
        app.name.toLowerCase().includes(query) ||
        app.developer.toLowerCase().includes(query) ||
        app.description.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [apps, selectedCategory, searchQuery]);

  // Featured & Trending Apps
  const featuredApps = useMemo(() => apps.filter(app => app.featured), [apps]);
  const trendingApps = useMemo(() => apps.filter(app => app.trending), [apps]);

  // Initialize Statistics
  useEffect(() => {
    const totalDownloads = apps.reduce((sum, app) => {
      const downloads = parseInt(app.downloads) || 0;
      return sum + downloads;
    }, 0);
    
    setAppStatistics({
      totalDownloads: totalDownloads,
      totalApps: apps.length,
      activeUsers: Math.floor(totalDownloads * 0.3),
      totalRevenue: Math.floor(totalDownloads * 2.5)
    });
  }, [apps]);

  // Handle Admin Login
  const handleAdminLogin = (e) => {
    if (e) e.preventDefault();
    const trimmedId = adminId.trim();
    const trimmedPass = passcode.trim();
    
    if (trimmedId === 'Admin' && trimmedPass === 'admin123') {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setLoginError('');
      setAdminId('');
      setPasscode('');
      // Initialize admin session
      localStorage.setItem('adminSession', 'active');
    } else {
      setLoginError('Invalid credentials. Try: Admin / admin123');
    }
  };

  // Handle Admin Logout
  const handleAdminLogout = () => {
    setIsAdmin(false);
    setCurrentView('home');
    localStorage.removeItem('adminSession');
  };

  // Handle Install/Uninstall
  const handleInstall = (appId) => {
    setInstalledApps(prev => new Set([...prev, appId]));
    // Add to recently viewed
    const app = apps.find(a => a.id === appId);
    if (app) {
      setRecentlyViewed(prev => [app, ...prev.slice(0, 4)]);
    }
  };

  const handleUninstall = (appId) => {
    setInstalledApps(prev => {
      const newSet = new Set(prev);
      newSet.delete(appId);
      return newSet;
    });
  };

  // Handle Wishlist
  const handleToggleWishlist = (appId) => {
    setWishlist(prev => {
      const newSet = new Set(prev);
      if (newSet.has(appId)) {
        newSet.delete(appId);
      } else {
        newSet.add(appId);
      }
      return newSet;
    });
  };

  // Add New App
  const handleAddApp = () => {
    const app = {
      ...newApp,
      id: Date.now(),
      rating: parseFloat(newApp.rating),
      downloads: newApp.downloads.includes('+') ? newApp.downloads : `${newApp.downloads}+`
    };
    setApps([...apps, app]);
    setShowAddApp(false);
    resetNewApp();
    // Update statistics
    setAppStatistics(prev => ({
      ...prev,
      totalApps: prev.totalApps + 1
    }));
  };

  // Update App
  const handleUpdateApp = () => {
    setApps(apps.map(app => app.id === editingApp.id ? editingApp : app));
    setEditingApp(null);
  };

  // Delete App
  const handleDeleteApp = (appId) => {
    if (window.confirm('Are you sure you want to delete this app?')) {
      setApps(apps.filter(app => app.id !== appId));
      // Update statistics
      setAppStatistics(prev => ({
        ...prev,
        totalApps: prev.totalApps - 1
      }));
    }
  };

  // Reset New App Form
  const resetNewApp = () => {
    setNewApp({
      name: '',
      developer: '',
      category: 'games',
      rating: 4.0,
      downloads: '0',
      size: '',
      icon: '',
      bannerColor: '#3B82F6',
      price: 'Free',
      inAppPurchases: false,
      ads: false,
      description: '',
      screenshots: ['', '', ''],
      version: '',
      updated: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      ageRating: 'E',
      permissions: [],
      reviews: [],
      apkFile: null,
      apkFileName: '',
      uploadDate: new Date().toISOString().split('T')[0],
      featured: false,
      trending: false
    });
  };

  // Handle APK Upload
  const handleApkUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        alert('File size too large. Maximum size is 100MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        if (editingApp) {
          setEditingApp({ 
            ...editingApp, 
            apkFile: reader.result,
            apkFileName: file.name 
          });
        } else {
          setNewApp({ 
            ...newApp, 
            apkFile: reader.result,
            apkFileName: file.name 
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle APK Download
  const handleDownloadApk = (app) => {
    if (app.apkFile) {
      const link = document.createElement('a');
      link.href = app.apkFile;
      link.download = app.apkFileName || `${app.name.replace(/\s+/g, '_')}.apk`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('No APK file available for this app');
    }
  };

  // Handle Image Upload
  const handleImageUpload = (e, field, index = null) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        if (editingApp) {
          if (field === 'screenshots' && index !== null) {
            const newScreenshots = [...editingApp.screenshots];
            newScreenshots[index] = reader.result;
            setEditingApp({ ...editingApp, screenshots: newScreenshots });
          } else {
            setEditingApp({ ...editingApp, [field]: reader.result });
          }
        } else {
          if (field === 'screenshots' && index !== null) {
            const newScreenshots = [...newApp.screenshots];
            newScreenshots[index] = reader.result;
            setNewApp({ ...newApp, screenshots: newScreenshots });
          } else {
            setNewApp({ ...newApp, [field]: reader.result });
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Admin Dashboard Component
  const AdminDashboard = () => (
    <div className="p-4 pb-24">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
        <p className="text-gray-600">Manage your Play Store applications</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Apps</p>
              <p className="text-2xl font-bold">{appStatistics.totalApps}</p>
            </div>
            <Package className="w-8 h-8 opacity-80" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Downloads</p>
              <p className="text-2xl font-bold">{appStatistics.totalDownloads.toLocaleString()}</p>
            </div>
            <Download className="w-8 h-8 opacity-80" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Active Users</p>
              <p className="text-2xl font-bold">{appStatistics.activeUsers.toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 opacity-80" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Revenue</p>
              <p className="text-2xl font-bold">${appStatistics.totalRevenue.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 opacity-80" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border p-4 mb-6">
        <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => setShowAddApp(true)}
            className="p-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New App
          </button>
          <button 
            onClick={() => setCurrentView('home')}
            className="p-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            View Store
          </button>
        </div>
      </div>

      {/* Recent Apps */}
      <div className="bg-white rounded-xl border p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Recent Apps</h3>
          <span className="text-sm text-gray-500">{apps.length} total</span>
        </div>
        <div className="space-y-3">
          {apps.slice(0, 5).map(app => (
            <div key={app.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="text-3xl">
                  {app.icon.startsWith('data:') ? (
                    <img src={app.icon} alt={app.name} className="w-10 h-10 rounded-lg" />
                  ) : (
                    app.icon
                  )}
                </div>
                <div>
                  <p className="font-medium">{app.name}</p>
                  <p className="text-sm text-gray-500">{app.category}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setEditingApp({...app})}
                  className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDeleteApp(app.id)}
                  className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // App Card Component
  const AppCard = ({ app }) => (
    <div className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-shadow duration-300 relative group">
      <div 
        onClick={() => {
          setSelectedApp(app);
          setCurrentView('detail');
          // Add to recently viewed
          setRecentlyViewed(prev => [app, ...prev.filter(a => a.id !== app.id).slice(0, 3)]);
        }}
        className="cursor-pointer"
      >
        {/* App Banner */}
        <div 
          className="h-32 w-full flex items-center justify-center"
          style={{ backgroundColor: app.bannerColor }}
        >
          <div className="text-6xl">
            {app.icon.startsWith('data:') ? (
              <img src={app.icon} alt={app.name} className="w-20 h-20 rounded-2xl object-cover" />
            ) : (
              app.icon
            )}
          </div>
        </div>

        {/* App Info */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-gray-900 truncate">{app.name}</h3>
              <p className="text-sm text-gray-600 truncate">{app.developer}</p>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleToggleWishlist(app.id);
              }}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <Star className={`w-5 h-5 ${wishlist.has(app.id) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-current text-yellow-500" />
              <span className="font-medium">{app.rating}</span>
            </div>
            <div className="text-sm text-gray-500">
              {app.downloads} • {app.size}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              app.price === 'Free' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
            }`}>
              {app.price}
            </span>
            {app.inAppPurchases && (
              <span className="text-xs text-gray-500">In-app purchases</span>
            )}
          </div>
        </div>
      </div>

      {/* Install Button */}
      <div className="px-4 pb-4">
        {isAdmin ? (
          <div className="flex gap-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setEditingApp({...app});
              }}
              className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteApp(app.id);
              }}
              className="flex-1 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        ) : (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (installedApps.has(app.id)) {
                handleUninstall(app.id);
              } else {
                handleInstall(app.id);
              }
            }}
            className={`w-full py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 ${
              installedApps.has(app.id)
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {installedApps.has(app.id) ? (
              <>
                <Trash2 className="w-5 h-5" />
                Uninstall
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Install
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );

  // App Form Component
  const AppForm = ({ app, isEditing, onSave, onCancel }) => {
    const [formData, setFormData] = useState(app);
    const [activeTab, setActiveTab] = useState('basic');

    const tabs = [
      { id: 'basic', name: 'Basic Info', icon: Settings },
      { id: 'media', name: 'Media', icon: Film },
      { id: 'advanced', name: 'Advanced', icon: Shield }
    ];

    const TabContent = ({ tabId }) => {
      switch (tabId) {
        case 'basic':
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">App Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter app name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Developer *</label>
                  <input
                    type="text"
                    value={formData.developer}
                    onChange={(e) => setFormData({...formData, developer: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter developer name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    {categories.filter(c => c.id !== 'all').map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Price</label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Free or $ amount"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Rating *</label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={(e) => setFormData({...formData, rating: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Downloads</label>
                  <input
                    type="text"
                    value={formData.downloads}
                    onChange={(e) => setFormData({...formData, downloads: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="e.g., 100M+"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Size</label>
                  <input
                    type="text"
                    value={formData.size}
                    onChange={(e) => setFormData({...formData, size: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="e.g., 45 MB"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  rows="3"
                  placeholder="Enter app description"
                />
              </div>
            </div>
          );

        case 'media':
          return (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">App Icon *</label>
                <div className="flex gap-4 items-center">
                  {formData.icon && (
                    <div className="w-20 h-20 flex-shrink-0">
                      {formData.icon.startsWith('data:') ? (
                        <img src={formData.icon} alt="Icon" className="w-full h-full rounded-2xl object-cover" />
                      ) : (
                        <div className="text-5xl w-full h-full flex items-center justify-center">{formData.icon}</div>
                      )}
                    </div>
                  )}
                  <div className="flex-1">
                    <input
                      type="text"
                      value={formData.icon.startsWith('data:') ? '' : formData.icon}
                      onChange={(e) => setFormData({...formData, icon: e.target.value})}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none mb-2"
                      placeholder="Enter emoji or upload image"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'icon')}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Banner Color</label>
                <input
                  type="color"
                  value={formData.bannerColor}
                  onChange={(e) => setFormData({...formData, bannerColor: e.target.value})}
                  className="w-full h-12 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Screenshots (3 images)</label>
                <div className="grid grid-cols-3 gap-4">
                  {[0, 1, 2].map((index) => (
                    <div key={index} className="space-y-2">
                      <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                        {formData.screenshots[index] ? (
                          formData.screenshots[index].startsWith('data:') ? (
                            <img src={formData.screenshots[index]} alt={`Screenshot ${index + 1}`} className="w-full h-full object-cover" />
                          ) : (
                            <div className="text-4xl">{formData.screenshots[index]}</div>
                          )
                        ) : (
                          <div className="text-gray-400">No image</div>
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'screenshots', index)}
                        className="w-full text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );

        case 'advanced':
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Version *</label>
                  <input
                    type="text"
                    value={formData.version}
                    onChange={(e) => setFormData({...formData, version: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="e.g., 1.0.0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Age Rating</label>
                  <select
                    value={formData.ageRating}
                    onChange={(e) => setFormData({...formData, ageRating: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="E">Everyone</option>
                    <option value="E10+">Everyone 10+</option>
                    <option value="T">Teen</option>
                    <option value="M">Mature 17+</option>
                    <option value="A">Adults Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">APK File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                  {formData.apkFileName ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-3 text-blue-600">
                        <Package className="w-8 h-8" />
                        <div>
                          <p className="font-medium">{formData.apkFileName}</p>
                          <p className="text-sm text-gray-500">Ready for download</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, apkFile: null, apkFileName: ''})}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Remove APK
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-10 h-10 mx-auto text-gray-400 mb-3" />
                      <p className="text-sm text-gray-600 mb-2">Upload APK file (max 100MB)</p>
                      <p className="text-xs text-gray-500 mb-4">Users can download this APK after installation</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept=".apk,application/vnd.android.package-archive"
                    onChange={handleApkUpload}
                    className="w-full text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    className="w-5 h-5"
                  />
                  <label htmlFor="featured" className="text-sm font-medium">Featured App</label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="trending"
                    checked={formData.trending}
                    onChange={(e) => setFormData({...formData, trending: e.target.checked})}
                    className="w-5 h-5"
                  />
                  <label htmlFor="trending" className="text-sm font-medium">Trending</label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="inAppPurchases"
                    checked={formData.inAppPurchases}
                    onChange={(e) => setFormData({...formData, inAppPurchases: e.target.checked})}
                    className="w-5 h-5"
                  />
                  <label htmlFor="inAppPurchases" className="text-sm font-medium">In-app Purchases</label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="ads"
                    checked={formData.ads}
                    onChange={(e) => setFormData({...formData, ads: e.target.checked})}
                    className="w-5 h-5"
                  />
                  <label htmlFor="ads" className="text-sm font-medium">Contains Ads</label>
                </div>
              </div>
            </div>
          );

        default:
          return null;
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">{isEditing ? 'Edit App' : 'Add New App'}</h2>
              <p className="text-gray-600">Fill in the app details below</p>
            </div>
            <button 
              onClick={onCancel}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b">
            <div className="flex px-6">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <TabContent tabId={activeTab} />
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t p-6">
            <div className="flex gap-4">
              <button
                onClick={() => {
                  if (isEditing) {
                    setEditingApp(formData);
                    handleUpdateApp();
                  } else {
                    setNewApp(formData);
                    handleAddApp();
                  }
                }}
                disabled={!formData.name || !formData.developer || !formData.icon || !formData.version}
                className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {isEditing ? 'Update App' : 'Publish App'}
              </button>
              <button
                onClick={onCancel}
                className="flex-1 py-4 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Home View Component
  const HomeView = () => (
    <div className="pb-24">
      {/* Search Section */}
      <div className="px-4 pt-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search apps, games, developers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />
        </div>
      </div>

      {/* Featured Apps Carousel */}
      {featuredApps.length > 0 && (
        <div className="mt-6 px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">🔥 Featured Apps</h2>
            <button className="text-blue-600 font-medium">See all</button>
          </div>
          <div className="overflow-x-auto">
            <div className="flex gap-4 pb-4">
              {featuredApps.map(app => (
                <div 
                  key={app.id}
                  onClick={() => {
                    setSelectedApp(app);
                    setCurrentView('detail');
                  }}
                  className="flex-shrink-0 w-64 rounded-2xl overflow-hidden cursor-pointer group"
                >
                  <div 
                    className="h-40 flex items-center justify-center"
                    style={{ backgroundColor: app.bannerColor }}
                  >
                    <div className="text-7xl group-hover:scale-110 transition-transform">
                      {app.icon.startsWith('data:') ? (
                        <img src={app.icon} alt={app.name} className="w-24 h-24 rounded-2xl" />
                      ) : (
                        app.icon
                      )}
                    </div>
                  </div>
                  <div className="bg-white p-4">
                    <h3 className="font-bold text-lg">{app.name}</h3>
                    <p className="text-gray-600 text-sm">{app.developer}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        <span className="font-medium">{app.rating}</span>
                      </div>
                      <span className="text-gray-500 text-sm">{app.downloads}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Trending Now */}
      {trendingApps.length > 0 && (
        <div className="mt-6 px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">📈 Trending Now</h2>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {trendingApps.map(app => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        </div>
      )}

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <div className="mt-6 px-4">
          <h2 className="text-xl font-bold mb-4">🕒 Recently Viewed</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {recentlyViewed.map(app => (
              <div 
                key={app.id}
                onClick={() => {
                  setSelectedApp(app);
                  setCurrentView('detail');
                }}
                className="flex-shrink-0 w-32"
              >
                <div className="w-32 h-32 rounded-2xl overflow-hidden mb-2">
                  {app.icon.startsWith('data:') ? (
                    <img src={app.icon} alt={app.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl">
                      {app.icon}
                    </div>
                  )}
                </div>
                <p className="font-medium text-sm truncate">{app.name}</p>
                <p className="text-xs text-gray-500 truncate">{app.category}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Section */}
      <div className="mt-6 px-4">
        <h2 className="text-xl font-bold mb-4">📱 {selectedCategory === 'all' ? 'All Apps' : categories.find(c => c.id === selectedCategory)?.name}</h2>
        {filteredApps.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredApps.map(app => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="text-lg font-medium mb-2">No apps found</h3>
            <p className="text-gray-600">Try a different search or category</p>
          </div>
        )}
      </div>

      {/* Wishlist Section */}
      {wishlist.size > 0 && (
        <div className="mt-6 px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">⭐ My Wishlist</h2>
            <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {apps.filter(app => wishlist.has(app.id)).map(app => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Detail View Component
  const DetailView = () => {
    if (!selectedApp) return null;

    return (
      <div className="pb-24">
        {/* Back Button */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 px-4 py-3 flex items-center gap-3">
          <button 
            onClick={() => setCurrentView('home')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <span className="font-bold">App Details</span>
        </div>

        {/* App Header */}
        <div className="px-4">
          <div 
            className="rounded-2xl p-6 mb-4"
            style={{ backgroundColor: selectedApp.bannerColor }}
          >
            <div className="flex gap-6 items-start">
              <div className="text-8xl">
                {selectedApp.icon.startsWith('data:') ? (
                  <img src={selectedApp.icon} alt={selectedApp.name} className="w-32 h-32 rounded-2xl" />
                ) : (
                  selectedApp.icon
                )}
              </div>
              <div className="flex-1 text-white">
                <h1 className="text-3xl font-bold mb-2">{selectedApp.name}</h1>
                <p className="text-lg opacity-90">{selectedApp.developer}</p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold">{selectedApp.rating}</span>
                  </div>
                  <span>{selectedApp.downloads} downloads</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {!isAdmin ? (
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button 
                onClick={() => {
                  if (installedApps.has(selectedApp.id)) {
                    handleUninstall(selectedApp.id);
                  } else {
                    handleInstall(selectedApp.id);
                  }
                }}
                className={`py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-3 ${
                  installedApps.has(selectedApp.id)
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {installedApps.has(selectedApp.id) ? (
                  <>
                    <Trash2 className="w-6 h-6" />
                    Uninstall
                  </>
                ) : (
                  <>
                    <Download className="w-6 h-6" />
                    Install
                  </>
                )}
              </button>
              <button 
                onClick={() => handleToggleWishlist(selectedApp.id)}
                className={`py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-3 ${
                  wishlist.has(selectedApp.id)
                    ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Star className={`w-6 h-6 ${wishlist.has(selectedApp.id) ? 'fill-yellow-500' : ''}`} />
                {wishlist.has(selectedApp.id) ? 'In Wishlist' : 'Add to Wishlist'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button 
                onClick={() => setEditingApp({...selectedApp})}
                className="py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-3"
              >
                <Edit2 className="w-6 h-6" />
                Edit App
              </button>
              <button 
                onClick={() => {
                  handleDeleteApp(selectedApp.id);
                  setCurrentView('home');
                }}
                className="py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-3"
              >
                <Trash2 className="w-6 h-6" />
                Delete
              </button>
            </div>
          )}

          {/* Download APK Button */}
          {!isAdmin && installedApps.has(selectedApp.id) && selectedApp.apkFile && (
            <button 
              onClick={() => handleDownloadApk(selectedApp)}
              className="w-full py-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors flex items-center justify-center gap-3 mb-6"
            >
              <Package className="w-6 h-6" />
              Download APK File
            </button>
          )}

          {/* App Info Cards */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            <div className="bg-gray-50 p-3 rounded-xl text-center">
              <p className="text-sm text-gray-600">Size</p>
              <p className="font-bold">{selectedApp.size}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl text-center">
              <p className="text-sm text-gray-600">Version</p>
              <p className="font-bold">{selectedApp.version}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl text-center">
              <p className="text-sm text-gray-600">Updated</p>
              <p className="font-bold">{selectedApp.updated}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl text-center">
              <p className="text-sm text-gray-600">Age</p>
              <p className="font-bold">{selectedApp.ageRating}</p>
            </div>
          </div>

          {/* Screenshots */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-4">📸 Screenshots</h3>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {selectedApp.screenshots.map((ss, i) => (
                <div key={i} className="flex-shrink-0 w-64 h-96 rounded-2xl overflow-hidden">
                  {ss.startsWith('data:') ? (
                    <img src={ss} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-8xl">
                      {ss}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3">📝 Description</h3>
            <p className="text-gray-700 leading-relaxed">{selectedApp.description}</p>
          </div>

          {/* App Features */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3">✨ Features</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-xl ${selectedApp.inAppPurchases ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-700'}`}>
                <div className="font-medium mb-1">In-app Purchases</div>
                <div className="text-sm">{selectedApp.inAppPurchases ? 'Available' : 'Not available'}</div>
              </div>
              <div className={`p-3 rounded-xl ${selectedApp.ads ? 'bg-yellow-50 text-yellow-700' : 'bg-gray-50 text-gray-700'}`}>
                <div className="font-medium mb-1">Ads</div>
                <div className="text-sm">{selectedApp.ads ? 'Contains ads' : 'No ads'}</div>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-4">⭐ Ratings & Reviews</h3>
            <div className="flex items-center gap-6 mb-4">
              <div className="text-center">
                <div className="text-5xl font-bold">{selectedApp.rating}</div>
                <div className="flex text-yellow-500 text-2xl">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-6 h-6 ${i < Math.floor(selectedApp.rating) ? 'fill-current' : ''}`} />
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-1">Based on reviews</p>
              </div>
              <div className="flex-1 space-y-2">
                {[5,4,3,2,1].map(star => (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-sm w-4">{star}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full" 
                        style={{width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 6 : star === 2 ? 3 : 1}%`}}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Admin Login Component
  if (showAdminLogin) {
    return (
      <div className="max-w-md mx-auto bg-gradient-to-br from-gray-900 to-black min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-white/70">Manage your Play Store applications</p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-3">Admin ID</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter admin ID"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-3">Passcode</label>
              <div className="relative">
                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter passcode"
                />
              </div>
            </div>

            {loginError && (
              <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
            >
              Login to Admin Panel
            </button>

            <div className="text-center text-white/60 text-sm mt-6">
              <p className="mb-2">Test Credentials:</p>
              <p className="font-mono bg-white/10 p-3 rounded-lg">ID: Admin | Pass: admin123</p>
            </div>

            <button
              type="button"
              onClick={() => setShowAdminLogin(false)}
              className="w-full py-4 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-colors"
            >
              Back to Play Store
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative overflow-hidden">
      {/* Status Bar (Simulated) */}
      <div className="h-6 bg-black text-white text-xs flex items-center justify-between px-4">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <Cpu className="w-3 h-3" />
          <Wifi className="w-3 h-3" />
          <Battery className="w-3 h-3" />
        </div>
      </div>

      {/* Header */}
      <div className="sticky top-0 bg-white border-b z-20">
        <div className="flex items-center gap-3 p-4">
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <div className="flex-1">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Play Store
            </h1>
            <p className="text-xs text-gray-500">Discover amazing apps & games</p>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                Admin
              </span>
            )}
            <button
              onClick={() => isAdmin ? handleAdminLogout() : setShowAdminLogin(true)}
              className={`p-2 rounded-full ${isAdmin ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'hover:bg-gray-100'}`}
              title={isAdmin ? 'Logout' : 'Admin Login'}
            >
              {isAdmin ? <LogOut className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Categories Navigation */}
        <div className="px-4 pb-2">
          <div className="flex overflow-x-auto gap-2 scrollbar-hide">
            {categories.map(cat => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setCurrentView('home');
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    isActive
                      ? `${cat.color} text-white font-medium shadow-lg`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Side Menu */}
      {menuOpen && (
        <div className="absolute top-20 left-0 right-0 mx-4 bg-white rounded-2xl border shadow-2xl z-30">
          <div className="p-4">
            {/* User Profile */}
            <div className="flex items-center gap-3 p-3 mb-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                {userProfile.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold">{userProfile.name}</p>
                <p className="text-sm text-gray-500">{userProfile.email}</p>
              </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-1">
              <button 
                onClick={() => {
                  setCurrentView('home');
                  setMenuOpen(false);
                }}
                className="flex items-center gap-3 w-full p-3 hover:bg-gray-100 rounded-lg"
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </button>
              
              {wishlist.size > 0 && (
                <button 
                  onClick={() => {
                    setCurrentView('home');
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full p-3 hover:bg-gray-100 rounded-lg"
                >
                  <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  <span>My Wishlist ({wishlist.size})</span>
                </button>
              )}

              {installedApps.size > 0 && (
                <button 
                  onClick={() => {
                    setCurrentView('home');
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full p-3 hover:bg-gray-100 rounded-lg"
                >
                  <Download className="w-5 h-5" />
                  <span>My Apps ({installedApps.size})</span>
                </button>
              )}

              {isAdmin && (
                <button 
                  onClick={() => {
                    setCurrentView('home');
                    setMenuOpen(false);
                    // Admin dashboard view would be implemented
                  }}
                  className="flex items-center gap-3 w-full p-3 hover:bg-gray-100 rounded-lg"
                >
                  <BarChart className="w-5 h-5" />
                  <span>Dashboard</span>
                </button>
              )}

              <button 
                onClick={() => setShowAdminLogin(true)}
                className="flex items-center gap-3 w-full p-3 hover:bg-gray-100 rounded-lg"
              >
                <Settings className="w-5 h-5" />
                <span>Admin Login</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="overflow-y-auto h-[calc(100vh-140px)]">
        {isAdmin && currentView !== 'detail' ? (
          <AdminDashboard />
        ) : currentView === 'home' ? (
          <HomeView />
        ) : (
          <DetailView />
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t max-w-md mx-auto shadow-lg">
        <div className="flex justify-around py-3">
          {categories.slice(0, 5).map(cat => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setCurrentView('home');
                }}
                className={`flex flex-col items-center gap-1 p-2 transition-colors ${
                  isActive ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                <div className={`p-2 rounded-full ${isActive ? 'bg-blue-50' : ''}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs">{cat.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Add/Edit App Modal */}
      {(showAddApp || editingApp) && (
        <AppForm
          app={editingApp || newApp}
          isEditing={!!editingApp}
          onSave={editingApp ? handleUpdateApp : handleAddApp}
          onCancel={() => {
            setShowAddApp(false);
            setEditingApp(null);
            resetNewApp();
          }}
        />
      )}
    </div>
  );
};

export default PlayStoreClone;
