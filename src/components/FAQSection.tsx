import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageSquare, Phone } from 'lucide-react';
import { Language } from '../types';
import { FAQ_DATA, BUSINESS_INFO } from '../data/servicesData';

interface FAQSectionProps {
  lang: Language;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ lang }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            {lang === 'ta' ? 'அடிக்கடி கேட்கப்படும் கேள்விகள்' : 'Frequently Asked Questions'}
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {lang === 'ta' 
              ? 'பொதுவான சந்தேகங்கள் & பதில்கள்' 
              : 'Got Questions? We Have Answers'}
          </h2>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-3">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-slate-50/80 rounded-2xl border border-slate-200/80 overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-emerald-700 transition-colors"
                >
                  <span>{faq.question[lang]}</span>
                  <ChevronDown className={`w-5 h-5 shrink-0 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-emerald-600' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3">
                    {faq.answer[lang]}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-10 bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div>
            <h3 className="font-bold text-base">
              {lang === 'ta' ? 'வேறு ஏதேனும் சந்தேகங்கள் உள்ளதா?' : 'Still have questions or special document cases?'}
            </h3>
            <p className="text-xs text-emerald-100/90 mt-0.5">
              {lang === 'ta' ? 'எங்கள் மிமிசால் அலுவலக பணியாளர்கள் உதவ தயார்.' : 'Our staff in Mimisal is available on WhatsApp and Phone.'}
            </p>
          </div>

          <a
            href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
              lang === 'ta' ? 'வணக்கம், எனக்கு கூடுதல் சந்தேகங்கள் உள்ளன.' : 'Hi, I have a query regarding document application.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-white hover:bg-slate-100 text-emerald-900 font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-colors shadow-sm"
          >
            <MessageSquare className="w-4 h-4 fill-emerald-800 text-emerald-800" />
            <span>WhatsApp Us</span>
          </a>
        </div>

      </div>
    </section>
  );
};
