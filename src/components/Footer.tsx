import React from 'react';
import { Plane, MapPin, Phone, Mail, MessageSquare, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { BUSINESS_INFO } from '../data/servicesData';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}`;

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-24 lg:pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-emerald-500 flex items-center justify-center text-white shadow-md">
                <Plane className="w-6 h-6 transform -rotate-12" />
              </div>
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight font-['Plus_Jakarta_Sans']">
                  HAASHIYA
                </span>
                <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                  CSC & Air Travels
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {lang === 'ta'
                ? 'மிமிசால் கிழக்கு கடற்கரை சாலையில் இயங்கி வரும் பாஸ்போர்ட், விசா, விமான பயண சீட்டு மற்றும் அரசு இ-சேவை மையம்.'
                : 'Authorized travel agency and Common Service Center in Mimisal, East Coast Road. Complete solutions for Passport, Visa, PAN & e-Sevai.'}
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>GST: <strong className="text-slate-200">{BUSINESS_INFO.gst}</strong></span>
              </p>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {lang === 'ta' ? 'முதன்மை சேவைகள்' : 'Popular Services'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">PCC & Passport Application</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Tatkal Passport Emergency</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Gulf & Overseas Visa Services</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Domestic & International Flight Tickets</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">PAN Card (New & Correction)</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">e-Sevai TN Certificates & Patta</a></li>
            </ul>
          </div>

          {/* Office Address */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {lang === 'ta' ? 'அலுவலக முகவரி' : 'Office Address'}
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:+91${BUSINESS_INFO.phone}`} className="hover:text-white font-bold">{BUSINESS_INFO.phone}</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{BUSINESS_INFO.email}</span>
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {lang === 'ta' ? 'உடனடி தொடர்பு' : 'Instant Connect'}
            </h4>
            <p className="text-xs text-slate-400">
              {lang === 'ta' 
                ? 'ஆவண சந்தேகங்களுக்கு வாட்ஸ்அப் அல்லது போன் மூலம் எங்களை எப்போது வேண்டுமானாலும் அழைக்கலாம்.' 
                : 'Direct assistance on WhatsApp for fast response in Mimisal.'}
            </p>
            <div className="space-y-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors w-full"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WhatsApp Chat</span>
              </a>
              <a
                href={`tel:+91${BUSINESS_INFO.phone}`}
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-colors w-full"
              >
                <Phone className="w-4 h-4 text-sky-400" />
                <span>{lang === 'ta' ? 'அழைக்க: 9952595090' : 'Call 9952595090'}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Copyright & SEO Footer Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Haashiya Air Travels, Mimisal. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Passport Agent Mimisal • PAN Card Agent East Coast Road • e-Sevai Center 614621
          </p>
        </div>

      </div>
    </footer>
  );
};
