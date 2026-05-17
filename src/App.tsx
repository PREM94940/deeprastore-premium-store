import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { SlideCart } from './components/SlideCart';
import { Toast } from './components/Toast';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

import { Storefront } from './components/Storefront';
import { ProductDetail } from './components/ProductDetail';
import { CollectionPage } from './components/CollectionPage';
import { FabricStore } from './components/FabricStore';
import { CustomStitching } from './components/CustomStitching';
import { CustomerAccount } from './components/CustomerAccount';
import { BlogView } from './components/BlogView';
import { AdminPanel } from './components/AdminPanel';
import { LiveEditor } from './components/LiveEditor';

import { ShieldCheck, Truck, RefreshCw, Phone, Mail, MapPin } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentView, language, setCurrentView, setSelectedCategory } = useApp();

  return (
    <div className="flex flex-col min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-amber-200 selection:text-amber-900">
      <Navbar />
      <SlideCart />
      <Toast />
      <FloatingWhatsApp />

      <main className="flex-1">
        {currentView === 'storefront' && <Storefront />}
        {currentView === 'product-detail' && <ProductDetail />}
        {currentView === 'collection' && <CollectionPage />}
        {currentView === 'fabric-store' && <FabricStore />}
        {currentView === 'stitching-studio' && <CustomStitching />}
        {currentView === 'account' && <CustomerAccount />}
        {currentView === 'checkout' && <ProductDetail /> /* Fallback or express checkout */}
        {currentView === 'blog' && <BlogView />}
        {currentView === 'admin' && <AdminPanel />}
        {currentView === 'live-editor' && <LiveEditor />}
      </main>

      {/* Premium Luxury Footer */}
      <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Top Brand & Value Props */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-stone-800">
            <div className="md:col-span-1 space-y-4">
              <h2 className="text-2xl font-serif font-bold text-white tracking-widest">
                DEEPRASTORE
              </h2>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                {language === 'te' 
                  ? 'స్వచ్ఛమైన కంచిపట్టు చీరలు, కస్టమ్ డిజైనర్ బ్లౌజులు మరియు లగ్జరీ ఫ్యాబ్రిక్స్‌తో మీ పండుగ వేడుకలను అలంకరించుకోండి.'
                  : 'Cinematic premium fashion brand offering authentic handloom Kanjivaram silks, continuous cut luxury fabrics, and bespoke custom tailoring.'}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>{language === 'te' ? '100% అసలైన పట్టు' : '100% Silk Mark Certified'}</span>
              </h3>
              <p className="text-xs text-stone-400 font-light">
                Every single masterpiece undergoes rigorous quality testing and comes with an authentic silk mark certification tag.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-500" />
                <span>{language === 'te' ? 'ఉచిత ఎక్స్‌ప్రెస్ షిప్పింగ్' : 'Complimentary Shipping'}</span>
              </h3>
              <p className="text-xs text-stone-400 font-light">
                We deliver nationwide in premium tamper-proof gift boxes. Cash on delivery (COD) available across India.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-amber-500" />
                <span>{language === 'te' ? 'సులభమైన మార్పిడి' : 'Easy 7-Day Exchange'}</span>
              </h3>
              <p className="text-xs text-stone-400 font-light">
                Hassle-free exchanges for unstitched sarees and complimentary custom fitting alterations for bespoke orders.
              </p>
            </div>
          </div>

          {/* Middle Links & Newsletter */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-stone-800 text-xs">
            
            <div className="space-y-3">
              <h4 className="font-bold text-white uppercase tracking-wider">The Curation</h4>
              <ul className="space-y-2 text-stone-400">
                <li><button onClick={() => { setSelectedCategory('sarees'); setCurrentView('collection'); }} className="hover:text-amber-400">Pure Silk Sarees</button></li>
                <li><button onClick={() => { setSelectedCategory('lehengas'); setCurrentView('collection'); }} className="hover:text-amber-400">Bridal Lehengas</button></li>
                <li><button onClick={() => { setSelectedCategory('fabrics'); setCurrentView('collection'); }} className="hover:text-amber-400">Luxury Unstitched Fabrics</button></li>
                <li><button onClick={() => { setSelectedCategory('menswear'); setCurrentView('collection'); }} className="hover:text-amber-400">Men's Royal Sherwanis</button></li>
                <li><button onClick={() => { setSelectedCategory('kurta-sets'); setCurrentView('collection'); }} className="hover:text-amber-400">Anarkali & Gowns</button></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-white uppercase tracking-wider">Bespoke Services</h4>
              <ul className="space-y-2 text-stone-400">
                <li><button onClick={() => setCurrentView('stitching-studio')} className="hover:text-amber-400">Custom Blouse Studio</button></li>
                <li><button onClick={() => setCurrentView('fabric-store')} className="hover:text-amber-400">Meter-based Pricing</button></li>
                <li><button onClick={() => setCurrentView('stitching-studio')} className="hover:text-amber-400">Measurements Upload</button></li>
                <li><button onClick={() => setCurrentView('storefront')} className="hover:text-amber-400">WhatsApp Stylist Consult</button></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-white uppercase tracking-wider">Shopify Ecosystem</h4>
              <ul className="space-y-2 text-stone-400">
                <li><button onClick={() => setCurrentView('admin')} className="hover:text-amber-400">Admin Dashboard</button></li>
                <li><button onClick={() => setCurrentView('live-editor')} className="hover:text-amber-400">Visual Page Builder</button></li>
                <li><button onClick={() => setCurrentView('admin')} className="hover:text-amber-400">AI Content Studio</button></li>
                <li><button onClick={() => setCurrentView('admin')} className="hover:text-amber-400">Sales Analytics</button></li>
              </ul>
            </div>

            <div className="col-span-2 space-y-4">
              <h4 className="font-bold text-white uppercase tracking-wider">Join The Deeprastore Club</h4>
              <p className="text-stone-400 font-light">
                Subscribe to receive early access to Sravana Masam drops, bespoke tailoring vouchers, and exclusive heritage journal articles.
              </p>
              <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully to Deeprastore Club!'); }} className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email address..." 
                  className="bg-stone-800 border border-stone-700 rounded-xl px-4 py-2 text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 flex-1 text-xs"
                  required
                />
                <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold px-6 py-2 rounded-xl uppercase tracking-wider transition-colors">
                  Subscribe
                </button>
              </form>
            </div>

          </div>

          {/* Bottom Copyright & Contact Info */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px] text-stone-500">
            <div className="flex flex-wrap items-center gap-6 justify-center sm:justify-start">
              <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-amber-500" /> +91 98490 12345</span>
              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-amber-500" /> support@deeprastore.com</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-amber-500" /> Jubilee Hills, Hyderabad, Telangana</span>
            </div>

            <p>© 2026 Deeprastore. Inspired by Shopify functionality. All rights reserved.</p>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
