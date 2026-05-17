import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  ArrowUpRight, 
  BarChart3, 
  PieChart, 
  Globe 
} from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const { orders, products } = useApp();

  const totalRevenue = orders.reduce((acc, o) => acc + (o.paymentStatus === 'PAID' ? o.totalAmount : o.totalAmount * 0.8), 0);
  const totalOrders = orders.length;
  const conversionRate = 4.2; // simulated
  const averageOrderValue = Math.round(totalRevenue / (totalOrders || 1));

  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Total Revenue</span>
            <div className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl font-serif font-bold text-stone-950">₹{totalRevenue.toLocaleString('en-IN')}</h3>
            <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> <span>+24.5% from last month</span>
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Total Orders</span>
            <div className="w-10 h-10 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-700">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl font-serif font-bold text-stone-950">{totalOrders}</h3>
            <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> <span>+12.8% from last month</span>
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Conversion Rate</span>
            <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl font-serif font-bold text-stone-950">{conversionRate}%</h3>
            <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> <span>+1.2% benchmark beat</span>
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Average Order Value</span>
            <div className="w-10 h-10 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl font-serif font-bold text-stone-950">₹{averageOrderValue.toLocaleString('en-IN')}</h3>
            <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> <span>High luxury patron retention</span>
            </p>
          </div>
        </div>

      </div>

      {/* Revenue Charts & Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Revenue Chart Simulation */}
        <div className="lg:col-span-8 bg-white p-8 rounded-3xl shadow-sm border border-stone-200 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-xl text-stone-950">Monthly Revenue Growth</h3>
              <p className="text-xs text-stone-500 mt-0.5">Shopify Analytics Engine Simulation</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 bg-stone-100 px-3 py-1.5 rounded-xl border border-stone-200">
              <BarChart3 className="w-4 h-4 text-amber-700" />
              <span>2026 Fiscal Year</span>
            </div>
          </div>

          {/* Simulated Bar Chart */}
          <div className="h-64 flex items-end justify-between gap-2 pt-8 border-b border-stone-200 px-2">
            {[
              { month: 'Jan', val: 40, rev: '₹1.8L' },
              { month: 'Feb', val: 55, rev: '₹2.4L' },
              { month: 'Mar', val: 70, rev: '₹3.2L' },
              { month: 'Apr', val: 65, rev: '₹2.9L' },
              { month: 'May', val: 90, rev: '₹4.5L' },
              { month: 'Jun', val: 85, rev: '₹4.1L' },
              { month: 'Jul', val: 100, rev: '₹5.2L' },
            ].map((bar) => (
              <div key={bar.month} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-stone-700 bg-stone-100 px-2 py-1 rounded shadow-sm">
                  {bar.rev}
                </div>
                <div 
                  className="w-full bg-stone-900 rounded-t-xl group-hover:bg-amber-700 transition-colors duration-300" 
                  style={{ height: `${bar.val}%` }} 
                />
                <span className="text-xs font-semibold text-stone-600">{bar.month}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[11px] text-stone-400 font-medium pt-1">
            <span>Q1 Launch</span>
            <span>Sravana Masam Peak</span>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="lg:col-span-4 bg-white p-8 rounded-3xl shadow-sm border border-stone-200 space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-serif font-bold text-xl text-stone-950">Traffic Sources</h3>
                <p className="text-xs text-stone-500 mt-0.5">Social Media Driven Acquisition</p>
              </div>
              <PieChart className="w-5 h-5 text-amber-700" />
            </div>

            <div className="space-y-4">
              {[
                { source: 'Instagram Reels & Stories', pct: 54, color: 'bg-amber-700' },
                { source: 'WhatsApp Business Catalogs', pct: 28, color: 'bg-emerald-600' },
                { source: 'Google Organic Search (SEO)', pct: 12, color: 'bg-blue-600' },
                { source: 'Direct / Word of Mouth', pct: 6, color: 'bg-purple-600' },
              ].map((tr) => (
                <div key={tr.source} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-stone-800">
                    <span>{tr.source}</span>
                    <span className="font-serif font-bold text-stone-950">{tr.pct}%</span>
                  </div>
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div className={`h-full ${tr.color} rounded-full`} style={{ width: `${tr.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex items-center gap-3">
            <Globe className="w-5 h-5 text-stone-700 shrink-0" />
            <p className="text-[11px] text-stone-600 leading-relaxed">
              <strong>Mobile optimization impact:</strong> 82% of all checkouts originate from mobile browsers via Instagram bio links.
            </p>
          </div>
        </div>

      </div>

      {/* Best Selling Products Ranking */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-xl text-stone-950">Best Selling Masterpieces</h3>
            <p className="text-xs text-stone-500 mt-0.5">Top performing inventory items</p>
          </div>
          <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
            Updated Real-time
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((prod, idx) => (
            <div key={prod.id} className="flex items-center gap-4 p-4 bg-stone-50 rounded-2xl border border-stone-200">
              <span className="font-serif font-bold text-lg text-stone-400 w-6 text-center">#{idx + 1}</span>
              <img src={prod.images[0]} alt="" className="w-14 h-16 object-cover rounded-xl border border-stone-200 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="font-bold text-xs text-stone-900 truncate">{prod.name}</p>
                <p className="text-xs font-serif font-bold text-amber-800 mt-0.5">₹{prod.price.toLocaleString('en-IN')}</p>
                <p className="text-[10px] text-stone-500 mt-1">{prod.reviewsCount} verified reviews</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
