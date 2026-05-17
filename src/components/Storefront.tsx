import React from 'react';
import { useApp } from '../context/AppContext';
import { FESTIVAL_BANNERS, INSTAGRAM_FEED, REVIEWS_DATA } from '../data/mockData';
import { 
  Sparkles, 
  ArrowRight, 
  Star, 
  Play, 
  TrendingUp, 
  Heart, 
  ShoppingBag,
  CheckCircle2,
  Camera,
  Eye
} from 'lucide-react';

export const Storefront: React.FC = () => {
  const { 
    products, 
    editorSections, 
    language, 
    setCurrentView, 
    setSelectedProductId,
    setSelectedCategory, 
    addToCart, 
    wishlist, 
    toggleWishlist,
    applyCoupon
  } = useApp();

  const publishedProducts = products.filter(p => p.published);
  const trendingProducts = publishedProducts.filter(p => p.isTrending);

  const categories = [
    { id: 'sarees', name: language === 'te' ? 'కంచిపట్టు & పట్టు చీరలు' : 'Pure Silk Sarees', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80' },
    { id: 'lehengas', name: language === 'te' ? 'బ్రైడల్ లెహెంగాలు' : 'Bridal Lehengas', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80' },
    { id: 'fabrics', name: language === 'te' ? 'ప్రీమియం ఫ్యాబ్రిక్స్' : 'Luxury Unstitched Fabrics', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80' },
    { id: 'custom-blouses', name: language === 'te' ? 'కస్టమ్ బ్లౌజ్ స్టిచ్చింగ్' : 'Custom Blouse Studio', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80' },
    { id: 'menswear', name: language === 'te' ? 'పురుషుల రాయల్ వేర్' : 'Men\'s Sherwanis', image: 'https://images.unsplash.com/photo-1621570074981-ee6a0145c8b5?auto=format&fit=crop&w=800&q=80' },
    { id: 'kurta-sets', name: language === 'te' ? 'అనార్కలి & కుర్తాలు' : 'Anarkali & Gowns', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80' },
  ];

  // Helper to render individual sections based on Live Editor config
  const renderSection = (type: string) => {
    switch (type) {
      case 'hero':
        return (
          <section className="relative h-[85vh] min-h-[600px] w-full bg-stone-950 text-white overflow-hidden flex items-center">
            {/* Cinematic Background Image */}
            <div className="absolute inset-0 z-0 opacity-70">
              <img 
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=80" 
                alt="Deeprastore Luxury Saree" 
                className="w-full h-full object-cover object-top transform scale-105 animate-pulse-glow"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/60 to-transparent" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
              <div className="max-w-2xl space-y-6 animate-fade-in">
                <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase backdrop-blur-md">
                  <Sparkles className="w-4 h-4" />
                  <span>{language === 'te' ? 'శ్రావణ మాస రాయల్ ఎడిట్' : 'THE SRAVANA MASAM ROYAL EDIT'}</span>
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight leading-[1.1]">
                  {language === 'te' ? (
                    <>సంప్రదాయం <span className="text-amber-400 italic">రాజసంతో</span> కలుస్తుంది</>
                  ) : (
                    <>Where Heritage Meets <span className="text-amber-400 italic font-normal">Pure Royalty</span></>
                  )}
                </h1>

                <p className="text-stone-300 text-sm sm:text-base max-w-lg font-light leading-relaxed">
                  {language === 'te' 
                    ? 'స్వచ్ఛమైన కంచిపట్టు చీరలు, కస్టమ్ డిజైనర్ బ్లౌజులు మరియు లగ్జరీ ఫ్యాబ్రిక్స్‌తో మీ పండుగ వేడుకలను అలంకరించుకోండి.'
                    : 'Adorn your elite celebrations with masterfully handwoven Kanjivaram silks, bespoke tailored blouses, and continuous cut luxury fabrics.'}
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    onClick={() => { setSelectedCategory('all'); setCurrentView('collection'); }}
                    className="bg-amber-500 hover:bg-amber-600 text-stone-950 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-xl hover:shadow-amber-500/20 flex items-center gap-2 group"
                  >
                    <span>{language === 'te' ? 'కలెక్షన్స్ చూడండి' : 'EXPLORE COLLECTION'}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <button
                    onClick={() => setCurrentView('stitching-studio')}
                    className="bg-stone-900/80 hover:bg-stone-900 text-white border border-stone-700 hover:border-amber-500/50 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest backdrop-blur-md transition-all"
                  >
                    {language === 'te' ? 'కస్టమ్ స్టిచ్చింగ్' : 'BESPOKE TAILORING'}
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 pt-8 border-t border-stone-800/80 max-w-lg text-[11px] text-stone-400 uppercase tracking-wider font-medium">
                  <div>✨ 100% Pure Silk Mark</div>
                  <div>✂️ Master Tailors</div>
                  <div>🚚 Express Delivery</div>
                </div>
              </div>
            </div>
          </section>
        );

      case 'trending':
        return (
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
              <div>
                <div className="flex items-center gap-2 text-amber-800 text-xs font-semibold uppercase tracking-widest mb-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>{language === 'te' ? 'అత్యధికంగా అమ్ముడవుతున్నవి' : 'CURATED BESTSELLERS'}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-950">
                  {language === 'te' ? 'ట్రెండింగ్ ఉత్పత్తులు' : 'Trending Masterpieces'}
                </h2>
              </div>
              <button
                onClick={() => { setSelectedCategory('all'); setCurrentView('collection'); }}
                className="text-xs font-bold text-amber-900 hover:text-amber-950 uppercase tracking-widest flex items-center gap-1 group"
              >
                <span>{language === 'te' ? 'అన్నీ చూడండి' : 'VIEW ALL PIECES'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {trendingProducts.slice(0, 4).map((product) => (
                <div 
                  key={product.id} 
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-stone-200 flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {product.isBestSeller && (
                        <span className="bg-amber-800 text-white text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full shadow">
                          Bestseller
                        </span>
                      )}
                      {product.isNew && (
                        <span className="bg-stone-900 text-amber-400 text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full shadow">
                          New Arrival
                        </span>
                      )}
                    </div>

                    {/* Action Overlay */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        onClick={() => toggleWishlist(product.id)}
                        className="bg-white/90 hover:bg-white text-stone-900 p-2.5 rounded-full shadow-lg transition-transform active:scale-95"
                        title="Wishlist"
                      >
                        <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-amber-700 text-amber-700' : ''}`} />
                      </button>
                      <button 
                        onClick={() => { setSelectedProductId(product.id); setCurrentView('product-detail'); }}
                        className="bg-white/90 hover:bg-white text-stone-900 p-2.5 rounded-full shadow-lg transition-transform active:scale-95"
                        title="Quick View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quick Add To Cart Button */}
                    <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => addToCart({ product, quantity: 1, selectedSize: product.variants.sizes?.[0], selectedColor: product.variants.colors?.[0]?.name, selectedMeters: product.variants.meters?.[0] })}
                        className="w-full bg-stone-900 hover:bg-stone-950 text-white py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase shadow-lg flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>{language === 'te' ? 'కార్ట్‌కు జోడించు' : 'QUICK ADD'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                        <span className="uppercase tracking-wider">{product.category.replace('-', ' ')}</span>
                        <div className="flex items-center gap-1 text-amber-700 font-semibold">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{product.rating}</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => { setSelectedProductId(product.id); setCurrentView('product-detail'); }}
                        className="text-left font-serif font-bold text-stone-900 hover:text-amber-800 transition-colors text-base line-clamp-2"
                      >
                        {language === 'te' ? product.nameTe : product.name}
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif font-bold text-stone-950 text-lg">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-stone-400 line-through">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {product.stockStatus === 'ready_stock' ? 'Ready Stock' : 'Pre-order'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case 'festival':
        const banner = FESTIVAL_BANNERS[0];
        return (
          <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className={`rounded-3xl bg-gradient-to-r ${banner.bgGradient} p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-amber-500/20`}>
              <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-4 max-w-xl relative z-10 text-center md:text-left">
                <span className="bg-amber-500 text-stone-950 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full inline-block shadow">
                  🎉 {language === 'te' ? 'పండుగ ప్రత్యేక ఆఫర్' : 'LIMITED TIME FESTIVAL EDIT'}
                </span>
                <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
                  {language === 'te' ? banner.titleTe : banner.title}
                </h2>
                <p className={`text-sm sm:text-base ${banner.textColor} font-medium`}>
                  {language === 'te' ? banner.subtitleTe : banner.subtitle}
                </p>
                <div className="inline-flex items-center gap-3 bg-stone-900/80 border border-stone-700 p-2 rounded-xl backdrop-blur-md">
                  <span className="text-xs text-stone-400 pl-2">Use Coupon Code:</span>
                  <span className="bg-amber-500 text-stone-950 px-3 py-1 rounded-lg font-mono font-bold text-xs tracking-wider">
                    {banner.code}
                  </span>
                </div>
              </div>

              <div className="relative z-10 shrink-0">
                <button
                  onClick={() => applyCoupon(banner.code)}
                  className="bg-white hover:bg-stone-100 text-stone-950 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest shadow-2xl transition-all hover:scale-105 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>{language === 'te' ? 'కూపన్ వర్తింపజేయండి' : 'APPLY CODE & SHOP NOW'}</span>
                </button>
              </div>
            </div>
          </section>
        );

      case 'categories':
        return (
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-stone-100/50 rounded-3xl my-8 border border-stone-200/60">
            <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
              <span className="text-amber-800 text-xs font-semibold uppercase tracking-widest">
                {language === 'te' ? 'కేటగిరీల వారీగా అన్వేషించండి' : 'THE LUXURY WARDROBE'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-950">
                {language === 'te' ? 'మా ప్రీమియం కలెక్షన్లు' : 'Shop by Category'}
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.id); setCurrentView('collection'); }}
                  className="group flex flex-col items-center text-center space-y-3 focus:outline-none"
                >
                  <div className="w-full aspect-square rounded-2xl overflow-hidden bg-stone-200 shadow-md group-hover:shadow-xl transition-all duration-300 border border-stone-200 relative">
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-transparent transition-colors" />
                  </div>
                  <span className="font-serif font-bold text-stone-900 group-hover:text-amber-800 transition-colors text-sm sm:text-base">
                    {cat.name}
                  </span>
                </button>
              ))}
            </div>
          </section>
        );

      case 'video':
        return (
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="rounded-3xl overflow-hidden bg-stone-950 text-white relative shadow-2xl border border-stone-800 aspect-video max-h-[600px] flex items-center justify-center group">
              <img 
                src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1600&q=80" 
                alt="Deeprastore Cinematic Video" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-6 z-10">
                <button 
                  onClick={() => window.open('https://assets.mixkit.co/videos/preview/mixkit-woman-in-elegant-traditional-saree-twirling-41584-large.mp4', '_blank')}
                  className="w-20 h-20 bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 animate-pulse"
                >
                  <Play className="w-8 h-8 fill-current ml-1" />
                </button>
                <div className="max-w-md space-y-2">
                  <h3 className="text-2xl sm:text-4xl font-serif font-bold">
                    {language === 'te' ? 'దీప్రాస్టోర్ బ్రాండ్ స్టోరీ' : 'Cinematic Elegance in Motion'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 font-light">
                    {language === 'te' ? 'మా చేనేత పట్టు చీరల నేత వెనుక ఉన్న కళను వీక్షించండి.' : 'Watch the behind-the-scenes magic of our master weavers crafting the purest Kanjivaram zari brocades.'}
                  </p>
                </div>
              </div>
            </div>
          </section>
        );

      case 'reels':
        return (
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-amber-800 text-xs font-semibold uppercase tracking-widest">
                  {language === 'te' ? 'ఇన్‌స్టాగ్రామ్ రీల్స్ ప్రేరణ' : 'AS SEEN ON INSTAGRAM'}
                </span>
                <h2 className="text-3xl font-serif font-bold text-stone-950">
                  {language === 'te' ? 'రీల్స్ & షార్ట్స్ షోకేస్' : 'Reels Style Showcase'}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { id: 'reel-1', title: 'Royal Crimson Drape', views: '142K views', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80' },
                { id: 'reel-2', title: 'Emerald Velvet Twirl', views: '98K views', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80' },
                { id: 'reel-3', title: 'Banarasi Brocade Magic', views: '210K views', img: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80' },
                { id: 'reel-4', title: 'Groomswear Achkan Edit', views: '65K views', img: 'https://images.unsplash.com/photo-1621570074981-ee6a0145c8b5?auto=format&fit=crop&w=600&q=80' },
              ].map((reel) => (
                <div key={reel.id} className="relative aspect-[9/16] rounded-2xl overflow-hidden group shadow-lg border border-stone-200">
                  <img src={reel.img} alt={reel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                  <div className="absolute top-3 right-3 bg-stone-900/60 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[10px] flex items-center gap-1">
                    <Play className="w-3 h-3 fill-current text-amber-400" />
                    <span>{reel.views}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-2 z-10">
                    <p className="text-xs font-semibold line-clamp-1">{reel.title}</p>
                    <button 
                      onClick={() => { setSelectedProductId('prod-1'); setCurrentView('product-detail'); }}
                      className="w-full bg-white/90 hover:bg-white text-stone-950 py-1.5 rounded-lg text-[11px] font-bold tracking-wider uppercase transition-colors"
                    >
                      {language === 'te' ? 'షాప్ చేయండి' : 'SHOP THE LOOK'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case 'reviews':
        return (
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-stone-100/50 rounded-3xl my-8 border border-stone-200/60">
            <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
              <span className="text-amber-800 text-xs font-semibold uppercase tracking-widest">
                {language === 'te' ? 'కస్టమర్ల అభిప్రాయాలు' : 'PATRON EXPERIENCES'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-950">
                {language === 'te' ? 'ధృవీకరించబడిన సమీక్షలు' : 'Words of Appreciation'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {REVIEWS_DATA.map((rev) => (
                <div key={rev.id} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-stone-700 text-xs sm:text-sm italic leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-stone-900">{rev.customerName}</p>
                      <p className="text-stone-400 text-[11px]">{rev.productName}</p>
                    </div>
                    {rev.verifiedPurchase && (
                      <span className="flex items-center gap-1 text-emerald-600 font-semibold bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case 'instagram':
        return (
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
              <div className="inline-flex items-center gap-2 text-amber-800 text-xs font-semibold uppercase tracking-widest">
                <Camera className="w-4 h-4" />
                <span>#DEEPRASTORELUXURY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-950">
                {language === 'te' ? 'ఇన్‌స్టాగ్రామ్ ఫీడ్' : 'Join Our Instagram Community'}
              </h2>
              <p className="text-xs text-stone-500">Tag us on your royal wedding celebrations to get featured</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {INSTAGRAM_FEED.map((post) => (
                <div key={post.id} className="group relative aspect-square rounded-2xl overflow-hidden bg-stone-100 shadow-sm border border-stone-200">
                  <img src={post.url} alt={post.handle} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-stone-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-2 text-center space-y-1">
                    <Camera className="w-6 h-6 text-amber-400 mb-1" />
                    <span className="text-xs font-bold">{post.likes} likes</span>
                    <span className="text-[10px] text-stone-300">{post.handle}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 animate-fade-in pb-16">
      {/* Map through editorSections to render in the exact order and visibility configured by Live Editor */}
      {editorSections
        .filter(section => section.visible)
        .sort((a, b) => a.order - b.order)
        .map(section => (
          <div key={section.id}>
            {renderSection(section.type)}
          </div>
        ))
      }
    </div>
  );
};
