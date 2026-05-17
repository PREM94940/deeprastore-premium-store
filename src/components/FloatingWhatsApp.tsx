import React from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FloatingWhatsApp: React.FC = () => {
  const { language } = useApp();

  const handleWhatsAppClick = () => {
    const text = language === 'te' 
      ? 'నమస్తే దీప్రాస్టోర్! నేను మీ ప్రీమియం కలెక్షన్స్ మరియు కస్టమ్ స్టిచ్చింగ్ గురించి తెలుసుకోవాలనుకుంటున్నాను.'
      : 'Hello Deeprastore! I am interested in your premium collections and custom stitching services.';
    window.open(`https://wa.me/919849012345?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 animate-fade-in">
      <div className="bg-white text-stone-800 text-xs px-3 py-1.5 rounded-full shadow-lg border border-stone-200 flex items-center gap-1.5 font-medium animate-pulse">
        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
        <span>{language === 'te' ? 'వాట్సాప్ లో చాట్ చేయండి' : 'Chat with Stylist'}</span>
      </div>
      <button
        onClick={handleWhatsAppClick}
        className="bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
        title="WhatsApp Support"
      >
        <MessageSquare className="w-6 h-6 fill-current" />
      </button>
    </div>
  );
};
