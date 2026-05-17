import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Layers, Star, Heart, ShoppingBag, CheckCircle2 } from 'lucide-react';

export const FabricStore: React.FC = () => {
  const { products, setSelectedProductId, setCurrentView, addToCart, wishlist, toggleWishlist, language } = useApp();
  const fabricProducts = products.filter(p => p.category === 'fabrics' && p.published);

  const [selectedMetersMap, setSelectedMetersMap] = useState<{ [key: string]: number }>({});
  const [selectedColorMap, setSelectedColorMap] = useState<{ [key: string]: string }>({});

  const handleMeterChange = (id: string, meters: number) => {
    setSelectedMetersMap({ ...selectedMetersMap, [id]: meters });
  };

  const handleColorChange = (id: string, color: string) => {
    setSelectedColorMap({ ...selectedColorMap, [id]: color });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-amber-950 text-white rounded-3xl p-8 sm:p-12 mb-12 relative overflow-hidden shadow-2xl border border-amber-800/40 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-xl space-y-4 relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase">
            <Layers className="w-4 h-4" />
            <span>{language === 'te' ? 'మీటరు ఆధారిత వస్త్రాలు' : 'METER-BASED LUXURY FABRIC STUDIO'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            {language === 'te' ? 'ప్రీమియం అన్‌స్టిచ్డ్ ఫ్యాబ్రిక్స్' : 'Continuous Cut Luxury Fabrics'}
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
            {language === 'te' 
              ? 'బనారసి, చందేరి, మరియు కలంకారీ వంటి అత్యుత్తమ వస్త్రాలను మీటరు చొప్పున కొనుగోలు చేయండి. కస్టమ్ డిజైన్లకు అనుకూలం.'
              : 'Procure authentic Banarasi brocades, breathable organic linen, and Pedana Kalamkari cotton silks per meter. Guaranteed continuous cut for bespoke anarkalis, lehengas, and royal jackets.'}
          </p>
          <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start text-xs font-medium text-amber-200">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Continuous Cut Guarantee</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Certified GSM Density</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Natural Dyes & Pure Silk</span>
          </div>
        </div>
        <div className="relative z-10 shrink-0 hidden lg:block">
          <img src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=400&q=80" alt="Fabric Rolls" className="w-64 h-64 object-cover rounded-2xl shadow-2xl border-4 border-amber-800/50 transform rotate-3" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {fabricProducts.map((product) => {
          const meters = selectedMetersMap[product.id] || product.variants.meters?.[0] || 1;
          const color = selectedColorMap[product.id] || product.variants.colors?.[0]?.name || 'Standard';
          const totalPrice = product.price * meters;

          return (
            <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-stone-200 flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span className="bg-amber-800 text-white text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full shadow">
                    ₹{product.price} / Meter
                  </span>
                  <span className={`text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full shadow ${product.stockStatus === 'ready_stock' ? 'bg-emerald-600 text-white' : 'bg-stone-900 text-amber-400'}`}>
                    {product.stockStatus === 'ready_stock' ? 'Ready Stock' : 'Pre-order Allocation'}
                  </span>
                </div>
                <button 
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 bg-white/90 hover:bg-white text-stone-900 p-2.5 rounded-full shadow-lg transition-transform active:scale-95"
                >
                  <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-amber-700 text-amber-700' : ''}`} />
                </button>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="uppercase tracking-wider">Fabric Specification</span>
                    <div className="flex items-center gap-1 text-amber-700 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => { setSelectedProductId(product.id); setCurrentView('product-detail'); }}
                    className="text-left font-serif font-bold text-stone-900 hover:text-amber-800 transition-colors text-lg line-clamp-2"
                  >
                    {language === 'te' ? product.nameTe : product.name}
                  </button>

                  {product.fabricDetails && (
                    <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-[11px] space-y-1 text-stone-600">
                      <p className="flex justify-between font-semibold text-stone-900">
                        <span>GSM Density:</span>
                        <span className="font-serif text-amber-900">{product.fabricDetails.gsm} GSM</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Composition:</span>
                        <span className="truncate max-w-[180px]">{product.fabricDetails.composition}</span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Meter Selection */}
                {product.variants.meters && (
                  <div className="space-y-2 pt-2 border-t border-stone-100">
                    <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                      Select Cut Length (Meters)
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {product.variants.meters.map((m) => (
                        <button
                          key={m}
                          onClick={() => handleMeterChange(product.id, m)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                            meters === m 
                              ? 'bg-stone-900 border-stone-900 text-white shadow-md' 
                              : 'bg-stone-50 border-stone-300 text-stone-700 hover:bg-stone-100'
                          }`}
                        >
                          {m}m
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color Selection */}
                {product.variants.colors && (
                  <div className="space-y-2 pt-2 border-t border-stone-100">
                    <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                      Color Variant: <span className="font-semibold text-amber-800">{color}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.colors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => handleColorChange(product.id, c.name)}
                          className={`w-7 h-7 rounded-full border-2 transition-transform ${
                            color === c.name ? 'border-stone-950 scale-125 shadow-md' : 'border-stone-300 hover:scale-110'
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Pricing Calculation & Add to Cart */}
                <div className="pt-4 border-t border-stone-200 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-stone-500 font-medium">Total for {meters} Meters:</span>
                    <span className="font-serif font-bold text-stone-950 text-xl text-amber-900">
                      ₹{totalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart({ product, quantity: 1, selectedMeters: meters, selectedColor: color })}
                    className="w-full bg-stone-900 hover:bg-stone-950 text-white py-3 rounded-xl text-xs font-bold tracking-wider uppercase shadow-lg flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{language === 'te' ? 'కార్ట్‌కు జోడించు' : `ADD ${meters}M TO BAG`}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
