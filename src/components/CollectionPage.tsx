import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Filter, 
  ArrowUpDown, 
  Star, 
  Heart, 
  ShoppingBag, 
  X,
  Sparkles,
  Eye
} from 'lucide-react';

export const CollectionPage: React.FC = () => {
  const { 
    products, 
    selectedCategory, 
    setSelectedCategory, 
    setSelectedProductId, 
    setCurrentView, 
    addToCart, 
    wishlist, 
    toggleWishlist,
    language 
  } = useApp();

  const [sortBy, setSortBy] = useState<'popularity' | 'price-low' | 'price-high' | 'newest'>('popularity');
  const [selectedStock, setSelectedStock] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(50000);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const categories = [
    { id: 'all', name: language === 'te' ? 'అన్ని కేటగిరీలు' : 'All Categories' },
    { id: 'sarees', name: language === 'te' ? 'పట్టు చీరలు' : 'Sarees' },
    { id: 'lehengas', name: language === 'te' ? 'లెహెంగాలు' : 'Lehengas' },
    { id: 'fabrics', name: language === 'te' ? 'ఫ్యాబ్రిక్స్' : 'Fabrics' },
    { id: 'custom-blouses', name: language === 'te' ? 'కస్టమ్ బ్లౌజులు' : 'Custom Blouses' },
    { id: 'menswear', name: language === 'te' ? 'పురుషుల దుస్తులు' : 'Menswear' },
    { id: 'kurta-sets', name: language === 'te' ? 'కుర్తా సెట్లు' : 'Kurta Sets' },
  ];

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => p.published);

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (selectedStock !== 'all') {
      result = result.filter(p => p.stockStatus === selectedStock);
    }

    result = result.filter(p => p.price <= maxPrice);

    // Sorting
    if (sortBy === 'popularity') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [products, selectedCategory, selectedStock, maxPrice, sortBy]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      
      {/* Collection Header */}
      <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 mb-10 relative overflow-hidden shadow-2xl border border-stone-800">
        <div className="absolute -right-10 -top-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-2xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'te' ? 'దీప్రాస్టోర్ లగ్జరీ కలెక్షన్' : 'DEEPRASTORE LUXURY CURATION'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight capitalize">
            {selectedCategory === 'all' ? (language === 'te' ? 'అన్ని కలెక్షన్స్' : 'Complete Masterpiece Curation') : selectedCategory.replace('-', ' ')}
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed max-w-xl">
            {language === 'te' 
              ? 'మా నిపుణులైన చేనేత కార్మికులు మరియు డిజైనర్లచే ప్రత్యేకంగా రూపొందించబడిన స్వచ్ఛమైన పట్టు చీరలు మరియు ప్రీమియం వస్త్రాలను అన్వేషించండి.'
              : 'Explore our masterfully curated selection of pure handloom Kanjivaram silks, continuous cut luxury fabrics, and bespoke designer menswear.'}
          </p>
        </div>
      </div>

      {/* Toolbar & Mobile Trigger */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-stone-200">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.id); setVisibleCount(6); }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all shrink-0 ${
                selectedCategory === cat.id 
                  ? 'bg-stone-900 text-white shadow-md' 
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
          {/* Mobile Filter Trigger */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-stone-100 text-stone-800 px-4 py-2 rounded-xl text-xs font-semibold border border-stone-200"
          >
            <Filter className="w-4 h-4" />
            <span>{language === 'te' ? 'ఫిల్టర్లు' : 'Filters'}</span>
          </button>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-stone-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-stone-100 text-stone-800 text-xs font-semibold px-4 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-700"
            >
              <option value="popularity">{language === 'te' ? 'జనాదరణ పొందినవి' : 'Sort by Popularity'}</option>
              <option value="price-low">{language === 'te' ? 'ధర: తక్కువ నుండి ఎక్కువ' : 'Price: Low to High'}</option>
              <option value="price-high">{language === 'te' ? 'ధర: ఎక్కువ నుండి తక్కువ' : 'Price: High to Low'}</option>
              <option value="newest">{language === 'te' ? 'కొత్తవి' : 'Newest Arrivals'}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-3 space-y-8 pr-4 border-r border-stone-200">
          
          {/* Stock Status Filter */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
              <Filter className="w-4 h-4 text-amber-700" />
              <span>{language === 'te' ? 'స్టాక్ లభ్యత' : 'Stock Status'}</span>
            </h3>
            <div className="space-y-2 text-xs">
              {[
                { id: 'all', label: language === 'te' ? 'అన్నీ' : 'All Stock' },
                { id: 'ready_stock', label: language === 'te' ? 'రెడీ స్టాక్' : 'Ready Stock Only' },
                { id: 'preorder', label: language === 'te' ? 'ప్రీ-ఆర్డర్' : 'Pre-order Allocation' },
              ].map((stock) => (
                <label key={stock.id} className="flex items-center gap-2.5 cursor-pointer text-stone-700 hover:text-stone-950 font-medium">
                  <input
                    type="radio"
                    name="stock"
                    checked={selectedStock === stock.id}
                    onChange={() => setSelectedStock(stock.id)}
                    className="text-amber-700 focus:ring-amber-700"
                  />
                  <span>{stock.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-3 pt-6 border-t border-stone-200">
            <div className="flex items-center justify-between text-xs font-bold text-stone-900 uppercase tracking-wider">
              <span>{language === 'te' ? 'గరిష్ట ధర' : 'Max Price'}</span>
              <span className="text-amber-800 font-serif font-bold text-sm">₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min={1000}
              max={50000}
              step={1000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-amber-700 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-medium">
              <span>₹1,000</span>
              <span>₹50,000</span>
            </div>
          </div>

          {/* Reset Filters */}
          <div className="pt-6 border-t border-stone-200">
            <button
              onClick={() => { setSelectedCategory('all'); setSelectedStock('all'); setMaxPrice(50000); setSortBy('popularity'); }}
              className="w-full bg-stone-100 hover:bg-stone-200 text-stone-800 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
            >
              {language === 'te' ? 'ఫిల్టర్లను రీసెట్ చేయండి' : 'Reset All Filters'}
            </button>
          </div>

        </div>

        {/* Product Grid */}
        <div className="lg:col-span-9 space-y-12">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 px-4 bg-stone-50 rounded-3xl border border-stone-200">
              <ShoppingBag className="w-16 h-16 text-stone-300 mx-auto mb-4 stroke-1" />
              <p className="text-stone-800 font-serif text-xl font-bold mb-2">
                {language === 'te' ? 'ఎలాంటి ఉత్పత్తులు కనుగొనబడలేదు' : 'No Masterpieces Found'}
              </p>
              <p className="text-stone-500 text-xs mb-6 max-w-sm mx-auto">
                {language === 'te' ? 'మీ శోధన ప్రమాణాలకు సరిపోలే ఉత్పత్తులు లేవు. దయచేసి ఫిల్టర్లను మార్చండి.' : 'We couldn\'t find any items matching your selected filters. Try broadening your criteria.'}
              </p>
              <button
                onClick={() => { setSelectedCategory('all'); setSelectedStock('all'); setMaxPrice(50000); }}
                className="bg-amber-800 hover:bg-amber-900 text-white px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-md"
              >
                {language === 'te' ? 'అన్ని ఉత్పత్తులను చూడండి' : 'VIEW COMPLETE CURATION'}
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.slice(0, visibleCount).map((product) => (
                  <div 
                    key={product.id} 
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-stone-200 flex flex-col"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
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

              {/* Infinite Scroll Simulation / Load More Button */}
              {visibleCount < filteredProducts.length && (
                <div className="text-center pt-8 border-t border-stone-200">
                  <button
                    onClick={handleLoadMore}
                    className="bg-stone-900 hover:bg-stone-950 text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl transition-all hover:scale-105"
                  >
                    {language === 'te' ? 'మరిన్ని చూడండి' : `LOAD MORE MASTERPIECES (${filteredProducts.length - visibleCount} REMAINING)`}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex justify-end animate-fade-in lg:hidden">
          <div className="bg-white w-full max-w-xs h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  {language === 'te' ? 'ఫిల్టర్లు' : 'Filter Masterpieces'}
                </h3>
                <button onClick={() => setMobileFilterOpen(false)} className="text-stone-400 hover:text-stone-700">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Stock Status Filter */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  {language === 'te' ? 'స్టాక్ లభ్యత' : 'Stock Status'}
                </h4>
                <div className="space-y-2 text-xs">
                  {[
                    { id: 'all', label: language === 'te' ? 'అన్నీ' : 'All Stock' },
                    { id: 'ready_stock', label: language === 'te' ? 'రెడీ స్టాక్' : 'Ready Stock Only' },
                    { id: 'preorder', label: language === 'te' ? 'ప్రీ-ఆర్డర్' : 'Pre-order Allocation' },
                  ].map((stock) => (
                    <label key={stock.id} className="flex items-center gap-2.5 cursor-pointer text-stone-700 font-medium">
                      <input
                        type="radio"
                        name="stock-mobile"
                        checked={selectedStock === stock.id}
                        onChange={() => setSelectedStock(stock.id)}
                        className="text-amber-700"
                      />
                      <span>{stock.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-3 pt-6 border-t border-stone-200">
                <div className="flex items-center justify-between text-xs font-bold text-stone-900 uppercase tracking-wider">
                  <span>{language === 'te' ? 'గరిష్ట ధర' : 'Max Price'}</span>
                  <span className="text-amber-800 font-serif font-bold text-sm">₹{maxPrice.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={50000}
                  step={1000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-amber-700"
                />
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-stone-200">
              <button
                onClick={() => { setSelectedCategory('all'); setSelectedStock('all'); setMaxPrice(50000); setSortBy('popularity'); }}
                className="w-full bg-stone-100 text-stone-800 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                {language === 'te' ? 'రీసెట్ చేయండి' : 'Reset Filters'}
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full bg-stone-900 text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg"
              >
                {language === 'te' ? 'ఫలితాలు చూడండి' : `VIEW ${filteredProducts.length} MASTERPIECES`}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
