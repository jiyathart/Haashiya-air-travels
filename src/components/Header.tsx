import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Menu, X, Plane, Languages, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { BUSINESS_INFO } from '../data/servicesData';

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ lang, setLang, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
    lang === 'ta' 
      ? 'வணக்கம், ஹாஷியா டிராவல்ஸ் சேவைகள் பற்றி அறிய விரும்புகிறேன்.' 
      : 'Hi Haashiya Air Travels, I would like to inquire about your services.'
  )}`;

  const navLinks = [
    { id: 'home', label: { en: 'Home', ta: 'முகப்பு' }, href: '#home' },
    { id: 'services', label: { en: 'Services', ta: 'சேவைகள்' }, href: '#services' },
    { id: 'finder', label: { en: 'Check Documents', ta: 'ஆவணங்கள் பட்டியல்' }, href: '#finder' },
    { id: 'google-forms', label: { en: 'Online Forms', ta: 'ஆன்லைன் படிவங்கள்' }, href: '#google-forms' },
    { id: 'why-us', label: { en: 'Why Choose Us', ta: 'ஏன் எங்களை தேர்வு செய்ய வேண்டும்' }, href: '#why-us' },
    { id: 'about', label: { en: 'About Us', ta: 'எங்களைப் பற்றி' }, href: '#about' },
    { id: 'testimonials', label: { en: 'Reviews', ta: 'கருத்துக்கள்' }, href: '#testimonials' },
    { id: 'contact', label: { en: 'Contact Us', ta: 'தொடர்புகொள்ள' }, href: '#contact' }
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-200/80' 
          : 'bg-white py-4 border-b border-slate-200/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand Title */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-sky-600/20 group-hover:scale-105 transition-transform">
              <Plane className="w-6 h-6 transform -rotate-12 group-hover:rotate-0 transition-transform" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl text-slate-900 tracking-tight font-['Plus_Jakarta_Sans']">
                  HAASHIYA
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border border-emerald-200">
                  CSC & Air Travels
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {lang === 'ta' ? 'மிமிசால் • பாஸ்போர்ட் & இ-சேவை மையம்' : 'Mimisal • Passport & Govt Services'}
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all relative ${
                    isActive 
                      ? 'text-emerald-700 bg-emerald-50 font-bold' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  {link.label[lang]}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-emerald-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Header Action Buttons (Language Switcher + Quick Call/WhatsApp) */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Bilingual Toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-200 transition-colors"
              title="Toggle English / தமிழ் Language"
            >
              <Languages className="w-3.5 h-3.5 text-sky-600" />
              <span>{lang === 'en' ? 'தமிழ்' : 'English'}</span>
            </button>

            {/* Desktop WhatsApp CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2 px-3.5 rounded-lg shadow-sm transition-all hover:scale-[1.02]"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp</span>
            </a>

            {/* Desktop Call CTA */}
            <a
              href={`tel:+91${BUSINESS_INFO.phone}`}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2 px-3.5 rounded-lg transition-all shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
          </div>

          {/* Mobile Right Controls (Lang Toggle + Mobile Menu Trigger) */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
              className="px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200"
            >
              {lang === 'en' ? 'தமிழ்' : 'EN'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.href)}
                className="text-left py-2.5 px-3 rounded-lg text-slate-700 hover:bg-slate-100 font-semibold text-sm flex items-center justify-between"
              >
                <span>{link.label[lang]}</span>
                <span className="text-slate-400 text-xs">→</span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-2">
            <a
              href={`tel:+91${BUSINESS_INFO.phone}`}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-900 text-white font-bold rounded-xl text-xs"
            >
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <span>Call Agency</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-600 text-white font-bold rounded-xl text-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
