import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, MessageSquare } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  const isWhatsapp = toastMessage.toLowerCase().includes('whatsapp');

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-fade-in flex items-center gap-3 bg-stone-900 text-stone-100 px-5 py-3 rounded-xl shadow-2xl border border-stone-800 max-w-md">
      {isWhatsapp ? (
        <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0 animate-bounce" />
      ) : (
        <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
      )}
      <span className="text-sm font-medium tracking-wide">{toastMessage}</span>
    </div>
  );
};
