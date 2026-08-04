import React from 'react';
import { X, CheckCircle2, MessageSquare, Phone, Printer, Share2, FileText, Clock } from 'lucide-react';
import { ServiceItem, Language } from '../types';
import { BUSINESS_INFO } from '../data/servicesData';
import { ServiceIcon } from './ServiceIcon';

interface DocumentChecklistModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  lang: Language;
}

export const DocumentChecklistModal: React.FC<DocumentChecklistModalProps> = ({ service, onClose, lang }) => {
  if (!service) return null;

  const whatsappText = encodeURIComponent(
    lang === 'ta'
      ? `வணக்கம், நான் ${service.title.ta} சேவைக்கு விண்ணப்பிக்க விரும்புகிறேன். என்னிடம் தேவையான ஆவணங்கள் உள்ளன.`
      : `Hi Haashiya Travels, I would like to apply for ${service.title.en}. I have the required documents ready.`
  );

  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${whatsappText}`;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const text = `${service.title[lang]} - Required Documents:\n${service.documents.map(d => `• ${d.name[lang]}`).join('\n')}\n\nContact Haashiya Air Travels, Mimisal: ${BUSINESS_INFO.phone}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: service.title[lang],
          text: text,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share canceled');
      }
    } else {
      navigator.clipboard.writeText(text);
      alert(lang === 'ta' ? 'ஆவணங்கள் பட்டியல் நகலெடுக்கப்பட்டது!' : 'Checklist copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <ServiceIcon name={service.iconName} className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                {lang === 'ta' ? 'தேவையான ஆவணங்கள் பட்டியல்' : 'Required Documents Checklist'}
              </span>
              <h2 className="text-xl font-bold text-white leading-tight">
                {service.title[lang]}
              </h2>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              {lang === 'ta' ? 'கால அளவு:' : 'Estimated Time:'} <strong className="text-white">{service.processingTime[lang]}</strong>
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
              {lang === 'ta' ? 'சேவை விவரம்:' : 'Service Overview:'}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
              {service.detailedDesc[lang]}
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{lang === 'ta' ? 'கொண்டு வர வேண்டிய ஆவணங்கள்:' : 'Documents You Need to Bring:'}</span>
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-600 flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{lang === 'ta' ? 'பகிர்' : 'Share'}</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-600 flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{lang === 'ta' ? 'அச்சு' : 'Print'}</span>
                </button>
              </div>
            </div>

            <div className="space-y-2.5">
              {service.documents.map((doc, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/50 dark:bg-slate-800/80 border border-emerald-200/60 dark:border-slate-700/60"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {doc.name[lang]}
                    </p>
                    {doc.isMandatory ? (
                      <span className="inline-block text-[10px] font-bold text-red-600 dark:text-red-400 uppercase mt-0.5">
                        {lang === 'ta' ? '• கட்டாயம் தேவை' : '• Mandatory'}
                      </span>
                    ) : (
                      <span className="inline-block text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {lang === 'ta' ? '• தேவையெனில் மட்டும்' : '• Optional / If applicable'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 p-4 rounded-2xl text-xs text-amber-900 dark:text-amber-200">
            <p className="font-bold mb-1">
              {lang === 'ta' ? '💡 குறிப்பு:' : '💡 Important Note:'}
            </p>
            <p>
              {lang === 'ta' 
                ? 'அசல் ஆவணங்களுடன் ஒரு செட் ஜெராக்ஸ் நகல்களையும் கொண்டு வாருங்கள். உங்கள் ஆவணங்கள் அனைத்தும் பாதுகாப்பாக பராமரிக்கப்படும்.'
                : 'Please bring original documents along with one set of photocopies to our Mimisal office. All customer documents are handled with strict privacy.'}
            </p>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-3">
          <a
            href={`tel:+91${BUSINESS_INFO.phone}`}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors"
          >
            <Phone className="w-4 h-4 text-sky-400" />
            <span>{lang === 'ta' ? 'அழைத்து கேட்க' : 'Call Office'}</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>{lang === 'ta' ? 'வாட்ஸ்அப்பில் அனுப்ப' : 'Send via WhatsApp'}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
