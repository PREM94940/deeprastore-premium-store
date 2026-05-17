import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AI_PROMPT_TEMPLATES } from '../../data/mockData';
import { Sparkles, Copy, CheckCircle2, Wand2, RefreshCw } from 'lucide-react';

export const AiStudio: React.FC = () => {
  const { language, showToast } = useApp();

  const [activeMode, setActiveMode] = useState<'description' | 'seoMeta' | 'bannerText' | 'tags'>('description');
  const [promptInput, setPromptInput] = useState(AI_PROMPT_TEMPLATES.description[0]);
  const [generatedOutput, setGeneratedOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleModeChange = (mode: 'description' | 'seoMeta' | 'bannerText' | 'tags') => {
    setActiveMode(mode);
    setPromptInput(AI_PROMPT_TEMPLATES[mode][0]);
    setGeneratedOutput('');
  };

  const handleGenerateAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;

    setIsGenerating(true);
    setGeneratedOutput('');

    setTimeout(() => {
      let output = '';
      if (activeMode === 'description') {
        output = `Emanating royal grandeur, this masterfully handcrafted Kanjivaram silk saree represents the pinnacle of South Indian handloom artistry. Adorned with authentic 3G pure gold zari brocade work depicting mythological peacocks and celestial floral vines, the dense Korvai border creates a breathtaking contrast. Designed specifically for elite bridal trousseaus and royal festival celebrations, this drape guarantees a regal, aristocratic silhouette.`;
      } else if (activeMode === 'seoMeta') {
        output = `Buy Authentic Handloom Kanjivaram Pure Silk Saree with pure gold zari online at Deeprastore. Premium bridal sarees with express shipping. 100% Silk Mark Certified.`;
      } else if (activeMode === 'bannerText') {
        output = `✨ THE SRAVANA MASAM ROYAL EDIT ✨\nUp to 30% Off on Pure Kanjivaram & Banarasi Sarees. Use Code: SRAVANA30 at checkout for complimentary custom tailoring!`;
      } else if (activeMode === 'tags') {
        output = `Bridal Saree, Kanjivaram Silk, Pure Gold Zari, Handloom Luxury, Wedding Silk, Traditional Brocade, Deeprastore Exclusive, South Indian Bride`;
      }
      setGeneratedOutput(output);
      setIsGenerating(false);
      showToast('AI Content generated successfully!');
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedOutput);
    showToast('Generated AI content copied to clipboard!');
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      
      {/* Studio Header */}
      <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-xl space-y-4 relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-4 h-4" />
            <span>{language === 'te' ? 'దీప్రాస్టోర్ AI స్టూడియో' : 'DEEPRASTORE AI STUDIO'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            {language === 'te' ? 'AI కామర్స్ కంటెంట్ జనరేటర్' : 'AI Ecommerce Content Generator'}
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
            {language === 'te' 
              ? 'ఉత్పత్తి వివరణలు, SEO మెటా ట్యాగ్‌లు మరియు ప్రమోషనల్ బ్యానర్లను నిమిషాల్లో రూపొందించండి.'
              : 'Empower your Shopify admin experience with state-of-the-art AI generation. Instantly draft poetic luxury product descriptions, high-converting SEO meta tags, urgent festival sale copy, and trending product tags.'}
          </p>
        </div>
        <div className="relative z-10 shrink-0 hidden md:block">
          <div className="w-40 h-40 bg-gradient-to-tr from-amber-500 to-amber-700 rounded-3xl shadow-2xl flex items-center justify-center transform rotate-6 border-4 border-stone-800">
            <Wand2 className="w-20 h-20 text-stone-950 animate-pulse" />
          </div>
        </div>
      </div>

      {/* AI Mode Selection Tabs */}
      <div className="flex border-b border-stone-200 overflow-x-auto gap-4 sm:gap-8">
        {[
          { id: 'description', label: 'Product Descriptions' },
          { id: 'seoMeta', label: 'SEO Meta Generator' },
          { id: 'bannerText', label: 'Promotional Banners' },
          { id: 'tags', label: 'Product Tag Suggestions' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleModeChange(tab.id as any)}
            className={`pb-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${
              activeMode === tab.id ? 'border-stone-900 text-stone-950 font-black' : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            <Sparkles className={`w-4 h-4 ${activeMode === tab.id ? 'text-amber-700' : 'text-stone-400'}`} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Form */}
        <form onSubmit={handleGenerateAI} className="md:col-span-7 bg-white p-8 rounded-3xl shadow-sm border border-stone-200 space-y-6">
          <div>
            <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
              Select AI Prompt Template
            </label>
            <select
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700"
            >
              {AI_PROMPT_TEMPLATES[activeMode].map((tpl, i) => (
                <option key={i} value={tpl}>{tpl}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
              Customize AI Instruction Prompt
            </label>
            <textarea
              rows={4}
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl p-4 text-xs font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700"
              placeholder="Enter custom AI prompt instructions..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full bg-stone-900 hover:bg-stone-950 text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-2 disabled:bg-stone-400"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Generating AI Content...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>GENERATE WITH AI STUDIO</span>
              </>
            )}
          </button>
        </form>

        {/* Right Output */}
        <div className="md:col-span-5 bg-stone-50 p-8 rounded-3xl border border-stone-200 space-y-6 flex flex-col justify-between h-full min-h-[350px]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-bold text-lg text-stone-950">AI Generated Output</h3>
              {generatedOutput && (
                <button
                  onClick={handleCopy}
                  className="bg-white hover:bg-stone-100 text-stone-800 p-2 rounded-xl border border-stone-200 shadow-sm transition-colors flex items-center gap-1.5 text-xs font-bold"
                  title="Copy Content"
                >
                  <Copy className="w-3.5 h-3.5 text-amber-700" />
                  <span>Copy</span>
                </button>
              )}
            </div>

            {isGenerating ? (
              <div className="flex flex-col items-center justify-center py-20 text-stone-400 space-y-3">
                <Wand2 className="w-12 h-12 animate-spin text-amber-700" />
                <p className="text-xs font-medium">Synthesizing luxury fashion vocabulary...</p>
              </div>
            ) : generatedOutput ? (
              <div className="bg-white p-6 rounded-2xl border border-stone-200 text-xs sm:text-sm text-stone-800 leading-relaxed font-light whitespace-pre-wrap shadow-sm animate-fade-in">
                {generatedOutput}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-stone-400 text-center space-y-2">
                <Sparkles className="w-12 h-12 text-stone-300 stroke-1" />
                <p className="text-xs font-medium">Select a prompt and click generate to create premium ecommerce copy instantly.</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-stone-200 text-[11px] text-stone-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>SEO Optimized & Core Web Vitals compliant formatting.</span>
          </div>
        </div>

      </div>

    </div>
  );
};
