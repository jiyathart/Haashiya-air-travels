import React from 'react';
import { Phone, MessageSquare, MapPin } from 'lucide-react';
import { Language } from '../types';
import { BUSINESS_INFO } from '../data/servicesData';

interface QuickContactBarProps {
  lang: Language;
}

export const QuickContactBar: React.FC<QuickContactBarProps> = ({ lang }) => {
  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
    lang === 'ta' 
      ? 'வணக்கம் ஹாஷியா டிராவல்ஸ், எனக்கு சேவை விவரங்கள் தேவை.' 
      : 'Hi Haashiya Air Travels, I need assistance with your services.'
  )}`;

  return (
    <>
      {/* Top Banner for Desktop */}
      <div className="hidden lg:block bg-slate-100/90 text-slate-700 text-xs py-2 px-4 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-emerald-800 font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              {lang === 'ta' ? 'அலுவலகம் திறந்துள்ளது • காலை 8:30 - இரவு 8:30' : 'Office Open Now • 8:30 AM - 8:30 PM'}
            </span>
            <span className="flex items-center gap-1 text-slate-600 font-medium">
              <MapPin className="w-3.5 h-3.5 text-sky-600" />
              {BUSINESS_INFO.address}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-slate-500 font-medium">{lang === 'ta' ? 'GST அங்கீகாரம்:' : 'GST Registered Agency'}</span>
            <a 
              href={`tel:+91${BUSINESS_INFO.phone}`} 
              className="font-bold text-slate-900 hover:text-emerald-700 transition-colors flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              {BUSINESS_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Floating Action Bar at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl lg:hidden">
        <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
          <a
            href={`tel:+91${BUSINESS_INFO.phone}`}
            id="mobile-call-btn"
            className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all text-sm"
          >
            <Phone className="w-4 h-4 text-sky-400 fill-sky-400" />
            <span>{lang === 'ta' ? 'அழைக்க' : 'Call Now'}</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="mobile-whatsapp-btn"
            className="relative flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all text-sm overflow-hidden group"
          >
            {/* Soft Glow Pulse Effect */}
            <span className="absolute inset-0 bg-emerald-400/20 rounded-xl animate-pulse pointer-events-none"></span>
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </>
  );
};
