import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BLOG_POSTS } from '../data/mockData';
import { BookOpen, Calendar, Clock, ArrowRight, ArrowLeft, FileText } from 'lucide-react';

export const BlogView: React.FC = () => {
  const { language } = useApp();
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const selectedPost = BLOG_POSTS.find(p => p.id === selectedPostId);

  if (selectedPost) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in pb-32 space-y-8">
        <button 
          onClick={() => setSelectedPostId(null)}
          className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 hover:text-amber-950 uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'te' ? 'బ్లాగ్‌కు తిరిగి వెళ్లండి' : 'BACK TO JOURNAL'}</span>
        </button>

        <div className="space-y-4">
          <div className="flex items-center gap-4 text-xs text-stone-500">
            <span className="bg-amber-100 text-amber-900 font-bold px-2.5 py-1 rounded">
              {selectedPost.category}
            </span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {selectedPost.date}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {selectedPost.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-950 leading-tight">
            {language === 'te' ? selectedPost.titleTe : selectedPost.title}
          </h1>

          <p className="text-stone-500 text-xs sm:text-sm italic">
            By {selectedPost.author}
          </p>
        </div>

        <div className="aspect-[21/9] rounded-3xl overflow-hidden bg-stone-100 shadow-2xl border border-stone-200">
          <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover object-top" />
        </div>

        <div className="prose prose-stone max-w-none text-stone-800 text-base sm:text-lg leading-relaxed space-y-6 font-light">
          <p className="font-medium text-stone-950 text-xl border-l-4 border-amber-700 pl-4 italic">
            {language === 'te' ? selectedPost.excerpt : selectedPost.excerpt}
          </p>
          <p>
            {selectedPost.content}
          </p>
          <p>
            At Deeprastore, we ensure that every single handloom masterpiece undergoes stringent pure silk mark certification. Whether you are purchasing unstitched Banarasi Chanderi per meter or a bespoke custom stitched designer blouse, our commitment to royal heritage remains uncompromised.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in pb-32 space-y-16">
      
      {/* Header */}
      <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-2xl space-y-4 relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase">
            <BookOpen className="w-4 h-4" />
            <span>{language === 'te' ? 'దీప్రాస్టోర్ లగ్జరీ జర్నల్' : 'DEEPRASTORE LUXURY JOURNAL'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            {language === 'te' ? 'పట్టు & చేనేత వస్త్రాల కథలు' : 'Stories of Silk, Craft & Royalty'}
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed max-w-xl">
            {language === 'te' 
              ? 'కంచిపట్టు నేత సంప్రదాయాలు, ఫ్యాబ్రిక్ GSM మరియు వివాహ వస్త్రాల ఎంపికపై మా నిపుణుల కథనాలను చదవండి.'
              : 'Immerse yourself in our editorial archive exploring centuries-old Kanjivaram Korvai weaving, technical fabric GSM guides, and elite bridal styling recommendations.'}
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {BLOG_POSTS.map((post) => (
          <div key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-stone-200 flex flex-col group">
            <div className="relative aspect-[16/9] overflow-hidden bg-stone-100">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 left-4 bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                {post.category}
              </div>
            </div>

            <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-4 text-xs text-stone-500">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                </div>

                <h2 className="text-2xl font-serif font-bold text-stone-950 group-hover:text-amber-800 transition-colors leading-snug">
                  {language === 'te' ? post.titleTe : post.title}
                </h2>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light line-clamp-3">
                  {language === 'te' ? post.excerpt : post.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs text-stone-400 italic">By {post.author}</span>
                <button
                  onClick={() => setSelectedPostId(post.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-900 hover:text-amber-800 uppercase tracking-widest group/btn"
                >
                  <span>{language === 'te' ? 'పూర్తిగా చదవండి' : 'READ ARTICLE'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Sitemap Generation Simulation */}
      <div className="bg-stone-50 rounded-3xl p-8 sm:p-12 border border-stone-200 space-y-6 animate-fade-in">
        <div className="flex items-center gap-2 text-stone-800">
          <FileText className="w-5 h-5 text-amber-700" />
          <h3 className="font-serif font-bold text-xl">Deeprastore Dynamic Sitemap Simulation</h3>
        </div>
        <p className="text-xs text-stone-600 max-w-2xl">
          Automatically generated sitemap structure ensuring optimal Google search indexing and Core Web Vitals readiness for fashion ecommerce.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-stone-200 text-xs font-mono text-stone-700">
          <div className="space-y-2">
            <p className="font-bold text-stone-950 font-sans uppercase">🗂️ Categories</p>
            <p className="hover:text-amber-800 cursor-pointer">/collections/sarees</p>
            <p className="hover:text-amber-800 cursor-pointer">/collections/lehengas</p>
            <p className="hover:text-amber-800 cursor-pointer">/collections/fabrics</p>
            <p className="hover:text-amber-800 cursor-pointer">/collections/custom-blouses</p>
            <p className="hover:text-amber-800 cursor-pointer">/collections/menswear</p>
          </div>

          <div className="space-y-2">
            <p className="font-bold text-stone-950 font-sans uppercase">🛍️ Storefront</p>
            <p className="hover:text-amber-800 cursor-pointer">/storefront</p>
            <p className="hover:text-amber-800 cursor-pointer">/fabric-store</p>
            <p className="hover:text-amber-800 cursor-pointer">/stitching-studio</p>
            <p className="hover:text-amber-800 cursor-pointer">/journal</p>
          </div>

          <div className="space-y-2">
            <p className="font-bold text-stone-950 font-sans uppercase">⚙️ Shopify Admin</p>
            <p className="hover:text-amber-800 cursor-pointer">/admin/products</p>
            <p className="hover:text-amber-800 cursor-pointer">/admin/orders</p>
            <p className="hover:text-amber-800 cursor-pointer">/admin/analytics</p>
            <p className="hover:text-amber-800 cursor-pointer">/admin/ai-studio</p>
            <p className="hover:text-amber-800 cursor-pointer">/admin/live-editor</p>
          </div>

          <div className="space-y-2">
            <p className="font-bold text-stone-950 font-sans uppercase">📜 Legal & SEO</p>
            <p className="hover:text-amber-800 cursor-pointer">/privacy-policy</p>
            <p className="hover:text-amber-800 cursor-pointer">/terms-of-service</p>
            <p className="hover:text-amber-800 cursor-pointer">/shipping-policy</p>
            <p className="hover:text-amber-800 cursor-pointer">/sitemap.xml</p>
            <p className="hover:text-amber-800 cursor-pointer">/robots.txt</p>
          </div>
        </div>
      </div>

    </div>
  );
};
