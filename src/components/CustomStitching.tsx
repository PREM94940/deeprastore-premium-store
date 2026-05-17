import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Scissors, Upload, CheckCircle2, MessageSquare, ShoppingBag } from 'lucide-react';

export const CustomStitching: React.FC = () => {
  const { products, addToCart, language, showToast } = useApp();
  const blouseProduct = products.find(p => p.category === 'custom-blouses') || products[3];

  const [bust, setBust] = useState('34');
  const [waist, setWaist] = useState('28');
  const [armhole, setArmhole] = useState('15');
  const [length, setLength] = useState('14');
  const [neckline, setNeckline] = useState('Deep U Neck with Tassels');
  const [notes, setNotes] = useState('Please provide padded cups and elbow length sleeves with zari border.');
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleUploadSimulate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageUploaded(true);
      showToast('Reference design uploaded successfully!');
    }
  };

  const handleAddCustomOrder = () => {
    const details = {
      bust,
      waist,
      armhole,
      blouseLength: length,
      neckline,
      notes,
      referenceImageUploaded: imageUploaded
    };

    addToCart({
      product: blouseProduct,
      quantity: 1,
      isCustomStitching: true,
      stitchingDetails: details
    });

    showToast('Custom blouse tailoring order added to bag! Proceed to checkout.');
  };

  const handleWhatsAppConsult = () => {
    const text = language === 'te'
      ? `నమస్తే దీప్రాస్టోర్! నేను కస్టమ్ బ్లౌజ్ స్టిచ్చింగ్ చేయించుకోవాలనుకుంటున్నాను. కొలతలు: బస్ట్ ${bust}, నడుము ${waist}, పొడవు ${length}.`
      : `Hello Deeprastore! I want to order a custom tailored designer blouse. Measurements: Bust ${bust}, Waist ${waist}, Length ${length}.`;
    window.open(`https://wa.me/919849012345?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      
      {/* Studio Header */}
      <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 mb-12 relative overflow-hidden shadow-2xl border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-xl space-y-4 relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase">
            <Scissors className="w-4 h-4" />
            <span>{language === 'te' ? 'కస్టమ్ బ్లౌజ్ స్టిచ్చింగ్ స్టూడియో' : 'BESPOKE TAILORING STUDIO'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            {language === 'te' ? 'డిజైనర్ బ్లౌజ్ కస్టమ్ స్టిచ్చింగ్' : 'Master Tailored Designer Blouses'}
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
            {language === 'te' 
              ? 'మీ కొలతలకు సరిగ్గా సరిపోయే డిజైనర్ బ్లౌజ్ కుట్టించుకోండి. మా అనుభవజ్ఞులైన టైలర్లచే ప్రత్యేకంగా రూపొందించబడుతుంది.'
              : 'Experience flawless fitting with Deeprastore master tailors. Submit your exact measurements, upload a reference design, and receive a beautifully finished bespoke blouse at your doorstep.'}
          </p>
          <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start text-xs font-medium text-amber-200">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Premium Cotton Lining</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Padded Cups Included</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Expert Hand Finishing</span>
          </div>
        </div>
        <div className="relative z-10 shrink-0 hidden md:block">
          <img src={blouseProduct.images[0]} alt="Bespoke Tailoring" className="w-56 h-72 object-cover rounded-2xl shadow-2xl border-4 border-stone-800 transform rotate-2" />
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-stone-200 space-y-8">
        
        <div>
          <h2 className="text-2xl font-serif font-bold text-stone-950 mb-2">
            {language === 'te' ? 'దశ 1: మీ కొలతలను నమోదు చేయండి (అంగుళాలలో)' : 'Step 1: Enter Your Exact Measurements (Inches)'}
          </h2>
          <p className="text-xs text-stone-500">Provide accurate body measurements or standard garment measurements for perfect fitting.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Bust Size (Inches)</label>
            <input 
              type="number" 
              value={bust} 
              onChange={(e) => setBust(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700" 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Waist Size (Inches)</label>
            <input 
              type="number" 
              value={waist} 
              onChange={(e) => setWaist(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700" 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Armhole (Inches)</label>
            <input 
              type="number" 
              value={armhole} 
              onChange={(e) => setArmhole(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700" 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Blouse Length (Inches)</label>
            <input 
              type="number" 
              value={length} 
              onChange={(e) => setLength(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700" 
            />
          </div>
        </div>

        <div className="pt-6 border-t border-stone-200 space-y-6">
          <div>
            <h2 className="text-2xl font-serif font-bold text-stone-950 mb-2">
              {language === 'te' ? 'దశ 2: డిజైన్ శైలి & రిఫరెన్స్ ఇమేజ్' : 'Step 2: Neckline Style & Reference Design'}
            </h2>
            <p className="text-xs text-stone-500">Choose your neckline and attach an inspiration photo from Instagram or Pinterest.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Preferred Neckline / Back Design</label>
              <select 
                value={neckline}
                onChange={(e) => setNeckline(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700"
              >
                <option value="Deep U Neck with Tassels">Deep U Neck with Tassels</option>
                <option value="Elegant Boat Neck">Elegant Boat Neck</option>
                <option value="Traditional Sweetheart Neck">Traditional Sweetheart Neck</option>
                <option value="Contemporary Halter Neck">Contemporary Halter Neck</option>
                <option value="High Collar Keyhole Back">High Collar Keyhole Back</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Upload Reference Image (Optional)</label>
              <label className="flex items-center justify-center gap-2 w-full bg-stone-50 border-2 border-dashed border-stone-300 hover:border-amber-700 rounded-xl px-4 py-2 cursor-pointer transition-colors">
                <Upload className="w-4 h-4 text-stone-500" />
                <span className="text-xs font-semibold text-stone-700">
                  {imageUploaded ? '✅ Reference Design Uploaded' : 'Click to Upload Inspiration Photo'}
                </span>
                <input type="file" accept="image/*" onChange={handleUploadSimulate} className="hidden" />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Special Tailoring Notes & Embellishments</label>
            <textarea 
              rows={3} 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl p-4 text-xs font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700"
              placeholder="E.g., Please include padded cups, elbow length sleeves with heavy gold zari border, and matching latkans..."
            />
          </div>
        </div>

        {/* Pricing Summary & Action */}
        <div className="pt-6 border-t border-stone-200 bg-amber-50/50 p-6 rounded-2xl border border-amber-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Fixed Tailoring Package</span>
            <div className="flex items-baseline gap-3 justify-center md:justify-start">
              <span className="text-3xl font-serif font-bold text-stone-950">₹{blouseProduct.price.toLocaleString('en-IN')}</span>
              <span className="text-sm text-stone-400 line-through">₹{blouseProduct.originalPrice?.toLocaleString('en-IN')}</span>
            </div>
            <p className="text-[11px] text-stone-600">Inclusive of premium cotton lining, padded cups, tailoring labor & express shipping.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button
              onClick={handleWhatsAppConsult}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>{language === 'te' ? 'వాట్సాప్ లో మాట్లాడండి' : 'CONSULT ON WHATSAPP'}</span>
            </button>

            <button
              onClick={handleAddCustomOrder}
              className="bg-stone-900 hover:bg-stone-950 text-white px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{language === 'te' ? 'కార్ట్‌కు జోడించు' : 'CONFIRM & ADD TO BAG'}</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
