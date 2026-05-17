import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Storefront } from './Storefront';
import { 
  Layout, 
  Eye, 
  EyeOff, 
  ArrowUp, 
  ArrowDown, 
  Smartphone, 
  Tablet, 
  Monitor, 
  CheckCircle2
} from 'lucide-react';

export const LiveEditor: React.FC = () => {
  const { editorSections, updateSectionOrder, toggleSectionVisibility, language } = useApp();

  const [previewMode, setPreviewMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    updateSectionOrder(index, index - 1);
  };

  const handleMoveDown = (index: number) => {
    if (index === editorSections.length - 1) return;
    updateSectionOrder(index, index + 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in pb-32">
      
      {/* Header */}
      <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 mb-10 relative overflow-hidden shadow-2xl border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-xl space-y-4 relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase">
            <Layout className="w-4 h-4" />
            <span>{language === 'te' ? 'వెబ్‌సైట్ లైవ్ ఎడిటర్' : 'WEBSITE LIVE EDITOR'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            {language === 'te' ? 'హోమ్‌పేజీ దృశ్య రూపకల్పన' : 'Visual Homepage Builder'}
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
            {language === 'te' 
              ? 'హోమ్‌పేజీ విభాగాల క్రమాన్ని మార్చండి, వాటిని దాచండి లేదా చూపించండి మరియు మొబైల్, టాబ్లెట్ ప్రివ్యూలను రియల్ టైమ్‌లో చూడండి.'
              : 'Rearrange storefront sections, toggle visibility, and inspect responsive layouts instantly. Experience Shopify-level visual website customization without writing any code.'}
          </p>
        </div>

        {/* Device Preview Toggles */}
        <div className="relative z-10 flex items-center bg-stone-800 p-1.5 rounded-2xl border border-stone-700 shadow-inner">
          {[
            { id: 'mobile', icon: Smartphone, label: 'Mobile' },
            { id: 'tablet', icon: Tablet, label: 'Tablet' },
            { id: 'desktop', icon: Monitor, label: 'Desktop' },
          ].map((mode) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => setPreviewMode(mode.id as any)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  previewMode === mode.id ? 'bg-amber-500 text-stone-950 shadow-md' : 'text-stone-300 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{mode.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Section Configurator Sidebar */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl shadow-sm border border-stone-200 space-y-6 sticky top-24">
          <div>
            <h3 className="font-serif font-bold text-xl text-stone-950">Storefront Sections</h3>
            <p className="text-xs text-stone-500 mt-0.5">Drag & rearrange or use arrows to order</p>
          </div>

          <div className="space-y-3">
            {editorSections.map((sec, idx) => (
              <div 
                key={sec.id} 
                className={`p-4 rounded-2xl border flex items-center justify-between gap-3 transition-all ${
                  sec.visible ? 'bg-stone-50 border-stone-200 shadow-sm' : 'bg-stone-100/50 border-stone-200/50 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-serif font-bold text-stone-400 w-5 text-center shrink-0">#{idx + 1}</span>
                  <div className="truncate">
                    <p className="font-bold text-xs text-stone-900 truncate">{language === 'te' ? sec.titleTe : sec.title}</p>
                    <p className="text-[10px] text-stone-500 uppercase tracking-widest">{sec.type} section</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleMoveUp(idx)}
                    disabled={idx === 0}
                    className="p-1.5 bg-white hover:bg-stone-200 text-stone-700 rounded-lg shadow-sm border border-stone-200 disabled:opacity-30 transition-colors"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleMoveDown(idx)}
                    disabled={idx === editorSections.length - 1}
                    className="p-1.5 bg-white hover:bg-stone-200 text-stone-700 rounded-lg shadow-sm border border-stone-200 disabled:opacity-30 transition-colors"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => toggleSectionVisibility(sec.id)}
                    className={`p-1.5 rounded-lg shadow-sm border transition-colors ${
                      sec.visible ? 'bg-stone-900 text-white border-stone-900' : 'bg-stone-200 text-stone-600 border-stone-300'
                    }`}
                    title={sec.visible ? 'Hide Section' : 'Show Section'}
                  >
                    {sec.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex items-center gap-2 text-xs text-stone-600 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Storefront preview updates instantly in real-time.</span>
          </div>
        </div>

        {/* Right Live Preview Area */}
        <div className="lg:col-span-8 flex justify-center">
          <div className={`w-full transition-all duration-500 bg-white shadow-2xl rounded-3xl overflow-hidden border border-stone-200 ${
            previewMode === 'mobile' ? 'max-w-sm' : previewMode === 'tablet' ? 'max-w-2xl' : 'max-w-full'
          }`}>
            <div className="bg-stone-900 text-stone-400 px-4 py-3 flex items-center justify-between border-b border-stone-800 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <span className="font-mono text-[11px] text-stone-300">https://www.deeprastore.com ({previewMode} preview)</span>
              <span className="text-[10px] uppercase tracking-widest font-bold bg-stone-800 text-amber-400 px-2 py-0.5 rounded">Live</span>
            </div>

            {/* Render Storefront Component Inside Preview Box */}
            <div className="max-h-[800px] overflow-y-auto custom-scrollbar pointer-events-auto">
              <Storefront />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
