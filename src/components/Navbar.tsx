import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Settings, 
  Layout, 
  Scissors, 
  Layers, 
  BookOpen, 
  Search, 
  Globe, 
  Menu, 
  X 
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentView, setCurrentView, 
    cart, wishlist, 
    setIsCartOpen, 
    language, setLanguage,
    setSelectedCategory
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { id: 'storefront', label: language === 'te' ? 'హోమ్' : 'Storefront' },
    { id: 'collection', label: language === 'te' ? 'కలెక్షన్స్' : 'Collections', action: () => setSelectedCategory('all') },
    { id: 'fabric-store', label: language === 'te' ? 'ఫ్యాబ్రిక్స్' : 'Fabric Store', icon: Layers },
    { id: 'stitching-studio', label: language === 'te' ? 'కస్టమ్ స్టిచ్చింగ్' : 'Custom Stitching', icon: Scissors },
    { id: 'blog', label: language === 'te' ? 'బ్లాగ్' : 'Journal', icon: BookOpen },
    { id: 'admin', label: language === 'te' ? 'అడ్మిన్ ప్యానెల్' : 'Shopify Admin', icon: Settings },
    { id: 'live-editor', label: language === 'te' ? 'లైవ్ ఎడిటర్' : 'Live Editor', icon: Layout },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSelectedCategory('all');
      setCurrentView('collection');
      // Pass search query via global state or filter if needed
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all duration-300 shadow-sm">
      {/* Top Announcement Bar */}
      <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4 text-center font-medium tracking-wider flex items-center justify-center gap-6 overflow-x-auto">
        <span>✨ {language === 'te' ? 'స్వచ్ఛమైన కంచిపట్టు & బనారసి చీరలు' : 'PREMIUM KANJIVARAM & BANARASI SILKS'}</span>
        <span className="hidden md:inline">|</span>
        <span className="hidden md:inline">🚚 {language === 'te' ? 'దేశవ్యాప్తంగా ఉచిత షిప్పింగ్' : 'FREE EXPRESS SHIPPING NATIONWIDE'}</span>
        <span className="hidden md:inline">|</span>
        <span>✂️ {language === 'te' ? 'కస్టమ్ స్టిచ్చింగ్ అందుబాటులో ఉంది' : 'BESPOKE TAILORING AVAILABLE'}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-stone-700 hover:text-stone-900 p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Luxury Brand Logo */}
          <div className="flex-shrink-0 flex items-center">
            <button 
              onClick={() => setCurrentView('storefront')} 
              className="text-2xl sm:text-3xl font-bold font-serif tracking-widest text-stone-900 flex items-center gap-2"
            >
              DEEPRASTORE
              <span className="text-xs uppercase tracking-normal bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-sans font-semibold border border-amber-300">
                LUXURY
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.action) item.action();
                    setCurrentView(item.id);
                  }}
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors py-2 border-b-2 ${
                    isActive 
                      ? 'border-amber-700 text-amber-900 font-semibold' 
                      : 'border-transparent text-stone-600 hover:text-stone-950 hover:border-stone-300'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons (Search, Lang, Wishlist, Account, Cart) */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder={language === 'te' ? 'శోధించండి...' : 'Search silks, fabrics...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 lg:w-64 bg-stone-100 text-xs text-stone-800 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-700/50 border border-stone-200"
              />
              <button type="submit" className="absolute right-3 text-stone-500 hover:text-stone-900">
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}
              className="flex items-center gap-1 text-xs font-semibold bg-stone-100 hover:bg-stone-200 px-2.5 py-1.5 rounded-lg border border-stone-300 transition-colors text-stone-800"
              title="Toggle Language (English / Telugu)"
            >
              <Globe className="w-3.5 h-3.5 text-amber-700" />
              <span>{language === 'en' ? 'తెలుగు' : 'English'}</span>
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => setCurrentView('account')}
              className="relative p-2 text-stone-700 hover:text-amber-800 transition-colors"
              title="Wishlist"
            >
              <Heart className="w-6 h-6" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-amber-700 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Customer Account */}
            <button
              onClick={() => setCurrentView('account')}
              className="p-2 text-stone-700 hover:text-amber-800 transition-colors hidden sm:block"
              title="Customer Account"
            >
              <User className="w-6 h-6" />
            </button>

            {/* Cart Drawer Toggle */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 bg-stone-900 hover:bg-stone-800 text-white rounded-full transition-transform active:scale-95 shadow-md flex items-center justify-center"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-stone-950 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow">
                  {cartCount}
                </span>
              )}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 py-4 animate-fade-in shadow-xl">
          <form onSubmit={handleSearch} className="flex items-center relative mb-4">
            <input
              type="text"
              placeholder={language === 'te' ? 'శోధించండి...' : 'Search silks, fabrics...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-100 text-sm text-stone-800 px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none"
            />
            <button type="submit" className="absolute right-3 text-stone-500">
              <Search className="w-4 h-4" />
            </button>
          </form>

          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.action) item.action();
                    setCurrentView(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-left text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-amber-50 text-amber-900 border border-amber-200 font-semibold' 
                      : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4 text-amber-700" />}
                  {item.label}
                </button>
              );
            })}
            <button
              onClick={() => {
                setCurrentView('account');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-left text-sm font-medium bg-stone-50 text-stone-700 hover:bg-stone-100"
            >
              <User className="w-4 h-4 text-amber-700" />
              {language === 'te' ? 'నా ఖాతా' : 'My Account'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
