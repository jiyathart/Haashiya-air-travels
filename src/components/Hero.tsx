import React from 'react';
import { motion } from 'motion/react';
import { Phone, MessageSquare, Search, ShieldCheck, CheckCircle2, MapPin, Sparkles, Plane, Clock } from 'lucide-react';
import { Language } from '../types';
import { BUSINESS_INFO } from '../data/servicesData';

interface HeroProps {
  lang: Language;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearchSubmit: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, searchQuery, setSearchQuery, onSearchSubmit }) => {
  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
    lang === 'ta' 
      ? 'வணக்கம், ஹாஷியா டிராவல்ஸ் மிமிசால். எனக்கு சேவை பற்றிய உதவி தேவை.' 
      : 'Hi Haashiya Air Travels Mimisal, I would like to enquire about your passport & government services.'
  )}`;

  const quickSearches = [
    { label: { en: 'PCC Certificate', ta: 'PCC சான்றிதழ்' }, term: 'PCC' },
    { label: { en: 'Tatkal Passport', ta: 'தட்கல் பாஸ்போர்ட்' }, term: 'Tatkal' },
    { label: { en: 'PAN Card', ta: 'பான் கார்டு' }, term: 'PAN' },
    { label: { en: 'Flight Tickets', ta: 'விமான டிக்கெட்' }, term: 'Airline' },
    { label: { en: 'e-Sevai / Patta', ta: 'இ-சேவை' }, term: 'e-Sevai' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section id="home" className="relative bg-gradient-to-b from-sky-50/90 via-white to-slate-50 text-slate-900 overflow-hidden pt-8 pb-16 lg:py-24 border-b border-slate-200/80 min-h-[85vh] flex items-center">
      {/* High-Resolution Travel Photography Background with Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-35">
        <img
          src="/src/assets/images/hero_travel_banner_1785767432806.jpg"
          alt="Haashiya Air Travels Passport and Airline Tickets Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 filter brightness-110 contrast-95 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-sky-50/70"></div>
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Content with Staggered Entrance */}
          <motion.div 
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            
            {/* Location & Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-xs backdrop-blur-md">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  {lang === 'ta' 
                    ? 'கிழக்கு கடற்கரை சாலை, மிமிசால் • அங்கீகரிக்கப்பட்ட மையம்' 
                    : 'East Coast Road, Mimisal • Authorized Agency & CSC'}
                </span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight"
            >
              {lang === 'ta' ? (
                <>
                  உங்கள் பாஸ்போர்ட், விசா, பான் கார்டு மற்றும் <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-sky-700 to-emerald-600">அரசு சேவைகளுக்கான</span> ஒரே மையம்
                </>
              ) : (
                <>
                  Your One-Stop Center for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-sky-700 to-emerald-600">Passport, Visa, PAN Card</span> & Government Services
                </>
              )}
            </motion.h1>

            {/* Subheading */}
            <motion.p 
              variants={itemVariants}
              className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed"
            >
              {lang === 'ta' 
                ? 'மிமிசால் மற்றும் சுற்றியுள்ள பகுதிகளுக்கான நம்பகமான டிராவல்ஸ் & இ-சேவை மையம். விரைவான பாஸ்போர்ட், தட்கல், PCC, ஏர் டிக்கெட் மற்றும் அனைத்து அரசு சான்றிதழ் உதவிகள்.' 
                : 'Trusted agency on East Coast Road, Mimisal. Expert guidance for New Passport, PCC, Tatkal, Visa, Air Ticketing, PAN Card, and Tamil Nadu e-Sevai services.'}
            </motion.p>

            {/* Instant Search Bar */}
            <motion.div variants={itemVariants} className="pt-2 max-w-xl mx-auto lg:mx-0">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  onSearchSubmit();
                }}
                className="relative flex items-center bg-white border border-slate-300 rounded-2xl p-1.5 shadow-xl focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all"
              >
                <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    lang === 'ta'
                      ? 'தேவையான சேவையை தேடுங்கள் (எ.கா: பாஸ்போர்ட், பான், PCC)...'
                      : 'Search any service (e.g., Passport, Tatkal, PCC, PAN Card)...'
                  }
                  className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm px-3 py-2 focus:outline-none font-medium"
                />
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shrink-0 shadow-md"
                >
                  {lang === 'ta' ? 'தேடுக' : 'Search'}
                </button>
              </form>

              {/* Quick Filter Tags */}
              <div className="flex flex-wrap items-center gap-1.5 mt-3 text-xs text-slate-600 justify-center lg:justify-start">
                <span className="font-semibold text-slate-500 mr-1">{lang === 'ta' ? 'பிரபலமானவை:' : 'Popular:'}</span>
                {quickSearches.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSearchQuery(item.term);
                      onSearchSubmit();
                    }}
                    className="bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs font-semibold transition-colors"
                  >
                    {item.label[lang]}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons (Call Now / WhatsApp Us) */}
            <motion.div variants={itemVariants} className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-whatsapp-btn"
                className="w-full sm:w-auto relative group flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-600/25 transition-all hover:scale-[1.02]"
              >
                <span className="absolute -inset-1 bg-emerald-400/30 rounded-xl blur-md opacity-50 group-hover:opacity-100 transition-opacity animate-pulse"></span>
                <MessageSquare className="w-5 h-5 fill-white relative z-10" />
                <span className="relative z-10 text-sm">
                  {lang === 'ta' ? 'வாட்ஸ்அப்பில் தொடர்பு கொள்ள' : 'WhatsApp Us Now'}
                </span>
              </a>

              <a
                href={`tel:+91${BUSINESS_INFO.phone}`}
                id="hero-call-btn"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-all border border-slate-800"
              >
                <Phone className="w-5 h-5 text-sky-400" />
                <span className="text-sm">
                  {lang === 'ta' ? `அழைக்க: ${BUSINESS_INFO.phone}` : `Call: ${BUSINESS_INFO.phone}`}
                </span>
              </a>
            </motion.div>

            {/* Trust bullet features */}
            <motion.div variants={itemVariants} className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-700 font-semibold border-t border-slate-200/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{lang === 'ta' ? 'அங்கீகரிக்கப்பட்ட மையம்' : 'Authorized Agency'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{lang === 'ta' ? 'நேரடி வாட்ஸ்அப் உதவி' : 'Direct WhatsApp Help'}</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{lang === 'ta' ? 'தமிழ் மற்றும் ஆங்கிலம்' : 'Tamil & English Staff'}</span>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: Visual Feature Showcase Card */}
          <motion.div 
            className="lg:col-span-5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative mx-auto max-w-md lg:max-w-none bg-white/95 border border-slate-200 rounded-3xl p-6 shadow-xl backdrop-blur-xl">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">HAASHIYA CSC & TRAVELS</h3>
                    <p className="text-xs text-slate-500">Mimisal East Coast Road</p>
                  </div>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                  Verified
                </span>
              </div>

              {/* Service Cards Snapshot */}
              <div className="py-5 space-y-3">
                <div className="bg-sky-50/80 rounded-2xl p-3.5 border border-sky-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-sky-600 text-white flex items-center justify-center shadow-xs">
                      <Plane className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Passport & Visa Processing</p>
                      <p className="text-[11px] text-slate-500">PCC, Renewal, Tatkal & Visas</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">3-7 Days</span>
                </div>

                <div className="bg-emerald-50/80 rounded-2xl p-3.5 border border-emerald-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">e-Sevai & Government Services</p>
                      <p className="text-[11px] text-slate-500">PAN, Patta, Community, EB</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">Fast Process</span>
                </div>

                <div className="bg-amber-50/80 rounded-2xl p-3.5 border border-amber-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-600 text-white flex items-center justify-center shadow-xs">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Airline Flight Tickets</p>
                      <p className="text-[11px] text-slate-500">Gulf, Malaysia, Singapore Fares</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-md">Lowest Rates</span>
                </div>
              </div>

              {/* Bottom Quick Help callout */}
              <div className="pt-3 text-center bg-slate-50 rounded-xl p-3 border border-slate-200">
                <p className="text-xs text-slate-700 font-semibold">
                  {lang === 'ta' 
                    ? 'நேரில் வர இயலவில்லையா? வாட்ஸ்அப் மூலம் ஆவணங்கள் அனுப்பலாம்!' 
                    : 'Need quick document verification? Send docs on WhatsApp!'}
                </p>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

