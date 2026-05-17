import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Star, 
  Heart, 
  Share2, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  Ruler, 
  Layers, 
  CheckCircle2, 
  AlertCircle,
  Play,
  Maximize2
} from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { 
    products, 
    selectedProductId, 
    setSelectedProductId, 
    setCurrentView, 
    addToCart, 
    wishlist, 
    toggleWishlist,
    pincode,
    checkPincodeDelivery,
    language,
    showToast
  } = useApp();

  const product = products.find(p => p.id === selectedProductId) || products[0];

  const [mainImage, setMainImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.variants.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.variants.colors?.[0]?.name || '');
  const [selectedMeters, setSelectedMeters] = useState(product.variants.meters?.[0] || 1);
  const [quantity, setQuantity] = useState(1);

  const [activeTab, setActiveTab] = useState<'desc' | 'fabric' | 'shipping'>('desc');
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const [checkPin, setCheckPin] = useState(pincode);
  const [pinStatus, setPinStatus] = useState<{ available: boolean; cod: boolean; days: number } | null>(null);

  const relatedProducts = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);
  const frequentlyBought = products.find(p => p.id !== product.id && p.category === 'custom-blouses') || products[1];

  let calculatedPrice = product.price;
  if (product.category === 'fabrics') {
    calculatedPrice = product.price * selectedMeters;
  }

  const handleAddToCart = () => {
    addToCart({
      product,
      quantity,
      selectedSize: selectedSize || undefined,
      selectedColor: selectedColor || undefined,
      selectedMeters: product.category === 'fabrics' ? selectedMeters : undefined
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Product link copied to clipboard!');
  };

  const handleCheckPin = (e: React.FormEvent) => {
    e.preventDefault();
    setPinStatus(checkPincodeDelivery(checkPin));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in pb-32">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-stone-500 mb-8 uppercase tracking-wider">
        <button onClick={() => setCurrentView('storefront')} className="hover:text-stone-900">
          {language === 'te' ? 'హోమ్' : 'Home'}
        </button>
        <span>/</span>
        <button onClick={() => { setCurrentView('collection'); }} className="hover:text-stone-900">
          {product.category.replace('-', ' ')}
        </button>
        <span>/</span>
        <span className="text-stone-900 font-semibold truncate max-w-xs">
          {language === 'te' ? product.nameTe : product.name}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Gallery Section */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-stone-100 border border-stone-200 group shadow-lg">
            {showVideo && product.videoUrl ? (
              <video 
                src={product.videoUrl} 
                controls 
                autoPlay 
                className="w-full h-full object-cover" 
              />
            ) : (
              <img 
                src={mainImage} 
                alt={product.name} 
                className={`w-full h-full object-cover object-top transition-transform duration-500 ${isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}`}
                onClick={() => setIsZoomed(!isZoomed)}
              />
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {product.isBestSeller && (
                <span className="bg-amber-800 text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full shadow">
                  Bestseller
                </span>
              )}
              {product.stockStatus === 'preorder' && (
                <span className="bg-stone-900 text-amber-400 text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full shadow">
                  Pre-order Available
                </span>
              )}
            </div>

            {/* Zoom / Video Toggle Controls */}
            <div className="absolute bottom-4 right-4 flex gap-2 z-10">
              {product.videoUrl && (
                <button 
                  onClick={() => setShowVideo(!showVideo)}
                  className={`p-3 rounded-full shadow-lg backdrop-blur-md flex items-center justify-center transition-all ${
                    showVideo ? 'bg-amber-500 text-stone-950' : 'bg-stone-900/80 text-white hover:bg-stone-900'
                  }`}
                  title="Toggle Product Video"
                >
                  <Play className="w-4 h-4 fill-current" />
                </button>
              )}
              <button 
                onClick={() => { setIsZoomed(!isZoomed); setShowVideo(false); }}
                className="p-3 bg-stone-900/80 hover:bg-stone-900 text-white rounded-full shadow-lg backdrop-blur-md flex items-center justify-center transition-all"
                title="Zoom Simulation"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-5 gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => { setMainImage(img); setShowVideo(false); }}
                className={`aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all ${
                  mainImage === img && !showVideo ? 'border-amber-700 shadow-md scale-105' : 'border-stone-200 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover object-top" />
              </button>
            ))}
            {product.videoUrl && (
              <button
                onClick={() => setShowVideo(true)}
                className={`aspect-[3/4] rounded-xl overflow-hidden border-2 bg-stone-900 flex flex-col items-center justify-center text-white transition-all ${
                  showVideo ? 'border-amber-700 shadow-md scale-105' : 'border-stone-800 opacity-70 hover:opacity-100'
                }`}
              >
                <Play className="w-6 h-6 fill-current text-amber-400 mb-1" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Video</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Details Section */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="space-y-2 border-b border-stone-200 pb-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-800 uppercase tracking-widest bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                {product.category.replace('-', ' ')}
              </span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => toggleWishlist(product.id)}
                  className="p-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors" 
                  title="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${wishlist.includes(product.id) ? 'fill-amber-700 text-amber-700' : ''}`} />
                </button>
                <button 
                  onClick={handleShare}
                  className="p-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors" 
                  title="Share"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-950 leading-tight">
              {language === 'te' ? product.nameTe : product.name}
            </h1>

            <div className="flex items-center gap-4 pt-1">
              <div className="flex items-center gap-1 text-amber-700 font-semibold text-sm bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                <Star className="w-4 h-4 fill-current" />
                <span>{product.rating}</span>
                <span className="text-stone-500 font-normal text-xs">({product.reviewsCount} reviews)</span>
              </div>
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> 100% Authentic Silk Mark
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-serif font-bold text-stone-950">
                ₹{calculatedPrice.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-base text-stone-400 line-through">
                  ₹{(product.originalPrice * (product.category === 'fabrics' ? selectedMeters : 1)).toLocaleString('en-IN')}
                </span>
              )}
              {product.originalPrice && (
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              )}
            </div>
            <p className="text-[11px] text-stone-500">
              {product.category === 'fabrics' ? 'Price calculated based on selected meters. Inclusive of all taxes.' : 'Inclusive of all premium packaging & taxes.'}
            </p>
          </div>

          {/* Variant Selector: Sizes */}
          {product.variants.sizes && (
            <div className="space-y-3 pt-4 border-t border-stone-200">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Select Size
                </label>
                <button 
                  onClick={() => setShowSizeChart(true)} 
                  className="text-xs text-amber-800 hover:text-amber-950 font-semibold flex items-center gap-1 underline"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  {language === 'te' ? 'సైజ్ చార్ట్ చూడండి' : 'Size Chart & Fit Guide'}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.variants.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                      selectedSize === size 
                        ? 'bg-stone-900 border-stone-900 text-white shadow-md' 
                        : 'bg-white border-stone-300 text-stone-700 hover:border-stone-600'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Variant Selector: Colors */}
          {product.variants.colors && (
            <div className="space-y-3 pt-4 border-t border-stone-200">
              <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                Select Color / Weave: <span className="font-semibold text-amber-800">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {product.variants.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-9 h-9 rounded-full border-2 transition-transform ${
                      selectedColor === color.name ? 'border-stone-950 scale-125 shadow-md' : 'border-stone-300 hover:scale-110'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Variant Selector: Meters (For Fabric Store System) */}
          {product.variants.meters && (
            <div className="space-y-3 pt-4 border-t border-stone-200 bg-amber-50/50 p-4 rounded-2xl border border-amber-200">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-amber-700" />
                  <span>Select Continuous Cut (Meters)</span>
                </label>
                <span className="text-xs font-semibold text-amber-900">₹{product.price}/meter</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.variants.meters.map((meter) => (
                  <button
                    key={meter}
                    onClick={() => setSelectedMeters(meter)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      selectedMeters === meter 
                        ? 'bg-amber-800 border-amber-800 text-white shadow-md' 
                        : 'bg-white border-stone-300 text-stone-800 hover:border-amber-600'
                    }`}
                  >
                    {meter} {meter === 1 ? 'Meter' : 'Meters'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Controls */}
          <div className="space-y-3 pt-4 border-t border-stone-200">
            <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
              Quantity
            </label>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-stone-300 rounded-xl bg-white overflow-hidden shadow-sm">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2.5 text-stone-600 hover:bg-stone-100 font-bold text-sm transition-colors"
                >
                  -
                </button>
                <span className="px-4 text-sm font-semibold text-stone-900">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2.5 text-stone-600 hover:bg-stone-100 font-bold text-sm transition-colors"
                >
                  +
                </button>
              </div>

              <div className="text-xs text-stone-500 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{product.inventory > 0 ? `In Stock (${product.inventory} available)` : 'Pre-order allocation'}</span>
              </div>
            </div>
          </div>

          {/* Add to Cart & Buy Now Buttons */}
          <div className="space-y-3 pt-4">
            <button
              onClick={handleAddToCart}
              className="w-full bg-stone-900 hover:bg-stone-950 text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest shadow-xl transition-all hover:shadow-stone-900/20 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{language === 'te' ? 'కార్ట్‌కు జోడించు' : 'ADD TO SHOPPING BAG'}</span>
            </button>

            <button
              onClick={() => { handleAddToCart(); setCurrentView('checkout'); }}
              className="w-full bg-amber-800 hover:bg-amber-900 text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest shadow-xl transition-all"
            >
              {language === 'te' ? 'ఇప్పుడే కొనండి' : 'BUY IT NOW (EXPRESS CHECKOUT)'}
            </button>
          </div>

          {/* Pincode Delivery Estimate Checker */}
          <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-stone-700" />
              <span>Delivery Estimate & COD Availability</span>
            </h3>
            <form onSubmit={handleCheckPin} className="flex gap-2">
              <input 
                type="text" 
                placeholder="Enter 6-digit Pincode..."
                value={checkPin}
                onChange={(e) => setCheckPin(e.target.value)}
                className="flex-1 bg-white border border-stone-300 rounded-xl px-4 py-2 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
              <button type="submit" className="bg-stone-800 hover:bg-stone-900 text-white px-5 py-2 rounded-xl text-xs font-semibold">
                Check
              </button>
            </form>
            {pinStatus && (
              <div className={`p-3 rounded-xl text-xs flex items-start gap-2 ${pinStatus.available ? 'bg-emerald-50 text-emerald-950 border border-emerald-200' : 'bg-red-50 text-red-950 border border-red-200'}`}>
                {pinStatus.available ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Delivery in {pinStatus.days} business days.</p>
                      <p className="text-stone-600 mt-0.5">{pinStatus.cod ? '💵 Cash on Delivery (COD) is available.' : '💳 Prepaid orders only for this pincode.'}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <p>Shipping is currently unavailable to this pincode. Please try another address.</p>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Frequently Bought Together */}
          <div className="p-5 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-3">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              {language === 'te' ? 'తరచుగా కలిసి కొనుగోలు చేసేవి' : 'Frequently Bought Together'}
            </h3>
            <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-amber-100 shadow-sm">
              <img src={frequentlyBought.images[0]} alt="" className="w-14 h-16 object-cover rounded-lg border border-stone-200 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-stone-900 truncate">{frequentlyBought.name}</p>
                <p className="text-xs font-serif font-bold text-amber-800 mt-0.5">₹{frequentlyBought.price.toLocaleString('en-IN')}</p>
              </div>
              <button 
                onClick={() => addToCart({ product: frequentlyBought, quantity: 1, selectedSize: frequentlyBought.variants.sizes?.[0] })}
                className="bg-stone-900 hover:bg-stone-950 text-white px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wider uppercase shrink-0"
              >
                Add Bundle
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Tabs: Description, Fabric Details, Shipping Policy */}
      <div className="mt-16 pt-12 border-t border-stone-200">
        <div className="flex border-b border-stone-200 gap-8 overflow-x-auto">
          {[
            { id: 'desc', label: language === 'te' ? 'వివరణ' : 'Product Story & Details' },
            { id: 'fabric', label: language === 'te' ? 'ఫ్యాబ్రిక్ వివరాలు' : 'Fabric GSM & Composition' },
            { id: 'shipping', label: language === 'te' ? 'షిప్పింగ్ & రిటర్న్స్' : 'Shipping & Returns' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 text-sm font-semibold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
                activeTab === tab.id ? 'border-stone-900 text-stone-950 font-bold' : 'border-transparent text-stone-400 hover:text-stone-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-8 max-w-3xl text-sm text-stone-700 leading-relaxed space-y-4">
          {activeTab === 'desc' && (
            <div className="space-y-4 animate-fade-in">
              <p className="font-light text-base text-stone-800">
                {language === 'te' ? product.descriptionTe : product.description}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-100">
                <div>
                  <span className="block text-xs text-stone-400 uppercase">Category</span>
                  <span className="font-medium text-stone-900 capitalize">{product.category.replace('-', ' ')}</span>
                </div>
                <div>
                  <span className="block text-xs text-stone-400 uppercase">Tags</span>
                  <span className="font-medium text-stone-900">{product.tags.join(', ')}</span>
                </div>
                <div>
                  <span className="block text-xs text-stone-400 uppercase">Silk Mark</span>
                  <span className="font-medium text-emerald-600">100% Certified Pure</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fabric' && (
            <div className="space-y-4 animate-fade-in">
              {product.fabricDetails ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-stone-50 p-6 rounded-2xl border border-stone-200">
                  <div>
                    <span className="block text-xs text-stone-400 uppercase font-semibold mb-1">Fabric GSM (Density)</span>
                    <span className="text-lg font-serif font-bold text-stone-950">{product.fabricDetails.gsm} GSM</span>
                    <p className="text-xs text-stone-500 mt-1">Perfect weight for luxurious drape and structural integrity.</p>
                  </div>
                  <div>
                    <span className="block text-xs text-stone-400 uppercase font-semibold mb-1">Composition</span>
                    <span className="text-sm font-medium text-stone-900">{product.fabricDetails.composition}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-stone-400 uppercase font-semibold mb-1">Weave Technique</span>
                    <span className="text-sm font-medium text-stone-900">{product.fabricDetails.weave}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-stone-400 uppercase font-semibold mb-1">Care Instructions</span>
                    <span className="text-sm font-medium text-stone-900">{product.fabricDetails.care}</span>
                  </div>
                </div>
              ) : (
                <p>Pure handloom fabric crafted by master artisans. Dry clean recommended.</p>
              )}
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4 bg-stone-50 p-6 rounded-2xl border border-stone-200 animate-fade-in">
              <h4 className="font-bold text-stone-900">Complimentary Express Shipping</h4>
              <p className="text-xs text-stone-600">
                All orders are dispatched within 24-48 hours in premium tamper-proof Deeprastore gift packaging. Delivery takes 3-5 business days across India.
              </p>
              <h4 className="font-bold text-stone-900 pt-2">Easy 7-Day Exchange Policy</h4>
              <p className="text-xs text-stone-600">
                We offer a hassle-free exchange policy for unstitched sarees and fabrics. Custom stitched blouses are tailored to your exact measurements and are eligible for complimentary alterations.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-16 pt-12 border-t border-stone-200 space-y-8">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-950 text-center">
          {language === 'te' ? 'సంబంధిత ఉత్పత్తులు' : 'Explore Similar Masterpieces'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((rel) => (
            <div key={rel.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-stone-200 flex flex-col">
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                <img src={rel.images[0]} alt={rel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => { setSelectedProductId(rel.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="w-full bg-stone-900 text-white py-2 rounded-xl text-xs font-semibold uppercase tracking-wider"
                  >
                    View Details
                  </button>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <p className="font-serif font-bold text-stone-900 text-sm line-clamp-2">{rel.name}</p>
                <p className="font-serif font-bold text-amber-800 text-base">₹{rel.price.toLocaleString('en-IN')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Add-to-Cart Bar */}
      <div className="fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-stone-200 py-4 px-6 shadow-2xl flex items-center justify-between animate-fade-in">
        <div className="flex items-center gap-4 max-w-xl truncate">
          <img src={mainImage} alt="" className="w-12 h-14 object-cover rounded-lg border border-stone-200 shrink-0 hidden sm:block" />
          <div className="truncate">
            <p className="text-xs font-bold text-stone-900 truncate">{language === 'te' ? product.nameTe : product.name}</p>
            <p className="text-xs font-serif font-bold text-amber-800">₹{calculatedPrice.toLocaleString('en-IN')}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden md:flex items-center border border-stone-300 rounded-xl bg-stone-50 overflow-hidden">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1.5 text-stone-600 font-bold">-</button>
            <span className="px-3 text-xs font-semibold">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1.5 text-stone-600 font-bold">+</button>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-stone-900 hover:bg-stone-950 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg transition-all flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{language === 'te' ? 'కార్ట్‌కు జోడించు' : 'ADD TO BAG'}</span>
          </button>
        </div>
      </div>

      {/* Size Chart Modal */}
      {showSizeChart && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl relative border border-stone-200 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowSizeChart(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-700">
              <span className="text-2xl">&times;</span>
            </button>
            <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">Deeprastore Master Fit Guide</h3>
            <p className="text-xs text-stone-500 mb-6">All measurements are in inches. Designed for premium Indian ethnic wear silhouettes.</p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-stone-100 text-stone-800 uppercase tracking-wider border-b border-stone-300">
                    <th className="p-3">Size</th>
                    <th className="p-3">Bust</th>
                    <th className="p-3">Waist</th>
                    <th className="p-3">Hip</th>
                    <th className="p-3">Shoulder</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  <tr><td className="p-3 font-bold">XS (30)</td><td className="p-3">32"</td><td className="p-3">26"</td><td className="p-3">36"</td><td className="p-3">13.5"</td></tr>
                  <tr><td className="p-3 font-bold">S (32)</td><td className="p-3">34"</td><td className="p-3">28"</td><td className="p-3">38"</td><td className="p-3">14"</td></tr>
                  <tr><td className="p-3 font-bold">M (34)</td><td className="p-3">36"</td><td className="p-3">30"</td><td className="p-3">40"</td><td className="p-3">14.5"</td></tr>
                  <tr><td className="p-3 font-bold">L (36)</td><td className="p-3">38"</td><td className="p-3">32"</td><td className="p-3">42"</td><td className="p-3">15"</td></tr>
                  <tr><td className="p-3 font-bold">XL (38)</td><td className="p-3">40"</td><td className="p-3">34"</td><td className="p-3">44"</td><td className="p-3">15.5"</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 pt-6 border-t border-stone-200 text-xs text-stone-500">
              <p>💡 Need bespoke alterations? Try our <strong>Custom Stitching Studio</strong> to upload your exact measurements for a flawless designer fit.</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
