import React, { useState } from 'react';
import { FileText, CheckCircle2, ArrowRight, MessageSquare, Phone, Sparkles } from 'lucide-react';
import { Language, ServiceItem } from '../types';
import { SERVICES_DATA, BUSINESS_INFO } from '../data/servicesData';
import { ServiceIcon } from './ServiceIcon';

interface ServiceFinderToolProps {
  lang: Language;
  onSelectService: (service: ServiceItem) => void;
}

export const ServiceFinderTool: React.FC<ServiceFinderToolProps> = ({ lang, onSelectService }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES_DATA[0].id);

  const selectedService = SERVICES_DATA.find((s) => s.id === selectedServiceId) || SERVICES_DATA[0];

  const whatsappText = encodeURIComponent(
    lang === 'ta'
      ? `வணக்கம் ஹாஷியா டிராவல்ஸ், நான் ${selectedService.title.ta} சேவை பெற விரும்புகிறேன்.`
      : `Hi Haashiya Air Travels, I need assistance for ${selectedService.title.en}.`
  );
  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${whatsappText}`;

  return (
    <section id="finder" className="py-16 bg-gradient-to-br from-emerald-50/60 via-white to-sky-50/60 text-slate-900 relative overflow-hidden border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            {lang === 'ta' ? 'ஆவணங்கள் வழிகாட்டி' : 'Document Requirements Finder'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-3 text-slate-900">
            {lang === 'ta' 
              ? 'உடனடி ஆவணங்கள் சரிபார்ப்பு மையம்' 
              : 'Instant Document Checklist Finder'}
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            {lang === 'ta'
              ? 'உங்களுக்கு தேவையான சேவையை தேர்ந்தெடுத்து கொண்டு வர வேண்டிய சான்றிதழ்களை உடனே பாருங்கள்.'
              : 'Select any service below to view the exact document checklist required before visiting our Mimisal office.'}
          </p>
        </div>

        {/* Wizard Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start bg-white border border-slate-200/90 rounded-3xl p-6 lg:p-8 shadow-xl">
          
          {/* Left Column: Selector List */}
          <div className="lg:col-span-5 space-y-2 max-h-[420px] overflow-y-auto pr-2 scrollbar-thin">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              {lang === 'ta' ? '1. சேவையை தேர்வு செய்க:' : '1. Select Your Service:'}
            </p>
            {SERVICES_DATA.map((service) => {
              const isSelected = service.id === selectedServiceId;
              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`w-full text-left p-3.5 rounded-2xl flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-emerald-600 text-white font-bold shadow-md scale-[1.01]'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium border border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-white text-emerald-700 shadow-2xs border border-slate-200'
                    }`}>
                      <ServiceIcon name={service.iconName} className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm">{service.title[lang]}</span>
                  </div>
                  <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1' : 'opacity-40'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Checklist View */}
          <div className="lg:col-span-7 bg-slate-50/90 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <ServiceIcon name={selectedService.iconName} className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                      {lang === 'ta' ? 'தேர்ந்தெடுக்கப்பட்ட சேவை' : 'Selected Service'}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">{selectedService.title[lang]}</h3>
                  </div>
                </div>

                <span className="bg-white text-slate-700 text-xs font-bold px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
                  ⏱ {selectedService.processingTime[lang]}
                </span>
              </div>

              <div className="mt-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  {lang === 'ta' ? 'தேவையான ஆவணங்கள்:' : 'Mandatory Documents Needed:'}
                </p>
                <div className="space-y-2">
                  {selectedService.documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-800 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-semibold">{doc.name[lang]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => onSelectService(selectedService)}
                className="w-full sm:w-auto text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <FileText className="w-4 h-4" />
                <span>{lang === 'ta' ? 'முழு விவரங்கள் பார்க்க' : 'View Full Details Modal'}</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={`tel:+91${BUSINESS_INFO.phone}`}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl"
                >
                  <Phone className="w-3.5 h-3.5 text-sky-400" />
                  <span>{lang === 'ta' ? 'அழைக்க' : 'Call Office'}</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
