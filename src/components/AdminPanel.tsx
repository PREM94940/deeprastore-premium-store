import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductManagement } from './admin/ProductManagement';
import { OrderManagement } from './admin/OrderManagement';
import { AnalyticsDashboard } from './admin/AnalyticsDashboard';
import { AiStudio } from './admin/AiStudio';
import { 
  Package, 
  ShoppingBag, 
  BarChart3, 
  Wand2, 
  Settings, 
  ShieldCheck, 
  Smartphone 
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { language } = useApp();
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'analytics' | 'ai'>('products');

  const adminTabs = [
    { id: 'products', label: language === 'te' ? 'ఉత్పత్తుల నిర్వహణ' : 'Product Management', icon: Package },
    { id: 'orders', label: language === 'te' ? 'ఆర్డర్ల నిర్వహణ' : 'Order Management', icon: ShoppingBag },
    { id: 'analytics', label: language === 'te' ? 'వ్యాపార విశ్లేషణ' : 'Analytics Dashboard', icon: BarChart3 },
    { id: 'ai', label: language === 'te' ? 'AI స్టూడియో' : 'AI Content Studio', icon: Wand2 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in pb-32 space-y-10">
      
      {/* Admin Header */}
      <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-xl space-y-4 relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase">
            <Settings className="w-4 h-4" />
            <span>{language === 'te' ? 'షాపిఫై అడ్మిన్ ప్యానెల్' : 'SHOPIFY ADMIN ECOSYSTEM'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            {language === 'te' ? 'డీప్రాస్టోర్ అడ్మిన్ ప్యానెల్' : 'Deeprastore Master Dashboard'}
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
            {language === 'te' 
              ? 'ఉత్పత్తులను జోడించండి, ఆర్డర్లను నిర్వహించండి, వ్యాపార విశ్లేషణలను చూడండి మరియు AI ద్వారా కంటెంట్‌ను రూపొందించండి.'
              : 'Complete Shopify-level backend administration. Manage inventory, process COD workflows, inspect real-time sales metrics, and utilize AI generation tools.'}
          </p>
        </div>

        {/* Security & Mobile Admin Badges */}
        <div className="relative z-10 flex flex-col sm:flex-row gap-4 text-xs font-medium text-stone-300">
          <div className="bg-stone-800/80 p-4 rounded-2xl border border-stone-700 flex items-center gap-3 backdrop-blur-md">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <p className="font-bold text-white">Secure Admin Auth</p>
              <p className="text-[10px] text-stone-400">Role-based access active</p>
            </div>
          </div>

          <div className="bg-stone-800/80 p-4 rounded-2xl border border-stone-700 flex items-center gap-3 backdrop-blur-md">
            <Smartphone className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <p className="font-bold text-white">Mobile Admin Ready</p>
              <p className="text-[10px] text-stone-400">Fully responsive UI</p>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex border-b border-stone-200 overflow-x-auto gap-4 sm:gap-8">
        {adminTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${
                activeTab === tab.id ? 'border-stone-900 text-stone-950 font-black' : 'border-transparent text-stone-400 hover:text-stone-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="pt-4">
        {activeTab === 'products' && <ProductManagement />}
        {activeTab === 'orders' && <OrderManagement />}
        {activeTab === 'analytics' && <AnalyticsDashboard />}
        {activeTab === 'ai' && <AiStudio />}
      </div>

    </div>
  );
};
