import React from 'react';
import { motion } from 'motion/react';
import { Award, Clock, HeartHandshake, Languages, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { STATS_DATA } from '../data/servicesData';

interface WhyChooseUsProps {
  lang: Language;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ lang }) => {
  const features = [
    {
      icon: Award,
      title: { en: 'Local & Authorized Center', ta: 'உள்ளூர் நம்பிக்கையான மையம்' },
      desc: { 
        en: 'Located conveniently at East Coast Road, Mimisal. Fully registered and equipped to process all your passport and government documentation needs.',
        ta: 'மிமிசால் கிழக்கு கடற்கரை சாலையில் அமைந்துள்ளது. அனைத்து அரசு மற்றும் பயண ஆவணங்களுக்கும் உரிமம் பெற்ற மையம்.'
      }
    },
    {
      icon: HeartHandshake,
      title: { en: 'All-In-One Service Hub', ta: 'அனைத்தும் ஒரே கூரையின் கீழ்' },
      desc: { 
        en: 'No need to visit multiple centers. From fresh Passport applications to e-Sevai, Patta, PAN, and Flight Tickets, we handle everything under one roof.',
        ta: 'பாஸ்போர்ட், விசா, விமான டிக்கெட் முதல் பான் கார்டு, பட்டா, இ-சேவை வரை அனைத்தும் ஒரே இடத்தில் பெறலாம்.'
      }
    },
    {
      icon: Clock,
      title: { en: 'Fast & Error-Free Process', ta: 'வேகமான மற்றும் துல்லியமான சேவை' },
      desc: { 
        en: 'Avoid application rejections! Our experienced staff verifies all photocopies, names, and photos before online submission.',
        ta: 'விண்ணப்ப நிராகரிப்புகளைத் தவிர்க்க எங்களின் அனுபவம் வாய்ந்த ஊழியர்கள் அனைத்து விவரங்களையும் சரிபார்க்கிறார்கள்.'
      }
    },
    {
      icon: Languages,
      title: { en: 'Tamil & English Guidance', ta: 'தமிழ் & ஆங்கிலத்தில் எளிய வழிகாட்டுதல்' },
      desc: { 
        en: 'Friendly staff speaking your language to clearly explain document requirements and procedures.',
        ta: 'உங்கள் மொழியிலேயே சந்தேகங்களை தெளிவுபடுத்தி துல்லியமான ஆவண வழிகாட்டுதல் வழங்கப்படுகிறது.'
      }
    }
  ];

  return (
    <section id="why-us" className="py-16 sm:py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto space-y-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider border border-sky-200">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            {lang === 'ta' ? 'எங்களின் சிறப்பம்சங்கள்' : 'Why Choose Haashiya'}
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'ta' ? (
              <>
                மிமிசால் பகுதியில் <span className="text-emerald-700">14+ ஆண்டுகளாக</span> மக்கள் செலுத்தும் பேரன்பு
              </>
            ) : (
              <>
                Trusted Local Partner for <span className="text-emerald-700">over 14+ Years</span>
              </>
            )}
          </h2>

          <p className="text-slate-600 text-base font-medium">
            {lang === 'ta'
              ? 'மிமிசால், ஈஸ்ட் கோースト ரோடு மற்றும் சுற்றியுள்ள கிராம மக்களுக்கு துல்லியமான, வேகமான சேவைகளை வழங்கி வருகிறோம்.'
              : 'Dedicated to providing stress-free, accurate, and quick document processing for the community of Mimisal and East Coast Road.'}
          </p>
        </motion.div>

        {/* Counter Stats Banner */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS_DATA.map((stat, idx) => (
            <motion.div 
              key={stat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 text-center hover:border-emerald-500 transition-colors shadow-2xs"
            >
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {stat.value.toLocaleString()}{stat.suffix}
              </p>
              <p className="text-xs sm:text-sm font-bold text-emerald-700 mt-1.5">
                {stat.label[lang]}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Core Feature Grid */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex items-start gap-4 p-6 bg-slate-50/80 rounded-3xl border border-slate-200/80 hover:bg-white hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {item.title[lang]}
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-600 leading-relaxed font-medium">
                    {item.desc[lang]}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
