import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, ShieldCheck, ArrowRight, MessageSquare, Phone, FileText, Sparkles, CheckCircle2 } from 'lucide-react';
import { ServiceCategory, ServiceItem, Language } from '../types';
import { SERVICES_DATA, BUSINESS_INFO } from '../data/servicesData';
import { ServiceIcon } from './ServiceIcon';

interface ServicesSectionProps {
  lang: Language;
  onSelectService: (service: ServiceItem) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  lang, 
  onSelectService, 
  searchQuery, 
  setSearchQuery 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');

  const categories: { id: ServiceCategory | 'all'; label: { en: string; ta: string }; icon: string }[] = [
    { id: 'all', label: { en: 'All Services', ta: 'அனைத்து சேவைகள்' }, icon: 'Sparkles' },
    { id: 'passport', label: { en: 'Passport Services', ta: 'பாஸ்போர்ட் சேவைகள்' }, icon: 'BookOpen' },
    { id: 'travel', label: { en: 'Travel & Visa', ta: 'விசா & விமான டிக்கெட்' }, icon: 'Plane' },
    { id: 'medical', label: { en: 'Medical & Attestation', ta: 'மருத்துவம் & அட்டெஸ்டேஷன்' }, icon: 'Stethoscope' },
    { id: 'eservices', label: { en: 'e-Sevai & PAN Card', ta: 'இ-சேவை & பான் கார்டு' }, icon: 'Landmark' },
    { id: 'registration', label: { en: 'Registrations', ta: 'பதிவு சேவைகள்' }, icon: 'HeartHandshake' }
  ];

  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter((service) => {
      const categoryMatch = selectedCategory === 'all' || service.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return categoryMatch;

      const titleEn = service.title.en.toLowerCase();
      const titleTa = service.title.ta.toLowerCase();
      const descEn = service.shortDesc.en.toLowerCase();
      const descTa = service.shortDesc.ta.toLowerCase();
      
      const textMatch = titleEn.includes(query) || titleTa.includes(query) || descEn.includes(query) || descTa.includes(query);
      return categoryMatch && textMatch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="services" className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>{lang === 'ta' ? 'சேவைகள் அட்டவணை' : 'Our Service Catalog'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {lang === 'ta' ? (
              <>
                உங்களுக்கு தேவையான <span className="text-emerald-600 dark:text-emerald-400">அரசு & பயண</span> சேவையை தேர்வு செய்யுங்கள்
              </>
            ) : (
              <>
                Comprehensive <span className="text-emerald-600 dark:text-emerald-400">Passport, Travel & Government</span> Services
              </>
            )}
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            {lang === 'ta'
              ? 'மிமிசால் ஹாஷியா ஏர் டிராவல்ஸில் வழங்கப்படும் அனைத்து சேவைகளும் கீழே வரிசைப்படுத்தப்பட்டுள்ளன. தேவைப்படும் ஆவணங்களை சரிபார்க்கலாம்.'
              : 'Explore our specialized local services below. Click any card to see exact required documents and start your application.'}
          </p>
        </motion.div>

        {/* Filter Controls Bar */}
        <div className="mt-10 space-y-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all shrink-0 ${
                    isSelected
                      ? 'bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 shadow-md scale-105'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <ServiceIcon name={cat.icon} className="w-4 h-4" />
                  <span>{cat.label[lang]}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input Filter */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === 'ta'
                  ? 'தேட விரும்பும் சேவையை தட்டச்சு செய்யவும்...'
                  : 'Filter services by keyword...'
              }
              className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 text-sm rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-emerald-500 transition-colors shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Services Cards Grid with Motion */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedCategory + searchQuery}
            className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {filteredServices.map((service, idx) => {
              const whatsappText = encodeURIComponent(
                service.whatsappMessage[lang]
              );
              const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${whatsappText}`;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group relative bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
                >
                  {/* Popular Tag */}
                  {service.popular && (
                    <div className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase border border-emerald-500/20">
                      {lang === 'ta' ? 'பிரபலம்' : 'Popular'}
                    </div>
                  )}

                  <div>
                    {/* Icon & Category */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                        <ServiceIcon name={service.iconName} className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                          {service.processingTime[lang]}
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {service.title[lang]}
                    </h3>

                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                      {service.shortDesc[lang]}
                    </p>
                  </div>

                  {/* Card Actions */}
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                    <button
                      onClick={() => onSelectService(service)}
                      className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl transition-colors"
                    >
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        {lang === 'ta' ? 'தேவையான ஆவணங்கள் பார்க்க' : 'Check Required Documents'}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-white" />
                        <span>WhatsApp</span>
                      </a>

                      <a
                        href={`tel:+91${BUSINESS_INFO.phone}`}
                        className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-sky-400" />
                        <span>{lang === 'ta' ? 'அழைக்க' : 'Call'}</span>
                      </a>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Empty Search Result Fallback */}
        {filteredServices.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-md mx-auto mt-8 p-6">
            <p className="text-base font-bold text-slate-800 dark:text-white">
              {lang === 'ta' ? 'சேவை எதுவும் கிடைக்கவில்லை' : 'No service found matching your search'}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {lang === 'ta' ? 'வேறு சொல்லை தேடுங்கள் அல்லது எங்களை நேரடியாக தொடர்பு கொள்ளுங்கள்.' : 'Try a different keyword or call us directly.'}
            </p>
            <a
              href={`tel:+91${BUSINESS_INFO.phone}`}
              className="mt-4 inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold text-xs"
            >
              <Phone className="w-4 h-4" />
              <span>{lang === 'ta' ? 'அழைக்க: 9952595090' : 'Call Us: 9952595090'}</span>
            </a>
          </div>
        )}

      </div>
    </section>
  );
};

